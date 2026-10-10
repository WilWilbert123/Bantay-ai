import React from 'react';

export function AlertBanner({ message = 'System operates locally.' }) {
  return (
    <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm font-medium">
      {message}
    </div>
  );
}