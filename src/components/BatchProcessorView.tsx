'use client';

import React, { useEffect, useState } from 'react';
import { BatchItem, BatchProcessor } from '../lib/engine/batchProcessor';
import FileDropzone from './FileDropzone';

export default function BatchProcessorView() {
  const [processor, setProcessor] = useState<BatchProcessor | null>(null);
  const [items, setItems] = useState<BatchItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [targetFormat, setTargetFormat] = useState<'jpg' | 'png' | 'webp'>('webp');

  const handleFilesSelected = (files: File[]) => {
    const batch = new BatchProcessor(files);
    setProcessor(batch);
    setItems(batch.getItems());
  };

  const startBatch = async () => {
    if (!processor) return;
    setIsProcessing(true);

    await processor.processBatch(targetFormat, (updatedItems) => {
      setItems([...updatedItems]);
    });

    setIsProcessing(false);
  };

  const cancelBatch = () => {
    if (processor) {
      processor.cancel();
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (processor) processor.cleanup();
    };
  }, [processor]);

  const completedCount = items.filter((i) => i.status === 'completed').length;
  const failedCount = items.filter((i) => i.status === 'failed').length;

  return (
    <div className="w-full my-6">
      {items.length === 0 ? (
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          multiple={true}
          acceptFormats={['jpg', 'jpeg', 'png', 'webp', 'heic']}
        />
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Batch Image Queue ({items.length} files)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Single-file concurrency active to protect mobile device memory.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {!isProcessing && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Format:</span>
                  <select
                    value={targetFormat}
                    onChange={(e) => setTargetFormat(e.target.value as any)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white"
                  >
                    <option value="webp">.WEBP</option>
                    <option value="jpg">.JPG</option>
                    <option value="png">.PNG</option>
                  </select>
                </div>
              )}

                  {!isProcessing ? (
                    <button
                      type="button"
                      onClick={startBatch}
                      className="btn-primary text-xs !min-h-[36px] !px-4"
                    >
                      Start Batch Processing
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={cancelBatch}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                    >
                      Cancel Batch
                    </button>
                  )}

              <button
                type="button"
                onClick={() => {
                  if (processor) processor.cleanup();
                  setProcessor(null);
                  setItems([]);
                }}
                className="px-3 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-white text-xs font-semibold"
              >
                Clear Queue
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-800"
              >
                <div className="flex items-center space-x-3 truncate">
                  <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate max-w-xs">
                    {item.sanitizedName}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    ({(item.originalSize / 1024).toFixed(1)} KB)
                  </span>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : item.status === 'failed'
                        ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        : item.status === 'processing'
                        ? 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 animate-pulse'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.status}
                  </span>

                  {item.status === 'completed' && item.downloadUrl && (
                    <a
                      href={item.downloadUrl}
                      download={`${item.sanitizedName.split('.')[0]}.${targetFormat}`}
                      className="px-3 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </a>
                  )}

                  {item.status === 'failed' && (
                    <span className="text-[11px] text-red-500 max-w-[150px] truncate" title={item.error}>
                      {item.error}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {(completedCount > 0 || failedCount > 0) && (
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <span>Completed: {completedCount} / {items.length}</span>
              {failedCount > 0 && <span className="text-red-500">Failed: {failedCount}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
