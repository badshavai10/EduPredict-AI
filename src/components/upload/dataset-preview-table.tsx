import { Maximize2 } from 'lucide-react';

const previewRows = [
  {
    id: 'STU1001',
    quiz: '13.5',
    assign: '4.8',
    midterm: '22.5',
    final: '35.0',
    att: '6.5',
    pres: '7.5',
    total: '89.8',
    gradeLabel: 'High Pass',
    gradeType: 'high-pass',
    tierLabel: 'Tier 1 (Low Risk)',
    tierType: 'low',
  },
  {
    id: 'STU1002',
    quiz: '5.5',
    assign: '2.0',
    midterm: '9.0',
    final: '14.5',
    att: '2.8',
    pres: '3.2',
    total: '37.0',
    gradeLabel: 'Critical Deficit',
    gradeType: 'critical',
    tierLabel: 'Tier 4 (Critical)',
    tierType: 'critical',
  },
  {
    id: 'STU1003',
    quiz: '10.5',
    assign: '3.5',
    midterm: '16.5',
    final: '26.0',
    att: '5.2',
    pres: '5.8',
    total: '67.5',
    gradeLabel: 'Standard Pass',
    gradeType: 'standard',
    tierLabel: 'Tier 2 (Moderate)',
    tierType: 'moderate',
  },
  {
    id: 'STU1004',
    quiz: '14.5',
    assign: '5.0',
    midterm: '24.0',
    final: '38.0',
    att: '6.8',
    pres: '7.8',
    total: '96.1',
    gradeLabel: 'High Pass',
    gradeType: 'high-pass',
    tierLabel: 'Tier 1 (Low Risk)',
    tierType: 'low',
  },
  {
    id: 'STU1005',
    quiz: '8.0',
    assign: '2.5',
    midterm: '12.0',
    final: '21.0',
    att: '4.2',
    pres: '4.5',
    total: '52.2',
    gradeLabel: 'At-Risk',
    gradeType: 'warning',
    tierLabel: 'Tier 3 (High Risk)',
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
            SANITY CHECK (100-MARK SYSTEM)
          </span>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-0.5">
            Dataset Preview & Mark Distribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rendering first 5 rows with 6 assessment components (Quiz: 15, Assign: 5, Mid: 25, Final: 40, Att: 7, Pres: 8).
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
              <th className="px-3 py-3">STUD_ID</th>
              <th className="px-2 py-3 text-center">QUIZ (15)</th>
              <th className="px-2 py-3 text-center">ASSIGN (5)</th>
              <th className="px-2 py-3 text-center">MIDTERM (25)</th>
              <th className="px-2 py-3 text-center">FINAL (40)</th>
              <th className="px-2 py-3 text-center">ATT (7)</th>
              <th className="px-2 py-3 text-center">PRES (8)</th>
              <th className="px-3 py-3 text-center font-extrabold text-blue-400">TOTAL (100)</th>
              <th className="px-3 py-3">OUTCOME</th>
              <th className="px-3 py-3">INFERRED TIER</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
            {previewRows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70 transition">
                <td className="px-3 py-3 font-semibold text-blue-600">{row.id}</td>
                <td className="px-2 py-3 text-center text-slate-700">{row.quiz}</td>
                <td className="px-2 py-3 text-center text-slate-700">{row.assign}</td>
                <td className={`px-2 py-3 text-center ${Number(row.midterm) < 11 ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                  {row.midterm}
                </td>
                <td className={`px-2 py-3 text-center ${Number(row.final) < 18 ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                  {row.final}
                </td>
                <td className={`px-2 py-3 text-center ${Number(row.att) < 3.5 ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                  {row.att}
                </td>
                <td className={`px-2 py-3 text-center ${Number(row.pres) < 4 ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                  {row.pres}
                </td>
                <td className="px-3 py-3 text-center font-bold text-blue-600">
                  {row.total}
                </td>

                {/* Final Grade Category Badge */}
                <td className="px-3 py-3 font-sans">
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
