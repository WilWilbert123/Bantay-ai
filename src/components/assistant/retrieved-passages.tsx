'use client';

import { useState } from 'react';

interface Passage {
  id: string;
  documentTitle: string;
  content: string;
  similarity: number;
}

interface RetrievedPassagesProps {
  passages: Passage[];
  isLoading?: boolean;
}

export function RetrievedPassages({ passages, isLoading = false }: RetrievedPassagesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 animate-pulse space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-16 bg-slate-200 rounded-lg w-full"></div>
          <div className="h-16 bg-slate-200 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (!passages || passages.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
            <path d="M10 2a.75.75 0 0 1 .75.75v5.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 1 1 1.1-1.02l1.95 2.1V2.75A.75.75 0 0 1 10 2Z" />
            <path d="M5.273 4.5a1.25 1.25 0 0 0-1.205.918l-1.523 5.52c-.006.024-.01.048-.014.074A2.25 2.25 0 0 0 3 13.5h14a2.25 2.25 0 0 0 .469-2.488c-.004-.026-.008-.05-.014-.074l-1.523-5.52a1.25 1.25 0 0 0-1.205-.918h-.977a.75.75 0 0 1 0 1.5h.977a.25.25 0 0 1 .241.184l1.411 5.118a.75.75 0 0 1-.727.95H3.25a.75.75 0 0 1-.727-.95l1.411-5.118a.25.25 0 0 1 .241-.184h.977a.75.75 0 0 1 0-1.5h-.977Z" />
          </svg>
          <h3 className="font-bold text-sm text-slate-800">Local Knowledge Context</h3>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
          {passages.length} passages
        </span>
      </div>
      
      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
        {passages.map((passage) => {
          const isExpanded = expandedId === passage.id;
          return (
            <div key={passage.id} className="p-3 hover:bg-slate-50 transition-colors">
              <div 
                className="flex justify-between items-start cursor-pointer group"
                onClick={() => setExpandedId(isExpanded ? null : passage.id)}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-xs font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                    {passage.documentTitle}
                  </h4>
                  {!isExpanded && (
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-mono">
                      {passage.content}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                    {Math.round(passage.similarity * 100)}% Match
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className={`w-4 h-4 text-slate-400 transition-transform \${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {isExpanded && (
                <div className="mt-2 text-xs text-slate-700 bg-blue-50/50 p-2 rounded border border-blue-100 font-mono leading-relaxed">
                  {passage.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
