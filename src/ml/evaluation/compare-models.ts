import { computeAccuracy } from './accuracy';
import { computeConfusionMatrix } from './confusion-matrix';
import { computeF1Score } from './f1-score';
import { computePrecision } from './precision';
import { computeRecall } from './recall';
import type { IEduPredictModel } from '../types';

export interface ModelComparisonResult {
  algorithm: string;
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][];
}

export function compareModels(
  models: IEduPredictModel[],
  X_test: number[][],
  y_test: number[]
): ModelComparisonResult[] {
  return models.map((model) => {
    const yPred = model.predict(X_test);
    const { matrix } = computeConfusionMatrix(y_test, yPred);

    return {
      algorithm: model.algorithm,
      name: model.name,
      accuracy: computeAccuracy(y_test, yPred),
      precision: computePrecision(y_test, yPred),
      recall: computeRecall(y_test, yPred),
      f1Score: computeF1Score(y_test, yPred),
      confusionMatrix: matrix,
    };
  });
}
