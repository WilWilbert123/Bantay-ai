import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'offline-ready', endpoint: 'app/api/conversations/[conversationId]/route.ts' });
}
