import { ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function AISynthesisCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">AI Synthesis Engine</h3>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
          Synced 12m ago
        </span>
      </div>

      {/* Main Prediction Synthesis */}
      <p className="text-xs text-slate-700 leading-relaxed">
        <strong className="text-slate-900">Random Forest model</strong> predicts{' '}
        <span className="font-bold text-red-600 underline decoration-red-300">4 additional students</span>{' '}
        will cross into the High-Risk threshold if current absenteeism trajectories continue for the next 14 instructional days.
      </p>

      {/* Recommended Action Callout */}
      <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100 space-y-1">
        <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
          <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
          <span>Recommended Action</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          Initiate automated SMS notifications to parents for Tier-2 attendance deviations before Friday afternoon.
        </p>
      </div>

      {/* Batch Diagnostics Action */}
      <Link
        href="/prediction"
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold text-xs transition"
      >
        <span>Run Batch Diagnostics</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
