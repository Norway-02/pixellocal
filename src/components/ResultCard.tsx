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
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 my-6 shadow-xs space-y-5">
      {/* Success Badge & File Name */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
            ✓
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
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
            {downloadUrl && (
              <img
                src={downloadUrl}
                alt="Converted preview"
                className="w-full h-full object-cover"
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
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Original</span>
                <span className="font-semibold text-slate-700">{formatKbMb(originalSize)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Processed</span>
                <span className="font-bold text-blue-600">{formatKbMb(resultSize)}</span>
              </div>
              {typeof savingsPercentage === 'number' && savingsPercentage > 0 && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Saved</span>
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
            className="btn-primary shrink-0"
          >
            Download {targetFormat.toUpperCase()}
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
