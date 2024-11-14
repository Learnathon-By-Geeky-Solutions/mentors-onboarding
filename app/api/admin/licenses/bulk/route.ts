import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jetbrainsLicenses } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const { licenses } = await request.json();
    const values = licenses.map((licenseKey: string) => ({ licenseKey }));
    
    const result = await db
      .insert(jetbrainsLicenses)
      .values(values)
      .returning();
      
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}