'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  BarChart2,
  CheckCircle2,
  Download,
  Info,
  Layers,
  LineChart,
  Sliders,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export default function AIInsightsPage() {
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedTerm, setSelectedTerm] = useState('Fall 2024 (Current)');
  const [selectedWeeks, setSelectedWeeks] = useState('Weeks 1-12 (Mid-Term to Date)');
  const [studyHoursMetric, setStudyHoursMetric] = useState<'Median' | 'Weekly'>('Median');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scatter plot points (Attendance vs GPA)
  // X: 40% to 100%, Y: 0.0 to 4.0
  const scatterPoints = [
    // Zone of Concern (Red, < 68% attendance)
    { x: 42, y: 1.25, tier: 'risk' },
    { x: 46, y: 1.4, tier: 'risk' },
    { x: 50, y: 1.6, tier: 'risk' },
    { x: 52, y: 1.35, tier: 'risk' },
    { x: 55, y: 1.82, tier: 'risk' },
    { x: 58, y: 1.7, tier: 'risk' },
    { x: 61, y: 1.95, tier: 'risk' },
    { x: 63, y: 1.85, tier: 'risk' },
    { x: 65, y: 1.92, tier: 'risk' },
    { x: 67, y: 2.1, tier: 'risk' },

    // Core Tier (Blue, 68% - 85% attendance)
    { x: 69, y: 2.2, tier: 'core' },
    { x: 71, y: 2.35, tier: 'core' },
    { x: 72, y: 2.45, tier: 'core' },
    { x: 74, y: 2.5, tier: 'core' },
    { x: 75, y: 2.62, tier: 'core' },
    { x: 77, y: 2.7, tier: 'core' },
    { x: 79, y: 2.65, tier: 'core' },
    { x: 81, y: 2.85, tier: 'core' },
    { x: 82, y: 2.95, tier: 'core' },
    { x: 84, y: 3.1, tier: 'core' },

    // Optimal Tier (Green, > 85% attendance)
    { x: 86, y: 3.25, tier: 'optimal' },
    { x: 88, y: 3.4, tier: 'optimal' },
    { x: 89, y: 3.55, tier: 'optimal' },
    { x: 91, y: 3.48, tier: 'optimal' },
    { x: 92, y: 3.65, tier: 'optimal' },
    { x: 94, y: 3.78, tier: 'optimal' },
    { x: 95, y: 3.82, tier: 'optimal' },
    { x: 97, y: 3.9, tier: 'optimal' },
    { x: 98, y: 3.88, tier: 'optimal' },
    { x: 99, y: 3.96, tier: 'optimal' },
  ];

  const handleExportBrief = () => {
    const briefContent = `EduPredict AI - Academic Executive Brief
Cohort: ${selectedTerm} (${selectedDept})
Timeline: ${selectedWeeks}
Autonomous Discovery: Students with attendance < 65% in weeks 3-5 exhibit an 82% probability of < 2.0 GPA.
Pearson Correlation: r = 0.78 (Strong Positive)
Dominant Feature Predictors:
1. Attendance Percentage (38.4%)
2. Formative Quiz Averages (26.2%)
3. Previous Semester GPA (18.5%)
4. Weekly LMS Study Hours (11.4%)
5. Assignment Turn-in Timeliness (5.5%)
Inflection Point: > 12.0 weekly LMS hours yields 48% drop in course dropouts.
Generated: ${new Date().toLocaleString()}`;

    const blob = new Blob([briefContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI_Academic_Insights_Brief_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setToastMessage('Exported Academic Insights Executive Brief.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 pb-14 font-sans">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 bg-slate-900 text-white rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. Page Header & Multi-Dimensional Controls              */}
      {/* ======================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Module 05 • Cohort Intelligence &amp; Pattern Recognition
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Academic Insights
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Engine v4.2 Active</span>
            </span>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none shadow-2xs"
          >
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Electrical Engineering</option>
            <option>Financial Analytics</option>
            <option>Molecular Biology</option>
          </select>

          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none shadow-2xs"
          >
            <option>Fall 2024 (Current)</option>
            <option>Spring 2024</option>
            <option>Fall 2023</option>
          </select>

          <select
            value={selectedWeeks}
            onChange={(e) => setSelectedWeeks(e.target.value)}
            className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none shadow-2xs"
          >
            <option>Weeks 1-12 (Mid-Term to Date)</option>
            <option>Weeks 1-6 (Early Warning Window)</option>
            <option>Weeks 7-12 (Post-Midterm Recovery)</option>
          </select>

          <button
            type="button"
            onClick={handleExportBrief}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export Brief</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Autonomous Pattern Discovery Hero Banner              */}
      {/* ======================================================== */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
            <Sparkles className="w-5 h-5 text-cyan-200" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-cyan-200 uppercase bg-blue-900/40 px-2 py-0.5 rounded border border-blue-400/30 mb-1">
              Autonomous Pattern Discovery • 96.8% Confidence
            </div>
            <p className="text-sm md:text-base font-medium text-white leading-relaxed">
              Students with attendance falling below 65% in weeks 3&ndash;5 exhibit an{' '}
              <span className="font-extrabold text-cyan-300 underline decoration-cyan-400 underline-offset-4">
                82% likelihood
              </span>{' '}
              of scoring below 2.0 GPA without early intervention.
            </p>
          </div>
        </div>

        <Link
          href="/student-risk-list"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs shrink-0 shadow-sm transition"
        >
          <span>Apply Cohort Filter</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ======================================================== */}
      {/* 3. Middle Section: Scatter Plot & Shapley Feature Importance */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Attendance vs Academic Performance (Scatter Plot) */}
        <div className="lg:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <LineChart className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Attendance vs. Academic Performance
                </h3>
                <span title="Bivariate correlation matrix">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </span>
              </div>

              {/* Pearson Metric */}
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                Pearson r = 0.78 (Strong Positive)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Bivariate regression model mapping cumulative attendance against terminal GPA.
            </p>

            {/* Scatter Legend */}
            <div className="flex items-center gap-4 text-[11px] text-slate-600 mt-3 pt-2 border-t border-slate-100 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Optimal (&gt; 3.2 GPA)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Core Tier (2.0 - 3.2 GPA)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>At-Risk Cohort (&lt; 2.0 GPA)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 ml-auto">
                <span className="w-4 h-0.5 bg-blue-400" />
                <span>Trend Line</span>
              </div>
            </div>

            {/* SVG Scatter Plot Chart */}
            <div className="relative mt-4 h-64 w-full">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                {/* Horizontal Grid lines */}
                {[0, 1, 2, 3, 4].map((gpa) => {
                  const y = 200 - (gpa / 4) * 170;
                  return (
                    <g key={gpa}>
                      <line
                        x1="45"
                        y1={y}
                        x2="480"
                        y2={y}
                        stroke="#f1f5f9"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="35"
                        y={y + 3}
                        fontSize="9"
                        textAnchor="end"
                        fill="#94a3b8"
                        fontFamily="monospace"
                      >
                        {gpa.toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* Vertical Attendance Grid lines */}
                {[40, 50, 60, 70, 80, 90, 100].map((attn) => {
                  const x = 45 + ((attn - 40) / 60) * 435;
                  return (
                    <g key={attn}>
                      <line
                        x1={x}
                        y1="30"
                        x2={x}
                        y2="200"
                        stroke="#f8fafc"
                        strokeDasharray="2 2"
                      />
                      <text
                        x={x}
                        y="215"
                        fontSize="9"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontFamily="monospace"
                      >
                        {attn}%
                      </text>
                    </g>
                  );
                })}

                {/* Shaded "ZONE OF CONCERN: < 68% ATTN" */}
                {/* 68% -> x = 45 + ((68-40)/60)*435 = 45 + (28/60)*435 = 45 + 203 = 248 */}
                <rect
                  x="45"
                  y="30"
                  width="203"
                  height="170"
                  fill="#fef2f2"
                  opacity="0.6"
                />
                <text
                  x="55"
                  y="45"
                  fontSize="8"
                  fontWeight="bold"
                  fill="#ef4444"
                  letterSpacing="0.05em"
                >
                  ZONE OF CONCERN: &lt; 68% ATTN
                </text>

                {/* Linear Regression Trend Line (from x=42, y=1.2 to x=99, y=3.9) */}
                <line
                  x1="55"
                  y1="165"
                  x2="470"
                  y2="38"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />

                {/* Inspection Benchmark Tooltip Callout */}
                <g transform="translate(190, 85)">
                  <rect
                    x="0"
                    y="0"
                    width="110"
                    height="28"
                    rx="4"
                    fill="#0f172a"
                    opacity="0.92"
                  />
                  <text
                    x="55"
                    y="11"
                    fontSize="7.5"
                    fontWeight="bold"
                    fill="#38bdf8"
                    textAnchor="middle"
                    letterSpacing="0.04em"
                  >
                    INSPECTION BENCHMARK
                  </text>
                  <text
                    x="55"
                    y="22"
                    fontSize="7.5"
                    fill="#e2e8f0"
                    textAnchor="middle"
                  >
                    68% cutoff triggers alert tier
                  </text>
                </g>

                {/* Scatter plot dots */}
                {scatterPoints.map((pt, idx) => {
                  const cx = 45 + ((pt.x - 40) / 60) * 435;
                  const cy = 200 - (pt.y / 4) * 170;
                  const color =
                    pt.tier === 'risk'
                      ? '#ef4444'
                      : pt.tier === 'core'
                        ? '#3b82f6'
                        : '#10b981';

                  return (
                    <circle
                      key={idx}
                      cx={cx}
                      cy={cy}
                      r="3.5"
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* X Axis Label */}
                <text
                  x="260"
                  y="235"
                  fontSize="9"
                  textAnchor="middle"
                  fill="#64748b"
                  fontWeight="600"
                >
                  ATTENDANCE (%)
                </text>
              </svg>
            </div>
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
            <span>Sample size: 1,250 undergraduates • Updated 3 hours ago</span>
            <Link
              href="/model-performance"
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View Detailed Matrix</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Right Card: Shapley Global Feature Importance */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BarChart2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Shapley Global Feature Importance
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                SHAP v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Relative attribution of behavioral variables across cohort inference outputs.
            </p>

            {/* 5 SHAP Features */}
            <div className="space-y-4 my-5">
              {/* Feature 1: Attendance */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>1. Attendance Percentage</span>
                  </div>
                  <span className="font-bold text-blue-600">38.4%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '38.4%' }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Dominant predictor for mid-term retention.
                </p>
              </div>

              {/* Feature 2: Formative Quizzes */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>2. Formative Quiz Averages</span>
                  </div>
                  <span className="font-bold text-blue-600">26.2%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '26.2%' }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Continuous concept mastery indicator.
                </p>
              </div>

              {/* Feature 3: Previous Semester GPA */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                    <span>3. Previous Semester GPA</span>
                  </div>
                  <span className="font-bold text-slate-700">18.5%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-slate-500 h-2 rounded-full" style={{ width: '18.5%' }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Longitudinal baseline competence.
                </p>
              </div>

              {/* Feature 4: Weekly LMS Study Hours */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>4. Weekly LMS Study Hours</span>
                  </div>
                  <span className="font-bold text-emerald-600">11.4%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '11.4%' }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Self-directed digital engagement.
                </p>
              </div>

              {/* Feature 5: Assignment Turn-in Timeliness */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>5. Assignment Turn-in Timeliness</span>
                  </div>
                  <span className="font-bold text-slate-600">5.5%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-slate-300 h-2 rounded-full" style={{ width: '5.5%' }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Procrastination &amp; submission friction.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
            <span>Model: Gradient Boosting (XGBoost 3.1)</span>
            <Link
              href="/model-performance"
              className="text-blue-600 font-semibold hover:underline"
            >
              Full Feature Log
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Bottom Section: Study Hours Tiers & Prescriptive Signals */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Study Hours vs. GPA Tiers */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Study Hours vs. GPA Tiers</h3>
              </div>

              {/* Toggle Median vs Weekly */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-semibold">
                <button
                  type="button"
                  onClick={() => setStudyHoursMetric('Median')}
                  className={`px-2 py-0.5 rounded ${
                    studyHoursMetric === 'Median'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  Median
                </button>
                <button
                  type="button"
                  onClick={() => setStudyHoursMetric('Weekly')}
                  className={`px-2 py-0.5 rounded ${
                    studyHoursMetric === 'Weekly'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  Weekly
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Analysis of self-directed LMS study time relative to achieved grade brackets.
            </p>

            {/* 4 Tier Columns */}
            <div className="grid grid-cols-4 gap-3 my-6 items-end h-44">
              {/* Column 1: < 2.0 GPA */}
              <div className="flex flex-col items-center justify-end h-full">
                <span className="text-xs font-bold text-red-600 mb-1">4.2h</span>
                <div className="w-full bg-red-100/90 border border-red-200 rounded-t-lg h-[24%] transition-all" />
                <div className="text-center mt-2">
                  <span className="text-[10px] font-bold text-slate-800 block">&lt; 2.0 GPA</span>
                  <span className="text-[9px] text-red-600 font-semibold block">High Risk</span>
                </div>
              </div>

              {/* Column 2: 2.0 - 3.0 */}
              <div className="flex flex-col items-center justify-end h-full">
                <span className="text-xs font-bold text-slate-700 mb-1">9.1h</span>
                <div className="w-full bg-blue-100/80 border border-blue-200 rounded-t-lg h-[46%] transition-all" />
                <div className="text-center mt-2">
                  <span className="text-[10px] font-bold text-slate-800 block">2.0 - 3.0</span>
                  <span className="text-[9px] text-slate-500 font-semibold block">Borderline</span>
                </div>
              </div>

              {/* Column 3: 3.0 - 3.5 */}
              <div className="flex flex-col items-center justify-end h-full">
                <span className="text-xs font-bold text-blue-700 mb-1">14.3h</span>
                <div className="w-full bg-blue-200 border border-blue-300 rounded-t-lg h-[68%] transition-all" />
                <div className="text-center mt-2">
                  <span className="text-[10px] font-bold text-slate-800 block">3.0 - 3.5</span>
                  <span className="text-[9px] text-blue-600 font-semibold block">Target Tier</span>
                </div>
              </div>

              {/* Column 4: 3.5+ GPA */}
              <div className="flex flex-col items-center justify-end h-full">
                <span className="text-xs font-bold text-emerald-700 mb-1">22.6h</span>
                <div className="w-full bg-emerald-400 border border-emerald-500 rounded-t-lg h-[100%] transition-all" />
                <div className="text-center mt-2">
                  <span className="text-[10px] font-bold text-slate-800 block">3.5+ GPA</span>
                  <span className="text-[9px] text-emerald-700 font-semibold block">Dean&apos;s List</span>
                </div>
              </div>
            </div>

            {/* Inflection Point Hint */}
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <span className="font-bold text-slate-900">Optimal inflection point:</span> Crossing
                12.0 weekly LMS hours yields a 48% drop in course dropouts.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100 mt-4">
            <span>Target: &gt;12 hrs/wk</span>
            <Link
              href="/prediction"
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View Engagement Curve</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Right: Automated Prescriptive Signals */}
        <div className="lg:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <AlertOctagon className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Automated Prescriptive Signals
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                🔴 3 Urgent Signals
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Algorithmic interventions prioritized by recovery impact probability.
            </p>

            {/* 3 Action Banners */}
            <div className="space-y-3.5 my-4">
              {/* Signal 1: Critical Early Warning Window Identified */}
              <div className="p-3.5 rounded-xl border border-slate-200 border-l-4 border-l-red-500 bg-red-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-slate-900">
                        Critical Early Warning Window Identified
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 uppercase">
                        Priority 1
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">
                      Academic intervention initiated prior to Week 6 increases final grade
                      recovery probability by 2.4x.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage(
                      'Week 5 early warning notifications deployed to 42 high-risk students.'
                    );
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition shrink-0 cursor-pointer text-center"
                >
                  Deploy Week 5 Notification
                </button>
              </div>

              {/* Signal 2: Departmental Risk Outlier */}
              <div className="p-3.5 rounded-xl border border-slate-200 border-l-4 border-l-blue-500 bg-blue-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-slate-900">
                        Departmental Risk Outlier: 1st Year Engineering
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-200 uppercase">
                        Cohort Alert
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">
                      Abnormal 42% mid-term failure spike detected in Section ENGR-101 compared to
                      3-year baseline averages.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage(
                      'Sent departmental risk briefing to College of Engineering Dean.'
                    );
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition shrink-0 cursor-pointer text-center"
                >
                  Notify Dept Chair
                </button>
              </div>

              {/* Signal 3: LMS Engagement Drop-off Signal */}
              <div className="p-3.5 rounded-xl border border-slate-200 border-l-4 border-l-teal-500 bg-teal-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-slate-900">
                        LMS Engagement Drop-off Signal
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                        System Rule
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">
                      Platform inactivity &gt; 4 consecutive days precedes 68% of overdue quiz
                      un-submissions.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Auto-alert webhook configured for LMS inactivity rule.');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition shrink-0 cursor-pointer text-center"
                >
                  Configure Auto-alert
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100 mt-2">
            <span>Next Automated Sweep: In 14 minutes</span>
            <Link
              href="/recommendations"
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All Retention Blueprints</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. Institutional Compliance & Audit Footer               */}
      {/* ======================================================== */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-500">
        <p className="text-[11px] leading-relaxed max-w-3xl">
          <span className="font-semibold text-slate-700">Institutional Research Protocol:</span>{' '}
          Correlation does not imply direct individual causation. Inferences are intended to
          support proactive educator mentorship and equitable academic interventions.
        </p>
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <span className="font-bold text-slate-700">Model Accuracy: 94.6%</span>
          <span>•</span>
          <Link
            href="/model-performance"
            className="text-blue-600 font-semibold hover:underline"
          >
            Audit Model Run Log &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
