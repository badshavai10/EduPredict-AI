import { Maximize2 } from 'lucide-react';

const previewRows = [
  {
    id: 'STU-2021-001',
    att: '91.15',
    study: '18.5',
    gpa: '3.68',
    quiz: '88.0',
    assign: '90.2',
    gradeLabel: 'High Pass',
    gradeType: 'high-pass',
    tierLabel: 'Tier 1 (Low Risk)',
    tierType: 'low',
  },
  {
    id: 'STU-2021-002',
    att: '57.45',
    study: '4.0',
    gpa: '1.90',
    quiz: '42.0',
    assign: '38.0',
    gradeLabel: 'Critical Drop',
    gradeType: 'critical',
    tierLabel: 'Tier 3 (High Risk)',
    tierType: 'critical',
  },
  {
    id: 'STU-2021-003',
    att: '75.40',
    study: '10.0',
    gpa: '2.75',
    quiz: '67.0',
    assign: '68.0',
    gradeLabel: 'Standard',
    gradeType: 'standard',
    tierLabel: 'Tier 2 (Moderate)',
    tierType: 'moderate',
  },
  {
    id: 'STU-2021-004',
    att: '94.65',
    study: '21.0',
    gpa: '3.92',
    quiz: '94.0',
    assign: '95.0',
    gradeLabel: 'High Pass',
    gradeType: 'high-pass',
    tierLabel: 'Tier 1 (Low Risk)',
    tierType: 'low',
  },
  {
    id: 'STU-2021-005',
    att: '71.85',
    study: '8.5',
    gpa: '2.50',
    quiz: '60.0',
    assign: '64.0',
    gradeLabel: 'Warning',
    gradeType: 'warning',
    tierLabel: 'Tier 2 (Moderate)',
    tierType: 'moderate',
  },
];

export function DatasetPreviewTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase block">
            SANITY CHECK
          </span>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-0.5">
            Dataset Preview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rendering first 5 rows out of 1,250 records detected in memory cache.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="text-[11px] font-medium">Showing 1 - 5 of 1,250</span>
          <button
            type="button"
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Table with Dark Navy Header */}
      <div className="overflow-x-auto rounded-lg border border-slate-800/10">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0f172a] text-slate-200 text-[10px] uppercase font-bold tracking-wider">
            <tr>
              <th className="px-4 py-3">STUD_ID</th>
              <th className="px-4 py-3">ATT_PCT</th>
              <th className="px-4 py-3">WEEKLY_STUDY_HR</th>
              <th className="px-4 py-3">PREV_GPA</th>
              <th className="px-4 py-3">QUIZ_AVG</th>
              <th className="px-4 py-3">ASSIGN_SCORE</th>
              <th className="px-4 py-3">FINAL_GRADE_CATEGORY</th>
              <th className="px-4 py-3">INFERRED TIER</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
            {previewRows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70 transition">
                <td className="px-4 py-3 font-semibold text-blue-600">{row.id}</td>
                <td className={`px-4 py-3 ${row.tierType === 'critical' ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                  {row.att}
                </td>
                <td className={`px-4 py-3 ${row.tierType === 'critical' ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                  {row.study}
                </td>
                <td className="px-4 py-3 text-slate-700">{row.gpa}</td>
                <td className="px-4 py-3 text-slate-700">{row.quiz}</td>
                <td className="px-4 py-3 text-slate-700">{row.assign}</td>

                {/* Final Grade Category Badge */}
                <td className="px-4 py-3 font-sans">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.gradeType === 'high-pass'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : row.gradeType === 'critical'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : row.gradeType === 'warning'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {row.gradeLabel}
                  </span>
                </td>

                {/* Inferred Tier Badge */}
                <td className="px-4 py-3 font-sans">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${
                      row.tierType === 'critical'
                        ? 'text-red-600'
                        : row.tierType === 'moderate'
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        row.tierType === 'critical'
                          ? 'bg-red-500'
                          : row.tierType === 'moderate'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    ></span>
                    {row.tierLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
