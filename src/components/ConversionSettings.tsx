'use client';

import React from 'react';

export interface ConversionSettingsProps {
  outputFormat: 'jpg' | 'png' | 'webp' | 'avif';
  quality: number;
  onQualityChange: (quality: number) => void;
  onFormatChange?: (format: 'jpg' | 'png' | 'webp' | 'avif') => void;
  showFormatSelector?: boolean;
}

export default function ConversionSettings({
  outputFormat,
  quality,
  onQualityChange,
  onFormatChange,
  showFormatSelector = false,
}: ConversionSettingsProps) {
  const isLossy = outputFormat !== 'png';

  return (
    <div className="card-base my-4 space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Conversion Settings
        </h4>
        <span className="text-xs font-semibold text-slate-500 uppercase">
          Target: .{outputFormat}
        </span>
      </div>

      {showFormatSelector && onFormatChange && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Output Format
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['jpg', 'png', 'webp', 'avif'] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => onFormatChange(fmt)}
                className={`py-2 px-3 text-xs font-bold uppercase rounded-lg border transition-all ${
                  outputFormat === fmt
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                .{fmt}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLossy ? (
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="quality-slider" className="text-xs font-semibold text-slate-700">
              Quality
            </label>
            <span className="text-xs font-bold text-blue-600">
              {Math.round(quality * 100)}%
            </span>
          </div>
          <input
            id="quality-slider"
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={quality}
            onChange={(e) => onQualityChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic">
          PNG uses lossless compression (quality is automatically preserved).
        </p>
      )}

      {outputFormat === 'jpg' && (
        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
          JPEG does not support transparency; transparent areas are flattened onto a white background.
        </div>
      )}
    </div>
  );
}
