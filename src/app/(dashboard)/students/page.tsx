'use client';

import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  UserPlus,
  Users,
  X,
} from 'lucide-react';

interface StudentDossier {
  id: string;
  code: string;
  name: string;
  initials: string;
  email: string;
  avatarColor: 'red' | 'blue' | 'green' | 'teal';
  department: string;
  major: string;
  cohort: string;
  cohortDetail: string;
  gpa: number;
  gpaTrend: 'up' | 'down' | 'flat';
  attendanceRate: number;
  attendanceAttended: number;
  attendanceTotal: number;
  attendanceTrend: 'up' | 'down' | 'flat';
  lmsWeeklyHours: number;
  lmsTrendPct: number;
  riskStatus: 'High' | 'Medium' | 'Safe';
  riskScore: number;
  riskClassPill: string;
  advisor: string;
  unexcusedAbsences: number;
  midtermAverage: number;
  criticalCourse: string;
  dangerFlagText: string;
  trajectoryPoints: number[];
}

const studentsRoster: StudentDossier[] = [
  {
    id: 'stu-01',
    code: 'STU-2024-041',
    name: 'Marcus Vance',
    initials: 'MV',
    email: 'm.vance@campus.edu',
    avatarColor: 'red',
    department: 'Computer Science',
    major: 'Software Systems',
    cohort: '4th Sem',
    cohortDetail: '4th Semester (Sophomore)',
    gpa: 1.92,
    gpaTrend: 'down',
    attendanceRate: 58,
    attendanceAttended: 16,
    attendanceTotal: 28,
    attendanceTrend: 'down',
    lmsWeeklyHours: 2.2,
    lmsTrendPct: -42,
    riskStatus: 'High',
    riskScore: 92,
    riskClassPill: 'Tier 3 Critical Risk (92% Dropout Risk)',
    advisor: 'Dr. Aris Thorne',
    unexcusedAbsences: 3,
    midtermAverage: 48.5,
    criticalCourse: 'CS201 Data Struct.',
    dangerFlagText:
      'Marcus Vance logged 0 LMS hours across 6 days, missing CS201 Quiz 3 and two lab sessions. The model projects an 88% chance of course failure without immediate contact.',
    trajectoryPoints: [88, 82, 75, 68, 59, 52, 45, 38],
  },
  {
    id: 'stu-02',
    code: 'STU-2024-114',
    name: 'Elena Rostova',
    initials: 'ER',
    email: 'e.rostova@campus.edu',
    avatarColor: 'blue',
    department: 'Computer Science',
    major: 'Artificial Intelligence',
    cohort: '6th Sem',
    cohortDetail: '6th Semester (Junior)',
    gpa: 3.84,
    gpaTrend: 'up',
    attendanceRate: 96,
    attendanceAttended: 27,
    attendanceTotal: 28,
    attendanceTrend: 'up',
    lmsWeeklyHours: 18.9,
    lmsTrendPct: 18,
    riskStatus: 'Safe',
    riskScore: 4,
    riskClassPill: 'Tier 1 Low Risk (4% Dropout Risk)',
    advisor: 'Prof. Jenkins',
    unexcusedAbsences: 0,
    midtermAverage: 92.4,
    criticalCourse: 'CS340 Neural Networks',
    dangerFlagText:
      'Excellent longitudinal mastery observed. Student active in peer mentoring circle with 98% timely assignment turn-in rate.',
    trajectoryPoints: [94, 95, 96, 95, 97, 98, 97, 98],
  },
  {
    id: 'stu-03',
    code: 'STU-2024-071',
    name: 'Devonte Washington',
    initials: 'DW',
    email: 'd.washington@campus.edu',
    avatarColor: 'blue',
    department: 'Electrical Eng.',
    major: 'Embedded Systems',
    cohort: '4th Sem',
    cohortDetail: '4th Semester (Sophomore)',
    gpa: 2.45,
    gpaTrend: 'flat',
    attendanceRate: 78,
    attendanceAttended: 17,
    attendanceTotal: 22,
    attendanceTrend: 'flat',
    lmsWeeklyHours: 6.4,
    lmsTrendPct: -8,
    riskStatus: 'Medium',
    riskScore: 54,
    riskClassPill: 'Tier 2 Medium Risk (54% Dropout Risk)',
    advisor: 'Dr. Aris Thorne',
    unexcusedAbsences: 1,
    midtermAverage: 67.0,
    criticalCourse: 'EE210 Circuits Analysis',
    dangerFlagText:
      'Electromagnetics lab performance shows mild volatility. TA office hours check-in recommended prior to practical exam.',
    trajectoryPoints: [82, 80, 78, 79, 74, 76, 75, 74],
  },
  {
    id: 'stu-04',
    code: 'STU-2024-098',
    name: 'Sophia Chen',
    initials: 'SC',
    email: 's.chen@campus.edu',
    avatarColor: 'green',
    department: 'Business Admin',
    major: 'Quantitative Finance',
    cohort: '2nd Sem',
    cohortDetail: '2nd Semester (Freshman)',
    gpa: 3.96,
    gpaTrend: 'up',
    attendanceRate: 98,
    attendanceAttended: 28,
    attendanceTotal: 28,
    attendanceTrend: 'up',
    lmsWeeklyHours: 19.2,
    lmsTrendPct: 22,
    riskStatus: 'Safe',
    riskScore: 2,
    riskClassPill: 'Tier 1 Low Risk (2% Dropout Risk)',
    advisor: 'Dr. Emily Lin',
    unexcusedAbsences: 0,
    midtermAverage: 98.0,
    criticalCourse: 'FIN201 Capital Markets',
    dangerFlagText:
      'Top decile student in quantitative finance. Recommended for departmental teaching assistant pathway.',
    trajectoryPoints: [96, 97, 98, 98, 99, 99, 100, 100],
  },
  {
    id: 'stu-05',
    code: 'STU-2024-032',
    name: 'Liam Gallagher',
    initials: 'LG',
    email: 'l.gallagher@campus.edu',
    avatarColor: 'red',
    department: 'Computer Science',
    major: 'Cybersecurity',
    cohort: '4th Sem',
    cohortDetail: '4th Semester (Sophomore)',
    gpa: 2.08,
    gpaTrend: 'down',
    attendanceRate: 61,
    attendanceAttended: 14,
    attendanceTotal: 23,
    attendanceTrend: 'down',
    lmsWeeklyHours: 4.1,
    lmsTrendPct: -34,
    riskStatus: 'High',
    riskScore: 86,
    riskClassPill: 'Tier 3 Critical Risk (86% Dropout Risk)',
    advisor: 'Prof. Jenkins',
    unexcusedAbsences: 2,
    midtermAverage: 52.0,
    criticalCourse: 'CS280 Network Protocols',
    dangerFlagText:
      'Consecutive late submissions logged across 3 weeks. Academic counseling session required to resolve study scheduling conflicts.',
    trajectoryPoints: [78, 72, 69, 64, 58, 54, 49, 44],
  },
  {
    id: 'stu-06',
    code: 'STU-2024-012',
    name: 'Ananya Patel',
    initials: 'AP',
    email: 'a.patel@campus.edu',
    avatarColor: 'teal',
    department: 'Health Science',
    major: 'Biomedical Informatics',
    cohort: '6th Sem',
    cohortDetail: '6th Semester (Junior)',
    gpa: 3.69,
    gpaTrend: 'up',
    attendanceRate: 91,
    attendanceAttended: 21,
    attendanceTotal: 23,
    attendanceTrend: 'up',
    lmsWeeklyHours: 11.5,
    lmsTrendPct: 4,
    riskStatus: 'Safe',
    riskScore: 7,
    riskClassPill: 'Tier 1 Low Risk (7% Dropout Risk)',
    advisor: 'Dr. Emily Lin',
    unexcusedAbsences: 0,
    midtermAverage: 88.5,
    criticalCourse: 'BIO310 Genomics Data',
    dangerFlagText:
      'Consistent progression across all lab milestones with proactive clinic participation.',
    trajectoryPoints: [89, 90, 91, 91, 92, 93, 93, 94],
  },
  {
    id: 'stu-07',
    code: 'STU-2024-055',
    name: 'Carlos Mendoza',
    initials: 'CM',
    email: 'c.mendoza@campus.edu',
    avatarColor: 'blue',
    department: 'Electrical Eng.',
    major: 'Signal Processing',
    cohort: '6th Sem',
    cohortDetail: '6th Semester (Junior)',
    gpa: 2.82,
    gpaTrend: 'flat',
    attendanceRate: 82,
    attendanceAttended: 18,
    attendanceTotal: 22,
    attendanceTrend: 'flat',
    lmsWeeklyHours: 8.1,
    lmsTrendPct: 1,
    riskStatus: 'Medium',
    riskScore: 28,
    riskClassPill: 'Tier 2 Medium Risk (28% Dropout Risk)',
    advisor: 'Prof. Ramirez',
    unexcusedAbsences: 1,
    midtermAverage: 74.0,
    criticalCourse: 'EE320 Discrete Signals',
    dangerFlagText:
      'Remediated calculus prerequisite. Regular participation in Saturday Math Clinic logged.',
    trajectoryPoints: [68, 70, 72, 75, 78, 80, 81, 83],
  },
  {
    id: 'stu-08',
    code: 'STU-2024-105',
    name: 'Harper Robinson',
    initials: 'HR',
    email: 'h.robinson@campus.edu',
    avatarColor: 'blue',
    department: 'Computer Science',
    major: 'Data Analytics',
    cohort: '2nd Sem',
    cohortDetail: '2nd Semester (Freshman)',
    gpa: 3.52,
    gpaTrend: 'up',
    attendanceRate: 88,
    attendanceAttended: 22,
    attendanceTotal: 25,
    attendanceTrend: 'up',
    lmsWeeklyHours: 12.2,
    lmsTrendPct: 9,
    riskStatus: 'Safe',
    riskScore: 9,
    riskClassPill: 'Tier 1 Low Risk (9% Dropout Risk)',
    advisor: 'Prof. Ramirez',
    unexcusedAbsences: 0,
    midtermAverage: 86.0,
    criticalCourse: 'DS101 Statistical Computing',
    dangerFlagText:
      'Strong analytical competencies demonstrated. Active participation in open laboratory projects.',
    trajectoryPoints: [84, 85, 87, 86, 88, 89, 90, 91],
  },
];

