'use client';

import React from 'react';

export interface ProgressIndicatorProps {
  progress: number; // 0 to 100
  statusText?: string;
  onCancel?: () => void;
}

export default function ProgressIndicator({
  progress,
  statusText = 'Processing file locally...',
  onCancel,
}: ProgressIndicatorProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 my-4 space-y-3 shadow-sm">
      <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
        <span>{statusText}</span>
        <span className="font-bold text-brand-600 dark:text-brand-400">{Math.round(progress)}%</span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-600 to-accent-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      {onCancel && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Cancel Processing
          </button>
        </div>
      )}
    </div>
  );
}
