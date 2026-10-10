import Link from 'next/link';

export default function AdminDashboardPage() {
  const adminModules = [
    { title: 'Emergency Alerts', href: '/admin/alerts', icon: '🚨', desc: 'Broadcast warnings and configure alert triggers.', color: 'bg-red-50 border-red-200' },
    { title: 'Knowledge Base', href: '/admin/knowledge', icon: '📚', desc: 'Import PDFs, Markdown, and text for offline AI RAG.', color: 'bg-blue-50 border-blue-200' },
    { title: 'Sensor Network', href: '/admin/sensors', icon: '📡', desc: 'Manage local water level and weather sensors.', color: 'bg-emerald-50 border-emerald-200' },
    { title: 'User Management', href: '/admin/users', icon: '👥', desc: 'Control local access, roles, and device sessions.', color: 'bg-purple-50 border-purple-200' },
    { title: 'System Health', href: '/admin/system', icon: '⚙️', desc: 'Monitor SQLite WAL, RAM, and Local AI engine.', color: 'bg-slate-100 border-slate-300' },
    { title: 'Security Audit', href: '/admin/audit', icon: '🛡️', desc: 'Review immutable security and access logs.', color: 'bg-yellow-50 border-yellow-200' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Administrator Console</h1>
        <p className="text-slate-600 mt-2">Manage offline infrastructure, sensors, users, and the local AI engine.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map(mod => (
          <Link href={mod.href} key={mod.title} className="group block h-full">
            <div className={`h-full p-6 rounded-2xl border \${mod.color} transition-all hover:shadow-md hover:-translate-y-1 bg-white`}>
              <div className="text-4xl mb-4">{mod.icon}</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600">{mod.title}</h2>
              <p className="text-slate-600 text-sm">{mod.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-slate-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Node Status: Offline & Secure
          </h3>
          <p className="text-slate-400 mt-1 text-sm">
            Bantay AI is running fully locally. All queries, sensor processing, and RAG retrieval are happening on this device.
          </p>
        </div>
        <Link 
          href="/dashboard" 
          className="whitespace-nowrap px-6 py-2 border border-slate-600 hover:bg-slate-800 rounded-lg text-sm font-bold transition-colors"
        >
          Return to User Dashboard
        </Link>
      </div>
    </div>
  );
}
