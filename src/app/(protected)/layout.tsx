import { redirect } from 'next/navigation';
import { getCurrentSession } from '../../lib/auth/session';
import { AppSidebar } from '../../components/layout/app-sidebar';
import { Shell } from '../../components/layout/shell';

export const instant = false;

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect('/auth/login');
  }

  return <Shell userRole={user.role}>{children}</Shell>;
}
