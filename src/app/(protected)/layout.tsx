import { redirect } from 'next/navigation';
import { getCurrentSession } from '../../lib/auth/session';
import { AppSidebar } from '../../components/layout/app-sidebar';

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

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden font-sans fixed inset-0 text-slate-100">
      {/* Sidebar Navigation */}
      <AppSidebar userRole={user.role} />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}
