import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'offline-ready', endpoint: 'app/api/emergencies/[emergencyId]/route.ts' });
}
