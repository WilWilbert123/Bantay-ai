import React from 'react';

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
}