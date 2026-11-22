'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  ChevronsUpDown,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Settings,
  UploadCloud,
  UserCheck,
  Users,
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload Dataset', href: '/upload-dataset', icon: UploadCloud },
  { name: 'Student Management', href: '/students', icon: Users },
  { name: 'Student Risk List', href: '/student-risk-list', icon: AlertTriangle },
  { name: 'AI Prediction', href: '/prediction', icon: BrainCircuit },
  { name: 'Recommendations', href: '/recommendations', icon: FileText },
  { name: 'AI Insights', href: '/ai-insights', icon: Lightbulb },
  { name: 'Model Performance', href: '/model-performance', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileSpreadsheet },
  { name: 'Team Management', href: '/settings', icon: UserCheck },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0d172e] text-slate-300 flex flex-col justify-between shrink-0 min-h-screen border-r border-slate-800/80 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-900/40">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-white text-base tracking-tight leading-tight">
                EduPredict AI
              </h1>
              <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase block">
                ANALYTICS PLATFORM
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">Demo Mode</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">50 students</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href) && item.href !== '/dashboard';
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-slate-800/80 m-2">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:bg-slate-800/60 cursor-pointer transition">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
              AT
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">Dr. Aris Thorne</p>
              <p className="text-[10px] text-slate-400 truncate">Chief Academic Advisor</p>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-slate-500 shrink-0 ml-1" />
        </div>
      </div>
    </aside>
  );
}
