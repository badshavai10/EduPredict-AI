'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart2,
  Check,
  CheckCircle2,
  Download,
  FileCheck,
  FileText,
  Info,
  Layers,
  RotateCw,
  Sliders,
  Sparkles,
  User,
  Zap,
} from 'lucide-react';

interface StudentPreset {
  id: string;
  name: string;
  major: string;
  cohort: string;
  credits: number;
  advisor: string;
  office: string;
  earlyFlags: string;
  flagDate: string;
  attendance: number;
  studyHours: number;
  gpa: number;
  quizAvg: number;
  coursework: number;
  lmsLogins: number;
  deficitProbability: number;
}

const studentPresets: Record<string, StudentPreset> = {
  'STU-2024-041': {
    id: 'STU-2024-041',
    name: 'Marcus Vance',
    major: 'Computer Science',
    cohort: '4th Sem',
    credits: 16.0,
    advisor: 'Dr. A. Thorne',
    office: 'Hall B-216',
    earlyFlags: '2 Unexcused Absences',
    flagDate: 'Flagged on Oct 14',
    attendance: 58,
    studyHours: 6.5,
    gpa: 1.92,
    quizAvg: 52.0,
    coursework: 64.0,
    lmsLogins: 3.0,
    deficitProbability: 91.4,
  },
  'STU-2024-032': {
    id: 'STU-2024-032',
    name: 'Liam Gallagher',
    major: 'Cybersecurity',
    cohort: '4th Sem',
    credits: 15.0,
    advisor: 'Prof. Jenkins',
    office: 'Hall C-104',
    earlyFlags: '3 Missing LMS Deadlines',
    flagDate: 'Flagged on Oct 20',
    attendance: 61,
    studyHours: 4.1,
    gpa: 2.08,
    quizAvg: 54.5,
    coursework: 58.0,
    lmsLogins: 4.0,
    deficitProbability: 86.2,
  },
  'STU-2024-071': {
    id: 'STU-2024-071',
    name: 'Devonte Washington',
    major: 'Electrical Eng.',
    cohort: '4th Sem',
    credits: 17.0,
    advisor: 'Dr. A. Thorne',
    office: 'Hall B-216',
    earlyFlags: '1 Late Submission',
    flagDate: 'Flagged on Oct 18',
    attendance: 78,
    studyHours: 6.4,
    gpa: 2.45,
    quizAvg: 67.0,
    coursework: 74.0,
    lmsLogins: 6.4,
    deficitProbability: 54.0,
  },
  'STU-2024-114': {
    id: 'STU-2024-114',
    name: 'Elena Rostova',
    major: 'Artificial Intelligence',
    cohort: '6th Sem',
    credits: 18.0,
    advisor: 'Prof. Jenkins',
    office: 'Hall C-104',
    earlyFlags: 'None (Good Standing)',
    flagDate: 'Verified Oct 22',
    attendance: 96,
    studyHours: 18.9,
    gpa: 3.84,
    quizAvg: 92.4,
    coursework: 95.0,
    lmsLogins: 18.9,
    deficitProbability: 4.2,
  },
};

