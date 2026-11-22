import {
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingDown,
  Users,
} from 'lucide-react';

export function StatMetricsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {/* 1. Total Cohort */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase">Total Cohort</span>
          <Users className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">50</div>
        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Students Tracked</p>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <span>+0 New</span>
          <span>100% Active</span>
        </div>
      </div>

      {/* 2. Tier 3 Critical */}
      <div className="bg-white rounded-xl border border-red-100 p-4 shadow-2xs hover:shadow-xs transition">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase text-red-600">Tier 3 Critical</span>
          <AlertTriangle className="w-4 h-4 text-red-500" />
        </div>
        <div className="text-2xl font-extrabold text-red-600">20</div>
        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">High Risk (40%)</p>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium">
          <span className="text-red-600 font-semibold flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            Action Req.
          </span>
          <span className="text-red-500">+2 this wk</span>
        </div>
      </div>

      {/* 3. Tier 2 Moderate */}
      <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-2xs hover:shadow-xs transition">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600">Tier 2 Moderate</span>
          <Clock className="w-4 h-4 text-amber-500" />
        </div>
        <div className="text-2xl font-extrabold text-amber-600">18</div>
        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Medium Risk (36%)</p>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium">
          <span className="text-amber-600 font-semibold flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Watchlist
          </span>
          <span className="text-slate-400">Steady</span>
        </div>
      </div>

      {/* 4. Tier 1 Low */}
      <div className="bg-white rounded-xl border border-emerald-100 p-4 shadow-2xs hover:shadow-xs transition">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600">Tier 1 Low</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-600">12</div>
        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Low Risk (24%)</p>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium">
          <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            On Track
          </span>
          <span className="text-slate-400">Good</span>
        </div>
      </div>

      {/* 5. Attendance */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase">Attendance</span>
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">78.4%</div>
        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Avg Attendance Rate</p>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <span className="text-red-500 flex items-center gap-0.5">
            <TrendingDown className="w-3 h-3" /> -2.1%
          </span>
          <span>vs district 80%</span>
        </div>
      </div>

      {/* 6. Discipline & GPA */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase">Discipline &amp; GPA</span>
          <Award className="w-4 h-4 text-slate-700" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">2.84</div>
        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Cohort Mean GPA</p>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <span>35 Logged</span>
          <span>Oct - Nov</span>
        </div>
      </div>
    </div>
  );
}
