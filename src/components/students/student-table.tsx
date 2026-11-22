import Link from 'next/link';

interface StudentItem {
  id: string;
  studentCode: string;
  department: string;
  currentSemester: number;
  cumulativeGpa: number;
  attendanceRate: number;
  currentRiskLevel: string;
}

export function StudentTable({ students }: { students: StudentItem[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs uppercase font-semibold text-slate-500">
          <tr>
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Semester</th>
            <th className="px-4 py-3">Attendance</th>
            <th className="px-4 py-3">GPA</th>
            <th className="px-4 py-3">Risk Level</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
              <td className="px-4 py-3 font-semibold">{s.studentCode}</td>
              <td className="px-4 py-3">{s.department}</td>
              <td className="px-4 py-3">{s.currentSemester}</td>
              <td className="px-4 py-3">{s.attendanceRate}%</td>
              <td className="px-4 py-3">{s.cumulativeGpa.toFixed(2)}</td>
              <td className="px-4 py-3">
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
              <td className="px-4 py-3">
                <Link
                  href={`/students/${s.id}`}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
