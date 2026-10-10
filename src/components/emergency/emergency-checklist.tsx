import React from 'react';

export function EmergencyChecklist({ items = ['Water (1 Gal)', 'Flashlight', 'First Aid'] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg">
          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
          <span className="font-medium text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}