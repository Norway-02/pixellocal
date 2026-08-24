'use client';

import React from 'react';

export interface CompressionSettingsProps {
  targetSizeBytes?: number;
  quality: number;
  onQualityChange: (quality: number) => void;
  targetSizeLabel?: string;
}

export default function CompressionSettings({
  targetSizeBytes,
  quality,
  onQualityChange,
  targetSizeLabel,
}: CompressionSettingsProps) {
  return (
    <div className="card-base my-4 space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Compression Settings
        </h4>
      </div>

      {targetSizeBytes && targetSizeLabel ? (
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
          Target Goal: <strong className="text-blue-600 font-bold">&le; {targetSizeLabel}</strong>
          <p className="text-xs text-slate-500 mt-1">
            PixelLocal uses iterative compression to shrink your file to under {targetSizeLabel} while retaining optimal visual sharpness.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="comp-quality-slider" className="text-xs font-semibold text-slate-700">
              Compression Intensity
            </label>
            <span className="text-xs font-bold text-blue-600">
              {Math.round(quality * 100)}%
            </span>
          </div>
          <input
            id="comp-quality-slider"
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={quality}
            onChange={(e) => onQualityChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      )}
    </div>
  );
}
