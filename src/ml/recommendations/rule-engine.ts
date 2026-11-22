import type { RecommendationItem, RiskLevel } from '../types';

export interface StudentAcademicFeatures {
  studentCode: string;
  attendanceRate: number; // 0 - 100
  weeklyStudyHours: number;
  quizAverage: number; // 0 - 100
  midtermScore: number; // 0 - 100
  priorFailures: number;
  predictedOutcome: 'PASS' | 'FAIL' | 'AT_RISK';
}

export class AcademicRuleEngine {
  public static evaluateInterventions(student: StudentAcademicFeatures): RecommendationItem[] {
    const recommendations: RecommendationItem[] = [];

    // Rule 1: Attendance Critical Intervention (< 75%)
    if (student.attendanceRate < 75) {
      const isCritical = student.attendanceRate < 60;
      recommendations.push({
        id: `att-${student.studentCode}`,
        category: 'ATTENDANCE',
        title: 'Mandatory Attendance Counseling Required',
        description: `Current attendance is ${student.attendanceRate.toFixed(1)}%, which violates institutional completion thresholds (< 75%).`,
        priority: isCritical ? 'CRITICAL' : 'HIGH',
        suggestedActions: [
          'Schedule an immediate meeting with the Academic Advisor',
          'Submit absence justification documentation if medical/emergency reasons apply',
          'Commit to a minimum 90% attendance record for the remaining class sessions',
        ],
      });
    }

    // Rule 2: Low Weekly Study Time (< 10 hours)
    if (student.weeklyStudyHours < 10) {
      recommendations.push({
        id: `study-${student.studentCode}`,
        category: 'STUDY_HABIT',
        title: 'Structured Independent Study Plan',
        description: `Weekly self-study time is ${student.weeklyStudyHours} hours/week. Academic success models indicate 15+ hours are required for good standing.`,
        priority: student.predictedOutcome === 'FAIL' ? 'HIGH' : 'MEDIUM',
        suggestedActions: [
          'Adopt the Pomodoro technique (4 x 25-minute study blocks daily)',
          'Allocate fixed 3-hour weekend review sessions for difficult subjects',
          'Join or form an active course study group with classmates',
        ],
      });
    }

    // Rule 3: Midterm Deficit (< 50%)
    if (student.midtermScore < 50) {
      recommendations.push({
        id: `midterm-${student.studentCode}`,
        category: 'ACADEMIC',
        title: 'Midterm Recovery & Remedial Tutoring',
        description: `Midterm examination score (${student.midtermScore}%) places the student at immediate risk of failing the semester.`,
        priority: 'CRITICAL',
        suggestedActions: [
          'Enroll in Departmental Peer Tutoring sessions twice weekly',
          'Review midterm exam feedback directly during Instructor office hours',
          'Complete all optional practice problems and makeup assignments',
        ],
      });
    }

    // Rule 4: Quiz Consistency Deficit (< 60%)
    if (student.quizAverage < 60 && student.midtermScore >= 50) {
      recommendations.push({
        id: `quiz-${student.studentCode}`,
        category: 'ACADEMIC',
        title: 'Continuous Assessment Preparedness',
        description: `Continuous assessment quiz scores average ${student.quizAverage}%, indicating knowledge gaps in weekly lecture topics.`,
        priority: 'MEDIUM',
        suggestedActions: [
          'Review lecture notes within 24 hours of each lecture',
          'Take weekly self-assessment quizzes prior to in-class assessments',
        ],
      });
    }

    // Rule 5: Repeat Course / Prior Failures
    if (student.priorFailures > 0) {
      recommendations.push({
        id: `history-${student.studentCode}`,
        category: 'INTERVENTION',
        title: 'Academic Probation & Prerequisite Support',
        description: `Student has ${student.priorFailures} prior course failure(s). Cumulative failure history heightens attrition probability.`,
        priority: 'HIGH',
        suggestedActions: [
          'Undergo monthly progress monitoring with Department Head',
          'Audit foundational prerequisite course materials',
        ],
      });
    }

    // Fallback: Positive reinforcement if in good standing
    if (recommendations.length === 0) {
      recommendations.push({
        id: `good-${student.studentCode}`,
        category: 'ACADEMIC',
        title: 'Academic Enrichment & Honors Pathway',
        description: 'Student demonstrates consistent attendance, strong assessment scores, and balanced study habits.',
        priority: 'LOW',
        suggestedActions: [
          'Consider undergraduate research assistantship or peer mentor roles',
          'Explore advanced elective offerings and honor track milestones',
        ],
      });
    }

    return recommendations;
  }

  public static determineRiskLevel(student: StudentAcademicFeatures): RiskLevel {
    if (student.attendanceRate < 60 || student.midtermScore < 40 || (student.priorFailures >= 2 && student.midtermScore < 55)) {
      return 'CRITICAL';
    }
    if (student.attendanceRate < 75 || student.midtermScore < 50 || student.priorFailures > 0 || student.predictedOutcome === 'FAIL') {
      return 'HIGH';
    }
    if (student.quizAverage < 65 || student.weeklyStudyHours < 12 || student.predictedOutcome === 'AT_RISK') {
      return 'MEDIUM';
    }
    return 'LOW';
  }
}
