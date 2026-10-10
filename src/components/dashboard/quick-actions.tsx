import React from 'react';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    { title: 'Ask Assistant', href: '/assistant', icon: '💬', color: 'bg-blue-50 text-blue-700' },
    { title: 'Evacuation Map', href: '/emergency/flood', icon: '🗺️', color: 'bg-emerald-50 text-emerald-700' },
    { title: 'Survival Kit', href: '/emergency/emergency-kit', icon: '🎒', color: 'bg-amber-50 text-amber-700' },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map(a => (
        <Link href={a.href} key={a.title} className={`${a.color} p-4 rounded-xl text-center font-semibold text-sm hover:opacity-80 transition-opacity`}>
          <div className="text-2xl mb-1">{a.icon}</div>
          {a.title}
        </Link>
      ))}
    </div>
  );
}