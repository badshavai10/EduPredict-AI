'use client';

import React, { useState, useMemo } from 'react';
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
  quiz: number;          // 0–15
  assignment: number;    // 0–5
  midterm: number;       // 0–25
  finalExam: number;     // 0–40
  attendance: number;    // 0–7
  presentation: number;  // 0–8
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
    quiz: 6.0,
    assignment: 2.1,
    midterm: 9.5,
    finalExam: 15.0,
    attendance: 2.8,
    presentation: 3.5,
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
    quiz: 7.5,
    assignment: 2.4,
    midterm: 11.5,
    finalExam: 21.0,
    attendance: 3.8,
    presentation: 4.4,
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
    quiz: 10.5,
    assignment: 3.6,
    midterm: 16.5,
    finalExam: 26.5,
    attendance: 5.2,
    presentation: 5.8,
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
    quiz: 14.5,
    assignment: 4.9,
    midterm: 23.8,
    finalExam: 37.5,
    attendance: 6.8,
    presentation: 7.8,
    deficitProbability: 4.2,
  },
};

export default function AIPredictionPage() {
  const [selectedStudentCode, setSelectedStudentCode] = useState('STU-2024-041');
  const [inputMode, setInputMode] = useState<'Dataset Select' | 'Manual Entry'>('Dataset Select');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'rf' | 'gbdt' | 'svm' | 'lr' | 'knn' | 'ensemble'>('rf');

  // Active student parameters (100-mark breakdown)
  const currentPreset = studentPresets[selectedStudentCode] || studentPresets['STU-2024-041'];
  const [quiz, setQuiz] = useState(currentPreset.quiz);
  const [assignment, setAssignment] = useState(currentPreset.assignment);
  const [midterm, setMidterm] = useState(currentPreset.midterm);
  const [finalExam, setFinalExam] = useState(currentPreset.finalExam);
  const [attendance, setAttendance] = useState(currentPreset.attendance);
  const [presentation, setPresentation] = useState(currentPreset.presentation);

  const totalMarks = Number((quiz + assignment + midterm + finalExam + attendance + presentation).toFixed(1));

  const riskTier = useMemo(() => {
    if (totalMarks >= 75) return { label: 'Low Risk (Good)', color: 'bg-emerald-100 text-emerald-800' };
    if (totalMarks >= 60) return { label: 'Moderate Risk (Average)', color: 'bg-blue-100 text-blue-800' };
    if (totalMarks >= 45) return { label: 'High Risk (At-Risk)', color: 'bg-amber-100 text-amber-800' };
    return { label: 'Critical Risk', color: 'bg-red-100 text-red-800' };
  }, [totalMarks]);

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
      setQuiz(p.quiz);
      setAssignment(p.assignment);
      setMidterm(p.midterm);
      setFinalExam(p.finalExam);
      setAttendance(p.attendance);
      setPresentation(p.presentation);
      showToast(`Loaded assessment marks for ${p.name} (${p.id}).`);
    }
  };

  const handleRunInference = () => {
    setIsInferenceRunning(true);
    showToast('Executing multi-model ensemble inference...');
    setTimeout(() => {
      setIsInferenceRunning(false);
      showToast(`Inference complete: Total ${totalMarks}/100 • ${riskTier.label}`);
    }, 800);
  };

  const handleResetForm = () => {
    const p = studentPresets[selectedStudentCode];
    if (p) {
      setQuiz(p.quiz);
      setAssignment(p.assignment);
      setMidterm(p.midterm);
      setFinalExam(p.finalExam);
      setAttendance(p.attendance);
      setPresentation(p.presentation);
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

          {/* Predictive Feature Matrix (6 Assessment Predictors — 100 Marks System) */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Sliders className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Assessment Feature Matrix (100 Marks Breakdown)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${riskTier.color}`}>
                  Score: {totalMarks}/100 • {riskTier.label}
                </span>
                <button
                  type="button"
                  onClick={() => showToast('Feature values checked against institutional 100-mark schema.')}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  Validate Bounds
                </button>
              </div>
            </div>

            {/* 6 Predictor Cards Grid (2x3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {/* Feature 1: Quiz (15 Marks) */}
              <div className={`p-3.5 rounded-xl border bg-white shadow-2xs space-y-2 ${quiz < 7 ? 'border-amber-200' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">1. Formative Quizzes</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    quiz < 7 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {quiz < 7 ? 'Deficit (< 7/15)' : 'Passing Band'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-black ${quiz < 7 ? 'text-amber-600' : 'text-slate-900'}`}>{quiz.toFixed(1)} / 15</span>
                  <span className="text-[10px] text-slate-400">Passing: &ge; 7.0 (46.7%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.1"
                  value={quiz}
                  onChange={(e) => setQuiz(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Continuous assessment weight</span>
                  <span>Max: 15 Marks</span>
                </div>
              </div>

              {/* Feature 2: Assignment (5 Marks) */}
              <div className={`p-3.5 rounded-xl border bg-white shadow-2xs space-y-2 ${assignment < 2.5 ? 'border-amber-200' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">2. Assignments &amp; Homework</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    assignment < 2.5 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {assignment < 2.5 ? 'Deficit (< 2.5/5)' : 'Good Track'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-black ${assignment < 2.5 ? 'text-amber-600' : 'text-slate-900'}`}>{assignment.toFixed(1)} / 5</span>
                  <span className="text-[10px] text-slate-400">Passing: &ge; 2.5 (50%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={assignment}
                  onChange={(e) => setAssignment(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Deliverables &amp; Lab Reports</span>
                  <span>Max: 5 Marks</span>
                </div>
              </div>

              {/* Feature 3: Mid-term Exam (25 Marks) */}
              <div className={`p-3.5 rounded-xl border bg-white shadow-2xs space-y-2 ${midterm < 11 ? 'border-red-200' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">3. Mid-term Examination</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    midterm < 11 ? 'bg-red-100 text-red-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {midterm < 11 ? 'Critical (< 11/25)' : 'Passed Midterm'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-black ${midterm < 11 ? 'text-red-600' : 'text-slate-900'}`}>{midterm.toFixed(1)} / 25</span>
                  <span className="text-[10px] text-slate-400">Passing: &ge; 11.0 (44%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.1"
                  value={midterm}
                  onChange={(e) => setMidterm(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Major mid-semester checkpoint</span>
                  <span>Max: 25 Marks</span>
                </div>
              </div>

              {/* Feature 4: Final Exam (40 Marks) */}
              <div className={`p-3.5 rounded-xl border bg-white shadow-2xs space-y-2 ${finalExam < 18 ? 'border-red-200' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">4. Final Examination</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    finalExam < 18 ? 'bg-red-100 text-red-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {finalExam < 18 ? 'Deficit (< 18/40)' : 'Passing Projection'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-black ${finalExam < 18 ? 'text-red-600' : 'text-slate-900'}`}>{finalExam.toFixed(1)} / 40</span>
                  <span className="text-[10px] text-slate-400">Passing: &ge; 18.0 (45%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="0.1"
                  value={finalExam}
                  onChange={(e) => setFinalExam(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Summative semester exam</span>
                  <span>Max: 40 Marks</span>
                </div>
              </div>

              {/* Feature 5: Attendance (7 Marks) */}
              <div className={`p-3.5 rounded-xl border bg-white shadow-2xs space-y-2 ${attendance < 3.5 ? 'border-red-200' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">5. Course Attendance</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    attendance < 3.5 ? 'bg-red-100 text-red-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {attendance < 3.5 ? 'Deficit (< 3.5/7)' : 'Satisfactory'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-black ${attendance < 3.5 ? 'text-red-600' : 'text-slate-900'}`}>{attendance.toFixed(1)} / 7</span>
                  <span className="text-[10px] text-slate-400">Passing: &ge; 3.5 (50%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="7"
                  step="0.1"
                  value={attendance}
                  onChange={(e) => setAttendance(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Classroom and lab participation</span>
                  <span>Max: 7 Marks</span>
                </div>
              </div>

              {/* Feature 6: Presentation (8 Marks) */}
              <div className={`p-3.5 rounded-xl border bg-white shadow-2xs space-y-2 ${presentation < 4 ? 'border-amber-200' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">6. Oral Presentation &amp; Defense</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    presentation < 4 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {presentation < 4 ? 'Deficit (< 4/8)' : 'Proficient'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-2xl font-black ${presentation < 4 ? 'text-amber-600' : 'text-slate-900'}`}>{presentation.toFixed(1)} / 8</span>
                  <span className="text-[10px] text-slate-400">Passing: &ge; 4.0 (50%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.1"
                  value={presentation}
                  onChange={(e) => setPresentation(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Project presentation &amp; communication</span>
                  <span>Max: 8 Marks</span>
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

            {/* 6 SHAP Attribution Bars (100-Mark Components) */}
            <div className="space-y-3.5 text-xs">
              {/* Factor 1: Midterm Exam */}
              <div className="p-2.5 rounded-xl border border-red-100 bg-red-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">1. Mid-term Exam ({midterm.toFixed(1)}/25 vs 18.0 avg)</span>
                  <span className="text-red-600 font-black">+32.0% Risk</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Below critical passing threshold (&lt; 11/25).</span>
                  <span className="font-bold text-red-600">Top Predictive Factor</span>
                </div>
              </div>

              {/* Factor 2: Final Exam Projection */}
              <div className="p-2.5 rounded-xl border border-red-100 bg-red-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">2. Final Exam Projection ({finalExam.toFixed(1)}/40 vs 28.0 avg)</span>
                  <span className="text-red-600 font-black">+28.5% Risk</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Below semester clearance benchmark (&lt; 18/40).</span>
                  <span className="font-bold text-red-600">High Deficit Carryover</span>
                </div>
              </div>

              {/* Factor 3: Attendance */}
              <div className="p-2.5 rounded-xl border border-red-100 bg-red-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">3. Attendance Deficit ({attendance.toFixed(1)}/7 vs 5.5 avg)</span>
                  <span className="text-red-600 font-black">+18.2% Risk</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Engagement score under threshold (&lt; 3.5/7).</span>
                  <span className="font-bold text-blue-600">Remediable via Counseling</span>
                </div>
              </div>

              {/* Factor 4: Quizzes */}
              <div className="p-2.5 rounded-xl border border-red-100 bg-red-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">4. Formative Quizzes ({quiz.toFixed(1)}/15 vs 11.5 avg)</span>
                  <span className="text-red-600 font-black">+12.0% Risk</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Weekly topic comprehension gap (&lt; 7/15 marks threshold).
                </p>
              </div>

              {/* Factor 5: Presentation */}
              <div className="p-2.5 rounded-xl border border-amber-100 bg-amber-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">5. Presentation Score ({presentation.toFixed(1)}/8 vs 6.5 avg)</span>
                  <span className="text-amber-700 font-black">+8.5% Risk</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Oral defense deficit; workshop recommended.</span>
                  <span className="font-bold text-amber-600">Skill Development</span>
                </div>
              </div>

              {/* Factor 6: Assignment Submissions */}
              <div className="p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/30">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-slate-900 text-[11px]">6. Assignment Deliverables ({assignment.toFixed(1)}/5)</span>
                  <span className="text-emerald-600 font-black">&minus;5.5% Protective</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Lab reports and homework submissions logged.</span>
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
