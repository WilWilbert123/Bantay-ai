import React from 'react';
import { OfflineIndicator } from '../settings/offline-indicator';

export function AppHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
      <div className="font-black text-xl tracking-tight text-slate-900">BANTAY<span className="text-blue-600">AI</span></div>
      <OfflineIndicator />
    </header>
  );
}