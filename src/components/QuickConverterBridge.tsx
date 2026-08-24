'use client';

import React, { useState } from 'react';
import FileDropzone from './FileDropzone';
import ResultCard from './ResultCard';
import ProgressIndicator from './ProgressIndicator';
import { processImageWithWorker } from '../workers/workerClient';

export default function QuickConverterBridge() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetFormat, setTargetFormat] = useState<'webp' | 'jpg' | 'png'>('webp');
  const [result, setResult] = useState<{
    blob: Blob;
    width: number;
    height: number;
    originalSize: number;
    convertedSize: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setSelectedFile(file);
    setErrorMsg(null);
    setResult(null);

    // Auto-process on drop
    runQuickConvert(file, targetFormat);
  };

  const runQuickConvert = async (file: File, format: 'webp' | 'jpg' | 'png') => {
    setIsProcessing(true);
    setProgress(40);
    setErrorMsg(null);

    try {
      setProgress(70);
      const res = await processImageWithWorker(file, {
        targetFormat: format,
        quality: 0.85,
      });
      setProgress(100);
      setResult({
        blob: res.blob,
        width: res.width,
        height: res.height,
        originalSize: res.originalSize,
        convertedSize: res.convertedSize,
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Quick conversion failed.');
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

  return (
    <div className="w-full max-w-[640px] mx-auto text-left">
      {!selectedFile ? (
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          acceptFormats={['jpg', 'jpeg', 'png', 'webp', 'heic', 'avif']}
        />
      ) : (
        <div className="space-y-4">
          <div className="card-base flex items-center justify-between">
            <div className="truncate">
              <p className="font-bold text-slate-900 text-sm truncate">{selectedFile.name}</p>
              <p className="text-xs text-slate-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={targetFormat}
                onChange={(e) => {
                  const fmt = e.target.value as any;
                  setTargetFormat(fmt);
                  runQuickConvert(selectedFile, fmt);
                }}
                className="px-2.5 py-1.5 bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
              >
                <option value="webp">To .WEBP</option>
                <option value="jpg">To .JPG</option>
                <option value="png">To .PNG</option>
              </select>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1"
              >
                Change
              </button>
            </div>
          </div>

          {isProcessing && (
            <ProgressIndicator progress={progress} statusText="Converting in browser..." />
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          {result && (
            <ResultCard
              blob={result.blob}
              originalName={selectedFile.name}
              originalSize={result.originalSize}
              resultSize={result.convertedSize}
              targetFormat={targetFormat}
              width={result.width}
              height={result.height}
              onReset={handleReset}
            />
          )}
        </div>
      )}
    </div>
  );
}
