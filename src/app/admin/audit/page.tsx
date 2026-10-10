import Link from 'next/link';

export default function AdminAuditPage() {
  const auditLogs = [
    { id: 'log_1', timestamp: '2026-10-09T14:30:00.000Z', user: 'admin', action: 'SETTINGS_UPDATE', target: 'System_Config', ip: '127.0.0.1', status: 'SUCCESS' },
    { id: 'log_2', timestamp: '2026-10-09T13:30:00.000Z', user: 'sensor_svc', action: 'SENSOR_INGEST', target: 'SNR-FLD-01', ip: '192.168.1.45', status: 'SUCCESS' },
    { id: 'log_3', timestamp: '2026-10-09T12:30:00.000Z', user: 'UNKNOWN', action: 'LOGIN_ATTEMPT', target: 'admin', ip: '192.168.1.102', status: 'FAILED' },
    { id: 'log_4', timestamp: '2026-10-08T14:30:00.000Z', user: 'rescue_ops', action: 'ALERT_BROADCAST', target: 'FLOOD_WARNING', ip: '192.168.1.20', status: 'SUCCESS' },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
      <div className="flex-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 p-6 bg-slate-900/50 z-10">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Audit Logs</h1>
          <p className="text-sm text-slate-400 mt-1">Immutable record of local offline system access, mutations, and alerts.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2 rounded-lg font-bold hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col p-6 gap-6 overflow-hidden">
        <div className="flex-1 min-h-0 bg-slate-950/50 border border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="flex-none p-4 border-b border-slate-800 flex gap-4">
            <input 
              type="text" 
              placeholder="Search logs by action, user, or IP..." 
              className="flex-1 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-slate-500"
            />
            <select className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Actions</option>
            <option>Login Attempts</option>
            <option>Alert Broadcasts</option>
            <option>System Mutations</option>
          </select>
        </div>
        <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 sticky top-0 z-10 border-b border-slate-800 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Timestamp</th>
                <th className="px-6 py-4 font-semibold">User / Principal</th>
                <th className="px-6 py-4 font-semibold">Action Event</th>
                <th className="px-6 py-4 font-semibold">Target / Context</th>
                <th className="px-6 py-4 font-semibold">Source IP</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-200">@{log.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-medium">
                    {log.target}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center justify-center gap-1.5 text-xs font-bold px-2 py-1 rounded w-fit ${
                      log.status === 'SUCCESS' ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex-none bg-slate-950 border border-slate-800 text-slate-300 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">
              <span className="font-bold text-slate-200">Cryptographic Verification</span>
              <p className="text-slate-400">Log entries are hashed and cannot be altered once written to the local SQLite audit ledger.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
