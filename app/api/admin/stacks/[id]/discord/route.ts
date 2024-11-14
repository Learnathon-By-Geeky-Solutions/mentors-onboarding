import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { techStacks } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { discordUrl } = await request.json();
    
    const stack = await db
      .update(techStacks)
      .set({ discordUrl })
      .where(eq(techStacks.id, params.id))
      .returning();

    return NextResponse.json(stack[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}