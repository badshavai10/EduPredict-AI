import { generateRecommendations } from '@/ml/recommendations/generate-recommendations';
import type { PredictionInput } from '@/validations/prediction.schema';

export class PredictionService {
  public static async executePrediction(input: PredictionInput) {
    let outcome: 'PASS' | 'FAIL' | 'AT_RISK' = 'PASS';
    let predictedClass = 1;
    let confidence = 0.94;

    if (input.attendanceRate < 60 || input.midtermScore < 45 || input.priorFailures >= 2) {
      outcome = 'FAIL';
      predictedClass = 0;
      confidence = 0.96;
    } else if (input.attendanceRate < 75 || input.midtermScore < 55 || input.quizAverage < 60) {
      outcome = 'AT_RISK';
      predictedClass = 0;
      confidence = 0.85;
    }

    const plan = generateRecommendations(
      {
        studentCode: input.studentCode,
        attendanceRate: input.attendanceRate,
        weeklyStudyHours: input.weeklyStudyHours,
        quizAverage: input.quizAverage,
        midtermScore: input.midtermScore,
        priorFailures: input.priorFailures,
        predictedOutcome: outcome,
      },
      predictedClass,
      confidence
    );

    return plan;
  }
}
