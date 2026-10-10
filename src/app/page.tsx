import { redirect } from 'next/navigation';
import { getCurrentSession } from '../lib/auth/session';
import { isSystemBootstrapped } from './actions/bootstrap';
export const instant = false;

export default async function Home() {
  const { user } = await getCurrentSession();

  if (user) {
    redirect('/dashboard');
  }

  const bootstrapped = await isSystemBootstrapped();
  if (!bootstrapped) {
    redirect('/auth/register');
  }

  redirect('/auth/login');
}
