import { FileText } from 'lucide-react';

export function InterventionOverviewBanner() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left Info */}
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Intervention Overview</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Active academic plans, restorative counseling, and behavioral agreements
          </p>
        </div>
      </div>

      {/* Right Stats */}
      <div className="flex items-center gap-6 md:gap-8 divide-x divide-slate-100 shrink-0">
        <div className="text-center">
          <div className="text-xl font-extrabold text-blue-600">19</div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Active</span>
        </div>
        <div className="text-center pl-6 md:pl-8">
          <div className="text-xl font-extrabold text-emerald-600">6</div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Completed</span>
        </div>
        <div className="text-center pl-6 md:pl-8">
          <div className="text-xl font-extrabold text-slate-900">26</div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Students Served</span>
        </div>
        <div className="text-center pl-6 md:pl-8">
          <div className="text-xl font-extrabold text-slate-900">33</div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Total Logged</span>
        </div>
      </div>
    </div>
  );
}
