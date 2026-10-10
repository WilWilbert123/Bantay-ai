'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../../../components/assistant/chat-message';
import { ChatInput } from '../../../components/assistant/chat-input';
import { ModelStatus } from '../../../components/assistant/model-status';
import { SourceCitations } from '../../../components/assistant/source-citations';
import MapWrapper from '../../../components/map/map-wrapper';
import Link from 'next/link';

type Message = {
  id: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  timestamp: string;
  citations?: Array<{ id: string, source: string, title: string, relevance: number }>;
  hasMap?: boolean;
  mapAlerts?: any[];
  mapFacilities?: any[];
  suggestedQuestions?: string[];
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    let loadedMessages: Message[] = [];
    const saved = localStorage.getItem('bantay_ai_chat_history');
    if (saved) {
      try {
        loadedMessages = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    }

    if (loadedMessages.length === 0) {
      loadedMessages = [
        {
          id: '1',
          role: 'SYSTEM',
          content: 'Local AI initialized. Offline knowledge base loaded.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: '2',
          role: 'ASSISTANT',
          content: 'Hello. I am your offline emergency assistant. I have access to your local hazard maps, emergency protocols, and current sensor readings. How can I help you prepare or respond today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedQuestions: [
            "Ano ang paparating ngayon na bagyo?",
            "Saan ang pinakamalapit na evacuation centers?",
            "Ipakita ang emergency checklist."
          ]
        }
      ];
    }

    setMessages(loadedMessages);
    setIsInitializing(false);
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (!isInitializing && messages.length > 0) {
      localStorage.setItem('bantay_ai_chat_history', JSON.stringify(messages));
    }
  }, [messages, isInitializing]);

  const initialQueryHandled = useRef(false);

  useEffect(() => {
    if (!isInitializing && !initialQueryHandled.current) {
      initialQueryHandled.current = true;
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get('q');
      if (queryParam) {
        window.history.replaceState({}, '', window.location.pathname);
        handleSendMessage(queryParam);
      }
    }
  }, [isInitializing]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSendMessage = async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'USER',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'API Error');
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ASSISTANT',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations,
        hasMap: data.hasMap,
        mapAlerts: data.mapAlerts,
        mapFacilities: data.mapFacilities,
        suggestedQuestions: data.suggestedQuestions
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ASSISTANT',
        content: 'There was an error communicating with the local AI. Please ensure the local AI service is running.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 sm:rounded-2xl shadow-2xl border border-slate-800 overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-slate-800/80 bg-slate-950/50 backdrop-blur-md shrink-0">
        <div className="mb-4 sm:mb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Bantay AI</h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">LOCAL INFERENCE</p>
            </div>
          </div>
        </div>

        {/* We will replace the original ModelStatus component with an inline customized dark version for perfect integration */}
        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear the conversation history?')) {
                localStorage.removeItem('bantay_ai_chat_history');
                setMessages([
                  {
                    id: Date.now().toString(),
                    role: 'SYSTEM',
                    content: 'Conversation history cleared.',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]);
              }
            }}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors"
          >
            CLEAR CHAT
          </button>


        </div>
      </div>

      {/* Chat History */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-4 custom-scrollbar">
        {isInitializing ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {messages.map(msg => (
              <div key={msg.id}>
                <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
                {msg.role === 'ASSISTANT' && msg.citations && (
                  <div className="ml-12 pl-4 mt-2 border-l-2 border-slate-800">
                    <SourceCitations citations={msg.citations} />
                  </div>
                )}
                {msg.role === 'ASSISTANT' && msg.hasMap && (
                  <div className="ml-12 mt-3 bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-xl space-y-2.5">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Interactive Map Preview</h4>
                      </div>
                      <Link href="/map" className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold hover:underline">
                        Open Full Map &rarr;
                      </Link>
                    </div>
                    <div className="w-full h-[360px] sm:h-[420px] rounded-xl overflow-hidden border border-slate-800 relative z-0">
                      <MapWrapper alerts={msg.mapAlerts || []} facilities={msg.mapFacilities || []} />
                    </div>
                  </div>
                )}
                {msg.role === 'ASSISTANT' && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="ml-12 pl-4 mt-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Mga Iminumungkahing Susunod na Tanong:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.suggestedQuestions.map((qText, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(qText)}
                          disabled={isGenerating}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-xl text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <span className="text-blue-400 font-bold">↳</span>
                          {qText}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isGenerating && (
              <div className="flex items-center gap-3 text-blue-400 text-sm py-4 ml-12 font-medium">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating secure local response...
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-4 sm:p-6 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md shrink-0">
        <ChatInput
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
        />

      </div>
    </div>
  );
}
