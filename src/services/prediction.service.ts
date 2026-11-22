import { generateRecommendations } from '@/ml/recommendations/generate-recommendations';
import type { PredictionInput } from '@/validations/prediction.schema';

export class PredictionService {
  public static async executePrediction(input: PredictionInput) {
    // Resolve scores with fallbacks for legacy requests
    const quiz =
      input.quiz !== undefined
        ? input.quiz
        : (input.quizAverage ?? 70) * 0.15;
    const assignment =
      input.assignment !== undefined
        ? input.assignment
        : (input.assignmentScore ?? 75) * 0.05;
    const midterm =
      input.midterm !== undefined
        ? input.midterm
        : (input.midtermScore ?? 65) * 0.25;
    const final = input.final !== undefined ? input.final : 26.0;
    const attendance =
      input.attendance !== undefined
        ? input.attendance
        : (input.attendanceRate ?? 80) * 0.07;
    const presentation = input.presentation !== undefined ? input.presentation : 5.5;

    const totalScore = Number(
      (quiz + assignment + midterm + final + attendance + presentation).toFixed(2)
    );

    let outcome: 'PASS' | 'FAIL' | 'AT_RISK';
    let predictedClass: number;
    let confidence: number;

    // Strict 100-mark risk categorization thresholds:
    // Low Risk (Good): Total >= 75
    // Moderate Risk (Average): Total 60 to 74
    // High Risk (At-Risk): Total 45 to 59
    // Critical Risk: Total < 45
    if (totalScore < 45 || attendance < 3.0 || final < 14) {
      outcome = 'FAIL';
      predictedClass = 0;
      confidence = 0.96;
    } else if (totalScore < 60 || midterm < 11 || attendance < 3.5) {
      outcome = 'FAIL';
      predictedClass = 0;
      confidence = 0.88;
    } else if (totalScore < 75) {
      outcome = 'AT_RISK';
      predictedClass = 0;
      confidence = 0.85;
    } else {
      outcome = 'PASS';
      predictedClass = 1;
      confidence = 0.95;
    }

    const plan = generateRecommendations(
      {
        studentCode: input.studentCode,
        quiz,
        assignment,
        midterm,
        final,
        attendance,
        presentation,
        attendanceRate: input.attendanceRate ?? (attendance / 7) * 100,
        weeklyStudyHours: input.weeklyStudyHours ?? 10,
        quizAverage: input.quizAverage ?? (quiz / 15) * 100,
        midtermScore: input.midtermScore ?? (midterm / 25) * 100,
        assignmentScore: input.assignmentScore ?? (assignment / 5) * 100,
        priorFailures: input.priorFailures ?? 0,
        predictedOutcome: outcome,
      },
      predictedClass,
      confidence
    );

    return {
      ...plan,
      totalScore,
      componentScores: {
        quiz,
        assignment,
        midterm,
        final,
        attendance,
        presentation,
      },
    };
  }
}
