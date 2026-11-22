'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Layers,
  LineChart,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';

interface StudentRecord {
  id: string;
  name: string;
  initials: string;
  major: string;
  year: string;
  department: string;
  attendance: number;
  attendanceTrend: 'up' | 'down' | 'flat';
  gpa: number;
  quizAvg: number;
  assignmentsText: string;
  assignmentsStatus: 'danger' | 'warning' | 'safe';
  predictedRisk: 'High' | 'Medium' | 'Safe';
  riskScore: number;
  lastAiRun: string;
}

const mockStudents: StudentRecord[] = [
  {
    id: 'STU-98214',
    name: 'Marcus Lawson',
    initials: 'ML',
    major: 'B.S. Computer Engineering',
    year: 'Year 2',
    department: 'Computer Science',
    attendance: 62.4,
    attendanceTrend: 'down',
    gpa: 1.94,
    quizAvg: 54,
    assignmentsText: '3 Missing',
    assignmentsStatus: 'danger',
    predictedRisk: 'High',
    riskScore: 94.2,
    lastAiRun: 'Today, 09:20',
  },
  {
    id: 'STU-88402',
    name: 'Elena Rostova',
    initials: 'ER',
    major: 'B.B.A. Financial Analytics',
    year: 'Year 3',
    department: 'Financial Analytics',
    attendance: 68.1,
    attendanceTrend: 'down',
    gpa: 2.1,
    quizAvg: 58,
    assignmentsText: '4 Missing',
    assignmentsStatus: 'danger',
    predictedRisk: 'High',
    riskScore: 91.0,
    lastAiRun: 'Today, 09:18',
  },
  {
    id: 'STU-94031',
    name: 'Julian Alvarez',
    initials: 'JA',
    major: 'B.S. Molecular Biology',
    year: 'Year 1',
    department: 'Molecular Biology',
    attendance: 76.0,
    attendanceTrend: 'flat',
    gpa: 2.48,
    quizAvg: 66,
    assignmentsText: '1 Late',
    assignmentsStatus: 'warning',
    predictedRisk: 'Medium',
    riskScore: 64.5,
    lastAiRun: 'Today, 08:55',
  },
  {
    id: 'STU-91845',
    name: 'Devon Price',
    initials: 'DP',
    major: 'B.A. Public Policy',
    year: 'Year 3',
    department: 'Public Policy',
    attendance: 79.2,
    attendanceTrend: 'flat',
    gpa: 2.62,
    quizAvg: 71,
    assignmentsText: '2 Missing',
    assignmentsStatus: 'warning',
    predictedRisk: 'Medium',
    riskScore: 58.3,
    lastAiRun: 'Today, 08:30',
  },
  {
    id: 'STU-97120',
    name: 'Sofia Chen',
    initials: 'SC',
    major: 'B.S. Biomedical Engineering',
    year: 'Year 4',
    department: 'Biomedical Engineering',
    attendance: 96.5,
    attendanceTrend: 'up',
    gpa: 3.88,
    quizAvg: 94,
    assignmentsText: 'All Complete',
    assignmentsStatus: 'safe',
    predictedRisk: 'Safe',
    riskScore: 4.1,
    lastAiRun: 'Today, 08:15',
  },
  {
    id: 'STU-92318',
    name: 'Liam Johnson',
    initials: 'LJ',
    major: 'B.S. Neuroscience',
    year: 'Year 2',
    department: 'Molecular Biology',
    attendance: 65.2,
    attendanceTrend: 'down',
    gpa: 1.82,
    quizAvg: 51,
    assignmentsText: '5 Missing',
    assignmentsStatus: 'danger',
    predictedRisk: 'High',
    riskScore: 96.1,
    lastAiRun: 'Today, 07:45',
  },
  {
    id: 'STU-93822',
    name: 'David Kim',
    initials: 'DK',
    major: 'B.A. English Literature',
    year: 'Year 1',
    department: 'Public Policy',
    attendance: 83.1,
    attendanceTrend: 'flat',
    gpa: 2.75,
    quizAvg: 73,
    assignmentsText: '1 Missing',
    assignmentsStatus: 'warning',
    predictedRisk: 'Medium',
    riskScore: 48.0,
    lastAiRun: 'Today, 07:20',
  },
  {
    id: 'STU-71934',
    name: 'Emily Chen',
    initials: 'EC',
    major: 'B.A. World History',
    year: 'Year 1',
    department: 'Public Policy',
    attendance: 95.0,
    attendanceTrend: 'up',
    gpa: 3.89,
    quizAvg: 92,
    assignmentsText: 'All Complete',
    assignmentsStatus: 'safe',
    predictedRisk: 'Safe',
    riskScore: 5.2,
    lastAiRun: 'Today, 06:50',
  },
];

