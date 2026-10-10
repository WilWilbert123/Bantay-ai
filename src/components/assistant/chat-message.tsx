import { ReactNode } from 'react';

interface ChatMessageProps {
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string | ReactNode;
  timestamp?: string;
  isError?: boolean;
}

export function ChatMessage({ role, content, timestamp, isError = false }: ChatMessageProps) {
  const isUser = role === 'USER';
  const isSystem = role === 'SYSTEM';

  if (isSystem) {
    return (
      <div className="flex justify-center my-6">
        <div className="bg-slate-900/80 border border-slate-800 text-slate-400 text-xs py-1.5 px-4 rounded-full font-medium tracking-wide shadow-sm">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full my-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse max-w-[85%] sm:max-w-[75%]' : 'flex-row max-w-[92%] sm:max-w-[85%]'}`}>
        
        {/* Avatar */}
        <div className="flex-shrink-0 mt-0.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
            isUser 
              ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400' 
              : isError 
                ? 'bg-red-500/20 border border-red-500/30 text-red-400' 
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
          }`}>
            {isUser ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M11.983 1.907a.75.75 0 0 0-1.292-.656l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.656l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z" />
              </svg>
            )}
          </div>
        </div>

        {/* Message Bubble Container */}
        <div className={`flex flex-col gap-1 min-w-0 ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`flex items-center gap-2 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-[11px] font-bold text-slate-400 tracking-wide">
              {isUser ? 'YOU' : 'BANTAY AI LOCAL'}
            </span>
            {timestamp && <span className="text-[10px] text-slate-500 font-mono">{timestamp}</span>}
          </div>
          
          <div className={`px-4.5 py-3 rounded-2xl text-[14.5px] leading-relaxed shadow-sm ${
            isUser 
              ? 'bg-blue-600 text-white rounded-tr-xs shadow-[0_2px_12px_rgba(37,99,235,0.25)] max-w-full break-words' 
              : isError 
                ? 'bg-red-950/40 text-red-200 border border-red-900/50 rounded-tl-xs w-full'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs w-full'
          }`}>
            <div className="whitespace-pre-wrap break-words">
              {content}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
