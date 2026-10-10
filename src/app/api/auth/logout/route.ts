import { logout } from '../../../../lib/auth/session';
import { NextResponse } from 'next/server';

export async function POST() {
  await logout();
  return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
