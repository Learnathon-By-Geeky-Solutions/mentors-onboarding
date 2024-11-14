import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { techStacks } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await db.delete(techStacks).where(eq(techStacks.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const body = await request.json();
    
    const [stack] = await db
      .update(techStacks)
      .set({
        name: body.name,
        icon: body.icon,
        discordUrl: body.discordUrl || null,
      })
      .where(eq(techStacks.id, params.id))
      .returning();

    return NextResponse.json(stack);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}