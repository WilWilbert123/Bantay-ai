import React from 'react';

export function SensorReadingCard({ label = 'Level', value = '12m', unit = 'm', status = 'normal' }) {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center">
      <div className="text-sm font-semibold text-slate-500 mb-1">{label}</div>
      <div className={`text-3xl font-black ${status === 'danger' ? 'text-red-600' : status === 'warning' ? 'text-amber-500' : 'text-slate-800'}`}>
        {value}<span className="text-lg text-slate-400 ml-1">{unit}</span>
      </div>
    </div>
  );
}