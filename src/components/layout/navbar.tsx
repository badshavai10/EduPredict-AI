import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-slate-900 dark:text-slate-100">
          <div className="p-2 bg-blue-600 text-white rounded-lg">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span>EduPredict AI</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 dark:text-slate-400">
            Dashboard
          </Link>
          <Link href="/about" className="text-slate-600 hover:text-blue-600 dark:text-slate-400">
            About
          </Link>
          <Link href="/methodology" className="text-slate-600 hover:text-blue-600 dark:text-slate-400">
            Methodology
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
