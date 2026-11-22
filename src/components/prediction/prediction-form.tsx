'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PredictionFormProps {
  onPredict: (data: any) => void;
  loading: boolean;
}

export function PredictionForm({ onPredict, loading }: PredictionFormProps) {
  const [formData, setFormData] = useState({
    studentCode: 'STU1088',
    quiz: 11.5,
    assignment: 4.2,
    midterm: 18.0,
    final: 28.5,
    attendance: 5.5,
    presentation: 6.5,
    algorithm: 'RANDOM_FOREST',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict({
      ...formData,
      totalScore,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Student Performance Assessment (100 Marks)</CardTitle>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${riskTier.color}`}>
            Total: {totalScore}/100 ({riskTier.label})
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Student Code</label>
              <input
                type="text"
                required
                value={formData.studentCode}
                onChange={(e) => setFormData({ ...formData, studentCode: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">ML Classifier Algorithm</label>
              <select
                value={formData.algorithm}
                onChange={(e) => setFormData({ ...formData, algorithm: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-slate-800 dark:border-slate-700"
              >
                <option value="RANDOM_FOREST">Random Forest (Production v2.4)</option>
                <option value="LOGISTIC_REGRESSION">Logistic Regression (Custom TS)</option>
                <option value="DECISION_TREE">Decision Tree (CART)</option>
                <option value="KNN">K-Nearest Neighbors (KNN)</option>
                <option value="SVM">Support Vector Machine (SVM)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Assessment Component Scores (Sum: 100)
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Executing ML Inference...' : 'Generate Prediction & Action Plan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
