'use client';

import {
  FileSpreadsheet,
  Lock,
  Settings2,
  ShieldCheck,
  UploadCloud,
  X,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface UploadDropzoneProps {
  fileName?: string;
  fileSize?: string;
  progress?: number;
  onFileSelect?: (file: File) => void;
  onRemove?: () => void;
}

export function UploadDropzone({
  fileName = 'fall_semester_students_v2.csv',
  fileSize = '2.4 MB',
  progress = 98,
  onFileSelect,
  onRemove,
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect?.(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect?.(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed transition-all p-8 text-center cursor-pointer bg-white ${
          isDragging
            ? 'border-blue-500 bg-blue-50/40'
            : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx"
          onChange={handleChange}
          className="hidden"
        />

        <div className="max-w-md mx-auto space-y-3">
          {/* Cloud Icon */}
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Drag and drop your dataset here or{' '}
              <span className="text-blue-600 hover:underline">Browse Files</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports CSV, XLSX up to 50MB. Required columns: Student ID, Attendance, Study Hours,
              GPA, Quiz, Assignment.
            </p>
          </div>

          {/* Compliance Badges */}
          <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>FERPA Compliant</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <Settings2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Auto-Type Cast</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>PII Scrambled</span>
            </span>
          </div>
        </div>
      </div>

      {/* Upload Progress Status Card */}
      {fileName && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">{fileName}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  {fileSize} of {fileSize} • 0 seconds remaining
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-blue-600">{progress}% Completed</span>
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
