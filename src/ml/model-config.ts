import type { AlgorithmType } from './types';

export interface ModelHyperparameters {
  learningRate?: number;
  maxIterations?: number;
  nEstimators?: number;
  k?: number;
  kernel?: 'linear' | 'gaussian' | 'rbf';
  cost?: number;
}

export const DEFAULT_MODEL_CONFIGS: Record<AlgorithmType, ModelHyperparameters> = {
  LOGISTIC_REGRESSION: {
    learningRate: 0.05,
    maxIterations: 1000,
  },
  DECISION_TREE: {},
  RANDOM_FOREST: {
    nEstimators: 25,
  },
  KNN: {
    k: 5,
  },
  SVM: {
    kernel: 'linear',
    cost: 1.0,
  },
};

export const FEATURE_COLUMNS = [
  'attendanceRate',
  'weeklyStudyHours',
  'quizAverage',
  'midtermScore',
  'assignmentScore',
  'priorFailures',
] as const;

export type FeatureColumn = typeof FEATURE_COLUMNS[number];
