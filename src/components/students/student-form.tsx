'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StudentForm() {
  const [formData, setFormData] = useState({
    studentCode: '',
    department: 'Computer Science',
    currentSemester: 1,
    cumulativeGpa: 3.0,
    quiz: 12.0,
    assignment: 4.5,
    midterm: 20.0,
    final: 32.0,
    attendance: 6.0,
    presentation: 7.0,
  });

  const [status, setStatus] = useState<string | null>(null);

  const totalScore = useMemo(() => {
    return Number(
      (
        formData.quiz +
        formData.assignment +
        formData.midterm +
        formData.final +
        formData.attendance +
        formData.presentation
      ).toFixed(2)
    );
  }, [formData]);

  const riskTier = useMemo(() => {
    if (totalScore >= 75) return { label: 'Low Risk (Good)', color: 'bg-emerald-100 text-emerald-800' };
    if (totalScore >= 60) return { label: 'Moderate Risk (Average)', color: 'bg-blue-100 text-blue-800' };
    if (totalScore >= 45) return { label: 'High Risk (At-Risk)', color: 'bg-amber-100 text-amber-800' };
    return { label: 'Critical Risk', color: 'bg-red-100 text-red-800' };
  }, [totalScore]);

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
        const errorData = await res.json();
        setStatus(errorData.error || 'Error creating profile.');
      }
    } catch {
      setStatus('Network error.');
    }
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Register Student Profile</CardTitle>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${riskTier.color}`}>
            Total: {totalScore}/100 ({riskTier.label})
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="block text-xs font-semibold mb-1">Cumulative GPA (0–4.0)</label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={4.0}
                value={formData.cumulativeGpa}
                onChange={(e) => setFormData({ ...formData, cumulativeGpa: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
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

          {/* 100-Mark Breakdown Components */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
              Course Mark Components (100 Marks Breakdown)
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Quiz (Max 15)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="15"
                  required
                  value={formData.quiz}
                  onChange={(e) => setFormData({ ...formData, quiz: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Assignment (Max 5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                  value={formData.assignment}
                  onChange={(e) => setFormData({ ...formData, assignment: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Mid-term (Max 25)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="25"
                  required
                  value={formData.midterm}
                  onChange={(e) => setFormData({ ...formData, midterm: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3">
              <div>
                <label className="block text-xs font-medium mb-1">Final Exam (Max 40)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="40"
                  required
                  value={formData.final}
                  onChange={(e) => setFormData({ ...formData, final: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Attendance (Max 7)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="7"
                  required
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Presentation (Max 8)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="8"
                  required
                  value={formData.presentation}
                  onChange={(e) => setFormData({ ...formData, presentation: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
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
