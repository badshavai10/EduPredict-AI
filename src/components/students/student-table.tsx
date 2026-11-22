import Link from 'next/link';

interface StudentItem {
  id: string;
  studentCode: string;
  department: string;
  currentSemester: number;
  cumulativeGpa: number;
  quiz?: number;
  assignment?: number;
  midterm?: number;
  final?: number;
  attendance?: number;
  presentation?: number;
  totalScore?: number;
  attendanceRate?: number;
  currentRiskLevel: string;
}

export function StudentTable({ students }: { students: StudentItem[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-[11px] uppercase font-semibold text-slate-500">
          <tr>
            <th className="px-3 py-3">Code</th>
            <th className="px-3 py-3">Department</th>
            <th className="px-2 py-3">Sem</th>
            <th className="px-2 py-3 text-center">Quiz (15)</th>
            <th className="px-2 py-3 text-center">Assign (5)</th>
            <th className="px-2 py-3 text-center">Mid (25)</th>
            <th className="px-2 py-3 text-center">Final (40)</th>
            <th className="px-2 py-3 text-center">Att (7)</th>
            <th className="px-2 py-3 text-center">Pres (8)</th>
            <th className="px-3 py-3 text-center font-bold">Total (100)</th>
            <th className="px-3 py-3">Risk Level</th>
            <th className="px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          {students.map((s) => {
            const total =
              s.totalScore ??
              (s.quiz !== undefined &&
              s.assignment !== undefined &&
              s.midterm !== undefined &&
              s.final !== undefined &&
              s.attendance !== undefined &&
              s.presentation !== undefined
                ? Number(
                    (
                      s.quiz +
                      s.assignment +
                      s.midterm +
                      s.final +
                      s.attendance +
                      s.presentation
                    ).toFixed(1)
                  )
                : null);

            return (
              <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                <td className="px-3 py-3 font-semibold">{s.studentCode}</td>
                <td className="px-3 py-3">{s.department}</td>
                <td className="px-2 py-3">{s.currentSemester}</td>
                <td className="px-2 py-3 text-center">{s.quiz !== undefined ? s.quiz : '—'}</td>
                <td className="px-2 py-3 text-center">{s.assignment !== undefined ? s.assignment : '—'}</td>
                <td className="px-2 py-3 text-center">{s.midterm !== undefined ? s.midterm : '—'}</td>
                <td className="px-2 py-3 text-center">{s.final !== undefined ? s.final : '—'}</td>
                <td className="px-2 py-3 text-center">{s.attendance !== undefined ? s.attendance : `${s.attendanceRate ?? '—'}%`}</td>
                <td className="px-2 py-3 text-center">{s.presentation !== undefined ? s.presentation : '—'}</td>
                <td className="px-3 py-3 text-center font-bold text-blue-600 dark:text-blue-400">
                  {total !== null ? `${total}/100` : '—'}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      s.currentRiskLevel === 'CRITICAL'
                        ? 'bg-red-100 text-red-700'
                        : s.currentRiskLevel === 'HIGH'
                        ? 'bg-orange-100 text-orange-700'
                        : s.currentRiskLevel === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {s.currentRiskLevel}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <Link
                    href={`/students/${s.id}`}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
