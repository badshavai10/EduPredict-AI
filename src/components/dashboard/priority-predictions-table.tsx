'use client';

import { ChevronDown, ChevronRight, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const priorityStudents = [
  {
    id: 'ST-1001',
    name: 'Liam Johnson',
    initials: 'LJ',
    avatarBg: 'bg-red-100 text-red-700',
    meta: 'Grade 11 • AP Biology',
    attendance: '55.2%',
    attendanceNote: '5 unexcused absences',
    attendanceAlert: true,
    gpa: '1.92',
    tierLabel: 'Tier 3 (86%)',
    tierType: 'critical',
    action: 'Parent-Advisor Conference',
  },
  {
    id: 'ST-1045',
    name: 'Marcus Vance',
    initials: 'MV',
    avatarBg: 'bg-red-100 text-red-700',
    meta: 'Grade 10 • Algebra II',
    attendance: '64.8%',
    attendanceNote: '4 unexcused absences',
    attendanceAlert: true,
    gpa: '2.10',
    tierLabel: 'Tier 3 (89%)',
    tierType: 'critical',
    action: 'Attendance Contract Log',
  },
  {
    id: 'ST-0972',
    name: 'Sophia Patel',
    initials: 'SP',
    avatarBg: 'bg-amber-100 text-amber-700',
    meta: 'Grade 12 • Chemistry',
    attendance: '81.0%',
    attendanceNote: '2 tardies this month',
    attendanceAlert: false,
    gpa: '2.68',
    tierLabel: 'Tier 2 (67%)',
    tierType: 'moderate',
    action: 'Chemistry Peer Tutor',
  },
  {
    id: 'ST-1022',
    name: 'David Kim',
    initials: 'DK',
    avatarBg: 'bg-amber-100 text-amber-700',
    meta: 'Grade 9 • English I',
    attendance: '83.1%',
    attendanceNote: '1 unexcused absence',
    attendanceAlert: false,
    gpa: '2.75',
    tierLabel: 'Tier 2 (55%)',
    tierType: 'moderate',
    action: 'Study Skills Coaching',
  },
  {
    id: 'ST-1104',
    name: 'Emily Chen',
    initials: 'EC',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    meta: 'Grade 11 • World History',
    attendance: '95.5%',
    attendanceNote: 'Consistent on-time',
    attendanceAlert: false,
    gpa: '3.89',
    tierLabel: 'Tier 1 (18%)',
    tierType: 'low',
    action: 'Maintain Current Plan',
  },
];

export function PriorityPredictionsTable() {
  const [filter, setFilter] = useState('All');

  const filteredStudents =
    filter === 'All'
      ? priorityStudents
      : priorityStudents.filter((s) =>
          filter === 'Tier 3'
            ? s.tierType === 'critical'
            : filter === 'Tier 2'
            ? s.tierType === 'moderate'
            : s.tierType === 'low'
        );

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
      {/* Table Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Priority Attention &amp; AI Predictions
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Model confidence score &gt;85% • Synthesized across attendance, LMS logs, and midterms
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              aria-label="Filter students by risk tier"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none flex items-center gap-1.5 pl-3 pr-7 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 hover:bg-slate-100 transition shadow-2xs cursor-pointer focus:outline-none"
            >
              <option value="All">Filter by Risk: All</option>
              <option value="Tier 3">Filter by Risk: Tier 3</option>
              <option value="Tier 2">Filter by Risk: Tier 2</option>
              <option value="Tier 1">Filter by Risk: Tier 1</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>
          <button
            type="button"
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 font-semibold">Student ID</th>
              <th className="pb-3 font-semibold">Student</th>
              <th className="pb-3 font-semibold">Attendance</th>
              <th className="pb-3 font-semibold">GPA</th>
              <th className="pb-3 font-semibold">Risk Classification</th>
              <th className="pb-3 font-semibold">AI Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/70 transition">
                {/* ID */}
                <td className="py-3 font-mono font-medium text-slate-500 text-[11px] whitespace-nowrap">
                  {s.id}
                </td>

                {/* Student Avatar & Name */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${s.avatarBg}`}
                    >
                      {s.initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">{s.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{s.meta}</p>
                    </div>
                  </div>
                </td>

                {/* Attendance */}
                <td className="py-3 pr-4 whitespace-nowrap">
                  <div className={`font-bold ${s.attendanceAlert ? 'text-red-600' : 'text-slate-800'}`}>
                    {s.attendance}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">{s.attendanceNote}</div>
                </td>

                {/* GPA */}
                <td className="py-3 pr-4 font-bold text-slate-900 text-xs whitespace-nowrap">
                  {s.gpa}
                </td>

                {/* Risk Classification Badge */}
                <td className="py-3 pr-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      s.tierType === 'critical'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : s.tierType === 'moderate'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        s.tierType === 'critical'
                          ? 'bg-red-500'
                          : s.tierType === 'moderate'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    ></span>
                    {s.tierLabel}
                  </span>
                </td>

                {/* AI Recommended Action Badge */}
                <td className="py-3 whitespace-nowrap">
                  <Link
                    href="/recommendations"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 text-[11px] font-semibold text-slate-700 transition"
                  >
                    <span>{s.action}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="text-[11px]">Showing 5 of 50 students in active cohort</span>
        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            className="w-6 h-6 rounded flex items-center justify-center bg-blue-600 text-white font-bold"
          >
            1
          </button>
          <button
            type="button"
            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 font-medium"
          >
            2
          </button>
          <button
            type="button"
            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 font-medium"
          >
            3
          </button>
          <button
            type="button"
            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
