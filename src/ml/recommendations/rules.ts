import type { RecommendationItem, RiskLevel } from '../types';

export interface StudentPerformanceFeatures {
  studentCode: string;
  quiz: number;          // 0–15 marks
  assignment: number;    // 0–5 marks
  midterm: number;       // 0–25 marks
  final: number;         // 0–40 marks
  attendance: number;    // 0–7 marks
  presentation: number;  // 0–8 marks
  predictedOutcome: 'PASS' | 'FAIL' | 'AT_RISK';
  // optional legacy fields for backward compatibility
  attendanceRate?: number;
  weeklyStudyHours?: number;
  quizAverage?: number;
  midtermScore?: number;
  assignmentScore?: number;
  priorFailures?: number;
}

export function computeTotalMark(s: {
  quiz?: number;
  assignment?: number;
  midterm?: number;
  final?: number;
  attendance?: number;
  presentation?: number;
  attendanceRate?: number;
  quizAverage?: number;
  midtermScore?: number;
  assignmentScore?: number;
}): number {
  if (
    s.quiz !== undefined &&
    s.assignment !== undefined &&
    s.midterm !== undefined &&
    s.final !== undefined &&
    s.attendance !== undefined &&
    s.presentation !== undefined
  ) {
    return Number(
      (s.quiz + s.assignment + s.midterm + s.final + s.attendance + s.presentation).toFixed(2)
    );
  }

  // Fallback estimation from legacy fields
  const quiz = s.quiz ?? ((s.quizAverage ?? 70) * 0.15);
  const assignment = s.assignment ?? ((s.assignmentScore ?? 75) * 0.05);
  const midterm = s.midterm ?? ((s.midtermScore ?? 65) * 0.25);
  const final = s.final ?? 26.0;
  const attendance = s.attendance ?? ((s.attendanceRate ?? 80) * 0.07);
  const presentation = s.presentation ?? 5.5;
  return Number((quiz + assignment + midterm + final + attendance + presentation).toFixed(2));
}

export const ACADEMIC_RULES = [
  {
    id: 'RULE_ATTENDANCE_DEFICIT',
    condition: (s: StudentPerformanceFeatures) => s.attendance < 3.5,
    getAction: (s: StudentPerformanceFeatures): RecommendationItem => ({
      id: `att-${s.studentCode}`,
      category: 'ATTENDANCE',
      title: 'Mandatory Attendance Counseling Required',
      description: `Current attendance is ${s.attendance.toFixed(1)}/7 marks, violating the minimum engagement threshold (< 3.5/7).`,
      priority: s.attendance < 3.0 ? 'CRITICAL' : 'HIGH',
      suggestedActions: [
        'Schedule an immediate meeting with the Academic Advisor',
        'Submit attendance regularisation documentation if medical/emergency applies',
        'Target 100% attendance in all remaining lecture & lab sessions',
      ],
    }),
  },
  {
    id: 'RULE_QUIZ_DEFICIT',
    condition: (s: StudentPerformanceFeatures) => s.quiz < 7.0,
    getAction: (s: StudentPerformanceFeatures): RecommendationItem => ({
      id: `quiz-${s.studentCode}`,
      category: 'ACADEMIC',
      title: 'Continuous Assessment & Quiz Remediation',
      description: `Formative quiz performance is ${s.quiz.toFixed(1)}/15 marks, indicating persistent weekly lecture gaps.`,
      priority: s.quiz < 5.0 ? 'HIGH' : 'MEDIUM',
      suggestedActions: [
        'Review lecture summaries within 24 hours of each class',
        'Take weekly practice self-quizzes before scheduled in-class assessments',
        'Attend peer-led tutoring sessions for problem-solving walkthroughs',
      ],
    }),
  },
  {
    id: 'RULE_ASSIGNMENT_DEFICIT',
    condition: (s: StudentPerformanceFeatures) => s.assignment < 2.5,
    getAction: (s: StudentPerformanceFeatures): RecommendationItem => ({
      id: `assign-${s.studentCode}`,
      category: 'STUDY_HABIT',
      title: 'Assignment Completion & Homework Clinic',
      description: `Assignment score is ${s.assignment.toFixed(1)}/5 marks, indicating missed deadlines or incomplete lab deliverables.`,
      priority: 'MEDIUM',
      suggestedActions: [
        'Adopt the Pomodoro technique for daily structured homework blocks',
        'Submit draft assignments to teaching assistants 48 hours in advance',
        'Attend teaching assistant problem clinic for assignment assistance',
      ],
    }),
  },
  {
    id: 'RULE_MIDTERM_DEFICIT',
    condition: (s: StudentPerformanceFeatures) => s.midterm < 11.0,
    getAction: (s: StudentPerformanceFeatures): RecommendationItem => ({
      id: `midterm-${s.studentCode}`,
      category: 'ACADEMIC',
      title: 'Midterm Recovery & Remedial Tutoring',
      description: `Mid-term examination score is ${s.midterm.toFixed(1)}/25 marks, placing the student at acute risk of course failure.`,
      priority: 'CRITICAL',
      suggestedActions: [
        'Enroll in departmental peer tutoring sessions twice weekly',
        'Review midterm exam feedback directly during Instructor office hours',
        'Complete all optional review problem sets and diagnostic makeup tests',
      ],
    }),
  },
  {
    id: 'RULE_FINAL_DEFICIT',
    condition: (s: StudentPerformanceFeatures) => s.final < 18.0,
    getAction: (s: StudentPerformanceFeatures): RecommendationItem => ({
      id: `final-${s.studentCode}`,
      category: 'ACADEMIC',
      title: 'Final Exam Intensive Preparation Clinic',
      description: `Final exam performance is ${s.final.toFixed(1)}/40 marks (< 45%), requiring comprehensive semester review.`,
      priority: 'CRITICAL',
      suggestedActions: [
        'Participate in faculty-led final exam review bootcamps',
        'Form structured study groups for comprehensive past-paper solving',
        'Meet with advisor to establish a targeted revision roadmap',
      ],
    }),
  },
  {
    id: 'RULE_PRESENTATION_DEFICIT',
    condition: (s: StudentPerformanceFeatures) => s.presentation < 4.0,
    getAction: (s: StudentPerformanceFeatures): RecommendationItem => ({
      id: `pres-${s.studentCode}`,
      category: 'INTERVENTION',
      title: 'Oral Presentation & Academic Communication Workshop',
      description: `Presentation score is ${s.presentation.toFixed(1)}/8 marks, reflecting deficiencies in project defense or verbal delivery.`,
      priority: 'MEDIUM',
      suggestedActions: [
        'Attend university communication and public speaking workshops',
        'Conduct peer mock presentations with slide critique rubrics',
        'Review faculty slide design and defense presentation guidelines',
      ],
    }),
  },
];

export function determineRiskLevel(s: StudentPerformanceFeatures): RiskLevel {
  const total = computeTotalMark(s);

  // Critical Risk: Total < 45 or acute component failures
  if (total < 45 || s.attendance < 3.0 || s.final < 14.0) {
    return 'CRITICAL';
  }
  // High Risk: Total 45 to 59 or key milestone failures
  if (total < 60 || s.attendance < 3.5 || s.midterm < 11.0 || s.predictedOutcome === 'FAIL') {
    return 'HIGH';
  }
  // Moderate Risk: Total 60 to 74
  if (total < 75 || s.predictedOutcome === 'AT_RISK') {
    return 'MEDIUM';
  }
  // Low Risk: Total >= 75
  return 'LOW';
}
