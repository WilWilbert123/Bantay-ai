"use client";

import { useState } from "react";

export function IssueAlertButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    // Simulate network delay for offline mesh
    setTimeout(() => {
      setIsBroadcasting(false);
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 1500);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
        </svg>
        Issue New Alert
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                Issue Emergency Broadcast
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors" disabled={isBroadcasting}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {success ? (
              <div className="p-8 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-green-900/30 text-green-400 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Broadcast Successful</h3>
                <p className="text-slate-400 text-center text-sm">The alert has been successfully transmitted across the local mesh network.</p>
              </div>
            ) : (
              <>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Severity Level</label>
                    <select className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-sm transition-shadow">
                      <option value="CRITICAL">CRITICAL (Immediate Action Required)</option>
                      <option value="WARNING">WARNING (Prepare for Action)</option>
                      <option value="ADVISORY">ADVISORY (Information Only)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Alert Title</label>
                    <input type="text" placeholder="e.g. Flash Flood Warning" className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-sm transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Detailed Description & Instructions</label>
                    <textarea rows={4} placeholder="Describe the emergency and required actions clearly..." className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-sm resize-none custom-scrollbar transition-shadow"></textarea>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                    disabled={isBroadcasting}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleBroadcast} 
                    disabled={isBroadcasting}
                    className="px-5 py-2 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBroadcasting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                        </svg>
                        Broadcast Now
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function AlertActionButtons({ alertId }: { alertId: string }) {
  const [isResolving, setIsResolving] = useState(false);
  const [resolved, setResolved] = useState(false);

  const handleResolve = () => {
    setIsResolving(true);
    setTimeout(() => {
      setIsResolving(false);
      setResolved(true);
    }, 600);
  };

  if (resolved) {
    return (
      <span className="text-emerald-400 font-bold text-xs flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-emerald-400">
          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
        </svg>
        Incident Resolved
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <button 
        onClick={() => {
          window.alert('Edit Broadcast feature is active for local LGU advisories.');
        }}
        className="text-xs text-slate-400 hover:text-blue-400 font-medium px-2 py-1 transition-colors rounded hover:bg-slate-800"
      >
        Edit Broadcast
      </button>
      <button 
        onClick={handleResolve}
        disabled={isResolving}
        className="bg-emerald-900/40 border border-emerald-800/60 text-emerald-400 hover:bg-emerald-800/50 hover:text-white text-xs font-bold px-3 py-1 rounded-lg transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
      >
        {isResolving ? (
          <>
            <div className="w-3 h-3 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin"></div>
            Resolving...
          </>
        ) : (
          "Resolve Incident"
        )}
      </button>
    </div>
  );
}
