'use client';

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Download,
  FileText,
  Layers,
  Plus,
  Search,
  Send,
  Sparkles,
  UserCheck,
  X,
  Zap,
} from 'lucide-react';

interface InterventionBlueprint {
  id: string;
  studentId: string;
  studentName: string;
  initials: string;
  avatarColor: 'red' | 'blue' | 'green';
  major: string;
  classYear: string;
  advisorName: string;
  category: 'Attendance' | 'Tutoring' | 'ExamRecovery' | 'Assignment';
  riskScore: number;
  riskSeverity: 'Critical' | 'Moderate' | 'Resolved';
  riskLabel: string;
  telemetryIcon: string;
  telemetryTitle: string;
  telemetryTimestamp: string;
  telemetryText: string;
  telemetryBorderColor: string;
  blueprintTitle: string;
  blueprintSummary: string;
  stepCurrent: number;
  stepTotal: number;
  stepLabel: string;
  stepPercentage: number;
  stepSubtext: string;
  stepPillColor: 'blue' | 'red' | 'green';
  nextCheckin: string;
  touchpoints: string;
  statusFooterText: string;
  isResolved?: boolean;
}

const mockBlueprints: InterventionBlueprint[] = [
  {
    id: 'int-01',
    studentId: 'STU-88214',
    studentName: 'Marcus Vance',
    initials: 'MV',
    avatarColor: 'red',
    major: 'B.S. Computer Science',
    classYear: 'Sophomore (Semester 3)',
    advisorName: 'Dr. Aris Thorne',
    category: 'Attendance',
    riskScore: 94.2,
    riskSeverity: 'Critical',
    riskLabel: 'CRITICAL RISK LEVEL',
    telemetryIcon: '⚡',
    telemetryTitle: 'Active Diagnostics & Telemetry Report',
    telemetryTimestamp: 'Detected 12m ago',
    telemetryText:
      '3 consecutive Math/Data Structures quizzes scored below 45%. Cumulative LMS Check-in: Student unsubmitted lab assignments for 4 wks; low velocity trending: <3.5 hrs/week study sprint.',
    telemetryBorderColor: 'border-red-200 bg-red-50/60 text-red-950',
    blueprintTitle:
      '1-on-1 Peer Tutoring in Data Structures + Bi-weekly Attendance Contract',
    blueprintSummary:
      'Paired with senior tutor Julian Ross for 90-minute bi-weekly algorithms recap. Scheduled day-shifts match sparsity matrix. Enrolled in parent dashboard.',
    stepCurrent: 1,
    stepTotal: 4,
    stepLabel: 'Step 1 of 4 In-Progress',
    stepPercentage: 40,
    stepSubtext: 'Step 1: Tutor Pairing Activated (Next: Session Nov 19)',
    stepPillColor: 'blue',
    nextCheckin: 'Thursday 11:00 AM • In 2 days',
    touchpoints: 'Risk Triggered: Nov 14',
    statusFooterText: 'Under continuous monitoring',
    isResolved: false,
  },
  {
    id: 'int-02',
    studentId: 'STU-94112',
    studentName: 'Liam Gallagher',
    initials: 'LG',
    avatarColor: 'red',
    major: 'B.A. Digital Media',
    classYear: 'Freshman (Semester 1)',
    advisorName: 'Sandra Phillips',
    category: 'Assignment',
    riskScore: 89.6,
    riskSeverity: 'Critical',
    riskLabel: 'CRITICAL DROP-OUT RISK',
    telemetryIcon: '⚡',
    telemetryTitle: 'LMS Telemetry Instability',
    telemetryTimestamp: 'Synced 48m ago',
    telemetryText:
      'Severe 58% decrease in Canvas LMS weekly sessions (12h dropped to 2.4h). 3 consecutive deliverables missed; student opened course announcements and the past 4 business days.',
    telemetryBorderColor: 'border-red-200 bg-red-50/60 text-red-950',
    blueprintTitle: 'Academic Counseling & Study Habit Re-alignment Workshop',
    blueprintSummary:
      'Mandatory 45-minute intake to identify personal barrier factors. Curriculum builder: create manageable weekly blocks, un-bottleneck scripting blockerd.',
    stepCurrent: 1,
    stepTotal: 3,
    stepLabel: 'Step 1 of 3 Intake Needed',
    stepPercentage: 15,
    stepSubtext: 'Step 1: Mandatory Intake Session Booking',
    stepPillColor: 'red',
    nextCheckin: 'Room 304, Student Hall, Oct 26 (Assigned)',
    touchpoints: 'Risk Triggered: 3 days ago',
    statusFooterText: 'Action required within 24h',
    isResolved: false,
  },
  {
    id: 'int-03',
    studentId: 'STU-88129',
    studentName: 'Devonte Washington',
    initials: 'DW',
    avatarColor: 'blue',
    major: 'B.S. Electrical Engineering',
    classYear: 'Junior (Semester 5)',
    advisorName: 'Dr. Aris Thorne',
    category: 'ExamRecovery',
    riskScore: 64.8,
    riskSeverity: 'Moderate',
    riskLabel: 'MID-TIER BUFFER TARGET',
    telemetryIcon: '⚡',
    telemetryTitle: 'Lab Milestone Deficiencies',
    telemetryTimestamp: 'Synced 2h ago',
    telemetryText:
      'Electromagnetics lab modules scoring dropped from 84% to 58%. Completed catch-up module for Lab 2, but 3 remain unattempted while 11 classmates with same profile showed improvement.',
    telemetryBorderColor: 'border-blue-200 bg-blue-50/60 text-blue-950',
    blueprintTitle:
      'Supplemental Lab Cohort + Teaching Assistant Mentorship',
    blueprintSummary:
      "Assigned to TA Sasha Borisov's Thursday evening cohort. Authorized hands-on practice session before lab practical test to form foundational prerequisite recovery.",
    stepCurrent: 2,
    stepTotal: 4,
    stepLabel: 'Step 2 of 4 Active',
    stepPercentage: 55,
    stepSubtext: 'Step 2: Mid-term Lab Re-sit Scheduled (Nov 15)',
    stepPillColor: 'blue',
    nextCheckin: '2 touchpoints completed with TA Borisov',
    touchpoints: 'Updated 4 days ago',
    statusFooterText: 'Remediation velocity: 0.74 pts/wk',
    isResolved: false,
  },
  {
    id: 'int-04',
    studentId: 'STU-99432',
    studentName: 'Carlos Mendoza',
    initials: 'CM',
    avatarColor: 'green',
    major: 'B.S. Civil Engineering',
    classYear: 'Sophomore (Semester 3)',
    advisorName: 'Michael Chen',
    category: 'Tutoring',
    riskScore: 4.1,
    riskSeverity: 'Resolved',
    riskLabel: '+0.71 GPA RECOVERY',
    telemetryIcon: '✓',
    telemetryTitle: 'Case Resolution Overview',
    telemetryTimestamp: 'Resolved 1d ago',
    telemetryText:
      'Prior numbers: deficit (44% in Multivariable Math & overdue lab 2). 4 consecutive Saturday Math Clinic attendances. Calculus test score moved from 58% to 84%, corrective standing objective met.',
    telemetryBorderColor: 'border-emerald-200 bg-emerald-50/60 text-emerald-950',
    blueprintTitle:
      'Weekly Math Clinic Intensive (2 hrs/wk) + Peer Exam Study Group',
    blueprintSummary:
      'Student met all retention specs established by the Faculty Council and achieved 94% regulation compliance regarding both academic rigor and participation.',
    stepCurrent: 4,
    stepTotal: 4,
    stepLabel: '4 of 4 Steps Complete',
    stepPercentage: 100,
    stepSubtext: 'All 4 Intervention Milestones Successfully Satisfied',
    stepPillColor: 'green',
    nextCheckin: 'Michael Chen • Dashboard Discharged: Oct 18, 09:30',
    touchpoints: 'Duration: 4.5 weeks',
    statusFooterText: 'Case archive: export available',
    isResolved: true,
  },
];

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState<
    'All' | 'Attendance' | 'Tutoring' | 'ExamRecovery' | 'Assignment'
  >('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdvisor, setSelectedAdvisor] = useState('All Advisors');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customPlanStudent, setCustomPlanStudent] = useState('');
  const [customPlanCategory, setCustomPlanCategory] = useState('Attendance');

  const filteredBlueprints = useMemo(() => {
    return mockBlueprints.filter((bp) => {
      if (activeTab === 'Attendance' && bp.category !== 'Attendance') return false;
      if (activeTab === 'Tutoring' && bp.category !== 'Tutoring') return false;
      if (activeTab === 'ExamRecovery' && bp.category !== 'ExamRecovery') return false;
      if (activeTab === 'Assignment' && bp.category !== 'Assignment') return false;

      if (selectedAdvisor !== 'All Advisors' && !bp.advisorName.includes(selectedAdvisor)) {
        return false;
      }

      if (selectedPriority === 'Critical' && bp.riskSeverity !== 'Critical') return false;
      if (selectedPriority === 'Moderate' && bp.riskSeverity !== 'Moderate') return false;
      if (selectedPriority === 'Resolved' && bp.riskSeverity !== 'Resolved') return false;

      if (selectedStatus === 'In-Progress' && bp.isResolved) return false;
      if (selectedStatus === 'Completed' && !bp.isResolved) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = bp.studentName.toLowerCase().includes(q);
        const matchesId = bp.studentId.toLowerCase().includes(q);
        const matchesMajor = bp.major.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesMajor) return false;
      }

      return true;
    });
  }, [activeTab, selectedAdvisor, selectedPriority, selectedStatus, searchQuery]);

  const handleExportAll = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Student ID,Student Name,Major,Advisor,Risk Score,Risk Status,Blueprint Title,Progress,Status',
        ...filteredBlueprints.map(
          (b) =>
            `${b.studentId},"${b.studentName}","${b.major}","${b.advisorName}",${b.riskScore}%,${b.riskSeverity},"${b.blueprintTitle}",${b.stepPercentage}%,${b.statusFooterText}`
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduPredict_Interventions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Exported all recommendation blueprints successfully.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreatePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setToastMessage(
      `Custom retention plan created for student "${customPlanStudent || 'New Student'}".`
    );
    setCustomPlanStudent('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 pb-14 font-sans">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 bg-slate-900 text-white rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. Global AI Pipeline Banner                             */}
      {/* ======================================================== */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md border border-blue-800/60">
        <div className="flex items-start md:items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/50 border border-blue-400/40 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs tracking-wider uppercase text-cyan-300">
                AI Intervention Pipeline • Online
              </span>
              <span className="bg-blue-800/80 text-blue-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-600/50">
                98.1% Confidence Score
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Newly generated recommendations appended for Fall 2024 cohort. 14 critical early
              alerts prioritized for immediate advisor action.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setToastMessage('Synthesizing cohort telemetry across 1,250 records...');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/60 hover:bg-slate-800 text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            View Synthesis
          </button>
          <button
            type="button"
            onClick={() => {
              setToastMessage('Batch dispatched 14 critical notifications to academic advisors.');
              setTimeout(() => setToastMessage(null), 3000);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            Run Batch Dispatch
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Page Header & Actions                                 */}
      {/* ======================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Module 07 • Retention Action Plans • Rule Engine Interventions
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Personalized Recommendations &amp; Interventions
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Automated multi-factor risk diagnostics paired with faculty-led developmental
            remediation blueprints. Empowering academic teams with targeted student interventions.
          </p>
        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={handleExportAll}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export All Plans (CSV/PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Create Custom Intervention Plan</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Top Metrics Row (4 Cards)                             */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Active */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Retention Plan Workload
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-slate-700">Total Active</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              +14 this week
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">142</div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>Capacity: 78%</span>
            <span>Target: &lt; 180</span>
          </div>
        </div>

        {/* Card 2: Faculty Engagement */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Faculty Engagement
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-slate-700">In-Progress Support</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">86</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            Assigned to 18 Advisors
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>18 Pending Review</span>
            <span>Avg Time: 3.2 days</span>
          </div>
        </div>

        {/* Card 3: Historical Efficacy */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Historical Efficacy
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-slate-700">Completed Plans</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              89.4% Success
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">428</div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>382 Resolved to Low Risk</span>
            <span className="text-emerald-600 font-semibold">+0.41 Avg GPA Shift</span>
          </div>
        </div>

        {/* Card 4: Student Impact */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Student Impact
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-slate-700">Students Supported</span>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Tier 1 &amp; Tier 2
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">312</div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>Active Fall Roster Cohort</span>
            <span>27 Pending Intake</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Filter Toolbar & Tabs                                 */}
      {/* ======================================================== */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3.5">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('All')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
              activeTab === 'All'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Interventions (142)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Attendance')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
              activeTab === 'Attendance'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Attendance Improvement (44)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Tutoring')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
              activeTab === 'Tutoring'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Study Habits &amp; Tutoring (51)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ExamRecovery')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
              activeTab === 'ExamRecovery'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Quiz &amp; Exam Recovery (32)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Assignment')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
              activeTab === 'Assignment'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Assignment Catch-up (15)
          </button>
        </div>

        {/* Secondary Filter Dropdowns & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by student name or ID..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Advisor Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-[10px] uppercase tracking-wider text-slate-400">
                Advisor:
              </span>
              <select
                value={selectedAdvisor}
                onChange={(e) => setSelectedAdvisor(e.target.value)}
                className="py-1 px-2.5 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none"
              >
                <option value="All Advisors">All Advisors</option>
                <option value="Dr. Aris Thorne">Dr. Aris Thorne (38)</option>
                <option value="Sandra Phillips">Sandra Phillips (24)</option>
                <option value="Michael Chen">Michael Chen (24)</option>
              </select>
            </div>

            {/* Priority Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-[10px] uppercase tracking-wider text-slate-400">
                Priority:
              </span>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="py-1 px-2.5 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none"
              >
                <option value="All Priorities">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="Moderate">Moderate</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-[10px] uppercase tracking-wider text-slate-400">
                Status:
              </span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="py-1 px-2.5 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none"
              >
                <option value="All Status">All Status</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {(searchQuery ||
              activeTab !== 'All' ||
              selectedAdvisor !== 'All Advisors' ||
              selectedPriority !== 'All Priorities' ||
              selectedStatus !== 'All Status') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('All');
                  setSelectedAdvisor('All Advisors');
                  setSelectedPriority('All Priorities');
                  setSelectedStatus('All Status');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline ml-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. 2x2 Intervention Action Plan Cards Grid               */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBlueprints.length === 0 ? (
          <div className="col-span-2 p-12 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
            No intervention blueprints found matching the specified filter criteria.
          </div>
        ) : (
          filteredBlueprints.map((plan) => {
            return (
              <div
                key={plan.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-sm transition flex flex-col justify-between"
              >
                <div>
                  {/* Student Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                          plan.avatarColor === 'red'
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : plan.avatarColor === 'blue'
                              ? 'bg-blue-50 text-blue-600 border-blue-200'
                              : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        }`}
                      >
                        {plan.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {plan.studentName}
                          </span>
                          <span className="bg-slate-100 text-slate-600 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-200">
                            {plan.studentId}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {plan.major} • {plan.classYear}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          Advisor: {plan.advisorName}
                        </div>
                      </div>
                    </div>

                    {/* Risk Tag */}
                    <div className="text-right shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          plan.riskSeverity === 'Critical'
                            ? 'bg-red-100 text-red-700 border-red-200'
                            : plan.riskSeverity === 'Moderate'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <span>
                          {plan.riskSeverity === 'Critical' && '🔴'}
                          {plan.riskSeverity === 'Moderate' && '🔵'}
                          {plan.riskSeverity === 'Resolved' && '🟢'}
                        </span>
                        <span>
                          {plan.riskSeverity === 'Resolved'
                            ? 'Resolved / Remediated'
                            : `${plan.riskScore}% AI Risk`}
                        </span>
                      </span>
                      <div
                        className={`text-[9px] font-bold tracking-wider uppercase mt-1 ${
                          plan.riskSeverity === 'Critical'
                            ? 'text-red-600'
                            : plan.riskSeverity === 'Moderate'
                              ? 'text-blue-600'
                              : 'text-emerald-600'
                        }`}
                      >
                        {plan.riskLabel}
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Alert Container */}
                  <div
                    className={`mt-4 p-3 rounded-xl border text-xs leading-relaxed ${plan.telemetryBorderColor}`}
                  >
                    <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                      <span className="flex items-center gap-1.5">
                        <span>{plan.telemetryIcon}</span>
                        <span>{plan.telemetryTitle}</span>
                      </span>
                      <span className="text-[10px] font-medium opacity-80">
                        {plan.telemetryTimestamp}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-90">{plan.telemetryText}</p>
                  </div>

                  {/* Active Retention Blueprint Container */}
                  <div className="mt-3.5 p-3.5 rounded-xl border border-blue-200/90 bg-blue-50/50 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold tracking-wider text-blue-700 uppercase flex items-center gap-1">
                        <span>🎯</span>
                        <span>Active Retention Blueprint</span>
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          plan.stepPillColor === 'red'
                            ? 'bg-red-100 text-red-700 border-red-200'
                            : plan.stepPillColor === 'green'
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                              : 'bg-blue-100 text-blue-700 border-blue-200'
                        }`}
                      >
                        {plan.stepLabel}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs mt-1">
                      {plan.blueprintTitle}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                      {plan.blueprintSummary}
                    </p>

                    {/* Progress Bar & Substeps */}
                    <div className="my-3 pt-2 border-t border-blue-100">
                      <div className="flex items-center justify-between text-[11px] mb-1 font-semibold text-slate-700">
                        <span>{plan.stepSubtext}</span>
                        <span>{plan.stepPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            plan.stepPillColor === 'green'
                              ? 'bg-emerald-600'
                              : plan.stepPillColor === 'red'
                                ? 'bg-red-500'
                                : 'bg-blue-600'
                          }`}
                          style={{ width: `${plan.stepPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer Details inside Blueprint */}
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>{plan.nextCheckin}</span>
                      <span>{plan.touchpoints}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span
                    className={`text-[11px] font-medium flex items-center gap-1.5 ${
                      plan.statusFooterText.includes('24h')
                        ? 'text-red-600 font-bold'
                        : 'text-slate-500'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        plan.isResolved
                          ? 'bg-emerald-500'
                          : plan.statusFooterText.includes('24h')
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                      }`}
                    />
                    <span>{plan.statusFooterText}</span>
                  </span>

                  {/* Actions for each card type */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {plan.riskSeverity === 'Critical' && plan.id === 'int-01' && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Logged case notes for ${plan.studentName}.`);
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Log Case Notes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Scheduled review with ${plan.studentName}.`);
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Schedule Review
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Notice sent to ${plan.studentName} & Department.`);
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send Notice</span>
                        </button>
                      </>
                    )}

                    {plan.riskSeverity === 'Critical' && plan.id === 'int-02' && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(
                              `SMS alert dispatched to student phone terminal: ${plan.studentName}.`
                            );
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Send SMS / Email Alert
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Intake appointment booked for ${plan.studentName}.`);
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs cursor-pointer"
                        >
                          Schedule Intake Now
                        </button>
                      </>
                    )}

                    {plan.riskSeverity === 'Moderate' && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Meeting session logged for ${plan.studentName}.`);
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Log Meeting
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Progress updated for ${plan.studentName}.`);
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Update Progress
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(`Milestone satisfied for ${plan.studentName}.`);
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Mark Milestone Met
                        </button>
                      </>
                    )}

                    {plan.isResolved && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(
                              `Viewing post-mortem analytics report for ${plan.studentName}.`
                            );
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          View Post-Mortem Report
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setToastMessage(
                              `Downloading certified summary PDF for ${plan.studentName}...`
                            );
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Summary PDF
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ======================================================== */}
      {/* 6. Bottom Strategy Efficacy Comparison Section           */}
      {/* ======================================================== */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              STRATEGY BENCHMARKING
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Intervention Strategy Efficacy Comparison
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluating retention rates and GPA uplift across fully intervention protocols this
              academic year.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 self-start md:self-auto">
            Historical Cohort (Fall 2023 - Spring 2024)
          </span>
        </div>

        {/* 4 Horizontal Benchmark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Strategy 1: Peer Tutoring */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-800">Peer Tutoring Pairing</span>
              <span className="font-black text-blue-600 text-sm">89.1%</span>
            </div>
            <div className="text-[11px] text-slate-500 mb-2">112 students enrolled</div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-2">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '89.1%' }} />
            </div>
            <div className="text-[10px] text-slate-600 font-medium">
              Avg. GPA Boost: <span className="font-bold text-slate-800">+0.48 pts</span>
            </div>
          </div>

          {/* Strategy 2: Attendance Contracts */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-800">Attendance Contracts</span>
              <span className="font-black text-blue-600 text-sm">85.4%</span>
            </div>
            <div className="text-[11px] text-slate-500 mb-2">84 students enrolled</div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-2">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85.4%' }} />
            </div>
            <div className="text-[10px] text-slate-600 font-medium">
              Avg. Attendance Shift: <span className="font-bold text-slate-800">+28.6%</span>
            </div>
          </div>

          {/* Strategy 3: Study Habit Workshops */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-800">Study Habit Workshops</span>
              <span className="font-black text-blue-600 text-sm">78.7%</span>
            </div>
            <div className="text-[11px] text-slate-500 mb-2">62 students enrolled</div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-2">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '78.7%' }} />
            </div>
            <div className="text-[10px] text-slate-600 font-medium">
              Weekly LMS Hours: <span className="font-bold text-slate-800">+4.4 hrs</span>
            </div>
          </div>

          {/* Strategy 4: Math/Lab Science Clinics */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-800">Math/Lab Science Clinics</span>
              <span className="font-black text-emerald-600 text-sm">91.4%</span>
            </div>
            <div className="text-[11px] text-slate-500 mb-2">98 students enrolled</div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-2">
              <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '91.4%' }} />
            </div>
            <div className="text-[10px] text-slate-600 font-medium">
              Exam Pass Rate Rise: <span className="font-bold text-slate-800">+33.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 7. Create Custom Intervention Modal                      */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Create Custom Intervention Blueprint
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Pair algorithmic signals with advisor remediation actions
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePlanSubmit} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Student Name or ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. STU-98214 or Marcus Lawson"
                  value={customPlanStudent}
                  onChange={(e) => setCustomPlanStudent(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Intervention Category
                </label>
                <select
                  value={customPlanCategory}
                  onChange={(e) => setCustomPlanCategory(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 bg-white"
                >
                  <option value="Attendance">Attendance Improvement Protocol</option>
                  <option value="Tutoring">1-on-1 Peer Tutoring &amp; Study Habit</option>
                  <option value="ExamRecovery">Midterm &amp; Quiz Deficiency Recovery</option>
                  <option value="Assignment">LMS Assignment Catch-up Contract</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Assigned Lead Faculty / Advisor
                </label>
                <select className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 bg-white">
                  <option>Dr. Aris Thorne (Chief Academic Advisor)</option>
                  <option>Sandra Phillips (Senior Advisor)</option>
                  <option>Michael Chen (Assistant Dean)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Blueprint Action Objectives
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Define measurable retention targets (e.g., Mandatory weekly attendance check-in, 90m tutoring blocks, exam re-sit)."
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Deploy Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
