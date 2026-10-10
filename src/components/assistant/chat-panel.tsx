import { ReactNode } from 'react';

interface ChatPanelProps {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
}

export function ChatPanel({ children, header, sidebar }: ChatPanelProps) {
  return (
    <div className="flex w-full h-[calc(100vh-80px)] max-h-[800px] bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        {header && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
            {header}
          </div>
        )}
        
        {/* We use pt-16 if there's a header, but since we are wrapping the page contents, 
            the actual padding/scrolling will be handled by the child container. 
            This wrapper just establishes the layout. */}
        <div className="flex-1 flex flex-col relative w-full h-full">
          {children}
        </div>
      </div>

      {/* Optional Context Sidebar (e.g. for retrieved passages or map preview) */}
      {sidebar && (
        <div className="w-80 hidden lg:block bg-slate-50 border-l border-slate-200 overflow-y-auto p-4">
          {sidebar}
        </div>
      )}
    </div>
  );
}
