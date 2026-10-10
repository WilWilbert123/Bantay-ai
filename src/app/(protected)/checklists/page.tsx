'use client';

import { useState, useEffect } from 'react';

const CHECKLIST_CATEGORIES = [
  {
    id: 'typhoon',
    title: 'Typhoon & Flood',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    items: [
      { id: 't1', text: 'Evacuation plan discussed with family', critical: true },
      { id: 't2', text: 'Important documents sealed in waterproof bags', critical: true },
      { id: 't3', text: '3-day supply of non-perishable food', critical: true },
      { id: 't4', text: 'Clean drinking water (1 gallon per person per day)', critical: true },
      { id: 't5', text: 'Flashlights and extra batteries', critical: true },
      { id: 't6', text: 'Fully charged power banks', critical: false },
      { id: 't7', text: 'First aid kit and maintenance medicines', critical: true },
    ]
  },
  {
    id: 'earthquake',
    title: 'Earthquake Preparedness',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    items: [
      { id: 'e1', text: 'Heavy furniture secured to walls', critical: false },
      { id: 'e2', text: '"Go-Bag" placed near the exit', critical: true },
      { id: 'e3', text: 'Sturdy shoes under the bed', critical: false },
      { id: 'e4', text: 'Whistle to signal for help', critical: true },
      { id: 'e5', text: 'Dust masks or cotton t-shirts', critical: false },
    ]
  }
];

export default function ChecklistsPage() {
  const [activeTab, setActiveTab] = useState('typhoon');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('bantay_checklist');
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse checklist data');
      }
    }
  }, []);

  const activeCategory = CHECKLIST_CATEGORIES.find(c => c.id === activeTab)!;
  
  const toggleItem = (id: string) => {
    setCheckedItems(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('bantay_checklist', JSON.stringify(next));
      return next;
    });
  };

  const totalItems = activeCategory.items.length;
  const completedItems = activeCategory.items.filter(item => checkedItems[item.id]).length;
  const progress = Math.round((completedItems / totalItems) * 100) || 0;

  return (
    <div className="h-full flex flex-col p-4 md:p-6 max-w-5xl mx-auto gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Emergency Checklists</h1>
          <p className="text-slate-400 mt-1">Interactive offline preparation tracking.</p>
        </div>
        <div className="px-4 py-2 bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Saved Locally
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 pb-2 min-h-0">
        {/* Categories Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2 min-h-0">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Categories</h3>
          {CHECKLIST_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-colors font-medium border ${
                activeTab === category.id 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-900/50 hover:border-slate-300 shadow-sm'
              }`}
            >
              {category.icon}
              {category.title}
            </button>
          ))}
          
          {/* Overall Status Card */}
          <div className="mt-6 bg-emerald-900/20 border border-emerald-900/50 rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-emerald-100 text-sm">Family Preparedness</h4>
            <p className="text-xs text-emerald-300 mt-1 leading-relaxed">Regularly review these lists with your family to ensure everyone is ready.</p>
          </div>
        </div>

        {/* Checklist Content */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm p-4 md:p-6 flex flex-col min-h-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800 shrink-0">
            <div>
              <h2 className="text-xl font-bold text-white">{activeCategory.title}</h2>
              <p className="text-sm text-slate-400 mt-1">Mark items as you secure them.</p>
            </div>
            <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800">
              <div className="text-right">
                <span className="text-2xl font-black text-blue-400">{progress}%</span>
                <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">Ready</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                <svg className="w-full h-full absolute -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-blue-400 transition-all duration-500 ease-out"
                    strokeDasharray={`${progress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar min-h-0">
            {activeCategory.items.map((item) => {
              const isChecked = checkedItems[item.id] || false;
              return (
                <label 
                  key={item.id} 
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isChecked 
                      ? 'bg-blue-900/20/40 border-blue-800 shadow-inner' 
                      : 'bg-slate-900 border-slate-800 hover:border-blue-700 hover:shadow-sm'
                  }`}
                >
                  <div className="mt-0.5 relative shrink-0">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={mounted ? isChecked : false}
                      onChange={() => toggleItem(item.id)}
                    />
                    <div className="w-6 h-6 rounded-md border-2 border-slate-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center">
                      {mounted && isChecked && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className={`text-[15px] font-medium transition-colors ${mounted && isChecked ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                      {item.text}
                    </p>
                    {item.critical && (!mounted || !isChecked) && (
                      <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-950/40 px-2.5 py-0.5 rounded-md border border-red-900/50">
                        Critical Item
                      </span>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
