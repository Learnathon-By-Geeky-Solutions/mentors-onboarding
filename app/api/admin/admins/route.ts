import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { admins } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin
    const [admin] = await db
      .insert(admins)
      .values({
        email,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}