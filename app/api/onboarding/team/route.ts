import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { participants, configurations } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { githubUsername } = await request.json();

    // Get GitHub configuration
    const [config] = await db.select().from(configurations);
    if (!config?.githubToken || !config?.githubOrgName || !config?.githubTeamSlug) {
      throw new Error('GitHub configuration not found');
    }

    // First check if user is a member of the organization
    const membershipRes = await fetch(
      `https://api.github.com/orgs/${config.githubOrgName}/members/${githubUsername}`,
      {
        headers: {
          'Authorization': `Bearer ${config.githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!membershipRes.ok) {
      return NextResponse.json(
        { error: 'Please accept the organization invitation first' },
        { status: 400 }
      );
    }

    // Add to GitHub team
    const teamRes = await fetch(
      `https://api.github.com/orgs/${config.githubOrgName}/teams/${config.githubTeamSlug}/memberships/${githubUsername}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${config.githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!teamRes.ok) {
      const error = await teamRes.json();
      console.error('GitHub API error:', error);
      return NextResponse.json(
        { error: 'Failed to add to team. Please try again.' },
        { status: 400 }
      );
    }

    // Update participant record
    const [participant] = await db
      .update(participants)
      .set({ teamAdded: true })
      .where(eq(participants.githubUsername, githubUsername))
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Added to team successfully',
      participant,
    });
  } catch (error) {
    console.error('Team access error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}