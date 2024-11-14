import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { techStacks } from '@/lib/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test database connection with a simple query
    const result = await db.select().from(techStacks).limit(1);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: result
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}