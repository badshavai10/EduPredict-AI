import {
  CheckCircle2,
  Columns3,
  FileSpreadsheet,
  FileText,
  Sparkles,
  Users,
} from 'lucide-react';

export function IngestionMetricsGrid() {
  return (
    <div className="space-y-4">
      {/* 4 Ingestion Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. File Staged */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase">File Staged</span>
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-sm font-bold text-slate-900 truncate" title="fall_semester_students_v2.csv">
            fall_semester_students_v2.csv
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">14,604 bytes (2.41 MB)</p>
        </div>

        {/* 2. Parsed Cohort */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase">Parsed Cohort</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">1,250</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Student Records parsed
          </p>
        </div>

        {/* 3. Schema Fidelity */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase">Schema Fidelity</span>
            <Columns3 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">8 / 8 Mapped</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> All required columns matched
          </p>
        </div>

        {/* 4. Data Quality Score */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase">Data Quality Score</span>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">96%</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Clean File
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            2 Duplicates resolved • 0 missing GPAs
          </p>
        </div>
      </div>

      {/* Pre-flight Validation Summary Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Pre-flight Validation Summary</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              System conducted schema integrity, and audit checks across 1,250 student tuples.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap text-[11px] font-medium text-slate-700">
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Missing Values: 0 detected
          </span>
          <span className="inline-flex items-center gap-1 text-blue-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Duplicates: 2 auto-resolved
          </span>
          <span className="inline-flex items-center gap-1 text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Ranges: Valid (GPA 0.0 - 4.0)
            <button type="button" className="text-blue-600 hover:underline font-semibold ml-1">
              Details
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
