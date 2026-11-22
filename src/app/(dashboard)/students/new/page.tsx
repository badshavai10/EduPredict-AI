import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { StudentForm } from '@/components/students/student-form';

export default function NewStudentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/students" className="p-2 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Register New Student</h1>
          <p className="text-xs text-slate-500">Add an academic profile to the early warning database</p>
        </div>
      </div>

      <StudentForm />
    </div>
  );
}
