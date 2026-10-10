'use client';

import { useState } from 'react';
import Link from 'next/link';

const KIT_CATEGORIES = [
  {
    title: 'Water & Food (3-Day Supply)',
    items: [
      { id: 'w1', name: 'Water (1 gallon per person per day)', checked: false },
      { id: 'f1', name: 'Non-perishable food (canned goods, energy bars)', checked: false },
      { id: 'f2', name: 'Manual can opener', checked: false },
    ]
  },
  {
    title: 'First Aid & Health',
    items: [
      { id: 'h1', name: 'First aid kit (bandages, antiseptics, gauze)', checked: false },
      { id: 'h2', name: 'Prescription medications (7-day supply)', checked: false },
      { id: 'h3', name: 'Over-the-counter meds (pain relievers, anti-diarrhea)', checked: false },
      { id: 'h4', name: 'Personal hygiene items (wet wipes, hand sanitizer)', checked: false },
    ]
  },
  {
    title: 'Tools & Electronics',
    items: [
      { id: 't1', name: 'Flashlight (with extra batteries)', checked: false },
      { id: 't2', name: 'Battery-powered or hand-crank radio', checked: false },
      { id: 't3', name: 'Power banks (fully charged) & charging cables', checked: false },
      { id: 't4', name: 'Multi-tool or pocket knife', checked: false },
      { id: 't5', name: 'Whistle (to signal for help)', checked: false },
    ]
  },
  {
    title: 'Documents & Money',
    items: [
      { id: 'd1', name: 'Important documents in a waterproof bag (IDs, insurance)', checked: false },
      { id: 'd2', name: 'Cash (in small bills)', checked: false },
      { id: 'd3', name: 'Emergency contact list (physical copy)', checked: false },
    ]
  }
];

export default function EmergencyKitPage() {
  const [categories, setCategories] = useState(KIT_CATEGORIES);

  const toggleItem = (categoryIndex: number, itemId: string) => {
    const newCategories = [...categories];
    const item = newCategories[categoryIndex].items.find(i => i.id === itemId);
    if (item) {
      item.checked = !item.checked;
      setCategories(newCategories);
    }
  };

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = categories.reduce((acc, cat) => acc + cat.items.filter(i => i.checked).length, 0);
  const progress = Math.round((checkedItems / totalItems) * 100);

  return (
    <div className="h-full flex flex-col p-4 max-w-6xl mx-auto text-slate-100 min-h-0 overflow-hidden space-y-3">
      {/* Top Header & Readiness Bar Combined */}
      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-md backdrop-blur-md shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] mb-0.5">
            <Link href="/emergency" className="text-slate-400 hover:text-blue-400 transition-colors">Emergency Guides</Link>
            <span className="text-slate-600">/</span>
            <span className="font-semibold text-purple-400">72-Hour Kit</span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight leading-none">72-Hour Emergency Kit</h1>
        </div>

        <div className="flex items-center gap-4 sm:w-80 shrink-0">
          <div className="flex-1">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-400 font-medium">Readiness</span>
              <span className="font-mono text-purple-400 font-bold">{checkedItems}/{totalItems} ({progress}%)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2x2 Grid of Categories - Minimized to fit container */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories.map((category, catIdx) => (
          <div key={category.title} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 shadow-sm flex flex-col min-h-0">
            <h3 className="font-bold text-xs text-purple-300 border-b border-slate-800 pb-1.5 mb-2 uppercase tracking-wider shrink-0">
              {category.title}
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
              {category.items.map(item => (
                <label key={item.id} className="flex items-center gap-2.5 cursor-pointer group hover:bg-slate-800/40 p-1.5 rounded-lg transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-0 cursor-pointer shrink-0"
                    checked={item.checked}
                    onChange={() => toggleItem(catIdx, item.id)}
                  />
                  <span className={`text-xs transition-colors ${item.checked ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-white'}`}>
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Compact Maintenance Tip Footer */}
      <div className="bg-amber-950/30 border border-amber-800/40 px-3.5 py-2 rounded-lg backdrop-blur-md shrink-0 flex items-center gap-2 text-[11px] text-amber-200/80">
        <span className="font-bold text-amber-400 shrink-0">Tip:</span>
        <span className="truncate">Review & replace expired food/water every 6 months. Keep Go-Bag near your exit door.</span>
      </div>
    </div>
  );
}
