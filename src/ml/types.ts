/**
 * EduPredict AI — Core Machine Learning Type Definitions
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AcademicOutcome = 'EXCELLENT' | 'GOOD' | 'SATISFACTORY' | 'AT_RISK' | 'FAIL';

export type AlgorithmType =
  | 'LOGISTIC_REGRESSION'
  | 'DECISION_TREE'
  | 'RANDOM_FOREST'
  | 'KNN'
  | 'SVM';

export interface Dataset {
  headers: string[];
  features: number[][];
  labels: number[];
  featureNames: string[];
  targetName: string;
}

export interface TrainTestSplitResult {
  trainFeatures: number[][];
  trainLabels: number[];
  testFeatures: number[][];
  testLabels: number[];
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][];
  sampleCount: number;
}

export interface PredictionResult {
  studentId?: string;
  predictedClass: number;
  predictedLabel: string;
  riskLevel: RiskLevel;
  confidence: number;
  probabilities?: Record<string, number>;
  featureContributions?: Record<string, number>;
}

export interface RecommendationItem {
  id: string;
  category: 'ACADEMIC' | 'ATTENDANCE' | 'STUDY_HABIT' | 'INTERVENTION';
  title: string;
  description: string;
  priority: RiskLevel;
  suggestedActions: string[];
}

export interface IEduPredictModel {
  readonly name: string;
  readonly algorithm: AlgorithmType;
  train(X: number[][], y: number[]): Promise<void> | void;
  predict(X: number[][]): number[];
  predictProbability?(X: number[][]): number[][];
}
