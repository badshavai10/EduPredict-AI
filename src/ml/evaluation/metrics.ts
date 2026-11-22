import type { ModelMetrics } from '../types';

export class ModelEvaluator {
  public static computeMetrics(yTrue: number[], yPred: number[]): ModelMetrics {
    if (yTrue.length === 0 || yPred.length === 0 || yTrue.length !== yPred.length) {
      throw new Error('Predictions and ground truth must be non-empty and equal in length.');
    }

    const uniqueClasses = Array.from(new Set([...yTrue, ...yPred])).sort((a, b) => a - b);
    const numClasses = uniqueClasses.length;
    const classToIndex = new Map<number, number>(
      uniqueClasses.map((cls, idx) => [cls, idx])
    );

    // Build confusion matrix [actual][predicted]
    const matrix: number[][] = Array.from({ length: numClasses }, () =>
      new Array<number>(numClasses).fill(0)
    );

    let correctCount = 0;
    for (let i = 0; i < yTrue.length; i++) {
      const actualIdx = classToIndex.get(yTrue[i])!;
      const predIdx = classToIndex.get(yPred[i])!;
      matrix[actualIdx][predIdx]++;
      if (yTrue[i] === yPred[i]) {
        correctCount++;
      }
    }

    const accuracy = correctCount / yTrue.length;

    // Macro-averaged Precision, Recall, and F1-Score
    let totalPrecision = 0;
    let totalRecall = 0;
    let totalF1 = 0;

    for (let c = 0; c < numClasses; c++) {
      const tp = matrix[c][c];
      let rowSum = 0; // actual positive count
      let colSum = 0; // predicted positive count

      for (let j = 0; j < numClasses; j++) {
        rowSum += matrix[c][j];
        colSum += matrix[j][c];
      }

      const precision = colSum === 0 ? 0 : tp / colSum;
      const recall = rowSum === 0 ? 0 : tp / rowSum;
      const f1 =
        precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);

      totalPrecision += precision;
      totalRecall += recall;
      totalF1 += f1;
    }

    const macroPrecision = totalPrecision / numClasses;
    const macroRecall = totalRecall / numClasses;
    const macroF1 = totalF1 / numClasses;

    return {
      accuracy: Math.round(accuracy * 10000) / 10000,
      precision: Math.round(macroPrecision * 10000) / 10000,
      recall: Math.round(macroRecall * 10000) / 10000,
      f1Score: Math.round(macroF1 * 10000) / 10000,
      confusionMatrix: matrix,
      sampleCount: yTrue.length,
    };
  }
}