export default function StudentRiskListPage() {
  // Filters & State
  const [selectedRiskTab, setSelectedRiskTab] = useState<'All' | 'High' | 'Medium' | 'Safe'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [attendanceMax, setAttendanceMax] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIntervention, setActiveIntervention] = useState<StudentRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const departments = [
    'All Departments',
    'Computer Science',
    'Financial Analytics',
    'Molecular Biology',
    'Public Policy',
    'Biomedical Engineering',
  ];

  // Filtered students
  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      // Risk tab filter
      if (selectedRiskTab === 'High' && student.predictedRisk !== 'High') return false;
      if (selectedRiskTab === 'Medium' && student.predictedRisk !== 'Medium') return false;
      if (selectedRiskTab === 'Safe' && student.predictedRisk !== 'Safe') return false;

      // Department filter
      if (selectedDept !== 'All Departments' && student.department !== selectedDept) return false;

      // Attendance filter
      if (student.attendance > attendanceMax) return false;

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesId = student.id.toLowerCase().includes(query);
        const matchesMajor = student.major.toLowerCase().includes(query);
        if (!matchesName && !matchesId && !matchesMajor) return false;
      }

      return true;
    });
  }, [selectedRiskTab, selectedDept, attendanceMax, searchQuery]);

  const handleExportCohort = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Student ID,Name,Major,Department,Attendance,GPA,Quiz Avg,Assignments,Predicted Risk,Risk Probability,Last AI Run',
        ...filteredStudents.map(
          (s) =>
            `${s.id},"${s.name}","${s.major}","${s.department}",${s.attendance}%,${s.gpa},${s.quizAvg}%,${s.assignmentsText},${s.predictedRisk},${s.riskScore}%,${s.lastAiRun}`
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduPredict_Risk_Cohort_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Exported active cohort CSV successfully.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetFilters = () => {
    setSelectedRiskTab('All');
    setSearchQuery('');
    setSelectedDept('All Departments');
    setAttendanceMax(100);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Toast alert banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 bg-slate-900 text-white rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. Page Header                                           */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Module 04 • Predictive Intelligence
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Early-Warning Risk Monitoring
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Real-time AI detection of students with declining attendance, low quiz scores, and high
            probability of academic failure.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-medium shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Model Synced: 8 mins ago</span>
          </div>

          <button
            type="button"
            onClick={handleExportCohort}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export Risk Cohort</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Top Metric Cards Row (4 Stat Cards)                   */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: High Risk */}
        <div className="p-4 rounded-xl border border-red-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                High Risk Students
              </span>
            </div>
            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              +4 this wk
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">42</div>
          <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-slate-100">
            <span className="text-slate-400 font-medium">Tier 1 Interventions</span>
            <span className="text-red-600 font-bold">Critical Attention</span>
          </div>
        </div>

        {/* Card 2: Medium Risk */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Medium Risk Students
              </span>
            </div>
            <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              ~ Stable
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">89</div>
          <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-slate-100">
            <span className="text-slate-400 font-medium">Tier 2 Advising Buffer</span>
            <span className="text-slate-600 font-semibold">Monitoring</span>
          </div>
        </div>

        {/* Card 3: Low Risk / Safe */}
        <div className="p-4 rounded-xl border border-emerald-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Low Risk / Safe
              </span>
            </div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              ↗ 89.5%
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">1,119</div>
          <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-slate-100">
            <span className="text-slate-400 font-medium">Target Persistence</span>
            <span className="text-emerald-600 font-bold">On Track</span>
          </div>
        </div>

        {/* Card 4: Total Evaluated */}
        <div className="p-4 rounded-xl border border-blue-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Total Evaluated
              </span>
            </div>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              100% Census
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">1,250</div>
          <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-slate-100">
            <span className="text-slate-400 font-medium">Active Fall 2024 Roster</span>
            <span className="text-blue-700 font-semibold">All Campuses</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Middle Section: Donut Chart & SHAP Risk Factors       */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Risk Distribution Breakdown (Donut) */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <LineChart className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Risk Distribution Breakdown</h3>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                ML ENGINE V2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Cohort partition segmented by supervised classification model predicting course
              dropout threshold.
            </p>

            {/* Donut and Legend Layout */}
            <div className="flex items-center justify-around gap-6 my-6">
              {/* SVG Donut */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="14"
                  />
                  {/* Green segment: 89.5% -> strokeDasharray: 224.9 251.3 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#059669"
                    strokeWidth="14"
                    strokeDasharray="225 251.3"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Blue/Slate segment: 7.1% -> 17.8 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="14"
                    strokeDasharray="18 251.3"
                    strokeDashoffset="-225"
                    strokeLinecap="round"
                  />
                  {/* Red segment: 3.4% -> 8.5 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#dc2626"
                    strokeWidth="14"
                    strokeDasharray="9 251.3"
                    strokeDashoffset="-243"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Donut Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black text-slate-900 leading-none">1,250</span>
                  <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                    Students
                  </span>
                </div>
              </div>

              {/* Legend Items */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">High Risk</span>
                  <span className="text-xs font-bold text-slate-900 ml-auto">3.4% (42)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Medium Risk</span>
                  <span className="text-xs font-bold text-slate-900 ml-auto">7.1% (89)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Low Risk / Safe</span>
                  <span className="text-xs font-bold text-slate-900 ml-auto">89.5% (1,119)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Flag Box */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-center gap-2 flex-wrap text-center">
            <span className="font-bold text-slate-700">EARLY FLAGS:</span>
            <span>• Attendance &lt; 70%</span>
            <span>• GPA &lt; 2.25</span>
            <span>• Late Submissions &gt; 3</span>
          </div>
        </div>

        {/* Right: Primary Contributing Risk Factors (SHAP Feature Impact) */}
        <div className="lg:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Primary Contributing Risk Factors
                </h3>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                SHAP FEATURE IMPACT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Relative importance and frequency of predictors flagged in high-risk classifications
              across all academic colleges.
            </p>

            {/* Feature Impact Rows */}
            <div className="space-y-4 my-5">
              {/* Factor 1: Low Attendance */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">📋</span>
                    <span className="font-semibold text-slate-800">
                      Low Attendance (&lt; 75% sessions attended)
                    </span>
                  </div>
                  <span className="font-bold text-red-600">45% of Cases</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Factor 2: Missing LMS Assignments */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">📂</span>
                    <span className="font-semibold text-slate-800">
                      Missing LMS Assignments (&gt; 2 deadlines)
                    </span>
                  </div>
                  <span className="font-bold text-blue-600">28% of Cases</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              {/* Factor 3: Midterm Exam Deficiencies */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">⭐</span>
                    <span className="font-semibold text-slate-800">
                      Midterm Exam Deficiencies (&lt; 60% mark)
                    </span>
                  </div>
                  <span className="font-bold text-slate-700">19% of Cases</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: '19%' }} />
                </div>
              </div>

              {/* Factor 4: Prior Course Prerequisite Deficit */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">📚</span>
                    <span className="font-semibold text-slate-800">
                      Prior Course Prerequisite Deficit
                    </span>
                  </div>
                  <span className="font-bold text-slate-500">8% of Cases</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-slate-300 h-2 rounded-full" style={{ width: '8%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Diagnostic Hint Banner */}
          <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-blue-600 font-bold">🛡️</span>
              <span className="font-medium">
                Early attendance triggers yield 78% retention when addressed within 7 days.
              </span>
            </div>
            <Link
              href="/model-performance"
              className="text-blue-600 hover:text-blue-700 font-bold hover:underline shrink-0 flex items-center gap-1"
            >
              <span>ML Diagnostics</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Filter Toolbar & Context Tabs                         */}
      {/* ======================================================== */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Risk Level Segmented Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedRiskTab('All')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedRiskTab === 'All'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Students (1,250)
            </button>
            <button
              type="button"
              onClick={() => setSelectedRiskTab('High')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedRiskTab === 'High'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>High Risk (42)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRiskTab('Medium')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedRiskTab === 'Medium'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Medium Risk (89)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRiskTab('Safe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedRiskTab === 'Safe'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Low Risk / Safe</span>
            </button>
          </div>

          {/* Search and Secondary Filter Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Box */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, ID, or major..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
              />
            </div>

            {/* Department Dropdown */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Attendance Slider */}
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="font-medium">Attendance &le;</span>
              <input
                type="range"
                min="50"
                max="100"
                value={attendanceMax}
                onChange={(e) => setAttendanceMax(Number(e.target.value))}
                className="w-16 h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="font-bold text-slate-800">{attendanceMax}%</span>
            </div>

            {/* Reset Button */}
            {(selectedRiskTab !== 'All' ||
              searchQuery ||
              selectedDept !== 'All Departments' ||
              attendanceMax < 100) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. Main Risk Monitored Students Table                    */}
        {/* ======================================================== */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Student Name &amp; Major</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">GPA</th>
                <th className="py-3 px-4">Quiz Avg</th>
                <th className="py-3 px-4">Assignments</th>
                <th className="py-3 px-4">Predicted Risk</th>
                <th className="py-3 px-4">Last AI Run</th>
                <th className="py-3 px-4 text-center">Intervention Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                    No students matching the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                        {student.id}
                      </td>

                      {/* Name & Major */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                              student.predictedRisk === 'High'
                                ? 'bg-red-50 text-red-600 border-red-200'
                                : student.predictedRisk === 'Medium'
                                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                                  : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            }`}
                          >
                            {student.initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer">
                              {student.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {student.major} • {student.year}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Attendance */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-semibold">
                          {student.attendanceTrend === 'down' && (
                            <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                          )}
                          {student.attendanceTrend === 'up' && (
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                          {student.attendanceTrend === 'flat' && (
                            <span className="text-slate-400 font-bold">&mdash;</span>
                          )}
                          <span
                            className={
                              student.attendance < 75
                                ? 'text-red-600'
                                : student.attendance < 85
                                  ? 'text-slate-700'
                                  : 'text-emerald-600'
                            }
                          >
                            {student.attendance}%
                          </span>
                        </div>
                      </td>

                      {/* GPA */}
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {student.gpa.toFixed(2)}
                      </td>

                      {/* Quiz Avg with mini bar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 w-7">
                            {student.quizAvg}%
                          </span>
                          <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${
                                student.quizAvg < 60
                                  ? 'bg-red-500'
                                  : student.quizAvg < 75
                                    ? 'bg-slate-400'
                                    : 'bg-emerald-500'
                              }`}
                              style={{ width: `${student.quizAvg}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Assignments */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            student.assignmentsStatus === 'danger'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : student.assignmentsStatus === 'warning'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {student.assignmentsText}
                        </span>
                      </td>

                      {/* Predicted Risk */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                            student.predictedRisk === 'High'
                              ? 'bg-red-100 text-red-700 border-red-200'
                              : student.predictedRisk === 'Medium'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          <span>{student.predictedRisk}</span>
                          <span>({student.riskScore}%)</span>
                        </span>
                      </td>

                      {/* Last AI Run */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                        {student.lastAiRun}
                      </td>

                      {/* Intervention Actions */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {student.predictedRisk === 'High' && (
                            <button
                              type="button"
                              onClick={() => setActiveIntervention(student)}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition shadow-2xs flex items-center gap-1 cursor-pointer"
                            >
                              <span>🚨</span>
                              <span>Intervene</span>
                            </button>
                          )}
                          {student.predictedRisk === 'Medium' && (
                            <button
                              type="button"
                              onClick={() => setActiveIntervention(student)}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold text-xs rounded-lg transition shadow-2xs flex items-center gap-1 cursor-pointer"
                            >
                              <span>🎓</span>
                              <span>Tutor Plan</span>
                            </button>
                          )}
                          {student.predictedRisk === 'Safe' && (
                            <button
                              type="button"
                              onClick={() => {
                                setToastMessage(`${student.name} is on track. No action needed.`);
                                setTimeout(() => setToastMessage(null), 3000);
                              }}
                              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-medium text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
                            >
                              <span>✓</span>
                              <span>On Track</span>
                            </button>
                          )}

                          {/* Quick details / analytics icons */}
                          <Link
                            href={`/students/${student.id}`}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition"
                            title="Inspect Student Record"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/prediction/${student.id}`}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100 transition"
                            title="View Model SHAP Breakdown"
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ======================================================== */}
        {/* 6. Table Footer / Pagination                             */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-800">{filteredStudents.length}</span>{' '}
            of <span className="font-semibold text-slate-800">1,250</span> total monitored students
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 text-slate-500 hover:text-slate-800 disabled:opacity-40 cursor-pointer font-medium"
            >
              &lt; Previous
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            <span className="px-1 text-slate-400">...</span>

            <button
              type="button"
              onClick={() => setCurrentPage(25)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer transition ${
                currentPage === 25
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              25
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(25, p + 1))}
              className="px-2.5 py-1 text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 7. Intervention Trigger Modal                            */}
      {/* ======================================================== */}
      {activeIntervention && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeIntervention.predictedRisk === 'High'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {activeIntervention.predictedRisk === 'High'
                      ? 'Deploy Urgent Academic Intervention'
                      : 'Configure Departmental Tutoring Plan'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Student ID: {activeIntervention.id} • {activeIntervention.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveIntervention(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Risk Assessment:</span>
                  <span className="font-bold text-red-600">
                    {activeIntervention.predictedRisk} ({activeIntervention.riskScore}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Attendance:</span>
                  <span className="font-semibold text-slate-800">
                    {activeIntervention.attendance}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cumulative GPA:</span>
                  <span className="font-semibold text-slate-800">{activeIntervention.gpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assignment Status:</span>
                  <span className="font-semibold text-slate-800">
                    {activeIntervention.assignmentsText}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assigned Intervention Protocol:
                </label>
                <select className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800">
                  <option>Attendance Contract + Mandatory Weekly Check-in</option>
                  <option>Emergency Academic Peer Tutoring (2x weekly)</option>
                  <option>Parent / Advisor Academic Conference</option>
                  <option>Counseling &amp; Student Wellness Referral</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Advisor Notes &amp; Action Plan:
                </label>
                <textarea
                  rows={3}
                  defaultValue={`Automated early-warning signal triggered due to declining attendance (${activeIntervention.attendance}%) and ${activeIntervention.assignmentsText}.`}
                  className="w-full p-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveIntervention(null)}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setToastMessage(
                    `Intervention protocol saved and logged for ${activeIntervention.name}.`
                  );
                  setActiveIntervention(null);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
              >
                Confirm &amp; Notify Advisor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
