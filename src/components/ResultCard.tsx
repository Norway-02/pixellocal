'use client';

import React, { useEffect, useState } from 'react';
import { sanitizeFilename } from '../lib/engine/fileValidator';

export interface ResultCardProps {
  blob: Blob;
  originalName: string;
  originalSize: number;
  resultSize: number;
  targetFormat: string;
  width?: number;
  height?: number;
  savingsPercentage?: number;
  statusLabel?: 'Target reached' | 'Best effort';
  onReset?: () => void;
}

export default function ResultCard({
  blob,
  originalName,
  originalSize,
  resultSize,
  targetFormat,
  width,
  height,
  savingsPercentage,
  statusLabel,
  onReset,
}: ResultCardProps) {
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  useEffect(() => {
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [blob]);

  const formatKbMb = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
  const sanitizedOutName = `${sanitizeFilename(baseName)}.${targetFormat}`;

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 my-6 shadow-sm space-y-5 animate-result-reveal">
      {/* Success Badge & File Name */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shadow-2xs">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="font-bold text-slate-900 text-sm">
            Conversion complete
          </span>
        </div>

        {statusLabel && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
              statusLabel === 'Target reached'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {statusLabel}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-slate-200 shadow-2xs">
            {downloadUrl && (
              <img
                src={downloadUrl}
                alt="Converted preview"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>

          <div className="space-y-1 overflow-hidden">
            <h4 className="font-bold text-slate-900 text-sm truncate max-w-[200px] sm:max-w-xs">
              {sanitizedOutName}
            </h4>

            {width && height && (
              <p className="text-xs text-slate-400">
                {width} &times; {height} px
              </p>
            )}

            <div className="flex items-center space-x-4 pt-1 text-xs">
              <div className="bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                <span className="text-slate-400 block text-[9px] uppercase font-semibold">Original</span>
                <span className="font-semibold text-slate-700">{formatKbMb(originalSize)}</span>
              </div>
              <div className="bg-blue-50/70 px-2 py-1 rounded-md border border-blue-100/70">
                <span className="text-blue-500 block text-[9px] uppercase font-semibold">Processed</span>
                <span className="font-bold text-blue-600">{formatKbMb(resultSize)}</span>
              </div>
              {typeof savingsPercentage === 'number' && savingsPercentage > 0 && (
                <div className="bg-emerald-50/70 px-2 py-1 rounded-md border border-emerald-100/70">
                  <span className="text-emerald-500 block text-[9px] uppercase font-semibold">Saved</span>
                  <span className="font-extrabold text-emerald-600">{savingsPercentage}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <a
            href={downloadUrl}
            download={sanitizedOutName}
            className="btn-primary shrink-0 group"
          >
            <span>Download {targetFormat.toUpperCase()}</span>
            <svg className="w-4 h-4 ml-1.5 group-hover:translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="btn-secondary shrink-0"
            >
              Process another image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
