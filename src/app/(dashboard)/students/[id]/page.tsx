import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/students" className="p-2 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Student Profile &amp; Telemetry</h1>
          <p className="text-xs text-slate-500">ID: {id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Academic Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b">
              <span className="text-slate-500">Identifier:</span>
              <span className="font-semibold">{id}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="text-slate-500">Department:</span>
              <span className="font-semibold">Computer Science</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="text-slate-500">Cumulative GPA:</span>
              <span className="font-semibold text-blue-600">3.75</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Attendance:</span>
              <span className="font-semibold text-emerald-600">92.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">Historical Course Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500 mb-4">
              Transcript records and midterm checkpoints for this student.
            </p>
            <div className="rounded-lg border p-4 text-xs text-slate-600">
              <p className="font-medium">Continuous assessments tracked across all active semesters.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
