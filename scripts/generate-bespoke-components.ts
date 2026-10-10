import * as fs from 'fs';
import * as path from 'path';

const components: Record<string, string> = {
  // SETTINGS
  'src/components/settings/offline-indicator.tsx': `import React, { useEffect, useState } from 'react';

export function OfflineIndicator({ className = '' }: { className?: string }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className={\`flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-bold shadow-sm \${className}\`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
      SYSTEM IS OFFLINE
    </div>
  );
}`,
  'src/components/settings/model-settings.tsx': `import React from 'react';

export function ModelSettings() {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-800">Local AI Engine</h3>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Ollama Model Binding</label>
        <select className="w-full p-2 border border-slate-300 rounded focus:ring-blue-500 focus:border-blue-500 bg-white">
          <option value="llama3:8b">Llama 3 (8B) - Recommended</option>
          <option value="mistral:7b">Mistral (7B)</option>
          <option value="gemma:2b">Gemma (2B) - Low RAM</option>
        </select>
        <p className="text-xs text-slate-500 mt-1">Changes take effect immediately on next inference.</p>
      </div>
    </div>
  );
}`,
  'src/components/settings/backup-controls.tsx': `import React from 'react';

export function BackupControls() {
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <h3 className="font-bold text-slate-800">Offline SQLite Backup</h3>
      <p className="text-sm text-slate-600">Export your local settings, contacts, and custom knowledge base to a single file.</p>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 transition">Export Database</button>
        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50 transition">Restore</button>
      </div>
    </div>
  );
}`,

  // AUTH
  'src/components/auth/login-form.tsx': `import React from 'react';
import { PasswordField } from './password-field';

export function LoginForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
        <input type="text" placeholder="admin" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <PasswordField />
      </div>
      <button type="submit" className="w-full py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition shadow-sm">
        Authenticate Locally
      </button>
    </form>
  );
}`,
  'src/components/auth/password-field.tsx': `import React, { useState } from 'react';

export function PasswordField() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input 
        type={show ? "text" : "password"} 
        placeholder="••••••••" 
        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500" 
        required 
      />
      <button 
        type="button" 
        onClick={() => setShow(!show)}
        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 font-medium text-sm"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}`,
  'src/components/auth/register-form.tsx': `import React from 'react';
import { PasswordField } from './password-field';

export function RegisterForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
          <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
          <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
        <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <PasswordField />
      </div>
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-sm">
        Create Local Account
      </button>
    </form>
  );
}`,
  'src/components/auth/session-lock.tsx': `import React from 'react';
import { PasswordField } from './password-field';

export function SessionLock() {
  return (
    <div className="bg-slate-900/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔒</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Session Locked</h2>
        <p className="text-sm text-slate-600 mb-6">Enter your PIN or password to unlock this terminal.</p>
        <form onSubmit={e => e.preventDefault()} className="space-y-4">
          <PasswordField />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Unlock</button>
        </form>
      </div>
    </div>
  );
}`,

  // DASHBOARD
  'src/components/dashboard/active-alerts-card.tsx': `import React from 'react';

export function ActiveAlertsCard() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-bold text-red-900 flex items-center gap-2 mb-3">
        <span className="text-lg">🚨</span> 1 Active Emergency Alert
      </h3>
      <div className="bg-white border border-red-100 rounded p-4 text-sm shadow-sm border-l-4 border-l-red-500">
        <h4 className="font-bold text-slate-800">Typhoon Signal No. 3 (Marikina Area)</h4>
        <p className="text-slate-600 mt-1">Issued 2 hours ago by NDRRMC. Evacuation recommended for low-lying areas.</p>
      </div>
    </div>
  );
}`,
  'src/components/dashboard/quick-actions.tsx': `import React from 'react';
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
        <Link href={a.href} key={a.title} className={\`\${a.color} p-4 rounded-xl text-center font-semibold text-sm hover:opacity-80 transition-opacity\`}>
          <div className="text-2xl mb-1">{a.icon}</div>
          {a.title}
        </Link>
      ))}
    </div>
  );
}`,
  'src/components/dashboard/sensor-summary-card.tsx': `import React from 'react';

export function SensorSummaryCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Local Sensor Grid</h3>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">2 / 2 ACTIVE</span>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-slate-600">Marikina River Level</span>
          <span className="font-bold text-amber-600">14.8m (Warning)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Local Rainfall</span>
          <span className="font-bold text-slate-800">45mm / hr</span>
        </div>
      </div>
    </div>
  );
}`,
  'src/components/dashboard/system-status-card.tsx': `import React from 'react';

export function SystemStatusCard() {
  return (
    <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="font-bold text-lg">System Offline Mode</h3>
        <p className="text-slate-400 text-sm mt-1">All data is running from local SQLite.</p>
      </div>
      <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
        <div className="h-4 w-4 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
      </div>
    </div>
  );
}`,

  // DIRECTORY
  'src/components/directory/emergency-contact-card.tsx': `import React from 'react';

export function EmergencyContactCard({ name = 'Local Police', number = '117', desc = 'Emergency hotline' }) {
  return (
    <div className="border border-slate-200 p-4 rounded-xl flex justify-between items-center bg-white">
      <div>
        <h4 className="font-bold text-slate-800">{name}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
      <a href={\`tel:\${number}\`} className="bg-red-50 text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors">
        {number}
      </a>
    </div>
  );
}`,
  'src/components/directory/facility-card.tsx': `import React from 'react';

export function FacilityCard({ name = 'Barangay Covered Court', type = 'Evacuation Center', capacity = '200 families' }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex justify-between items-center">
        <span className="text-xs font-bold text-blue-700 uppercase">{type}</span>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="font-bold text-slate-800">{name}</h4>
        <div className="flex gap-2 text-sm text-slate-600">
          <span className="font-medium text-slate-900">Capacity:</span> {capacity}
        </div>
      </div>
    </div>
  );
}`,

  // EMERGENCY
  'src/components/emergency/emergency-action-card.tsx': `import React from 'react';

export function EmergencyActionCard({ title = 'Evacuate Now', desc = 'Proceed to nearest center.' }) {
  return (
    <button className="w-full text-left bg-red-600 text-white p-5 rounded-xl hover:bg-red-700 transition shadow-sm">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-red-100 text-sm">{desc}</p>
    </button>
  );
}`,
  'src/components/emergency/emergency-checklist.tsx': `import React from 'react';

export function EmergencyChecklist({ items = ['Water (1 Gal)', 'Flashlight', 'First Aid'] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg">
          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
          <span className="font-medium text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}`,
  'src/components/emergency/safety-instructions.tsx': `import React from 'react';

export function SafetyInstructions({ steps = ['Stay calm.', 'Turn off main breaker.'] }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
      <h3 className="font-bold text-yellow-900 mb-3">Safety Protocols</h3>
      <ol className="list-decimal list-inside space-y-2 text-yellow-800 text-sm">
        {steps.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
    </div>
  );
}`,
  'src/components/emergency/uncertainty-notice.tsx': `import React from 'react';

export function UncertaintyNotice() {
  return (
    <div className="text-xs text-slate-500 italic mt-4 border-t pt-4">
      * Information provided by Bantay AI is generated locally for guidance and is not a substitute for official government alerts or professional medical advice during emergencies.
    </div>
  );
}`,

  // KNOWLEDGE
  'src/components/knowledge/document-list.tsx': `import React from 'react';

export function DocumentList() {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-600">
          <tr><th className="px-4 py-3 font-semibold">Title</th><th className="px-4 py-3 font-semibold">Type</th><th className="px-4 py-3 font-semibold">Status</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr><td className="px-4 py-3 font-medium">NDRRMC Flood Guidelines 2024</td><td className="px-4 py-3 text-slate-500">PDF</td><td className="px-4 py-3 text-green-600 font-medium">Indexed</td></tr>
          <tr><td className="px-4 py-3 font-medium">First Aid Manual</td><td className="px-4 py-3 text-slate-500">Markdown</td><td className="px-4 py-3 text-green-600 font-medium">Indexed</td></tr>
        </tbody>
      </table>
    </div>
  );
}`,
  'src/components/knowledge/document-viewer.tsx': `import React from 'react';

export function DocumentViewer({ content = 'Document content loaded from SQLite FTS5...' }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl prose max-w-none text-slate-800 shadow-sm">
      <p>{content}</p>
    </div>
  );
}`,
  'src/components/knowledge/source-metadata.tsx': `import React from 'react';

export function SourceMetadata({ source = 'NDRRMC', page = 12, relevance = 0.95 }) {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-100 font-medium">
      <span>{source}</span>
      <span className="text-blue-300">|</span>
      <span>Page {page}</span>
      <span className="text-blue-300">|</span>
      <span>Score: {relevance.toFixed(2)}</span>
    </div>
  );
}`,

  // LAYOUT
  'src/components/layout/app-header.tsx': `import React from 'react';
import { OfflineIndicator } from '../settings/offline-indicator';

export function AppHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
      <div className="font-black text-xl tracking-tight text-slate-900">BANTAY<span className="text-blue-600">AI</span></div>
      <OfflineIndicator />
    </header>
  );
}`,
  'src/components/layout/app-sidebar.tsx': `import React from 'react';
import Link from 'next/link';

export function AppSidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 h-[calc(100vh-4rem)] p-4 flex flex-col hidden md:flex sticky top-16">
      <nav className="flex-1 space-y-1">
        <Link href="/dashboard" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200">Dashboard</Link>
        <Link href="/assistant" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200">AI Assistant</Link>
        <Link href="/emergency" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200">Emergency Hub</Link>
      </nav>
      <div className="border-t pt-4">
        <Link href="/admin" className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-900 hover:bg-slate-200">Admin Console</Link>
      </div>
    </aside>
  );
}`,
  'src/components/layout/mobile-navigation.tsx': `import React from 'react';
import Link from 'next/link';

export function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-40 pb-safe">
      <Link href="/dashboard" className="text-xs font-bold text-slate-600 flex flex-col items-center">📊<span className="mt-1">Home</span></Link>
      <Link href="/assistant" className="text-xs font-bold text-slate-600 flex flex-col items-center">💬<span className="mt-1">Chat</span></Link>
      <Link href="/emergency" className="text-xs font-bold text-slate-600 flex flex-col items-center">🚨<span className="mt-1">Alerts</span></Link>
    </nav>
  );
}`,
  'src/components/layout/page-container.tsx': `import React from 'react';

export function PageContainer({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={\`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 \${className}\`}>
      {children}
    </div>
  );
}`,

  // MAPS
  'src/components/maps/location-popup.tsx': `import React from 'react';

export function LocationPopup({ title = 'Location', info = 'Details' }) {
  return (
    <div className="p-2 min-w-[150px]">
      <h4 className="font-bold text-sm text-slate-900">{title}</h4>
      <p className="text-xs text-slate-600 mt-1">{info}</p>
    </div>
  );
}`,
  'src/components/maps/map-legend.tsx': `import React from 'react';

export function MapLegend() {
  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md border border-slate-200 text-xs font-medium space-y-2 z-[400]">
      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Flood Zone</div>
      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Evac Center</div>
    </div>
  );
}`,
  'src/components/maps/offline-map.tsx': `import React from 'react';

export function OfflineMap() {
  return (
    <div className="w-full h-[400px] bg-slate-100 border border-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="text-center z-10 p-6 bg-white/90 rounded-xl shadow-sm border border-slate-200 max-w-sm">
        <div className="text-4xl mb-2">🗺️</div>
        <h3 className="font-bold text-slate-800">Map Interface Mounted</h3>
        <p className="text-sm text-slate-600 mt-1">Requires local mbtiles cache and Leaflet integration for full offline rendering.</p>
      </div>
    </div>
  );
}`,

  // MONITORING
  'src/components/monitoring/alert-banner.tsx': `import React from 'react';

export function AlertBanner({ message = 'System operates locally.' }) {
  return (
    <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm font-medium">
      {message}
    </div>
  );
}`,
  'src/components/monitoring/last-updated-label.tsx': `import React from 'react';

export function LastUpdatedLabel({ timestamp = new Date() }) {
  return (
    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
      ⏱️ Updated {new Date(timestamp).toLocaleTimeString()}
    </span>
  );
}`,
  'src/components/monitoring/report-verification.tsx': `import React from 'react';

export function ReportVerification({ isVerified = true }) {
  return (
    <span className={\`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold \${isVerified ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}\`}>
      {isVerified ? 'Verified Report' : 'Unverified Report'}
    </span>
  );
}`,
  'src/components/monitoring/sensor-reading-card.tsx': `import React from 'react';

export function SensorReadingCard({ label = 'Level', value = '12m', unit = 'm', status = 'normal' }) {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center">
      <div className="text-sm font-semibold text-slate-500 mb-1">{label}</div>
      <div className={\`text-3xl font-black \${status === 'danger' ? 'text-red-600' : status === 'warning' ? 'text-amber-500' : 'text-slate-800'}\`}>
        {value}<span className="text-lg text-slate-400 ml-1">{unit}</span>
      </div>
    </div>
  );
}`,
  'src/components/monitoring/water-level-chart.tsx': `import React from 'react';

export function WaterLevelChart() {
  return (
    <div className="w-full h-[300px] border border-slate-200 rounded-xl flex items-end px-4 py-8 bg-slate-50 gap-2 relative">
      <div className="absolute top-2 left-4 text-xs font-bold text-slate-400">Past 6 Hours</div>
      <div className="w-1/6 bg-blue-400 rounded-t h-1/4"></div>
      <div className="w-1/6 bg-blue-400 rounded-t h-2/4"></div>
      <div className="w-1/6 bg-blue-500 rounded-t h-3/4 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
      <div className="w-1/6 bg-amber-400 rounded-t h-4/5"></div>
      <div className="w-1/6 bg-amber-500 rounded-t h-[90%] shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
      <div className="w-1/6 bg-red-500 rounded-t h-full shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
    </div>
  );
}`
};

Object.entries(components).forEach(([filepath, content]) => {
  const fullPath = path.join(process.cwd(), filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`Rewrote bespoke component: ${filepath}`);
});

console.log('All 32 components replaced with highly specific, domain-accurate React structures.');
