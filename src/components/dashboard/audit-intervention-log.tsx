import Link from 'next/link';

const auditEvents = [
  {
    id: 1,
    title: 'Liam Johnson flagged as High Risk',
    detail: 'Unexcused absence trigger exceeded threshold (>4 days)',
    timestamp: '10:22 AM • ML Model Classifier v2.1',
    dotColor: 'bg-red-500',
    titleColor: 'text-slate-900',
  },
  {
    id: 2,
    title: 'Intervention Created for Marcus Vance',
    detail: 'Attendance Contract assigned by Dr. Aris Thorne',
    timestamp: '09:15 AM • Restorative Team',
    dotColor: 'bg-emerald-500',
    titleColor: 'text-slate-900',
  },
  {
    id: 3,
    title: 'Dataset Re-indexed Successfully',
    detail: 'Fall 2024 Pilot Cohort CSV normalized (50 records processed)',
    timestamp: '08:30 AM • System Daemon',
    dotColor: 'bg-blue-500',
    titleColor: 'text-slate-900',
  },
];

export function AuditInterventionLog() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Audit &amp; Intervention Log
        </h3>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
          TODAY
        </span>
      </div>

      {/* Timeline List */}
      <div className="space-y-3.5 relative before:absolute before:inset-0 before:left-[5px] before:w-[2px] before:bg-slate-100">
        {auditEvents.map((event) => (
          <div key={event.id} className="relative flex items-start gap-3 pl-4">
            <span
              className={`w-2.5 h-2.5 rounded-full ${event.dotColor} ring-4 ring-white absolute left-0 top-1 shrink-0`}
            ></span>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-900 leading-tight">{event.title}</h4>
              <p className="text-[11px] text-slate-500 leading-tight">{event.detail}</p>
              <p className="text-[10px] text-slate-400 font-medium pt-0.5">{event.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="pt-2 border-t border-slate-100 text-center">
        <Link
          href="/recommendations"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          View full audit log (129 records)
        </Link>
      </div>
    </div>
  );
}
