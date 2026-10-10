import React from 'react';
import Link from 'next/link';

export function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-40 pb-safe">
      <Link href="/dashboard" className="text-xs font-bold text-slate-600 flex flex-col items-center">📊<span className="mt-1">Home</span></Link>
      <Link href="/assistant" className="text-xs font-bold text-slate-600 flex flex-col items-center">💬<span className="mt-1">Chat</span></Link>
      <Link href="/emergency" className="text-xs font-bold text-slate-600 flex flex-col items-center">🚨<span className="mt-1">Alerts</span></Link>
    </nav>
  );
}