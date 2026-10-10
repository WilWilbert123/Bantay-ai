import Link from 'next/link';
import { alertsRepository } from '@/lib/db/repositories/alerts.repository';
import { IssueAlertButton, AlertActionButtons } from './AlertClientComponents';

export default function AdminAlertsPage() {
  const activeAlerts = alertsRepository.getActiveAlerts();

  return (
    <div className="h-full w-full flex flex-col bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
      {/* Header section */}
      <div className="flex-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 p-6 bg-slate-900/50 z-10">
        <div>
          <h1 className="text-2xl font-bold text-white">Alert Management</h1>
          <p className="text-sm text-slate-400 mt-1">Broadcast and manage emergency alerts across the local network.</p>
        </div>
        <IssueAlertButton />
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row p-6 gap-6 overflow-hidden">
        {/* Active Alerts List */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          <h2 className="text-lg font-bold text-white mb-4 flex-none">Active Broadcasts</h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 min-h-0 custom-scrollbar">
            {activeAlerts.map(alert => (
              <div key={alert.id} className="bg-slate-900 border border-red-900/40 hover:border-red-800/80 rounded-xl overflow-hidden shadow-sm p-3.5 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-white text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded shadow-sm ${alert.severity === 'CRITICAL' ? 'bg-red-600' : alert.severity === 'WARNING' ? 'bg-orange-500' : 'bg-blue-600'}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs font-bold text-slate-300 capitalize tracking-wide">{alert.alert_type.replace(/_/g, ' ').toLowerCase()}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded">#{alert.id.substring(0, 8)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>Source: <strong className="text-slate-200">{alert.trigger_source}</strong></span>
                    <span>•</span>
                    <span>{new Date(alert.issued_at).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{alert.title}</h3>
                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">{alert.description}</p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <AlertActionButtons alertId={alert.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status Sidebar */}
        <div className="w-full lg:w-80 flex-none flex flex-col gap-6 overflow-y-auto pr-1 min-h-0 custom-scrollbar">
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 text-white shadow-sm flex-none">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Alert Engine
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-400">Status</span>
                <span className="font-semibold text-green-400">ONLINE</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-400">Pending Rules</span>
                <span className="font-semibold">0</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-400">Last Broadcast</span>
                <span className="font-semibold text-slate-300">12 mins ago</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800 shadow-sm flex-none">
            <h3 className="font-bold text-white mb-2">Automated Triggers</h3>
            <p className="text-sm text-slate-400 mb-4">
              Configure which sensor thresholds automatically trigger emergency broadcasts.
            </p>
            <Link href="/admin/sensors" className="text-blue-400 text-sm font-semibold hover:underline">
              Manage Sensor Rules &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
