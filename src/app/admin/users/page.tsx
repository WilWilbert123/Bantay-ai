import Link from 'next/link';

export default function AdminUsersPage() {
  const users = [
    { id: 'usr_1', username: 'admin', name: 'System Administrator', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2026-10-09T14:30:00.000Z' },
    { id: 'usr_2', username: 'rescue_ops', name: 'Barangay Rescue Team', role: 'RESPONDER', status: 'ACTIVE', lastLogin: '2026-10-08T14:30:00.000Z' },
    { id: 'usr_3', username: 'sensor_svc', name: 'Sensor Service Account', role: 'SERVICE', status: 'ACTIVE', lastLogin: '2026-10-09T13:30:00.000Z' }
  ];

  return (
    <div className="h-full w-full flex flex-col bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
      <div className="flex-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 p-6 bg-slate-900/50 z-10">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-sm text-slate-400 mt-1">Manage local offline access, roles, and device permissions.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Add Local User
        </button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col p-6 gap-6 overflow-hidden">
        <div className="flex-1 min-h-0 bg-slate-950/50 border border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 sticky top-0 z-10 border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Last Login</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200">{user.name}</div>
                      <div className="text-xs font-mono text-slate-500 mt-0.5">@{user.username}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold \${
                        user.role === 'ADMIN' ? 'bg-purple-900/30 text-purple-400' :
                        user.role === 'RESPONDER' ? 'bg-blue-900/30 text-blue-400' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded-full w-fit">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                      {new Date(user.lastLogin).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <button className="text-slate-400 hover:text-blue-400 font-semibold text-sm transition-colors">Edit</button>
                      <button className="text-red-400 hover:text-red-500 font-semibold text-sm transition-colors">Revoke Access</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex-none bg-yellow-950/20 border-l-4 border-yellow-500/50 border border-slate-800 p-4 rounded-r-xl rounded-l-sm flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500 flex-none mt-0.5">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-bold text-yellow-500 text-sm">Security Notice</h4>
            <p className="text-sm text-yellow-500/70 mt-1">
              Bantay AI uses secure local Argon2id hashing for passwords. Because this node operates offline, there is no remote password recovery. Do not lose the Administrator password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
