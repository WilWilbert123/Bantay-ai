import React from 'react';

export function EmptyState({ 
  title, 
  description, 
  icon, 
  action 
}: { 
  title: string, 
  description: string, 
  icon?: React.ReactNode, 
  action?: React.ReactNode 
}) {
  return (
    <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4 w-full">
      {icon && <div className="text-slate-400 mb-2">{icon}</div>}
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
