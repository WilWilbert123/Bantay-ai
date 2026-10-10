import React from 'react';

export function MapLegend() {
  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md border border-slate-200 text-xs font-medium space-y-2 z-[400]">
      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Flood Zone</div>
      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Evac Center</div>
    </div>
  );
}