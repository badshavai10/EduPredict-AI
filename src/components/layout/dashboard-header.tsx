'use client';

import {
  Bell,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  RefreshCw,
  Search,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardHeader() {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  return (
    <div className="w-full bg-white border-b border-slate-200">
      {/* Top Navbar */}
      <div className="h-16 px-6 flex items-center justify-between gap-4">
        {/* Left: Dataset Badge Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer hover:bg-slate-100 transition shadow-2xs">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>Dataset: Fall 2024 Final.csv</span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search student by name or ID..."
              className="w-full pl-9 pr-12 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
            />
            <kbd className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button
            type="button"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* Upload Dataset Button */}
          <Link
            href="/upload-dataset"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#2563eb] text-white text-xs font-semibold hover:bg-blue-700 transition shadow-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Dataset</span>
          </Link>
        </div>
      </div>

      {/* Cohort Notification Banner - only on Dashboard page */}
      {isDashboard && (
        <div className="px-6 py-2.5 bg-blue-50/80 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start md:items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 md:mt-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-800">
                  Viewing Cohort: Fall 2024 (Active Pilot)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700">
                  50 Syncs 2m ago
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Predictive models based on historical 3-year district telemetry. Press{' '}
                <kbd className="px-1 py-0.5 text-[10px] bg-white border border-slate-200 rounded font-mono">⌘K</kbd> anywhere to search students.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 transition shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Switch Cohort</span>
            </button>
            <Link
              href="/upload-dataset"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563eb] text-white text-xs font-semibold hover:bg-blue-700 transition shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Import CSV</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
