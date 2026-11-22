'use client';

import {
  BookOpen,
  Database,
  Download,
  History,
  Info,
} from 'lucide-react';
import { useState } from 'react';
import { DatasetPreviewTable } from '@/components/upload/dataset-preview-table';
import { IngestionMetricsGrid } from '@/components/upload/ingestion-metrics-grid';
import { InteractiveColumnMapping } from '@/components/upload/interactive-column-mapping';
import { UploadActionFooter } from '@/components/upload/upload-action-footer';
import { UploadDropzone } from '@/components/upload/upload-dropzone';

export default function UploadDatasetPage() {
  const [file, setFile] = useState<{ name: string; size: string } | null>({
    name: 'fall_semester_students_v2.csv',
    size: '2.4 MB',
  });
  const [progress, setProgress] = useState(98);

  const handleFileSelect = (selectedFile: File) => {
    setFile({
      name: selectedFile.name,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
    });
    setProgress(100);
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Notification Banner: Schema Verification & Ingestion Stage */}
      <div className="px-5 py-3 rounded-xl bg-blue-50/90 border border-blue-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start md:items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 md:mt-0">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 leading-tight">
              You are in Schema Verification &amp; Ingestion Stage
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Uploaded dataset will override previous staging weights for Fall Cohort predictions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] font-mono font-medium text-slate-500">
            Batch Session: <strong className="text-slate-700">F24-0044</strong>
          </span>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shadow-2xs"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>View History</span>
          </button>
        </div>
      </div>

      {/* Page Title & Guide Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Database className="w-3.5 h-3.5" />
            <span>DATA PIPELINE INGESTION</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Upload Academic Dataset
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium max-w-2xl">
            Upload CSV/Excel student academic logs, attendance records, and assessment grades for AI risk prediction.
          </p>
        </div>

        {/* Top Right Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href="/data/raw/student_performance.csv"
            download="edupredict_template.csv"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Sample Template (CSV)</span>
          </a>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Data Guide</span>
          </button>
        </div>
      </div>

      {/* 1. Drag and Drop Upload Area */}
      <UploadDropzone
        fileName={file?.name}
        fileSize={file?.size}
        progress={progress}
        onFileSelect={handleFileSelect}
        onRemove={handleRemove}
      />

      {/* 2. Four Ingestion Metrics & Pre-flight Validation Summary */}
      <IngestionMetricsGrid />

      {/* 3. Interactive Column Mapping (Schema Alignment Engine) */}
      <InteractiveColumnMapping />

      {/* 4. Sanity Check: Dataset Preview Table */}
      <DatasetPreviewTable />

      {/* 5. Bottom Action Footer */}
      <UploadActionFooter onRemove={handleRemove} />
    </div>
  );
}
