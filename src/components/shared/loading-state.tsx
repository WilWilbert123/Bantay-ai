export function LoadingState({ message = 'Loading...', fullScreen = false }: { message?: string, fullScreen?: boolean }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium animate-pulse">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
