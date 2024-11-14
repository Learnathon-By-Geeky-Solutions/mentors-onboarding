import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jetbrainsLicenses } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await db
      .delete(jetbrainsLicenses)
      .where(eq(jetbrainsLicenses.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}