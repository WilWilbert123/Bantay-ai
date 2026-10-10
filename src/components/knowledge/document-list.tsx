import React from 'react';

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
}