'use client';

import React from 'react';

export interface ProgressIndicatorProps {
  progress: number; // 0 to 100
  statusText?: string;
  onCancel?: () => void;
}

export default function ProgressIndicator({
  progress,
  statusText = 'Processing image locally...',
  onCancel,
}: ProgressIndicatorProps) {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-5 my-4 space-y-3 shadow-xs animate-result-reveal">
      <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>{statusText}</span>
        </span>
        <span className="font-bold text-blue-600">{Math.round(progress)}%</span>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-accent rounded-full transition-all duration-300 ease-out-custom"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      {onCancel && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Cancel Processing
          </button>
        </div>
      )}
    </div>
  );
}
