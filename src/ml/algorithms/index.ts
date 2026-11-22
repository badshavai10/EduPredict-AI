import { DecisionTreeModel } from './decision-tree';
import { KNNModel } from './knn';
import { LogisticRegressionModel } from './logistic-regression';
import { RandomForestModel } from './random-forest';
import { SVMModel } from './svm';
import type { AlgorithmType, IEduPredictModel } from '../types';

export {
  DecisionTreeModel,
  KNNModel,
  LogisticRegressionModel,
  RandomForestModel,
  SVMModel,
};

export function createModel(
  algorithm: AlgorithmType,
  options?: Record<string, unknown>
): IEduPredictModel {
  switch (algorithm) {
    case 'LOGISTIC_REGRESSION':
      return new LogisticRegressionModel(options);
    case 'DECISION_TREE':
      return new DecisionTreeModel(options);
    case 'RANDOM_FOREST':
      return new RandomForestModel(options);
    case 'KNN':
      return new KNNModel(options);
    case 'SVM':
      return new SVMModel(options);
    default:
      throw new Error(`Unsupported ML algorithm: ${algorithm as string}`);
  }
}
