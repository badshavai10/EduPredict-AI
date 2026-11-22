import type { RiskLevel } from './student';

export interface PredictionPayload {
  studentCode: string;
  quiz: number;          // 0–15 marks
  assignment: number;    // 0–5 marks
  midterm: number;       // 0–25 marks
  final: number;         // 0–40 marks
  attendance: number;    // 0–7 marks
  presentation: number;  // 0–8 marks
  algorithm?: string;
  // legacy optional fields
  attendanceRate?: number;
  weeklyStudyHours?: number;
  quizAverage?: number;
  midtermScore?: number;
  assignmentScore?: number;
  priorFailures?: number;
}

export interface PredictionResponse {
  studentCode: string;
  predictedOutcome: 'PASS' | 'FAIL' | 'AT_RISK';
  predictedClass: number;
  confidence: number;
  riskLevel: RiskLevel;
  totalScore: number;
  componentScores: {
    quiz: number;
    assignment: number;
    midterm: number;
    final: number;
    attendance: number;
    presentation: number;
  };
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
