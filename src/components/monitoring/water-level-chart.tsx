import React from 'react';

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
}