import type { RiskLevel } from './student';

export interface PredictionPayload {
  studentCode: string;
  attendanceRate: number;
  weeklyStudyHours: number;
  quizAverage: number;
  midtermScore: number;
  assignmentScore: number;
  priorFailures: number;
  algorithm?: string;
}

export interface PredictionResponse {
  studentCode: string;
  predictedOutcome: 'PASS' | 'FAIL' | 'AT_RISK';
  predictedClass: number;
  confidence: number;
  riskLevel: RiskLevel;
  recommendations: Array<{
    id: string;
    title: string;
    category: string;
    priority: RiskLevel;
    description: string;
    suggestedActions: string[];
  }>;
  generatedAt: string;
}
