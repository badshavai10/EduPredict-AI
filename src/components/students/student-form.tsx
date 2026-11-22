'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StudentForm() {
  const [formData, setFormData] = useState({
    studentCode: '',
    department: 'Computer Science',
    currentSemester: 1,
    cumulativeGpa: 3.0,
    attendanceRate: 85,
    weeklyStudyHours: 12,
    priorFailures: 0,
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('Student profile successfully created.');
      } else {
        setStatus('Error creating profile.');
      }
    } catch {
      setStatus('Network error.');
    }
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="text-lg">Register Student Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Student Code</label>
            <input
              type="text"
              required
              value={formData.studentCode}
              onChange={(e) => setFormData({ ...formData, studentCode: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              placeholder="e.g. STU1045"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Department</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Current Semester</label>
              <input
                type="number"
                min={1}
                max={12}
                value={formData.currentSemester}
                onChange={(e) => setFormData({ ...formData, currentSemester: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Attendance Rate (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.attendanceRate}
                onChange={(e) => setFormData({ ...formData, attendanceRate: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Weekly Study Hours</label>
              <input
                type="number"
                min={0}
                value={formData.weeklyStudyHours}
                onChange={(e) => setFormData({ ...formData, weeklyStudyHours: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Save Student Record
          </Button>
          {status && <p className="text-xs text-center text-blue-600 mt-2">{status}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
