import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { techStacks } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stack = await db.insert(techStacks).values(body).returning();
    return NextResponse.json(stack[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}