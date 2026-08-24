'use client';

import React, { useRef, useState } from 'react';
import { validateFile } from '../lib/engine/fileValidator';

export interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptFormats?: string[]; // E.g. ['jpg', 'png', 'heic']
  multiple?: boolean;
  disabled?: boolean;
}

export default function FileDropzone({
  onFilesSelected,
  acceptFormats,
  multiple = false,
  disabled = false,
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0 || disabled) return;
    setValidationError(null);

    const files = Array.from(fileList);
    const validFiles: File[] = [];

    for (const file of files) {
      const res = await validateFile(file, acceptFormats as any);
      if (!res.valid) {
        setValidationError(res.error || 'Invalid file selected.');
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(multiple ? validFiles : [validFiles[0]]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full my-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`relative min-h-[200px] sm:min-h-[260px] border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
          isDragOver
            ? 'border-blue-600 bg-blue-50/50'
            : 'border-slate-300 hover:border-blue-500 bg-slate-50/60 hover:bg-slate-50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={acceptFormats ? acceptFormats.map((f) => `.${f}`).join(',') : 'image/*'}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          disabled={disabled}
          id="file-dropzone-input"
        />

        <div className="w-10 h-10 mb-3 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-xs">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
          {multiple ? 'Drop images here' : 'Drop image here'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-4">
          or click to browse from your device
        </p>

        <button
          type="button"
          disabled={disabled}
          className="btn-primary"
        >
          {multiple ? 'Choose images' : 'Choose image'}
        </button>

        <div className="mt-4 text-[11px] text-slate-400 font-medium space-x-2">
          {acceptFormats && acceptFormats.length > 0 && (
            <span>Formats: {acceptFormats.map((f) => f.toUpperCase()).join(' • ')}</span>
          )}
          <span>&bull;</span>
          <span>Max 25 MB</span>
        </div>
      </div>

      {validationError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center">
          <svg className="w-4 h-4 mr-2 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {validationError}
        </div>
      )}
    </div>
  );
}
