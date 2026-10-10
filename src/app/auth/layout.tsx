import { redirect } from 'next/navigation';
import { isSystemBootstrapped } from '../actions/bootstrap';
import { getCurrentSession } from '../../lib/auth/session';

export const instant = false;

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getCurrentSession();

  // If already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  return (
    <>
      {children}
    </>
  );
}
