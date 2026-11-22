import type { RecommendationItem, RiskLevel } from '../types';

export interface StudentPerformanceFeatures {
  studentCode: string;
  attendanceRate: number;
  weeklyStudyHours: number;
  quizAverage: number;
  midtermScore: number;
  assignmentScore?: number;
  priorFailures: number;
  predictedOutcome: 'PASS' | 'FAIL' | 'AT_RISK';
}

export const ACADEMIC_RULES = [
  {
    id: 'RULE_ATTENDANCE_CRITICAL',
    condition: (s: StudentPerformanceFeatures) => s.attendanceRate < 75,
    getAction: (s: StudentPerformanceFeatures): RecommendationItem => ({
      id: `att-${s.studentCode}`,
      category: 'ATTENDANCE',
      title: 'Mandatory Attendance Counseling Required',
      description: `Current attendance is ${s.attendanceRate.toFixed(1)}%, violating completion threshold (< 75%).`,
      priority: s.attendanceRate < 60 ? 'CRITICAL' : 'HIGH',
      suggestedActions: [
        'Schedule meeting with academic advisor',
        'Submit attendance regularisation documentation',
        'Target 90%+ attendance in remaining lectures',
      ],
    }),
  },
  {
    id: 'RULE_STUDY_HOURS',
    condition: (s: StudentPerformanceFeatures) => s.weeklyStudyHours < 10,
    getAction: (s: StudentPerformanceFeatures): RecommendationItem => ({
      id: `study-${s.studentCode}`,
      category: 'STUDY_HABIT',
      title: 'Structured Independent Study Plan',
      description: `Weekly study time is ${s.weeklyStudyHours} hrs/week. Target 15+ hours for academic recovery.`,
      priority: s.predictedOutcome === 'FAIL' ? 'HIGH' : 'MEDIUM',
      suggestedActions: [
        'Adopt Pomodoro technique (4 x 25-min sessions daily)',
        'Dedicate 3-hour weekend blocks for complex subject reviews',
        'Join department study groups',
      ],
    }),
  },
  {
    id: 'RULE_MIDTERM_RECOVERY',
    condition: (s: StudentPerformanceFeatures) => s.midtermScore < 50,
    getAction: (s: StudentPerformanceFeatures): RecommendationItem => ({
      id: `midterm-${s.studentCode}`,
      category: 'ACADEMIC',
      title: 'Midterm Recovery & Remedial Tutoring',
      description: `Midterm score (${s.midtermScore}%) indicates immediate course failure risk.`,
      priority: 'CRITICAL',
      suggestedActions: [
        'Enroll in departmental peer tutoring sessions',
        'Attend instructor office hours weekly',
        'Complete all optional review problem sets',
      ],
    }),
  },
];

export function determineRiskLevel(s: StudentPerformanceFeatures): RiskLevel {
  if (s.attendanceRate < 60 || s.midtermScore < 40 || (s.priorFailures >= 2 && s.midtermScore < 55)) {
    return 'CRITICAL';
  }
  if (s.attendanceRate < 75 || s.midtermScore < 50 || s.priorFailures > 0 || s.predictedOutcome === 'FAIL') {
    return 'HIGH';
  }
  if (s.quizAverage < 65 || s.weeklyStudyHours < 12 || s.predictedOutcome === 'AT_RISK') {
    return 'MEDIUM';
  }
  return 'LOW';
}
