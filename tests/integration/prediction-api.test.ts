import { describe, expect, it } from 'vitest';
import { PredictionService } from '../../src/services/prediction.service';

describe('Prediction API Integration Service (100-Mark System)', () => {
  it('correctly maps student at-risk conditions to failing prediction plan', async () => {
    const input = {
      studentCode: 'STU-TEST-01',
      quiz: 5.5,          // out of 15
      assignment: 1.8,    // out of 5
      midterm: 9.0,       // out of 25
      final: 14.0,        // out of 40
      attendance: 2.8,    // out of 7
      presentation: 3.5,  // out of 8 -> Total: 36.6 / 100 (< 45 Critical)
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
      quiz: 14.0,         // out of 15
      assignment: 4.8,    // out of 5
      midterm: 23.0,      // out of 25
      final: 36.0,        // out of 40
      attendance: 6.8,    // out of 7
      presentation: 7.5,  // out of 8 -> Total: 92.1 / 100 (>= 75 Low Risk)
      algorithm: 'RANDOM_FOREST' as const,
    };

    const plan = await PredictionService.executePrediction(input);
    expect(plan.prediction.predictedLabel).toBe('PASS');
    expect(plan.riskLevel).toBe('LOW');
  });
});
