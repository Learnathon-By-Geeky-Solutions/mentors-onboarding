import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { participants, configurations } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const { githubUsername, stackId } = await request.json();

    // Get GitHub configuration
    const [config] = await db.select().from(configurations);
    
    if (!config?.githubToken || !config?.githubOrgName) {
      return NextResponse.json(
        { error: 'GitHub configuration not found. Please contact an administrator.' },
        { status: 400 }
      );
    }

    // First, get the user's GitHub ID
    const userRes = await fetch(`https://api.github.com/users/${githubUsername}`, {
      headers: {
        'Authorization': `Bearer ${config.githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!userRes.ok) {
      return NextResponse.json(
        { error: 'GitHub username not found. Please check your username.' },
        { status: 400 }
      );
    }

    const userData = await userRes.json();
    const userId = userData.id;

    // Send GitHub organization invitation
    const inviteRes = await fetch(
      `https://api.github.com/orgs/${config.githubOrgName}/invitations`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invitee_id: userId,
          role: 'direct_member',
        }),
      }
    );

    if (!inviteRes.ok) {
      const error = await inviteRes.json();
      console.error('GitHub API error:', error);
      return NextResponse.json(
        { error: 'Failed to send GitHub invitation. The user might already be a member.' },
        { status: 400 }
      );
    }

    // Create participant record
    const [participant] = await db
      .insert(participants)
      .values({
        githubUsername,
        stackId,
        orgInviteSent: true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Invitation sent successfully',
      participant,
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}