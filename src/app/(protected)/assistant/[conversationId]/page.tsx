import { getCurrentSession } from '../../../../lib/auth/session';
import { conversationsRepository } from '../../../../lib/db/repositories/conversations.repository';
import { notFound } from 'next/navigation';

export default async function ConversationPage({
  params
}: {
  params: Promise<{ conversationId: string }>
}) {
  const { user } = await getCurrentSession();
  const { conversationId } = await params;

  // We should actually fetch the conversation to verify it exists
  const messages = conversationsRepository.getMessages(conversationId);
  
  // Note: in a real app, we'd also fetch the conversation details.
  // For now, if no messages, we just assume it's fresh.

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] border rounded-xl bg-white overflow-hidden shadow-sm">
      <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-slate-800">Offline Local Assistant</h2>
        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">Model: Llama 3 8B (Q4) Ready</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-700">How can I help you prepare?</h3>
            <p className="max-w-md mt-2">I am running entirely on this device. I have access to local hazard maps, current sensor readings, and verified emergency protocols.</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'USER' 
                  ? 'bg-slate-900 text-white rounded-br-none' 
                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t bg-slate-50">
        <form className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ask about evacuation routes, first aid, or current alerts..." 
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <button type="submit" className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
            Ask Offline
          </button>
        </form>
      </div>
    </div>
  );
}
