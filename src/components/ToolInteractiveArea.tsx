'use client';

import React, { useState, useEffect } from 'react';
import { ToolConfig } from '../lib/toolsConfig';
import { detectBrowserCapabilities, BrowserCapabilities } from '../lib/engine/browserCapabilities';
import { compressImage } from '../lib/engine/imageCompressor';
import { resizeImage } from '../lib/engine/imageResizer';
import { processImageWithWorker } from '../workers/workerClient';
import { track } from '../lib/analytics';
import FileDropzone from './FileDropzone';
import ConversionSettings from './ConversionSettings';
import CompressionSettings from './CompressionSettings';
import ResizeSettings from './ResizeSettings';
import ProgressIndicator from './ProgressIndicator';
import ResultCard from './ResultCard';
import BatchProcessorView from './BatchProcessorView';

export default function ToolInteractiveArea({ tool }: { tool: ToolConfig }) {
  const [capabilities, setCapabilities] = useState<BrowserCapabilities | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Conversion / Compression / Resize options state
  const [quality, setQuality] = useState(0.85);
  const [targetFormat, setTargetFormat] = useState<'jpg' | 'png' | 'webp' | 'avif'>(
    (tool.outputFormat as any) || 'jpg'
  );

  // Resize specific state
  const [width, setWidth] = useState<number>(1080);
  const [height, setHeight] = useState<number>(1080);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [scalePercentage, setScalePercentage] = useState(50);
  const [usePercentage, setUsePercentage] = useState(false);
  const [originalAspect, setOriginalAspect] = useState(1);

  // Result state
  const [result, setResult] = useState<{
    blob: Blob;
    width?: number;
    height?: number;
    originalSize: number;
    resultSize: number;
    savingsPercentage?: number;
    statusLabel?: 'Target reached' | 'Best effort';
  } | null>(null);

  useEffect(() => {
    detectBrowserCapabilities().then(setCapabilities);
  }, []);

  if (tool.type === 'batch') {
    return <BatchProcessorView />;
  }

  const handleFilesSelected = (files: File[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setSelectedFile(file);
    setErrorMsg(null);
    setResult(null);

    // Inspect image for resize dimensions baseline
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      setWidth(img.width);
      setHeight(img.height);
      if (img.height > 0) setOriginalAspect(img.width / img.height);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;

    track('file_selected', { tool: tool.slug, inputFormat: tool.inputFormats[0] });
  };

  const handleWidthChange = (w: number) => {
    setWidth(w);
    if (maintainAspectRatio && originalAspect > 0) {
      setHeight(Math.round(w / originalAspect));
    }
  };

  const handleHeightChange = (h: number) => {
    setHeight(h);
    if (maintainAspectRatio && originalAspect > 0) {
      setWidth(Math.round(h * originalAspect));
    }
  };

  const runProcessing = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(20);
    setErrorMsg(null);
    const startTime = Date.now();

    track('conversion_started', { tool: tool.slug });

    try {
      if (tool.type === 'conversion') {
        setProgress(50);
        const res = await processImageWithWorker(selectedFile, {
          targetFormat: (tool.outputFormat as any) || targetFormat,
          quality,
        });
        setProgress(100);
        setResult({
          blob: res.blob,
          width: res.width,
          height: res.height,
          originalSize: res.originalSize,
          resultSize: res.convertedSize,
        });
      } else if (tool.type === 'compression') {
        setProgress(40);
        const res = await compressImage(selectedFile, {
          targetSizeBytes: tool.targetSizeBytes,
          quality,
          targetFormat: 'jpg',
        });
        setProgress(100);
        setResult({
          blob: res.blob,
          width: res.width,
          height: res.height,
          originalSize: res.originalSize,
          resultSize: res.compressedSize,
          savingsPercentage: res.savingsPercentage,
          statusLabel: res.statusLabel,
        });
      } else if (tool.type === 'resize') {
        setProgress(50);
        const res = await resizeImage(selectedFile, {
          width,
          height,
          maintainAspectRatio,
          scalePercentage: usePercentage ? scalePercentage : undefined,
          targetFormat: 'jpg',
          quality,
        });
        setProgress(100);
        setResult({
          blob: res.blob,
          width: res.newWidth,
          height: res.newHeight,
          originalSize: res.originalSize,
          resultSize: res.newSize,
        });
      }

      const durationMs = Date.now() - startTime;
      const durationBucket = durationMs < 1000 ? '<1s' : durationMs < 3000 ? '1-3s' : durationMs < 10000 ? '3-10s' : '>10s';

      track('conversion_completed', {
        tool: tool.slug,
        success: true,
        durationBucket,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Processing failed. The file may be corrupted.';
      setErrorMsg(msg);
      track('conversion_failed', { tool: tool.slug, success: false });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
    setErrorMsg(null);
    setProgress(0);
  };

  const formatWarning =
    tool.inputFormats.includes('avif') && capabilities && !capabilities.canDecodeAVIF
      ? 'Your current browser lacks native AVIF decoding. We recommend trying Google Chrome, Firefox, or Safari 16.4+.'
      : null;

  return (
    <div className="w-full space-y-4">
      {formatWarning && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center">
          <svg className="w-4 h-4 mr-2 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {formatWarning}
        </div>
      )}

      {!selectedFile ? (
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          acceptFormats={tool.inputFormats}
          multiple={false}
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3 truncate">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 rounded-lg flex items-center justify-center font-bold text-xs">
                {selectedFile.name.split('.').pop()?.toUpperCase()}
              </div>
              <div className="truncate">
                <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  {selectedFile.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white px-2 py-1"
            >
              Change
            </button>
          </div>

          {tool.type === 'conversion' && (
            <ConversionSettings
              outputFormat={targetFormat}
              quality={quality}
              onQualityChange={setQuality}
            />
          )}

          {tool.type === 'compression' && (
            <CompressionSettings
              targetSizeBytes={tool.targetSizeBytes}
              quality={quality}
              onQualityChange={setQuality}
              targetSizeLabel={tool.targetSizeLabel}
            />
          )}

          {tool.type === 'resize' && (
            <ResizeSettings
              width={width}
              height={height}
              maintainAspectRatio={maintainAspectRatio}
              scalePercentage={scalePercentage}
              usePercentage={usePercentage}
              onWidthChange={handleWidthChange}
              onHeightChange={handleHeightChange}
              onMaintainAspectRatioChange={setMaintainAspectRatio}
              onScalePercentageChange={setScalePercentage}
              onUsePercentageChange={setUsePercentage}
            />
          )}

          {!result && !isProcessing && (
            <button
              type="button"
              onClick={runProcessing}
              className="btn-primary w-full text-base font-bold shadow-xs"
            >
              Process {tool.title} Now
            </button>
          )}

          {isProcessing && (
            <ProgressIndicator
              progress={progress}
              statusText="Processing image in your browser..."
            />
          )}

          {errorMsg && (
            <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl text-xs sm:text-sm text-red-700 dark:text-red-300">
              <span className="font-bold block mb-1">Processing Error</span>
              {errorMsg}
            </div>
          )}

          {result && (
            <ResultCard
              blob={result.blob}
              originalName={selectedFile.name}
              originalSize={result.originalSize}
              resultSize={result.resultSize}
              targetFormat={tool.outputFormat === 'original' ? 'jpg' : tool.outputFormat}
              width={result.width}
              height={result.height}
              savingsPercentage={result.savingsPercentage}
              statusLabel={result.statusLabel}
              onReset={handleReset}
            />
          )}
        </div>
      )}
    </div>
  );
}
