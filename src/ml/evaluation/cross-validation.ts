import { ModelEvaluator } from './metrics';
import type { IEduPredictModel, ModelMetrics } from '../types';

export interface CrossValidationResult {
  folds: ModelMetrics[];
  meanAccuracy: number;
  meanPrecision: number;
  meanRecall: number;
  meanF1: number;
}

export class CrossValidator {
  public static evaluateKFold(
    modelFactory: () => IEduPredictModel,
    X: number[][],
    y: number[],
    k: number = 5
  ): CrossValidationResult {
    if (k < 2 || k > X.length) {
      throw new Error(`Invalid fold count k=${k} for dataset of size ${X.length}`);
    }

    const foldSize = Math.floor(X.length / k);
    const foldsMetrics: ModelMetrics[] = [];

    for (let fold = 0; fold < k; fold++) {
      const testStart = fold * foldSize;
      const testEnd = fold === k - 1 ? X.length : testStart + foldSize;

      const trainX: number[][] = [];
      const trainY: number[] = [];
      const testX: number[][] = [];
      const testY: number[] = [];

      for (let i = 0; i < X.length; i++) {
        if (i >= testStart && i < testEnd) {
          testX.push(X[i]);
          testY.push(y[i]);
        } else {
          trainX.push(X[i]);
          trainY.push(y[i]);
        }
      }

      const model = modelFactory();
      model.train(trainX, trainY);
      const predictions = model.predict(testX);
      const metrics = ModelEvaluator.computeMetrics(testY, predictions);
      foldsMetrics.push(metrics);
    }

    const sum = foldsMetrics.reduce(
      (acc, m) => ({
        acc: acc.acc + m.accuracy,
        prec: acc.prec + m.precision,
        rec: acc.rec + m.recall,
        f1: acc.f1 + m.f1Score,
      }),
      { acc: 0, prec: 0, rec: 0, f1: 0 }
    );

    return {
      folds: foldsMetrics,
      meanAccuracy: Math.round((sum.acc / k) * 10000) / 10000,
      meanPrecision: Math.round((sum.prec / k) * 10000) / 10000,
      meanRecall: Math.round((sum.rec / k) * 10000) / 10000,
      meanF1: Math.round((sum.f1 / k) * 10000) / 10000,
    };
  }
}
