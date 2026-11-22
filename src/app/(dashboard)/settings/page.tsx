'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  HelpCircle,
  Lock,
  Mail,
  MessageSquare,
  Monitor,
  RotateCw,
  Save,
  Share2,
  Shield,
  ShieldCheck,
  Sliders,
  User,
} from 'lucide-react';

export default function SettingsPage() {
  // Tabs State
  const [activeTab, setActiveTab] = useState<
    | 'General & Profile'
    | 'Academic Parameters & AI Thresholds'
    | 'Integrations & SIS Sync'
    | 'Notification Matrix'
    | 'Security & Team'
  >('Academic Parameters & AI Thresholds');

  // Sliders and Selectors
  const [selectedModel, setSelectedModel] = useState(
    'Random Forest Classifier v2.4 (Retrained 2 days ago, F1-Score: 94.1%)'
  );
  const [attendanceFloor, setAttendanceFloor] = useState(65);

  // Toggles
  const [continuousRescoring, setContinuousRescoring] = useState(true);
  const [instantSms, setInstantSms] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [channelBroadcast, setChannelBroadcast] = useState(true);

  // Status & Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    showToast('Connecting to Banner & Canvas SIS bridge...');
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Manual SIS sync complete: Ingested 1,250 records with 0 drops.');
    }, 1500);
  };

  const handleSave = () => {
    showToast('Platform settings and algorithmic thresholds saved successfully.');
  };

  const handleResetDefaults = () => {
    setAttendanceFloor(65);
    setContinuousRescoring(true);
    setInstantSms(true);
    setWeeklyDigest(true);
    setChannelBroadcast(true);
    showToast('Parameters reset to institutional baseline standards.');
  };

  const handleDownloadSchemaValidator = () => {
    const schemaDoc = `EduPredict AI - Institutional CSV Ingestion Schema Validator v2.4
Format: CSV (RFC 4180)
Encoding: UTF-8
Required Columns:
- student_id: string (Regex: STU-[0-9]{4}-[0-9]{3})
- attendance_pct: float (Range: 0.0 - 100.0)
- cumulative_gpa: float (Range: 0.00 - 4.00)
- weekly_study_hours: float (Min: 0.0)
- quiz_average: float (Range: 0.0 - 100.0)
- assignment_score: float (Range: 0.0 - 100.0)
- final_grade_category: string (Enum: Low Risk, Medium Risk, High Risk)
FERPA Compliance: Student PII strictly pseudonymized on ingestion.`;

    const blob = new Blob([schemaDoc], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EduPredict_SIS_Schema_Validator_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded official CSV schema validator definition.');
  };

  return (
    <div className="space-y-6 pb-14 font-sans">
      {/* Toast Notification */}
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
              Institution Config • System Nominal &amp; FERPA Enforced
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Platform Settings &amp; Preferences
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Manage institution credentials, AI model inference thresholds, SIS ingestion webhooks,
            and advisor notification protocols.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-medium shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>All changes synced</span>
          </div>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            Discard Changes
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Settings Category Navigation Tabs                     */}
      {/* ======================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 text-xs font-medium">
        {[
          'General & Profile',
          'Academic Parameters & AI Thresholds',
          'Integrations & SIS Sync',
          'Notification Matrix',
          'Security & Team',
        ].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-3.5 py-2 rounded-t-lg transition-colors cursor-pointer shrink-0 font-semibold flex items-center gap-2 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab === 'General & Profile' && <User className="w-3.5 h-3.5" />}
              {tab === 'Academic Parameters & AI Thresholds' && <Sliders className="w-3.5 h-3.5" />}
              {tab === 'Integrations & SIS Sync' && <Share2 className="w-3.5 h-3.5" />}
              {tab === 'Notification Matrix' && <Bell className="w-3.5 h-3.5" />}
              {tab === 'Security & Team' && <Shield className="w-3.5 h-3.5" />}
              <span>{tab}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 3. Main Two-Column Layout (Left & Right Split)           */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ====================================================== */}
        {/* LEFT COLUMN: Administrator Profile & Data Bridge       */}
        {/* ====================================================== */}
        <div className="lg:col-span-4 space-y-5">
          {/* Administrator Profile Card */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 border-2 border-white shadow-md flex items-center justify-center text-white text-lg font-bold">
                  AT
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
                Chief Admin
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900">Dr. Aris Thorne</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Chief Academic Advisor &amp; Associate Dean of Student Affairs
              </p>
              <div className="text-xs text-blue-600 font-mono mt-1 flex items-center gap-1.5">
                <span>✉</span>
                <span>a.thorne@university.edu</span>
              </div>
            </div>

            {/* Institution Metadata Info Box */}
            <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Institution</span>
                <span className="font-bold text-slate-900">Metropolitan State University</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Role Scope</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Super Admin / Model Auditor
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Active Term</span>
                <span className="font-semibold text-slate-800">Fall 2024 (16 Wks)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Timezone</span>
                <span className="font-semibold text-slate-800 font-mono text-[11px]">
                  UTC-5 (Eastern Time)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Editing personal metadata enabled.')}
              className="w-full py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Personal Metadata</span>
            </button>
          </div>

          {/* Banner & Canvas Bridge */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Banner &amp; Canvas Bridge</h4>
                  <p className="text-[10px] text-slate-400">Automated Pipeline Operational</p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Last Synced</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">18 mins ago</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Ingested Records</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">
                  1,250 clean / 0 drop
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  showToast('Connection test passed: Banner & Canvas API responding with 14ms latency.')
                }
                className="py-1.5 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition text-center cursor-pointer"
              >
                Test Connection
              </button>
              <button
                type="button"
                disabled={isSyncing}
                onClick={handleManualSync}
                className="py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold rounded-lg shadow-2xs transition text-center cursor-pointer"
              >
                {isSyncing ? 'Syncing...' : 'Manual Sync'}
              </button>
            </div>
          </div>

          {/* FERPA Student Privacy Shield Card */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">FERPA Student Privacy Shield</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Strict role-based attribute masking active. Longitudinal behavioral data encrypted at
              rest (AES-256-GCM).
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>2FA SSO Enforced (Okta SAML)</span>
              </span>
              <span>Timeout: 30m</span>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* RIGHT COLUMN: Inference Engine & Escalation Matrix     */}
        {/* ====================================================== */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Predictive Risk Inference Engine */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Predictive Risk Inference Engine
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                  Calibrate predictive sensitivity cutoffs and assign automated institutional
                  intervention tags.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-mono">
                Engine Version 2.4.1b
              </span>
            </div>

            {/* Algorithm Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Cohort Scanning Algorithm
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option>
                  Random Forest Classifier v2.4 (Retrained 2 days ago, F1-Score: 94.1%)
                </option>
                <option>Gradient Boosted Trees v2.0 (Candidate, F1-Score: 92.8%)</option>
                <option>Support Vector Machine (SVM) v2.1 (Evaluated, F1-Score: 90.8%)</option>
                <option>Logistic Regression (L2) v1.8 (Baseline, F1-Score: 88.1%)</option>
              </select>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>Cross-validated on 14,200 historical graduation trajectories.</span>
                <Link
                  href="/model-performance"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  View Model Weights &amp; Confusion Matrix &rarr;
                </Link>
              </div>
            </div>

            {/* Classification Probability Thresholds */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5 font-semibold text-slate-700">
                <span>Classification Probability Thresholds</span>
                <span className="text-[11px] font-mono text-slate-400">
                  Probability P(Attrition) [0.00 - 1.00]
                </span>
              </div>

              {/* Spectrum bar */}
              <div className="w-full h-2 rounded-full flex overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: '40%' }} />
                <div className="bg-amber-400 h-full" style={{ width: '30%' }} />
                <div className="bg-red-500 h-full" style={{ width: '30%' }} />
              </div>

              {/* 3 Threshold Strategy Bands */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                {/* Band 1: On-Track */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1 font-bold">
                      <span className="text-emerald-700">On-Track</span>
                      <span className="font-mono text-slate-700">&lt; 0.40</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Standard automated advising notices. No manual dean intervention triggered.
                    </p>
                  </div>
                  <div className="mt-2 pt-1 border-t border-slate-200 text-[10px] font-bold text-slate-600">
                    32 Students in Band
                  </div>
                </div>

                {/* Band 2: Watchlist */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1 font-bold">
                      <span className="text-amber-700">Watchlist</span>
                      <span className="font-mono text-slate-700">0.40 - 0.69</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Assigned to peer mentor network. Bi-weekly attendance check-in prompted.
                    </p>
                  </div>
                  <div className="mt-2 pt-1 border-t border-slate-200 text-[10px] font-bold text-slate-600">
                    11 Students in Band
                  </div>
                </div>

                {/* Band 3: Critical Risk */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1 font-bold">
                      <span className="text-red-700">Critical Risk</span>
                      <span className="font-mono text-slate-700">&ge; 0.70</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Urgent dean dispatch. Automated meeting blocker placed on student schedule.
                    </p>
                  </div>
                  <div className="mt-2 pt-1 border-t border-slate-200 text-[10px] font-bold text-slate-600">
                    7 Students in Band
                  </div>
                </div>
              </div>
            </div>

            {/* Minimum Attendance Warning Floor Slider */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-xs font-semibold text-slate-800">
                    Minimum Attendance Warning Floor
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Flag student to risk docket if total lecture attendance dips below threshold.
                  </p>
                </div>
                <span className="text-lg font-black text-blue-600">{attendanceFloor}%</span>
              </div>

              <input
                type="range"
                min="50"
                max="85"
                value={attendanceFloor}
                onChange={(e) => setAttendanceFloor(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 my-2"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>50% (Permissive)</span>
                <span className="text-blue-700 font-bold">65% (Recommended Baseline)</span>
                <span>85% (Strict Policy)</span>
              </div>
            </div>

            {/* Continuous Re-scoring Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800">
                  Continuous Re-scoring via LMS Webhooks
                </span>
                <p className="text-[11px] text-slate-400">
                  Re-calculate predictive risk immediately upon grade posting, discussion inactivity,
                  or mid-term assignment submission.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setContinuousRescoring(!continuousRescoring)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  continuousRescoring ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    continuousRescoring ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Card 2: Escalation & Notification Protocol Matrix */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Escalation &amp; Notification Protocol Matrix
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                Configure automated routing for early warning triggers and weekly summary reports.
              </p>
            </div>

            {/* Protocol Row 1: Instant SMS */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-900 block">
                    Instant SMS Escalation
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Dispatch direct alert when a student exhibits an attrition spike greater than
                    85% probability.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Advisors Only
                </span>
                <button
                  type="button"
                  onClick={() => setInstantSms(!instantSms)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    instantSms ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      instantSms ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Protocol Row 2: Weekly Cohort Digest */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-900 block">
                    Weekly Cohort Digest
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Consolidated longitudinal trajectory report sent to Dean &amp; Chairs every
                    Monday at 08:00 AM.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Every Monday 8am
                </span>
                <button
                  type="button"
                  onClick={() => setWeeklyDigest(!weeklyDigest)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    weeklyDigest ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      weeklyDigest ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Protocol Row 3: Advisor Team Channel Broadcast */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-900 block">
                    Advisor Team Channel Broadcast
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Post daily summary chips into dedicated institutional Slack or Microsoft Teams
                    intervention channels.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Connected
                </span>
                <button
                  type="button"
                  onClick={() => setChannelBroadcast(!channelBroadcast)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    channelBroadcast ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      channelBroadcast ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: SIS Data Governance & Schema Validation */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div>
              <h4 className="font-bold text-slate-900 text-xs">
                SIS Data Governance &amp; Schema Validation
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Download official CSV mapping templates or audit data integrity logs before
                re-training models.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap pt-1">
              <button
                type="button"
                onClick={handleDownloadSchemaValidator}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download CSV Schema Validator</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  showToast('Inspecting Webhook Logs: 1,250 events streamed successfully with 0 errors.')
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>Inspect Webhook Logs</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  showToast('Model cache purged: In-memory Random Forest tensor refreshed.')
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Purge Model Cache</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. Page Bottom Help & Global Save Bar                    */}
      {/* ======================================================== */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block text-xs">
              Need institutional parameter assistance?
            </span>
            <span className="text-[11px] text-slate-500">
              Contact the University IT &amp; Academic Data Governance Office at ext. 4480 or{' '}
              <a href="mailto:data-support@university.edu" className="text-blue-600 hover:underline">
                data-support@university.edu
              </a>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition cursor-pointer"
          >
            Reset to Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
