export function ModelStatus({ status = 'LOADING' }: { status?: 'READY' | 'LOADING' | 'DOWNLOADING' | 'ERROR' | 'OFFLINE' }) {
  const statusConfig = {
    READY: { color: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700', label: 'Local Model Ready' },
    LOADING: { color: 'bg-yellow-500 animate-pulse', bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Waking up Ollama...' },
    DOWNLOADING: { color: 'bg-blue-500 animate-pulse', bg: 'bg-blue-50', text: 'text-blue-700', label: 'Downloading Weights...' },
    ERROR: { color: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700', label: 'Model Engine Error' },
    OFFLINE: { color: 'bg-slate-400', bg: 'bg-slate-50', text: 'text-slate-600', label: 'System Offline' }
  };

  const config = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 \${config.bg}`}>
      <div className={`w-2 h-2 rounded-full \${config.color}`}></div>
      <span className={`text-xs font-semibold \${config.text}`}>{config.label}</span>
    </div>
  );
}