export default function AIPredictionPage() {
  const [selectedStudentCode, setSelectedStudentCode] = useState('STU-2024-041');
  const [inputMode, setInputMode] = useState<'Dataset Select' | 'Manual Entry'>('Dataset Select');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'rf' | 'gbdt' | 'svm' | 'lr' | 'knn' | 'ensemble'>('rf');

  // Active student parameters
  const currentPreset = studentPresets[selectedStudentCode] || studentPresets['STU-2024-041'];
  const [attendance, setAttendance] = useState(currentPreset.attendance);
  const [studyHours, setStudyHours] = useState(currentPreset.studyHours);
  const [gpa, setGpa] = useState(currentPreset.gpa);
  const [quizAvg, setQuizAvg] = useState(currentPreset.quizAvg);
  const [coursework, setCoursework] = useState(currentPreset.coursework);
  const [lmsLogins, setLmsLogins] = useState(currentPreset.lmsLogins);

  const [notes, setNotes] = useState(
    'Student Marcus Vance cited conflicting 24-hr work shifts on Tuesday/Thursday mornings affecting attendance. Receptive to peer tutoring if scheduled in evenings.'
  );

  const [isInferenceRunning, setIsInferenceRunning] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStudentChange = (code: string) => {
    setSelectedStudentCode(code);
    const p = studentPresets[code];
    if (p) {
      setAttendance(p.attendance);
      setStudyHours(p.studyHours);
      setGpa(p.gpa);
      setQuizAvg(p.quizAvg);
      setCoursework(p.coursework);
      setLmsLogins(p.lmsLogins);
      showToast(`Loaded normalized telemetry for ${p.name} (${p.id}).`);
    }
  };

  const handleRunInference = () => {
    setIsInferenceRunning(true);
    showToast('Executing multi-model ensemble inference...');
    setTimeout(() => {
      setIsInferenceRunning(false);
      showToast('Ensemble inference converged. Posterior risk: 91.4% (Tier 3 Critical Priority).');
    }, 800);
  };

  const handleResetForm = () => {
    const p = studentPresets[selectedStudentCode];
    if (p) {
      setAttendance(p.attendance);
      setStudyHours(p.studyHours);
      setGpa(p.gpa);
      setQuizAvg(p.quizAvg);
      setCoursework(p.coursework);
      setLmsLogins(p.lmsLogins);
      showToast('Parameters reset to baseline dataset record.');
    }
  };

  const handleExportPDF = () => {
    showToast('Exporting certified Diagnostic & Prescription PDF...');
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
      {/* 1. Page Header & Actions                                 */}
      {/* ======================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Engine • Active
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Student Performance Prediction
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Real-time risk scoring, feature attribution, and early intervention pathways via multi-model
            ensemble analysis.
          </p>
        </div>

        {/* Header Right Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            type="button"
            onClick={handleResetForm}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Form</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Cohort comparison view toggled.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Compare Cohorts</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Batch inference queued for active 50-student cohort.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-500" />
            <span>Batch Predict</span>
          </button>

          <Link
            href="/model-performance"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Model Audits</span>
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Main Two-Column Layout (Left & Right Split)           */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ====================================================== */}
        {/* LEFT COLUMN: Input Matrix & Classifier Selector        */}
        {/* ====================================================== */}
        <div className="lg:col-span-7 space-y-5">
          {/* Target Student Profile Card */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Target Student Profile
                </h3>
              </div>

              {/* Mode Toggle */}
              <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex text-[10px] font-semibold">
                <button
                  type="button"
                  onClick={() => setInputMode('Dataset Select')}
                  className={`px-2.5 py-1 rounded transition ${
                    inputMode === 'Dataset Select'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  Dataset Select
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('Manual Entry')}
                  className={`px-2.5 py-1 rounded transition ${
                    inputMode === 'Manual Entry'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  Manual Entry
                </button>
              </div>
            </div>

            {/* Student Selector Dropdown */}
            <div>
              <select
                value={selectedStudentCode}
                onChange={(e) => handleStudentChange(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="STU-2024-041">
                  STU-2024-041 • Marcus Vance — Computer Science (4th Sem)
                </option>
                <option value="STU-2024-032">
                  STU-2024-032 • Liam Gallagher — Cybersecurity (4th Sem)
                </option>
                <option value="STU-2024-071">
                  STU-2024-071 • Devonte Washington — Electrical Eng. (4th Sem)
                </option>
                <option value="STU-2024-114">
                  STU-2024-114 • Elena Rostova — Artificial Intelligence (6th Sem)
                </option>
              </select>
            </div>

            {/* 4 Metadata Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-medium">Cohort &amp; Standing</span>
                <span className="font-bold text-slate-900 block mt-0.5">Fall 2024 • Year 2</span>
                <span className="text-[10px] text-slate-400">Enrolled: Aug 2023</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-medium">Course Load</span>
                <span className="font-bold text-slate-900 block mt-0.5">{currentPreset.credits} Credits</span>
                <span className="text-[10px] text-slate-400">Full-time status</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-medium">Assigned Advisor</span>
                <span className="font-bold text-slate-900 block mt-0.5">{currentPreset.advisor}</span>
                <span className="text-[10px] text-slate-400">Office: {currentPreset.office}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-red-50/70 border border-red-200">
                <span className="text-[10px] text-red-600 block font-semibold">Prior Early Flags</span>
                <span className="font-bold text-red-700 block mt-0.5">{currentPreset.earlyFlags}</span>
                <span className="text-[10px] text-red-500">{currentPreset.flagDate}</span>
              </div>
            </div>
          </div>

          {/* Predictive Feature Matrix (6 Normalized Predictors) */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Sliders className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Predictive Feature Matrix (6 Normalized Predictors)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Feature values checked against SIS cohort normalization boundaries.')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Validate Bounds
              </button>
            </div>

            {/* 6 Predictor Cards Grid (2x3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {/* Feature 1: Course Attendance Rate */}
              <div className="p-3.5 rounded-xl border border-red-200 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">1. Course Attendance Rate</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700 uppercase">
                    Critical Deficit
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-red-600">{attendance}%</span>
                  <span className="text-[10px] text-slate-400">Min. accredited: 75%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={attendance}
                  onChange={(e) => setAttendance(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Observed: 16 / 28 Lectures</span>
                  <span>Cohort Avg: 78.4%</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-red-600 font-bold">&minus;17% below requirement</span>
                  <span className="text-slate-400">Impact: High Attrition Factor</span>
                </div>
              </div>

              {/* Feature 2: Weekly Self-Study Hours */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">2. Weekly Self-Study Hours</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 uppercase">
                    Moderate Risk
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">{studyHours} hrs</span>
                  <span className="text-[10px] text-slate-400">Expected: 15.0 hrs/wk</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={studyHours}
                  onChange={(e) => setStudyHours(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Self-Reported Log: {studyHours}h</span>
                  <span>Dept Target: 15.0 hrs</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-amber-600 font-bold">56.7% under recommended</span>
                  <span className="text-slate-400">Self-Study Deficit</span>
                </div>
              </div>

              {/* Feature 3: Cumulative GPA */}
              <div className="p-3.5 rounded-xl border border-red-200 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">3. Cumulative GPA (4.0 Max)</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700 uppercase">
                    Probation Zone
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-red-600">{gpa.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400">Good Standing: &ge; 2.00</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.05"
                  value={gpa}
                  onChange={(e) => setGpa(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Completed Credits: 48</span>
                  <span>Major Median: 3.12</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-red-600 font-bold">Triggers Automatic Probation</span>
                  <span className="text-slate-400">59.72% Deficit</span>
                </div>
              </div>

              {/* Feature 4: Formative Quiz Average */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">4. Formative Quiz Average</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 uppercase">
                    Near Threshold
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">{quizAvg.toFixed(1)}</span>
                  <span className="text-[10px] text-slate-400">Passing benchmark: &ge; 60.0%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={quizAvg}
                  onChange={(e) => setQuizAvg(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>4 Quizzes Counted</span>
                  <span>Section Mean: 68.2</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-amber-600 font-bold">&minus;8.0% from passing grade</span>
                  <span className="text-slate-400">Next Quiz in 3 days</span>
                </div>
              </div>

              {/* Feature 5: Coursework & Assignments */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">5. Coursework &amp; Assignments</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                    Passing Buffer
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">{coursework.toFixed(1)}</span>
                  <span className="text-[10px] text-slate-400">Submission rate: 5 of 7 tasks</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={coursework}
                  onChange={(e) => setCoursework(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>2 Pending Submissions</span>
                  <span>Cohort Mean: 76.5</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-emerald-600 font-bold">Moderately Protective</span>
                  <span className="text-slate-400">Final Project Due Wk 12</span>
                </div>
              </div>

              {/* Feature 6: LMS Portal Activity / Wk */}
              <div className="p-3.5 rounded-xl border border-red-200 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">6. LMS Portal Activity / Wk</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700 uppercase">
                    Low Engagement
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-red-600">{lmsLogins.toFixed(1)}</span>
                  <span className="text-[10px] text-slate-400">Weekly logins &amp; asset views</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.5"
                  value={lmsLogins}
                  onChange={(e) => setLmsLogins(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Last login: 3 days ago</span>
                  <span>Active Peer Avg: 11.2</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-red-600 font-bold">73% below expected logins</span>
                  <span className="text-slate-400">Inactive on Weekends</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trained Classifier Engine Selector */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Trained Classifier Engine
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Cross-Validation K=10 Evaluated
              </span>
            </div>

            {/* 6 Engine Cards (3x2 Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {/* 1. Random Forest */}
              <div
                onClick={() => setSelectedAlgorithm('rf')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedAlgorithm === 'rf'
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Random Forest</span>
                  {selectedAlgorithm === 'rf' ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500">v2.4 • 94.2% Acc</div>
                <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/80 text-[10px]">
                  <span className="text-blue-700 font-bold bg-blue-100 px-1 rounded">Recommended</span>
                  <span className="font-mono text-slate-600">F1: 0.94</span>
                </div>
              </div>

              {/* 2. Gradient Boosted */}
              <div
                onClick={() => setSelectedAlgorithm('gbdt')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedAlgorithm === 'gbdt'
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Gradient Boosted</span>
                  {selectedAlgorithm === 'gbdt' ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500">v2.0 • 92.1% Acc</div>
                <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/80 text-[10px]">
                  <span className="text-slate-600">Non-Linear</span>
                  <span className="font-mono text-slate-600">F1: 0.93</span>
                </div>
              </div>

              {/* 3. Support Vector (SVM) */}
              <div
                onClick={() => setSelectedAlgorithm('svm')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedAlgorithm === 'svm'
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Support Vector (SVM)</span>
                  {selectedAlgorithm === 'svm' ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500">v2.1 • 91.0% Acc</div>
                <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/80 text-[10px]">
                  <span className="text-slate-600">RBF Kernel</span>
                  <span className="font-mono text-slate-600">F1: 0.91</span>
                </div>
              </div>

              {/* 4. Logistic Regression */}
              <div
                onClick={() => setSelectedAlgorithm('lr')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedAlgorithm === 'lr'
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Logistic Regression</span>
                  {selectedAlgorithm === 'lr' ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500">v1.8 • 88.5% Acc</div>
                <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/80 text-[10px]">
                  <span className="text-slate-600">L2 Regularized</span>
                  <span className="font-mono text-slate-600">F1: 0.88</span>
                </div>
              </div>

              {/* 5. K-Nearest Neighbors */}
              <div
                onClick={() => setSelectedAlgorithm('knn')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedAlgorithm === 'knn'
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">K-Nearest Neighbors</span>
                  {selectedAlgorithm === 'knn' ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500">v1.5 • 86.3% Acc</div>
                <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/80 text-[10px]">
                  <span className="text-slate-600">k = 7 Distance</span>
                  <span className="font-mono text-slate-600">F1: 0.86</span>
                </div>
              </div>

              {/* 6. Ensemble Voting */}
              <div
                onClick={() => setSelectedAlgorithm('ensemble')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedAlgorithm === 'ensemble'
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">Ensemble Voting</span>
                  {selectedAlgorithm === 'ensemble' ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  )}
                </div>
                <div className="text-[11px] text-red-600 font-semibold">5 / 5 Consensus</div>
                <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/80 text-[10px]">
                  <span className="text-red-700 font-bold">High-Attrition Docket</span>
                  <span className="font-mono text-slate-600">F1: 0.95</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advisor Qualitative Notes & Observations */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Advisor Qualitative Notes &amp; Observations</span>
              </span>
              <span className="text-[10px] text-slate-400">Private to Academic Support Staff</span>
            </div>

            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Last saved: Today by Dr. Aris Thorne (11:32 AM)</span>
              </span>
              <button
                type="button"
                onClick={() => showToast('Advisor qualitative observations saved.')}
                className="text-blue-600 font-bold hover:underline"
              >
                Save Note Entry
              </button>
            </div>
          </div>

          {/* Action Bar */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={isInferenceRunning}
                onClick={handleRunInference}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                <Zap className={`w-4 h-4 ${isInferenceRunning ? 'animate-spin' : ''}`} />
                <span>{isInferenceRunning ? 'Running Ensemble Calculations...' : 'Run Inference Engine'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetForm}
                className="py-3 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl shadow-2xs transition cursor-pointer"
              >
                Clear Inputs
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-500 leading-relaxed flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <p>
                <span className="font-bold text-slate-700">Advisory Notice:</span> Model predictions
                reflect historical training sets (Cohorts 2021&ndash;2024). Inferences serve
                strictly as diagnostic advisory guidelines for institutional support teams and must
                never replace direct human academic mentoring.
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* RIGHT COLUMN: Diagnostic & Prescription Engine         */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 1: Ensemble Classification Diagnostic */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Ensemble Classification Diagnostic
              </span>
              <span className="text-[10px] font-mono text-slate-400">Inference: 18ms</span>
            </div>

            <div>
              <span className="inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 uppercase tracking-wider mb-2">
                🔴 High Risk • Tier 3 Priority
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Academic Probation Deficit Projected
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Estimated end-of-term GPA &lt; 2.00 without targeted academic intervention within 14
                calendar days.
              </p>
            </div>

            {/* Attrition Likelihood Meter */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Attrition &amp; Deficit Likelihood
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Bayesian posterior probability across 5 models.
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-red-600">91.4%</span>
                  <span className="text-[10px] font-bold text-red-600 block">Probable</span>
                </div>
              </div>

              {/* Progress bar split */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
                <div className="bg-red-500 h-full" style={{ width: '91.4%' }} />
                <div className="bg-emerald-500 h-full" style={{ width: '8.6%' }} />
              </div>

              <div className="flex justify-between text-[10px] font-bold pt-1">
                <span className="text-red-700">• Deficit Risk: 91.4%</span>
                <span className="text-emerald-700">• Retain / Clear: 8.6%</span>
              </div>
            </div>

            {/* Model Metrics Split */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                  Model Confidence Band
                </span>
                <span className="font-extrabold text-slate-900 block mt-0.5">
                  High (Sigma &plusmn;0.04)
                </span>
                <span className="text-[10px] text-slate-400">95% Credible Interval</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                  Historical Precedent
                </span>
                <span className="font-extrabold text-slate-900 block mt-0.5">
                  148 Similar Cohort Cases
                </span>
                <span className="text-[10px] text-slate-400">89.2% actual deficit match</span>
              </div>
            </div>
          </div>

          {/* Card 2: Feature Attribution (SHAP TreeExplainer) */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BarChart2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Feature Attribution (SHAP TreeExplainer)
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                Additive Weights
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Contribution breakdown explaining why Marcus Vance is currently scored at +91.4% risk
              versus the 28.5% cohort baseline:
            </p>

            {/* 5 SHAP Attribution Bars */}
            <div className="space-y-3.5 text-xs">
              {/* Factor 1: Attendance */}
              <div className="p-2.5 rounded-xl border border-red-100 bg-red-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">1. Attendance Rate (58% vs 78% avg)</span>
                  <span className="text-red-600 font-black">+35.0% Risk</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Primary Driver; 12 missed lab and lecture blocks.</span>
                  <span className="font-bold text-red-600">Top Predictive Factor</span>
                </div>
              </div>

              {/* Factor 2: Cumulative GPA */}
              <div className="p-2.5 rounded-xl border border-red-100 bg-red-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">2. Cumulative GPA (1.92 vs 3.12 avg)</span>
                  <span className="text-red-600 font-black">+28.5% Risk</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Prior semester academic probation carryover.</span>
                  <span className="font-bold text-red-600">High Persistence Risk</span>
                </div>
              </div>

              {/* Factor 3: Formative Quizzes */}
              <div className="p-2.5 rounded-xl border border-red-100 bg-red-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">3. Formative Quizzes (52.0 vs 68.2 avg)</span>
                  <span className="text-red-600 font-black">+16.2% Risk</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Consistent gaps in mid-term assessment grasp.</span>
                  <span className="font-bold text-blue-600">Remediable via Tutoring</span>
                </div>
              </div>

              {/* Factor 4: Study Hours */}
              <div className="p-2.5 rounded-xl border border-red-100 bg-red-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">4. Study Hours (6.5 hrs vs 15.0 target)</span>
                  <span className="text-red-600 font-black">+12.0% Risk</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Under recommended self-study threshold; schedule conflict issue.
                </p>
              </div>

              {/* Factor 5: Coursework Submissions */}
              <div className="p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">5. Coursework Submissions (64%)</span>
                  <span className="text-emerald-600 font-black">&minus;8.5% Protective</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Continuous engagement prevents withdrawal drop.</span>
                  <span className="font-bold text-emerald-600">Positive Foundation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Recommended Faculty Interventions */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Recommended Faculty Interventions
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                Tier 3 Urgent Action
              </span>
            </div>

            {/* Protocol 1: Peer Tutoring */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900">Mandatory CS Peer Tutoring</span>
                <span className="text-[10px] font-semibold text-slate-500">2 hrs / week</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Paired with Senior Mentor Jacob K. Focus: Data Structures &amp; Algorithms Analysis labs.
              </p>
              <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
                <span>First Session: Thu 4:00 PM</span>
                <button
                  type="button"
                  onClick={() => showToast('Alternate mentor pool loaded.')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Assign Alternate Mentor
                </button>
              </div>
            </div>

            {/* Protocol 2: Attendance Contract */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900">Attendance Intervention Contract</span>
                <span className="text-[10px] font-bold text-red-600">Within 48 hrs</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Formal review with Dean Vance. Establish signed commitment for 85%+ attendance recovery.
              </p>
              <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
                <button
                  type="button"
                  onClick={() => showToast('Hearing session booked with Dean Vance.')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Schedule Dean Hearing
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Attendance Contract Template preview opened.')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Preview Template
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() =>
                  showToast('Intervention plan committed and logged into Dr. Thorne’s roster.')
                }
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Commit Intervention Plan</span>
              </button>

              <button
                type="button"
                onClick={handleExportPDF}
                className="w-full py-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export PDF Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
