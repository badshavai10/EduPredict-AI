import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PredictionResultProps {
  data: {
    studentCode: string;
    totalScore?: number;
    componentScores?: {
      quiz: number;
      assignment: number;
      midterm: number;
      final: number;
      attendance: number;
      presentation: number;
    };
    prediction: {
      predictedLabel: string;
      confidence: number;
      riskLevel: string;
    };
    riskLevel: string;
    recommendations: Array<{
      id: string;
      title: string;
      description: string;
      priority: string;
      suggestedActions: string[];
    }>;
  };
}

export function PredictionResult({ data }: PredictionResultProps) {
  const isPass = data.prediction.predictedLabel === 'PASS';

  return (
    <div className="space-y-4">
      <Card
        className={`border-l-4 ${
          isPass
            ? 'border-l-emerald-500 bg-emerald-50/20'
            : data.riskLevel === 'CRITICAL'
            ? 'border-l-red-500 bg-red-50/20'
            : 'border-l-amber-500 bg-amber-50/20'
        }`}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              {isPass ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : data.riskLevel === 'CRITICAL' ? (
                <ShieldAlert className="w-5 h-5 text-red-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              )}
              Prediction: {data.prediction.predictedLabel} ({Math.round(data.prediction.confidence * 100)}% Confidence)
            </CardTitle>
            <div className="flex items-center gap-2">
              {data.totalScore !== undefined && (
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  Total: {data.totalScore}/100
                </span>
              )}
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  data.riskLevel === 'CRITICAL'
                    ? 'bg-red-100 text-red-800'
                    : data.riskLevel === 'HIGH'
                    ? 'bg-orange-100 text-orange-800'
                    : data.riskLevel === 'MEDIUM'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {data.riskLevel} RISK
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Student: <span className="font-semibold">{data.studentCode}</span>. Academic intervention engine generated{' '}
            {data.recommendations.length} prescriptive recommendation(s).
          </p>

          {data.componentScores && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800">
              <div className="text-center p-1.5 rounded bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-500 block uppercase">Quiz</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {data.componentScores.quiz}/15
                </span>
              </div>
              <div className="text-center p-1.5 rounded bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-500 block uppercase">Assign</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {data.componentScores.assignment}/5
                </span>
              </div>
              <div className="text-center p-1.5 rounded bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-500 block uppercase">Midterm</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {data.componentScores.midterm}/25
                </span>
              </div>
              <div className="text-center p-1.5 rounded bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-500 block uppercase">Final</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {data.componentScores.final}/40
                </span>
              </div>
              <div className="text-center p-1.5 rounded bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-500 block uppercase">Attendance</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {data.componentScores.attendance}/7
                </span>
              </div>
              <div className="text-center p-1.5 rounded bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-500 block uppercase">Presentation</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {data.componentScores.presentation}/8
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Personalized Academic Interventions
        </h3>
        {data.recommendations.map((rec) => (
          <Card key={rec.id} className="p-4">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-sm font-semibold">{rec.title}</h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                {rec.priority}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{rec.description}</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {rec.suggestedActions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
