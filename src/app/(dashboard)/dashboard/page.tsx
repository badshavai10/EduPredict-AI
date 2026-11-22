'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { AISynthesisCard } from '@/components/dashboard/ai-synthesis-card';
import { AuditInterventionLog } from '@/components/dashboard/audit-intervention-log';
import { InterventionOverviewBanner } from '@/components/dashboard/intervention-overview-banner';
import { PriorityPredictionsTable } from '@/components/dashboard/priority-predictions-table';
import { RiskDistributionDonut } from '@/components/dashboard/risk-distribution-donut';
import { StatMetricsRow } from '@/components/dashboard/stat-metrics-row';
import { StrategyProgressCard } from '@/components/dashboard/strategy-progress-card';

const gradeTabs = ['All Grades', 'Grade 9', 'Grade 10', 'Grade 11-12'];

export default function DashboardPage() {
  const [selectedGrade, setSelectedGrade] = useState('All Grades');

  return (
    <div className="space-y-6">
      {/* Dashboard Title & Grade Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              Fall 2024
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Real-time student risk overview, dynamic intervention signals &amp; early warnings
          </p>
        </div>

        {/* Grade Filters & View All Link */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="inline-flex p-1 rounded-xl bg-slate-200/60 border border-slate-200 text-xs">
            {gradeTabs.map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedGrade === grade
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

          <Link
            href="/students"
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>View All Students</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <StatMetricsRow />

      {/* Intervention Overview Strip */}
      <InterventionOverviewBanner />

      {/* Middle Row: Strategies Progress & Risk Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <StrategyProgressCard />
        <RiskDistributionDonut />
      </div>

      {/* Bottom Section: Table + AI Synthesis & Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left 8 Columns: Priority Predictions Table */}
        <div className="lg:col-span-8">
          <PriorityPredictionsTable />
        </div>

        {/* Right 4 Columns: AI Synthesis Card + Audit & Intervention Log */}
        <div className="lg:col-span-4 space-y-5">
          <AISynthesisCard />
          <AuditInterventionLog />
        </div>
      </div>
    </div>
  );
}
