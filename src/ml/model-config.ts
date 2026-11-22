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
  'quiz',
  'assignment',
  'midterm',
  'final',
  'attendance',
  'presentation',
] as const;

export type FeatureColumn = typeof FEATURE_COLUMNS[number];

export const FEATURE_MAX_MARKS: Record<FeatureColumn, number> = {
  quiz: 15,
  assignment: 5,
  midterm: 25,
  final: 40,
  attendance: 7,
  presentation: 8,
};

export const COMPONENT_DEFICIT_THRESHOLDS: Record<FeatureColumn, number> = {
  quiz: 7.0,        // < 7 out of 15
  assignment: 2.5,  // < 2.5 out of 5
  midterm: 11.0,    // < 11 out of 25
  final: 18.0,      // < 18 out of 40
  attendance: 3.5,  // < 3.5 out of 7
  presentation: 4.0,// < 4 out of 8
};

export const RISK_CLASSIFICATION_THRESHOLDS = {
  lowRiskMin: 75.0,        // Total >= 75
  moderateRiskMin: 60.0,   // Total 60 - 74
  highRiskMin: 45.0,       // Total 45 - 59
  criticalRiskThreshold: 45.0, // Total < 45
} as const;
