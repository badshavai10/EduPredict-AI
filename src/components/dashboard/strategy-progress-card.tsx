import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const strategies = [
  {
    name: 'Parent Conferences',
    countText: '16 interventions (42%)',
    percentage: 42,
    color: 'bg-blue-600',
  },
  {
    name: 'Attendance Contracts',
    countText: '11 contracts (29%)',
    percentage: 29,
    color: 'bg-blue-600',
  },
  {
    name: 'Academic Tutoring (Peer/Faculty)',
    countText: '8 active tracks (21%)',
    percentage: 21,
    color: 'bg-blue-600',
  },
  {
    name: '1-on-1 Mentoring Program',
    countText: '3 assigned (15%)',
    percentage: 15,
    color: 'bg-slate-800',
  },
];

export function StrategyProgressCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Interventions by Strategy Type
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Categorized by primary support modality</p>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            Current Term
          </span>
        </div>

        {/* Progress Bars */}
        <div className="space-y-4 my-2">
          {strategies.map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  {item.name}
                </span>
                <span className="text-slate-500 font-medium">{item.countText}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Alert Banner */}
      <div className="mt-5 p-3 rounded-lg bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-blue-900">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-medium text-[11px]">
            68% of enrolled students improved attendance after 3 weeks
          </span>
        </div>
        <Link
          href="/recommendations"
          className="text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline shrink-0 ml-2"
        >
          Configure Plans
        </Link>
      </div>
    </div>
  );
}
