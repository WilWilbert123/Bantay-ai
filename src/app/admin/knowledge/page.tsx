import Link from 'next/link';

export default function AdminKnowledgePage() {
  const documents = [
    { id: 'DOC-001', title: 'NDRRMC Standard Operating Procedures', type: 'PDF', status: 'INDEXED', chunks: 145, lastUpdated: '2026-10-09T14:30:00.000Z' },
    { id: 'DOC-002', title: 'PAGASA Cyclone Definitions 2024', type: 'TXT', status: 'INDEXED', chunks: 24, lastUpdated: '2026-10-08T14:30:00.000Z' },
    { id: 'DOC-003', title: 'Local Evacuation Routes - Brgy San Isidro', type: 'MD', status: 'INDEXING', chunks: 0, lastUpdated: '2026-10-09T14:30:00.000Z' }
  ];

  return (
    <div className="h-full w-full flex flex-col bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
      <div className="flex-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 p-6 bg-slate-900/50 z-10">
        <div>
          <h1 className="text-2xl font-bold text-white">Knowledge Base Admin</h1>
          <p className="text-sm text-slate-400 mt-1">Manage documents used by the local AI for offline Retrieval-Augmented Generation (RAG).</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Import Document
        </button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row p-6 gap-6 overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          <div className="flex-1 min-h-0 bg-slate-950/50 border border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 sticky top-0 z-10 border-b border-slate-800 text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Document Title</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Chunks</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {documents.map(doc => (
                    <tr key={doc.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-200">{doc.title}</div>
                        <div className="text-xs font-mono text-slate-500 mt-0.5">{doc.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-bold">{doc.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          doc.status === 'INDEXED' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400 animate-pulse'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono">
                        {doc.chunks}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-red-400 hover:text-red-300 font-semibold text-sm transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {documents.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No documents indexed yet. Import PDFs, text, or markdown to train the local AI.
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-80 flex-none flex flex-col gap-6 overflow-y-auto pr-1 min-h-0 custom-scrollbar">
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 text-white shadow-sm flex-none">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-400">
                <path fillRule="evenodd" d="M10 1c3.866 0 7 1.79 7 4s-3.134 4-7 4-7-1.79-7-4 3.134-4 7-4Zm5.694 8.13c.464-.264.91-.583 1.306-.952V10c0 2.21-3.134 4-7 4s-7-1.79-7-4V8.178c.396.37.842.688 1.306.953C5.838 10.006 7.854 10.5 10 10.5s4.162-.494 5.694-1.37ZM3 13.179V15c0 2.21 3.134 4 7 4s7-1.79 7-4v-1.822c-.396.37-.842.688-1.306.953-1.532.875-3.548 1.369-5.694 1.369s-4.162-.494-5.694-1.37A7.009 7.009 0 0 1 3 13.179Z" clipRule="evenodd" />
              </svg>
              FTS5 Database
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-400">Total Vectors</span>
                <span className="font-mono">169</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-400">Engine</span>
                <span className="font-semibold text-blue-400">SQLite FTS5</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-400">Status</span>
                <span className="font-semibold text-green-400">HEALTHY</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
