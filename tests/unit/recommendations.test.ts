import { describe, expect, it } from 'vitest';
import {
  AcademicRecommendationService,
  AcademicRuleEngine,
} from '../../src/ml/recommendations';

describe('Academic Recommendation Engine', () => {
  it('triggers critical intervention for low attendance (< 60%)', () => {
    const student = {
      studentCode: 'STU-9901',
      attendanceRate: 52.0,
      weeklyStudyHours: 15.0,
      quizAverage: 80.0,
      midtermScore: 75.0,
      priorFailures: 0,
      predictedOutcome: 'PASS' as const,
    };

    const recommendations = AcademicRuleEngine.evaluateInterventions(student);
    const attendanceRec = recommendations.find((r) => r.category === 'ATTENDANCE');

    expect(attendanceRec).toBeDefined();
    expect(attendanceRec?.priority).toBe('CRITICAL');
  });

  it('triggers study habit recommendation for low study hours (< 10 hrs)', () => {
    const student = {
      studentCode: 'STU-9902',
      attendanceRate: 88.0,
      weeklyStudyHours: 5.0,
      quizAverage: 70.0,
      midtermScore: 68.0,
      priorFailures: 0,
      predictedOutcome: 'PASS' as const,
    };

    const recommendations = AcademicRuleEngine.evaluateInterventions(student);
    const studyRec = recommendations.find((r) => r.category === 'STUDY_HABIT');

    expect(studyRec).toBeDefined();
    expect(studyRec?.title).toContain('Study Plan');
  });

  it('generates a full personalized plan with risk score', () => {
    const student = {
      studentCode: 'STU-9903',
      attendanceRate: 55.0,
      weeklyStudyHours: 4.0,
      quizAverage: 45.0,
      midtermScore: 38.0,
      priorFailures: 2,
      predictedOutcome: 'FAIL' as const,
    };

    const plan = AcademicRecommendationService.generatePlan(student, 2, 0.94);
    expect(plan.riskLevel).toBe('CRITICAL');
    expect(plan.recommendations.length).toBeGreaterThanOrEqual(3);
  });
});
