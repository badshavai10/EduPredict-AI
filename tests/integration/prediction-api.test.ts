import { describe, expect, it } from 'vitest';
import { PredictionService } from '../../src/services/prediction.service';

describe('Prediction API Integration Service', () => {
  it('correctly maps student at-risk conditions to failing prediction plan', async () => {
    const input = {
      studentCode: 'STU-TEST-01',
      attendanceRate: 52,
      weeklyStudyHours: 4,
      quizAverage: 45,
      midtermScore: 38,
      assignmentScore: 50,
      priorFailures: 2,
      algorithm: 'RANDOM_FOREST' as const,
    };

    const plan = await PredictionService.executePrediction(input);

    expect(plan.studentCode).toBe('STU-TEST-01');
    expect(plan.prediction.predictedLabel).toBe('FAIL');
    expect(plan.riskLevel).toBe('CRITICAL');
    expect(plan.recommendations.length).toBeGreaterThanOrEqual(2);
  });

  it('correctly predicts pass for high performing student', async () => {
    const input = {
      studentCode: 'STU-TEST-02',
      attendanceRate: 95,
      weeklyStudyHours: 20,
      quizAverage: 90,
      midtermScore: 88,
      assignmentScore: 92,
      priorFailures: 0,
      algorithm: 'RANDOM_FOREST' as const,
    };

    const plan = await PredictionService.executePrediction(input);
    expect(plan.prediction.predictedLabel).toBe('PASS');
    expect(plan.riskLevel).toBe('LOW');
  });
});
