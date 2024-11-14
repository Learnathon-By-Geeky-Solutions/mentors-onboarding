import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { admins, techStacks } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await db
      .select()
      .from(admins)
      .where(eq(admins.email, 'admin@learnathon.com'))
      .execute();

    if (existingAdmin.length === 0) {
      // Create default admin
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.insert(admins).values({
        email: 'admin@learnathon.com',
        password: hashedPassword,
      });
    }

    // Create default tech stacks if they don't exist
    const existingStacks = await db.select().from(techStacks).execute();
    
    if (existingStacks.length === 0) {
      const defaultStacks = [
        { name: '.NET', icon: 'Code' },
        { name: 'Java', icon: 'Coffee' },
        { name: 'Python', icon: 'Code' },
        { name: 'PHP', icon: 'Code' },
        { name: 'Unity', icon: 'Gamepad2' },
        { name: 'MERN', icon: 'Layers' },
        { name: 'Cross-Platform', icon: 'Smartphone' },
      ];

      await db.insert(techStacks).values(defaultStacks);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Database seeded successfully' 
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}