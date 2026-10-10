'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AskBantayAI() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handlePromptClick = (promptText: string) => {
    router.push(`/assistant?q=${encodeURIComponent(promptText)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/assistant?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="bg-slate-900 shrink-0 rounded-2xl p-4 shadow-sm border border-slate-800">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="font-bold text-white text-sm">Ask BANTAY AI</h2>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {[
          "What should I do before a typhoon?",
          "Where are the nearest evacuation centers?",
          "Show me the emergency checklist."
        ].map((promptText, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePromptClick(promptText)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-[11px] font-medium text-slate-300 hover:bg-slate-800 hover:border-slate-500 hover:text-white transition-all shadow-sm cursor-pointer text-left"
          >
            {promptText}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-12 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm text-white placeholder:text-slate-400" 
          placeholder="Type your question..."
        />
        <div className="absolute inset-y-0 right-1.5 flex items-center">
          <button 
            type="submit"
            className="p-1.5 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
            aria-label="Send question"
          >
            <svg className="h-3.5 w-3.5 text-white transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
