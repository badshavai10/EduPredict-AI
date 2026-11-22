import { z } from 'zod';

export const PredictionInputSchema = z.object({
  studentCode: z.string().min(2, 'Student code required'),
  quiz: z.coerce.number().min(0, 'Quiz mark must be >= 0').max(15, 'Quiz maximum is 15 marks').default(10),
  assignment: z.coerce.number().min(0, 'Assignment mark must be >= 0').max(5, 'Assignment maximum is 5 marks').default(4),
  midterm: z.coerce.number().min(0, 'Mid-term mark must be >= 0').max(25, 'Mid-term maximum is 25 marks').default(18),
  final: z.coerce.number().min(0, 'Final Exam mark must be >= 0').max(40, 'Final Exam maximum is 40 marks').default(28),
  attendance: z.coerce.number().min(0, 'Attendance mark must be >= 0').max(7, 'Attendance maximum is 7 marks').default(6),
  presentation: z.coerce.number().min(0, 'Presentation mark must be >= 0').max(8, 'Presentation maximum is 8 marks').default(6),
  algorithm: z.enum([
    'LOGISTIC_REGRESSION',
    'DECISION_TREE',
    'RANDOM_FOREST',
    'KNN',
    'SVM',
  ]).default('RANDOM_FOREST'),
  // Optional legacy fields for backward compatibility
  attendanceRate: z.coerce.number().optional(),
  weeklyStudyHours: z.coerce.number().optional(),
  quizAverage: z.coerce.number().optional(),
  midtermScore: z.coerce.number().optional(),
  assignmentScore: z.coerce.number().optional(),
  priorFailures: z.coerce.number().int().min(0).optional(),
});

export type PredictionInput = z.infer<typeof PredictionInputSchema>;

export function computePredictionTotalScore(input: {
  quiz: number;
  assignment: number;
  midterm: number;
  final: number;
  attendance: number;
  presentation: number;
}): number {
  return Number(
    (
      input.quiz +
      input.assignment +
      input.midterm +
      input.final +
      input.attendance +
      input.presentation
    ).toFixed(2)
  );
}
