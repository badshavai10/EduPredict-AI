import { generateRecommendations, type StudentAcademicPlan } from './recommendations/generate-recommendations';
import { computeTotalMark, type StudentPerformanceFeatures } from './recommendations/rules';
import type { IEduPredictModel } from './types';
import type { StandardScaler } from './preprocessing/scaling';

export function predictStudentPerformance(
  model: IEduPredictModel,
  scaler: StandardScaler,
  student: Omit<StudentPerformanceFeatures, 'predictedOutcome'>
): StudentAcademicPlan {
  const quiz = student.quiz ?? ((student.quizAverage ?? 70) * 0.15);
  const assignment = student.assignment ?? ((student.assignmentScore ?? 75) * 0.05);
  const midterm = student.midterm ?? ((student.midtermScore ?? 65) * 0.25);
  const final = student.final ?? 26.0;
  const attendance = student.attendance ?? ((student.attendanceRate ?? 80) * 0.07);
  const presentation = student.presentation ?? 5.5;

  const rawFeatures = [
    [quiz, assignment, midterm, final, attendance, presentation],
  ];

  const scaled = scaler.transform(rawFeatures);
  const prediction = model.predict(scaled)[0];

  const total = computeTotalMark({
    quiz,
    assignment,
    midterm,
    final,
    attendance,
    presentation,
  });

  // Target labeling according to exact thresholds
  // Low Risk (Good): Total >= 75, Moderate: 60-74, High: 45-59, Critical: < 45
  let outcome: 'PASS' | 'FAIL' | 'AT_RISK';
  let confidence: number;

  if (total < 45 || attendance < 3.0 || final < 14) {
    outcome = 'FAIL';
    confidence = 0.96;
  } else if (total < 60 || midterm < 11 || attendance < 3.5) {
    outcome = 'FAIL';
    confidence = 0.88;
  } else if (total < 75) {
    outcome = 'AT_RISK';
    confidence = 0.85;
  } else {
    outcome = 'PASS';
    confidence = 0.95;
  }

  const fullStudent: StudentPerformanceFeatures = {
    ...student,
    quiz,
    assignment,
    midterm,
    final,
    attendance,
    presentation,
    predictedOutcome: outcome,
  };

  return generateRecommendations(fullStudent, prediction, confidence);
}
