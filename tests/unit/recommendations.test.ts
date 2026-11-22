import { describe, expect, it } from 'vitest';
import {
  AcademicRecommendationService,
  AcademicRuleEngine,
} from '../../src/ml/recommendations';

describe('Academic Recommendation Engine (100-Mark System)', () => {
  it('triggers critical intervention for low attendance (< 3.0 out of 7)', () => {
    const student = {
      studentCode: 'STU-9901',
      quiz: 12.0,
      assignment: 4.0,
      midterm: 20.0,
      final: 32.0,
      attendance: 2.5, // < 3.0 out of 7
      presentation: 6.5,
      predictedOutcome: 'PASS' as const,
    };

    const recommendations = AcademicRuleEngine.evaluateInterventions(student);
    const attendanceRec = recommendations.find((r) => r.category === 'ATTENDANCE');

    expect(attendanceRec).toBeDefined();
    expect(attendanceRec?.priority).toBe('CRITICAL');
  });

  it('triggers assignment recommendation for low assignment score (< 2.5 out of 5)', () => {
    const student = {
      studentCode: 'STU-9902',
      quiz: 11.0,
      assignment: 1.8, // < 2.5 out of 5
      midterm: 18.0,
      final: 30.0,
      attendance: 6.0,
      presentation: 6.0,
      predictedOutcome: 'PASS' as const,
    };

    const recommendations = AcademicRuleEngine.evaluateInterventions(student);
    const assignRec = recommendations.find((r) => r.category === 'STUDY_HABIT');

    expect(assignRec).toBeDefined();
    expect(assignRec?.title).toContain('Assignment Completion');
  });

  it('generates a full personalized plan with critical risk level for total < 45/100', () => {
    const student = {
      studentCode: 'STU-9903',
      quiz: 5.5,
      assignment: 1.8,
      midterm: 8.5,
      final: 13.0,
      attendance: 2.5,
      presentation: 3.2, // Total = 34.5 / 100 (< 45)
      predictedOutcome: 'FAIL' as const,
    };

    const plan = AcademicRecommendationService.generatePlan(student, 0, 0.96);
    expect(plan.riskLevel).toBe('CRITICAL');
    expect(plan.recommendations.length).toBeGreaterThanOrEqual(3);
  });
});
