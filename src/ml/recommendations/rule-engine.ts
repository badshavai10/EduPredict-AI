import type { RecommendationItem, RiskLevel } from '../types';

export interface StudentAcademicFeatures {
  studentCode: string;
  quiz?: number;          // 0–15 marks
  assignment?: number;    // 0–5 marks
  midterm?: number;       // 0–25 marks
  final?: number;         // 0–40 marks
  attendance?: number;    // 0–7 marks
  presentation?: number;  // 0–8 marks
  predictedOutcome: 'PASS' | 'FAIL' | 'AT_RISK';
  // Optional legacy fields for backward compatibility
  attendanceRate?: number;
  weeklyStudyHours?: number;
  quizAverage?: number;
  midtermScore?: number;
  assignmentScore?: number;
  priorFailures?: number;
}

export class AcademicRuleEngine {
  public static calculateTotalMarks(student: StudentAcademicFeatures): number {
    const quiz = student.quiz ?? ((student.quizAverage ?? 70) * 0.15);
    const assignment = student.assignment ?? ((student.assignmentScore ?? 75) * 0.05);
    const midterm = student.midterm ?? ((student.midtermScore ?? 65) * 0.25);
    const final = student.final ?? 26.0;
    const attendance = student.attendance ?? ((student.attendanceRate ?? 80) * 0.07);
    const presentation = student.presentation ?? 5.5;

    return Number((quiz + assignment + midterm + final + attendance + presentation).toFixed(2));
  }

  public static evaluateInterventions(student: StudentAcademicFeatures): RecommendationItem[] {
    const recommendations: RecommendationItem[] = [];

    const quiz = student.quiz ?? ((student.quizAverage ?? 70) * 0.15);
    const assignment = student.assignment ?? ((student.assignmentScore ?? 75) * 0.05);
    const midterm = student.midterm ?? ((student.midtermScore ?? 65) * 0.25);
    const final = student.final ?? 26.0;
    const attendance = student.attendance ?? ((student.attendanceRate ?? 80) * 0.07);
    const presentation = student.presentation ?? 5.5;

    // Rule 1: Attendance Deficit (< 3.5 out of 7)
    if (attendance < 3.5 || (student.attendanceRate !== undefined && student.attendanceRate < 60)) {
      const isCritical = attendance < 3.0 || (student.attendanceRate !== undefined && student.attendanceRate < 55);
      recommendations.push({
        id: `att-${student.studentCode}`,
        category: 'ATTENDANCE',
        title: 'Mandatory Attendance Counseling Required',
        description: `Current attendance is ${attendance.toFixed(1)}/7 marks, violating institutional minimum threshold (< 3.5/7).`,
        priority: isCritical ? 'CRITICAL' : 'HIGH',
        suggestedActions: [
          'Schedule an immediate meeting with the Academic Advisor',
          'Submit absence justification documentation if medical/emergency reasons apply',
          'Commit to 100% attendance in all remaining lecture and lab sessions',
        ],
      });
    }

    // Rule 2: Quiz Deficit (< 7 out of 15)
    if (quiz < 7.0 || (student.quizAverage !== undefined && student.quizAverage < 50)) {
      recommendations.push({
        id: `quiz-${student.studentCode}`,
        category: 'ACADEMIC',
        title: 'Formative Assessment & Quiz Remediation',
        description: `Continuous quiz score is ${quiz.toFixed(1)}/15 marks, indicating persistent comprehension gaps in weekly lecture topics.`,
        priority: quiz < 5.0 ? 'HIGH' : 'MEDIUM',
        suggestedActions: [
          'Review lecture notes within 24 hours of each lecture',
          'Take weekly self-assessment quizzes prior to in-class assessments',
          'Attend peer-led tutoring sessions for weekly problem sets',
        ],
      });
    }

    // Rule 3: Assignment Deficit (< 2.5 out of 5)
    if (assignment < 2.5) {
      recommendations.push({
        id: `assign-${student.studentCode}`,
        category: 'STUDY_HABIT',
        title: 'Assignment Completion & Homework Clinic',
        description: `Assignment score is ${assignment.toFixed(1)}/5 marks, indicating missed homework deliverables or lab submissions.`,
        priority: 'MEDIUM',
        suggestedActions: [
          'Adopt the Pomodoro technique for daily structured study blocks',
          'Submit assignment drafts to teaching assistants during lab hours',
          'Join course study group to collaborate on practice problems',
        ],
      });
    }

    // Rule 4: Midterm Examination Deficit (< 11 out of 25)
    if (midterm < 11.0 || (student.midtermScore !== undefined && student.midtermScore < 50)) {
      recommendations.push({
        id: `midterm-${student.studentCode}`,
        category: 'ACADEMIC',
        title: 'Midterm Recovery & Remedial Tutoring',
        description: `Midterm examination score is ${midterm.toFixed(1)}/25 marks, placing the student at immediate risk of semester failure.`,
        priority: 'CRITICAL',
        suggestedActions: [
          'Enroll in Departmental Peer Tutoring sessions twice weekly',
          'Review midterm exam feedback directly during Instructor office hours',
          'Complete all optional review problem sets and diagnostic makeup tests',
        ],
      });
    }

    // Rule 5: Final Exam Projection Deficit (< 18 out of 40)
    if (final < 18.0) {
      recommendations.push({
        id: `final-${student.studentCode}`,
        category: 'ACADEMIC',
        title: 'Final Exam Intensive Review Clinic',
        description: `Final exam performance is ${final.toFixed(1)}/40 marks (< 45%), requiring comprehensive semester review.`,
        priority: 'CRITICAL',
        suggestedActions: [
          'Participate in faculty-led comprehensive review bootcamps',
          'Practice with past semester exam papers under timed conditions',
          'Coordinate an intensive revision roadmap with the assigned academic advisor',
        ],
      });
    }

    // Rule 6: Presentation Deficit (< 4 out of 8)
    if (presentation < 4.0) {
      recommendations.push({
        id: `pres-${student.studentCode}`,
        category: 'INTERVENTION',
        title: 'Oral Presentation & Academic Communication Workshop',
        description: `Presentation score is ${presentation.toFixed(1)}/8 marks, reflecting deficiencies in verbal delivery and project defense.`,
        priority: 'MEDIUM',
        suggestedActions: [
          'Attend university public speaking and academic presentation workshops',
          'Conduct peer mock presentations with rubric-based feedback',
        ],
      });
    }

    // Rule 7: Repeat Course / Prior Failures (legacy support)
    if (student.priorFailures && student.priorFailures > 0) {
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
    const total = this.calculateTotalMarks(student);

    const attendance = student.attendance ?? ((student.attendanceRate ?? 80) * 0.07);
    const midterm = student.midterm ?? ((student.midtermScore ?? 65) * 0.25);
    const final = student.final ?? 26.0;

    // Critical Risk: Total < 45 or acute failure
    if (total < 45 || attendance < 3.0 || final < 14.0) {
      return 'CRITICAL';
    }
    // High Risk: Total 45 to 59
    if (total < 60 || attendance < 3.5 || midterm < 11.0 || student.predictedOutcome === 'FAIL') {
      return 'HIGH';
    }
    // Moderate Risk: Total 60 to 74
    if (total < 75 || student.predictedOutcome === 'AT_RISK') {
      return 'MEDIUM';
    }
    // Low Risk: Total >= 75
    return 'LOW';
  }
}
