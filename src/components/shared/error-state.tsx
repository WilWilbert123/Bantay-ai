import React from 'react';

export function ErrorState({ title = 'Something went wrong', message, onRetry }: { title?: string, message: string, onRetry?: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center space-y-3 w-full max-w-lg mx-auto shadow-sm">
      <svg className="w-10 h-10 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3 className="font-bold text-red-800 text-lg">{title}</h3>
      <p className="text-sm text-red-600 font-medium">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="mt-4 px-6 py-2 bg-white border border-red-200 hover:bg-red-100 text-red-700 rounded-lg text-sm font-bold transition-colors shadow-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
