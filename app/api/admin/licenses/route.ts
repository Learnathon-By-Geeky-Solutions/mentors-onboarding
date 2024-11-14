import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jetbrainsLicenses } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const { licenseKey } = await request.json();
    const license = await db
      .insert(jetbrainsLicenses)
      .values({ licenseKey })
      .returning();
    return NextResponse.json(license[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}