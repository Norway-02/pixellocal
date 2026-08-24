import React from 'react';

export default function PrivacyNotice() {
  return (
    <div className="inline-flex items-center space-x-2 bg-slate-100/90 hover:bg-slate-100 border border-slate-200/90 rounded-lg px-3 py-1.5 text-xs text-slate-700 my-2 transition-all duration-200 shadow-2xs">
      <span className="text-slate-500 font-medium">🔒</span>
      <span className="font-semibold text-slate-900">Processed locally in your browser</span>
      <span className="hidden sm:inline text-slate-300">&bull;</span>
      <span className="hidden sm:inline text-slate-500">Your image isn&apos;t uploaded to PixelLocal for normal processing.</span>
    </div>
  );
}
