'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PredictionFormProps {
  onPredict: (data: any) => void;
  loading: boolean;
}

export function PredictionForm({ onPredict, loading }: PredictionFormProps) {
  const [formData, setFormData] = useState({
    studentCode: 'STU1088',
    attendanceRate: 72,
    weeklyStudyHours: 8,
    quizAverage: 62,
    midtermScore: 54,
    assignmentScore: 70,
    priorFailures: 1,
    algorithm: 'RANDOM_FOREST',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Early Performance Prediction Input</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Student Code</label>
              <input
                type="text"
                value={formData.studentCode}
                onChange={(e) => setFormData({ ...formData, studentCode: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">ML Algorithm</label>
              <select
                value={formData.algorithm}
                onChange={(e) => setFormData({ ...formData, algorithm: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              >
                <option value="RANDOM_FOREST">Random Forest (Recommended)</option>
                <option value="LOGISTIC_REGRESSION">Logistic Regression (Custom TS)</option>
                <option value="DECISION_TREE">Decision Tree (CART)</option>
                <option value="KNN">K-Nearest Neighbors</option>
                <option value="SVM">Support Vector Machine</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Attendance (%)</label>
              <input
                type="number"
                value={formData.attendanceRate}
                onChange={(e) => setFormData({ ...formData, attendanceRate: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Study Hours/Wk</label>
              <input
                type="number"
                value={formData.weeklyStudyHours}
                onChange={(e) => setFormData({ ...formData, weeklyStudyHours: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Prior Failures</label>
              <input
                type="number"
                value={formData.priorFailures}
                onChange={(e) => setFormData({ ...formData, priorFailures: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Quiz Average (%)</label>
              <input
                type="number"
                value={formData.quizAverage}
                onChange={(e) => setFormData({ ...formData, quizAverage: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Midterm Score (%)</label>
              <input
                type="number"
                value={formData.midtermScore}
                onChange={(e) => setFormData({ ...formData, midtermScore: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Assignment (%)</label>
              <input
                type="number"
                value={formData.assignmentScore}
                onChange={(e) => setFormData({ ...formData, assignmentScore: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Executing ML Inference...' : 'Generate Prediction & Action Plan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
