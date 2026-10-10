interface Citation {
  id: string;
  source: string;
  title: string;
  relevance: number;
}

interface SourceCitationsProps {
  citations: Citation[];
}

export function SourceCitations({ citations }: SourceCitationsProps) {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="mt-4 pt-3 border-t border-slate-100">
      <p className="text-xs font-semibold text-slate-500 mb-2">Sources Referenced (Offline DB):</p>
      <div className="flex flex-wrap gap-2">
        {citations.map((cite, index) => (
          <div key={cite.id} className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 transition-colors cursor-help" title={`Relevance: \${Math.round(cite.relevance * 100)}%`}>
            <span className="bg-slate-300 text-slate-700 rounded-sm px-1 font-mono text-[10px] leading-tight">
              [{index + 1}]
            </span>
            <span className="font-medium truncate max-w-[150px]">{cite.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
