import { z } from 'zod';

export const PredictionInputSchema = z.object({
  studentCode: z.string().min(2, 'Student code required'),
  attendanceRate: z.coerce.number().min(0).max(100),
  weeklyStudyHours: z.coerce.number().min(0).max(168),
  quizAverage: z.coerce.number().min(0).max(100),
  midtermScore: z.coerce.number().min(0).max(100),
  assignmentScore: z.coerce.number().min(0).max(100).default(75),
  priorFailures: z.coerce.number().int().min(0).default(0),
  algorithm: z.enum([
    'LOGISTIC_REGRESSION',
    'DECISION_TREE',
    'RANDOM_FOREST',
    'KNN',
    'SVM',
  ]).default('RANDOM_FOREST'),
});

export type PredictionInput = z.infer<typeof PredictionInputSchema>;
