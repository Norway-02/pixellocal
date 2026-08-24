'use client';

import React from 'react';

export interface ResizeSettingsProps {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  scalePercentage: number;
  usePercentage: boolean;
  onWidthChange: (w: number) => void;
  onHeightChange: (h: number) => void;
  onMaintainAspectRatioChange: (m: boolean) => void;
  onScalePercentageChange: (p: number) => void;
  onUsePercentageChange: (u: boolean) => void;
}

export default function ResizeSettings({
  width,
  height,
  maintainAspectRatio,
  scalePercentage,
  usePercentage,
  onWidthChange,
  onHeightChange,
  onMaintainAspectRatioChange,
  onScalePercentageChange,
  onUsePercentageChange,
}: ResizeSettingsProps) {
  return (
    <div className="card-base my-4 space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Dimensions
        </h4>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => onUsePercentageChange(false)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              !usePercentage ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            Pixels
          </button>
          <button
            type="button"
            onClick={() => onUsePercentageChange(true)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              usePercentage ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            Percentage
          </button>
        </div>
      </div>

      {!usePercentage ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="resize-width" className="block text-xs font-semibold text-slate-700 mb-1">
                Width (px)
              </label>
              <input
                id="resize-width"
                type="number"
                min="1"
                max="10000"
                value={width || ''}
                onChange={(e) => onWidthChange(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label htmlFor="resize-height" className="block text-xs font-semibold text-slate-700 mb-1">
                Height (px)
              </label>
              <input
                id="resize-height"
                type="number"
                min="1"
                max="10000"
                value={height || ''}
                disabled={maintainAspectRatio}
                onChange={(e) => onHeightChange(parseInt(e.target.value, 10) || 0)}
                className={`w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white ${
                  maintainAspectRatio ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
          <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={maintainAspectRatio}
              onChange={(e) => onMaintainAspectRatioChange(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span>Maintain aspect ratio</span>
          </label>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="resize-scale-percentage" className="text-xs font-semibold text-slate-700">
              Scale Percentage
            </label>
            <span className="text-xs font-bold text-blue-600">
              {scalePercentage}%
            </span>
          </div>
          <input
            id="resize-scale-percentage"
            type="range"
            min="10"
            max="200"
            step="5"
            value={scalePercentage}
            onChange={(e) => onScalePercentageChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      )}
    </div>
  );
}
