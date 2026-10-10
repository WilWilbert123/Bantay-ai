import React from 'react';

export function LocationPopup({ title = 'Location', info = 'Details' }) {
  return (
    <div className="p-2 min-w-[150px]">
      <h4 className="font-bold text-sm text-slate-900">{title}</h4>
      <p className="text-xs text-slate-600 mt-1">{info}</p>
    </div>
  );
}