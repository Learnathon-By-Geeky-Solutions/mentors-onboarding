import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { configurations } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const [existingConfig] = await db.select().from(configurations);

    if (existingConfig) {
      const config = await db
        .update(configurations)
        .set({
          githubToken: body.githubToken,
          githubOrgName: body.githubOrgName,
          githubTeamSlug: body.githubTeamSlug,
          updatedAt: new Date(),
        })
        .where({ id: existingConfig.id })
        .returning();
      return NextResponse.json(config[0]);
    }

    const config = await db
      .insert(configurations)
      .values({
        githubToken: body.githubToken,
        githubOrgName: body.githubOrgName,
        githubTeamSlug: body.githubTeamSlug,
      })
      .returning();
    return NextResponse.json(config[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}