export default function StudentsManagementPage() {
  // State
  const [selectedStudentId, setSelectedStudentId] = useState<string>('stu-01');
  const [checkedStudentIds, setCheckedStudentIds] = useState<string[]>(['stu-01']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedCohort, setSelectedCohort] = useState('All Cohorts');
  const [selectedRiskTier, setSelectedRiskTier] = useState('All Tiers');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentDept, setNewStudentDept] = useState('Computer Science');

  // Currently active selected student for bottom Academic Dossier
  const activeStudent = useMemo(() => {
    return (
      studentsRoster.find((s) => s.id === selectedStudentId) || studentsRoster[0]
    );
  }, [selectedStudentId]);

  // Filtered roster
  const filteredRoster = useMemo(() => {
    return studentsRoster.filter((student) => {
      if (
        selectedProgram !== 'All Programs' &&
        !student.department.includes(selectedProgram)
      ) {
        return false;
      }

      if (
        selectedCohort !== 'All Cohorts' &&
        !student.cohortDetail.includes(selectedCohort)
      ) {
        return false;
      }

      if (
        selectedRiskTier === 'High Risk' &&
        student.riskStatus !== 'High'
      )
        return false;
      if (
        selectedRiskTier === 'Medium Risk' &&
        student.riskStatus !== 'Medium'
      )
        return false;
      if (
        selectedRiskTier === 'Safe' &&
        student.riskStatus !== 'Safe'
      )
        return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(q);
        const matchesCode = student.code.toLowerCase().includes(q);
        const matchesMajor = student.major.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesMajor) return false;
      }

      return true;
    });
  }, [selectedProgram, selectedCohort, selectedRiskTier, searchQuery]);

  const toggleCheckbox = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (checkedStudentIds.length === filteredRoster.length) {
      setCheckedStudentIds([]);
    } else {
      setCheckedStudentIds(filteredRoster.map((s) => s.id));
    }
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Student ID,Name,Email,Department,Major,Cohort,GPA,Attendance Rate,LMS Hours,Risk Status,Risk Probability,Advisor',
        ...filteredRoster.map(
          (s) =>
            `${s.code},"${s.name}","${s.email}","${s.department}","${s.major}","${s.cohort}",${s.gpa},${s.attendanceRate}%,${s.lmsWeeklyHours}h,${s.riskStatus},${s.riskScore}%,"${s.advisor}"`
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduPredict_Student_Roster_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Exported active student cohort roster CSV successfully.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    setToastMessage(`Student profile "${newStudentName}" enrolled and synced with SIS.`);
    setNewStudentName('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 pb-14 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 bg-slate-900 text-white rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. Page Header & Hub Actions                             */}
      {/* ======================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Academic Records Hub • Real-Time SIS Sync Active • Cohort 2024-2025
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Management &amp; Academic Dossier
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Manage registered cohort records, inspect individual academic trajectories, monitor
            automated ML early risk indicators, and coordinate advisor interventions.
          </p>
        </div>

        {/* Header Right Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            type="button"
            onClick={() => {
              setToastMessage('Filter settings view customized for academic advising.');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter Settings</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => {
                setToastMessage(`Bulk action ready for ${checkedStudentIds.length} selected students.`);
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition cursor-pointer"
            >
              <span>Bulk Actions</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Top Cohort Stat Cards (4 Cards)                       */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Students */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Total Students
              </span>
            </div>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              &uarr; 3.4%
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">1,250</div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>Active Cohort Sync</span>
            <span>98.2% Registered</span>
          </div>
        </div>

        {/* Card 2: Active Enrolled */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Active Enrolled
              </span>
            </div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              94.4% Rate
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">1,180</div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>Retention Health Index</span>
            <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94.4%' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Flagged for Review */}
        <div className="p-4 rounded-xl border border-red-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Flagged for Review
              </span>
            </div>
            <span className="bg-red-100 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              High Priority
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">48</div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>Requires Immediate Nudge</span>
            <span className="text-red-600 font-bold">12 Unassigned</span>
          </div>
        </div>

        {/* Card 4: Active Interventions */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Active Interventions
              </span>
            </div>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              18 Resolved Today
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">142</div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>Advisor Capacity</span>
            <span>84% Staffed</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Filter Controls Row                                   */}
      {/* ======================================================== */}
      <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 flex-1 min-w-[220px] max-w-sm">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student by name, ID, or email..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Program Select */}
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none shadow-2xs font-medium"
          >
            <option>All Programs</option>
            <option>Computer Science</option>
            <option>Electrical Eng.</option>
            <option>Business Admin</option>
            <option>Health Science</option>
          </select>

          {/* Cohort Select */}
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none shadow-2xs font-medium"
          >
            <option>All Cohorts</option>
            <option>4th Semester (Sophomore)</option>
            <option>6th Semester (Junior)</option>
            <option>2nd Semester (Freshman)</option>
          </select>

          {/* Risk Level Select */}
          <select
            value={selectedRiskTier}
            onChange={(e) => setSelectedRiskTier(e.target.value)}
            className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none shadow-2xs font-medium"
          >
            <option>Risk Level: All Tiers</option>
            <option>High Risk</option>
            <option>Medium Risk</option>
            <option>Safe</option>
          </select>

          {/* Attendance Select */}
          <select className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none shadow-2xs font-medium">
            <option>Attendance: Any %</option>
            <option>&lt; 70% Attendance</option>
            <option>70% - 85% Attendance</option>
            <option>&gt; 85% Attendance</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedProgram('All Programs');
              setSelectedCohort('All Cohorts');
              setSelectedRiskTier('Risk Level: All Tiers');
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
            title="Reset Filters"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Selected Student Action Floating Bar                  */}
      {/* ======================================================== */}
      {checkedStudentIds.length > 0 && (
        <div className="p-3 bg-slate-900 text-white rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-bold">
              {checkedStudentIds.length}{' '}
              {checkedStudentIds.length === 1 ? 'Student Selected' : 'Students Selected'}:
            </span>
            <span className="text-slate-300 font-mono text-[11px]">
              {checkedStudentIds.length === 1
                ? `${activeStudent.name} (${activeStudent.code})`
                : `${checkedStudentIds.length} profiles queued for bulk intervention`}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setToastMessage(`Assigned lead advisor to ${checkedStudentIds.length} students.`);
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 cursor-pointer"
            >
              Assign Advisor
            </button>
            <button
              type="button"
              onClick={() => {
                setToastMessage(`Direct academic warning alert sent to ${checkedStudentIds.length} students.`);
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 cursor-pointer"
            >
              Send Direct Alert
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 cursor-pointer"
            >
              Export Record
            </button>
            <button
              type="button"
              onClick={() => setCheckedStudentIds([])}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. Main High-Density Students Table                      */}
      {/* ======================================================== */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-3 text-center w-8">
                  <input
                    type="checkbox"
                    checked={checkedStudentIds.length === filteredRoster.length && filteredRoster.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Student Profile &amp; ID</th>
                <th className="py-3 px-4">Department &amp; Major</th>
                <th className="py-3 px-4 text-center">Cohort</th>
                <th className="py-3 px-4 text-center">Cum. GPA</th>
                <th className="py-3 px-4 text-center">Attendance</th>
                <th className="py-3 px-4 text-center">LMS Activity</th>
                <th className="py-3 px-4 text-center">ML Risk Status</th>
                <th className="py-3 px-4 text-center">Assigned Advisor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredRoster.map((student) => {
                const isSelected = selectedStudentId === student.id;
                const isChecked = checkedStudentIds.includes(student.id);

                return (
                  <tr
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70'
                        : isChecked
                          ? 'bg-blue-50/30'
                          : 'hover:bg-slate-50/60'
                    }`}
                  >
                    {/* Checkbox */}
                    <td
                      className="py-3 px-3 text-center"
                      onClick={(e) => toggleCheckbox(student.id, e)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>

                    {/* Student Profile & ID */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                            student.avatarColor === 'red'
                              ? 'bg-red-50 text-red-600 border-red-200'
                              : student.avatarColor === 'green'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : student.avatarColor === 'teal'
                                  ? 'bg-teal-50 text-teal-700 border-teal-200'
                                  : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}
                        >
                          {student.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-xs">
                              {student.name}
                            </span>
                            {student.riskStatus === 'High' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            )}
                          </div>
                          <div className="font-mono text-[10px] text-slate-400">
                            {student.code} • {student.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Department & Major */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 text-xs">
                        {student.department}
                      </div>
                      <div className="text-[10px] text-slate-400">{student.major}</div>
                    </td>

                    {/* Cohort */}
                    <td className="py-3 px-4 text-center">
                      <span className="font-semibold text-slate-700 text-xs block">
                        {student.cohort}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {student.cohortDetail.includes('Soph')
                          ? '(Soph)'
                          : student.cohortDetail.includes('Junior')
                            ? '(Junior)'
                            : '(Fresh)'}
                      </span>
                    </td>

                    {/* Cum. GPA */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono font-bold text-xs border ${
                          student.gpa < 2.0
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : student.gpa < 3.0
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <span>{student.gpa.toFixed(2)}</span>
                        {student.gpaTrend === 'down' && <span>&searr;</span>}
                        {student.gpaTrend === 'up' && <span>&nearr;</span>}
                        {student.gpaTrend === 'flat' && <span>&mdash;</span>}
                      </span>
                    </td>

                    {/* Attendance */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 font-semibold text-xs">
                          <span
                            className={
                              student.attendanceRate < 70
                                ? 'text-red-600 font-bold'
                                : student.attendanceRate < 85
                                  ? 'text-slate-700'
                                  : 'text-emerald-600 font-bold'
                            }
                          >
                            {student.attendanceRate}%
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {student.attendanceAttended}/{student.attendanceTotal}
                          </span>
                        </div>
                        <div className="w-16 bg-slate-100 rounded-full h-1 mt-1 overflow-hidden">
                          <div
                            className={`h-1 rounded-full ${
                              student.attendanceRate < 70
                                ? 'bg-red-500'
                                : student.attendanceRate < 85
                                  ? 'bg-slate-400'
                                  : 'bg-emerald-500'
                            }`}
                            style={{ width: `${student.attendanceRate}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* LMS Activity */}
                    <td className="py-3 px-4 text-center">
                      <span className="font-semibold text-slate-800 text-xs block">
                        {student.lmsWeeklyHours} hrs
                      </span>
                      <span
                        className={`text-[10px] font-bold block ${
                          student.lmsTrendPct < 0 ? 'text-red-600' : 'text-emerald-600'
                        }`}
                      >
                        {student.lmsTrendPct > 0 ? `+${student.lmsTrendPct}%` : `${student.lmsTrendPct}%`}
                      </span>
                    </td>

                    {/* ML Risk Status */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          student.riskStatus === 'High'
                            ? 'bg-red-100 text-red-700 border-red-200'
                            : student.riskStatus === 'Medium'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <span>
                          {student.riskStatus === 'High' && 'High'}
                          {student.riskStatus === 'Medium' && 'Medium'}
                          {student.riskStatus === 'Safe' && 'Safe'}
                        </span>
                        <span>({student.riskScore}%)</span>
                      </span>
                    </td>

                    {/* Assigned Advisor */}
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium text-slate-700 text-xs">
                        {student.advisor}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer & Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-800">1 to 8</span> of{' '}
            <span className="font-semibold text-slate-800">1,250</span> students • Page 1 of 157
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-2xs"
            >
              1
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold text-xs"
            >
              2
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold text-xs"
            >
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button
              type="button"
              className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold text-xs"
            >
              157
            </button>
            <button
              type="button"
              className="px-2 py-1 text-slate-600 hover:text-slate-900 font-medium text-xs cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. Active Student Academic Dossier Panel                 */}
      {/* ======================================================== */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-5">
        {/* Dossier Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${
                activeStudent.avatarColor === 'red'
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : activeStudent.avatarColor === 'green'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : 'bg-blue-50 text-blue-600 border-blue-200'
              }`}
            >
              {activeStudent.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-extrabold text-slate-900">
                  {activeStudent.name}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    activeStudent.riskStatus === 'High'
                      ? 'bg-red-100 text-red-700 border-red-200'
                      : activeStudent.riskStatus === 'Medium'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {activeStudent.riskClassPill}
                </span>
                <span className="text-slate-400 text-xs">Cohort 2023-Fall</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                ID: {activeStudent.code} • {activeStudent.major} ({activeStudent.cohort}) •{' '}
                {activeStudent.email}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Lead Advisor: <span className="font-semibold text-slate-700">{activeStudent.advisor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setToastMessage(`Generated diagnostic dossier for ${activeStudent.name}.`);
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Diagnostic Dossier</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setToastMessage(`Initiated retention intervention protocol for ${activeStudent.name}.`);
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
            >
              Take Intervention
            </button>
          </div>
        </div>

        {/* 3 Metric Summary Cards inside Dossier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Attendance Health */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">
              <span>Attendance Health</span>
              <span>📅</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{activeStudent.attendanceRate}%</span>
              <span className="text-xs font-bold text-red-600">&searr; -14% drop (30d)</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
              <span>Attended {activeStudent.attendanceAttended} of {activeStudent.attendanceTotal} Lectures</span>
              <span className="text-red-600 font-semibold">{activeStudent.unexcusedAbsences} Unexcused</span>
            </div>
          </div>

          {/* Card 2: Cumulative GPA */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">
              <span>Cumulative GPA</span>
              <span>⭐</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{activeStudent.gpa.toFixed(2)}</span>
              <span className="text-xs text-slate-400 font-medium">/ 4.00 Max</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
              <span className={activeStudent.gpa < 2.0 ? 'text-red-600 font-semibold' : 'text-slate-600'}>
                {activeStudent.gpa < 2.0 ? 'Below 2.0 Standing Min' : 'In Good Academic Standing'}
              </span>
              <span>Tier Deficit: -0.08</span>
            </div>
          </div>

          {/* Card 3: Midterm & Quiz Average */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">
              <span>Midterm &amp; Quiz Average</span>
              <span>📊</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{activeStudent.midtermAverage}%</span>
              <span
                className={`text-xs font-bold ${
                  activeStudent.midtermAverage < 60 ? 'text-red-600' : 'text-emerald-600'
                }`}
              >
                {activeStudent.midtermAverage < 60 ? 'Failing Mark' : 'Passing Mark'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
              <span className="text-red-600 font-semibold">Danger: {activeStudent.criticalCourse}</span>
              <span>Quiz 3: 0/100</span>
            </div>
          </div>
        </div>

        {/* Bottom Split: Weeks 1-8 Trajectory Chart & AI Prescribed Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
          {/* Left: Academic Trajectory Chart */}
          <div className="lg:col-span-7 p-4 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">
                  Weeks 1-8 Academic Trajectory
                </span>
                <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-blue-600" />
                    <span>Attendance</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-red-500" />
                    <span>Coursework</span>
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Attendance decline correlated with {activeStudent.criticalCourse} Assignment Deadlines
              </p>

              {/* Trajectory SVG Curve */}
              <div className="h-40 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 450 140">
                  {/* Danger zone box at bottom */}
                  <rect x="30" y="90" width="400" height="40" fill="#fef2f2" opacity="0.6" />
                  <text x="35" y="105" fontSize="8" fontWeight="bold" fill="#ef4444">
                    Danger Threshold &lt; 65%
                  </text>

                  {/* Horizontal gridlines */}
                  <line x1="30" y1="30" x2="430" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="30" y1="70" x2="430" y2="70" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="30" y1="110" x2="430" y2="110" stroke="#f1f5f9" strokeDasharray="3 3" />

                  {/* Attendance Line Curve */}
                  <path
                    d="M 40,40 Q 150,50 250,90 T 420,115"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  {/* Coursework Decline Line */}
                  <path
                    d="M 40,48 Q 160,65 270,105 T 420,122"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Data points */}
                  <circle cx="40" cy="40" r="3" fill="#2563eb" />
                  <circle cx="160" cy="55" r="3" fill="#2563eb" />
                  <circle cx="280" cy="95" r="3" fill="#2563eb" />
                  <circle cx="420" cy="115" r="3.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1 px-1">
                  <span>W1 (Sep 02)</span>
                  <span>W2</span>
                  <span>W3</span>
                  <span>W4 (Quiz 1)</span>
                  <span>W5</span>
                  <span>W6 (Midterm)</span>
                  <span>W7 (Quiz 3 Missed)</span>
                  <span className="text-red-600 font-bold">W8 (Current)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: AI Prescribed Action Plan */}
          <div className="lg:col-span-5 p-4 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Prescribed Action Plan</span>
                </span>
                <span className="text-[10px] text-slate-400">Generated 3h ago</span>
              </div>

              {/* Critical Alert Box */}
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-slate-700 my-2.5">
                <span className="font-bold text-red-700 block mb-0.5">
                  Critical Retention Anomaly
                </span>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {activeStudent.dangerFlagText}
                </p>
              </div>

              {/* 4 Quick Actions in 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage(`1:1 Counseling session scheduled with ${activeStudent.advisor}.`);
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-left shadow-2xs transition cursor-pointer"
                >
                  <span className="font-bold text-slate-800 text-[11px] block">Book 1:1 Counseling</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Schedule Dr. Thorne</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setToastMessage(`Academic Standing Alert dispatched to parent/guardian.`);
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-left shadow-2xs transition cursor-pointer"
                >
                  <span className="font-bold text-slate-800 text-[11px] block">Parent Notification</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Academic Standing Alert</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setToastMessage(`Enrolled student in Peer Tutoring Study Group.`);
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-left shadow-2xs transition cursor-pointer"
                >
                  <span className="font-bold text-slate-800 text-[11px] block">Peer Tutoring Pool</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">CS201 Study Group</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setToastMessage(`Formal Academic Probation review file created.`);
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-left shadow-2xs transition cursor-pointer"
                >
                  <span className="font-bold text-slate-800 text-[11px] block">Academic Probation</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Formal Committee Review</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 7. Add New Student Modal                                 */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Add New Student Profile</h3>
                  <p className="text-[11px] text-slate-400">Manual SIS Cohort Registration</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Student Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander Mitchell"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={newStudentDept}
                  onChange={(e) => setNewStudentDept(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 bg-white"
                >
                  <option>Computer Science</option>
                  <option>Electrical Eng.</option>
                  <option>Business Admin</option>
                  <option>Health Science</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Cohort</label>
                <select className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 bg-white">
                  <option>2nd Semester (Freshman)</option>
                  <option>4th Semester (Sophomore)</option>
                  <option>6th Semester (Junior)</option>
                  <option>8th Semester (Senior)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Lead Advisor</label>
                <select className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 bg-white">
                  <option>Dr. Aris Thorne</option>
                  <option>Prof. Jenkins</option>
                  <option>Dr. Emily Lin</option>
                  <option>Prof. Ramirez</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save &amp; Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
