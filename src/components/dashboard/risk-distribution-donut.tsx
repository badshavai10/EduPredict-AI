'use client';

import { Info } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const riskData = [
  { name: 'Tier 3 (High)', value: 20, count: 20, pct: '40%', color: '#ef4444' },
  { name: 'Tier 2 (Medium)', value: 18, count: 18, pct: '36%', color: '#f59e0b' },
  { name: 'Tier 1 (Low)', value: 12, count: 12, pct: '24%', color: '#10b981' },
];

export function RiskDistributionDonut() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Student Risk Distribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Three-tier model stratification</p>
        </div>
        <button
          type="button"
          title="Model stratification info"
          className="text-slate-400 hover:text-slate-600 transition"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Donut Chart with Center Text */}
      <div className="relative h-44 flex items-center justify-center my-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskData}
              innerRadius={52}
              outerRadius={74}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {riskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any, name: any) => [`${value} students`, name]}
              contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text in Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-slate-900 leading-none">50</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            TOTAL POOL
          </span>
        </div>
      </div>

      {/* Bottom 3 Legend Tiles */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
        {/* Tier 3 */}
        <div className="p-2 rounded-lg bg-red-50/50 border border-red-100/60">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Tier 3
          </div>
          <div className="text-base font-extrabold text-red-600 mt-0.5">20</div>
          <span className="text-[10px] text-slate-500">High (40%)</span>
        </div>

        {/* Tier 2 */}
        <div className="p-2 rounded-lg bg-amber-50/50 border border-amber-100/60">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Tier 2
          </div>
          <div className="text-base font-extrabold text-amber-600 mt-0.5">18</div>
          <span className="text-[10px] text-slate-500">Medium (36%)</span>
        </div>

        {/* Tier 1 */}
        <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100/60">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Tier 1
          </div>
          <div className="text-base font-extrabold text-emerald-600 mt-0.5">12</div>
          <span className="text-[10px] text-slate-500">Low (24%)</span>
        </div>
      </div>
    </div>
  );
}
