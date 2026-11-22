import { generateRecommendations, type StudentAcademicPlan } from './recommendations/generate-recommendations';
import type { StudentPerformanceFeatures } from './recommendations/rules';
import type { IEduPredictModel } from './types';
import type { StandardScaler } from './preprocessing/scaling';

export function predictStudentPerformance(
  model: IEduPredictModel,
  scaler: StandardScaler,
  student: Omit<StudentPerformanceFeatures, 'predictedOutcome'>
): StudentAcademicPlan {
  const rawFeatures = [
    [
      student.attendanceRate,
      student.weeklyStudyHours,
      student.quizAverage,
      student.midtermScore,
      student.assignmentScore ?? 75,
      student.priorFailures,
    ],
  ];

  const scaled = scaler.transform(rawFeatures);
  const prediction = model.predict(scaled)[0];

  const outcome = prediction === 1 ? 'PASS' : 'FAIL';
  const confidence = 0.91;

  const fullStudent: StudentPerformanceFeatures = {
    ...student,
    predictedOutcome: outcome,
  };

  return generateRecommendations(fullStudent, prediction, confidence);
}
