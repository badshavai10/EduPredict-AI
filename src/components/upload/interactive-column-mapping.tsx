'use client';

import {
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  Hash,
  Percent,
  RotateCcw,
  Settings2,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

interface MappingItem {
  sourceCol: string;
  sourceType: 'hash' | 'percent';
  direction: 'one-way' | 'two-way';
  targetFeature: string;
  targetDetail: string;
  sampleValue: string;
  status: 'Matched' | 'Configured';
}

const initialMappings: MappingItem[] = [
  {
    sourceCol: 'studentCode',
    sourceType: 'hash',
    direction: 'one-way',
    targetFeature: 'Student Code / ID',
    targetDetail: 'Unique Identifier [Alphanumeric String]',
    sampleValue: "'STU1001'",
    status: 'Matched',
  },
  {
    sourceCol: 'quiz',
    sourceType: 'hash',
    direction: 'one-way',
    targetFeature: 'Quiz Marks (Scale 0–15)',
    targetDetail: 'Continuous formative assessments [Max 15]',
    sampleValue: "'13.5'",
    status: 'Matched',
  },
  {
    sourceCol: 'assignment',
    sourceType: 'hash',
    direction: 'one-way',
    targetFeature: 'Assignment Marks (Scale 0–5)',
    targetDetail: 'Continuous assignment deliverables [Max 5]',
    sampleValue: "'4.8'",
    status: 'Matched',
  },
  {
    sourceCol: 'midterm',
    sourceType: 'hash',
    direction: 'one-way',
    targetFeature: 'Mid-term Exam (Scale 0–25)',
    targetDetail: 'Major mid-semester examination [Max 25]',
    sampleValue: "'22.5'",
    status: 'Matched',
  },
  {
    sourceCol: 'final',
    sourceType: 'hash',
    direction: 'one-way',
    targetFeature: 'Final Exam (Scale 0–40)',
    targetDetail: 'Summative semester examination [Max 40]',
    sampleValue: "'35.0'",
    status: 'Matched',
  },
  {
    sourceCol: 'attendance',
    sourceType: 'hash',
    direction: 'one-way',
    targetFeature: 'Attendance Score (Scale 0–7)',
    targetDetail: 'Classroom & lab presence [Max 7]',
    sampleValue: "'6.5'",
    status: 'Matched',
  },
  {
    sourceCol: 'presentation',
    sourceType: 'hash',
    direction: 'one-way',
    targetFeature: 'Presentation Score (Scale 0–8)',
    targetDetail: 'Oral delivery & project defense [Max 8]',
    sampleValue: "'7.5'",
    status: 'Matched',
  },
  {
    sourceCol: 'totalScore',
    sourceType: 'percent',
    direction: 'one-way',
    targetFeature: 'Total Marks (Scale 0–100)',
    targetDetail: 'Aggregated course score out of 100',
    sampleValue: "'89.8'",
    status: 'Matched',
  },
  {
    sourceCol: 'finalOutcome',
    sourceType: 'hash',
    direction: 'two-way',
    targetFeature: 'Target Performance Outcome (Classification)',
    targetDetail: 'Supervised ground-truth binary label (1=Pass, 0=At-Risk)',
    sampleValue: "'1'",
    status: 'Configured',
  },
];

export function InteractiveColumnMapping() {
  const [mappings] = useState<MappingItem[]>(initialMappings);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase block">
            SCHEMA ALIGNMENT ENGINE
          </span>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-0.5">
            Interactive Column Mapping
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Match your uploaded CSV headers to EduPredict AI model input tensors.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Auto-Match All</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Tensors</span>
          </button>
        </div>
      </div>

      {/* Mapping Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 font-semibold">Source Column (Uploaded CSV)</th>
              <th className="pb-3 font-semibold text-center w-16">Mapping</th>
              <th className="pb-3 font-semibold">EduPredict Target Feature</th>
              <th className="pb-3 font-semibold">Sample Value</th>
              <th className="pb-3 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mappings.map((item) => (
              <tr key={item.sourceCol} className="hover:bg-slate-50/60 transition">
                {/* Source Column */}
                <td className="py-3 font-mono font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      {item.sourceType === 'percent' ? (
                        <Percent className="w-3 h-3" />
                      ) : (
                        <Hash className="w-3 h-3" />
                      )}
                    </span>
                    <span className="font-semibold text-slate-900">{item.sourceCol}</span>
                  </div>
                </td>

                {/* Arrow Direction */}
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center text-slate-400">
                    {item.direction === 'two-way' ? (
                      <ArrowRightLeft className="w-3.5 h-3.5 text-blue-500" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </td>

                {/* EduPredict Target Feature */}
                <td className="py-3">
                  <p className="font-bold text-slate-900">{item.targetFeature}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.targetDetail}</p>
                </td>

                {/* Sample Value */}
                <td className="py-3 font-mono text-[11px] text-slate-600">{item.sampleValue}</td>

                {/* Status Badge */}
                <td className="py-3 text-right">
                  {item.status === 'Matched' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Matched
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      <Settings2 className="w-3 h-3 text-blue-600" />
                      Configured
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
