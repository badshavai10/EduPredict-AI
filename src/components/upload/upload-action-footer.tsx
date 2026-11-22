'use client';

import { ArrowRight, CheckCheck, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface UploadActionFooterProps {
  onRemove?: () => void;
  onValidate?: () => void;
}

export function UploadActionFooter({ onRemove, onValidate }: UploadActionFooterProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-red-200 bg-red-50/40 text-red-700 hover:bg-red-50 text-xs font-semibold transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove Dataset</span>
        </button>

        <button
          type="button"
          onClick={onValidate}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition shadow-2xs"
        >
          <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Validate Schema</span>
        </button>
      </div>

      {/* Right Submission Actions */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500 font-medium hidden md:inline">
          Ready for inference engine execution
        </span>

        <Link
          href="/prediction"
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-xs"
        >
          <span>Confirm &amp; Train / Run Predictions</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
