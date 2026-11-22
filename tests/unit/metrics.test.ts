import { describe, expect, it } from 'vitest';
import { computeAccuracy } from '../../src/ml/evaluation/accuracy';
import { computeConfusionMatrix } from '../../src/ml/evaluation/confusion-matrix';
import { computeF1Score } from '../../src/ml/evaluation/f1-score';
import { computePrecision } from '../../src/ml/evaluation/precision';
import { computeRecall } from '../../src/ml/evaluation/recall';

describe('Evaluation Metrics Suite', () => {
  const yTrue = [1, 1, 0, 0, 1, 0];
  const yPred = [1, 1, 0, 1, 1, 0]; // 5 correct, 1 false positive

  it('computes accuracy correctly', () => {
    const acc = computeAccuracy(yTrue, yPred);
    expect(acc).toBe(0.8333);
  });

  it('computes confusion matrix correctly', () => {
    const cm = computeConfusionMatrix(yTrue, yPred);
    expect(cm.tp).toBe(3);
    expect(cm.fp).toBe(1);
    expect(cm.tn).toBe(2);
    expect(cm.fn).toBe(0);
  });

  it('computes precision, recall and F1-score', () => {
    const precision = computePrecision(yTrue, yPred);
    const recall = computeRecall(yTrue, yPred);
    const f1 = computeF1Score(yTrue, yPred);

    expect(precision).toBe(0.75);
    expect(recall).toBe(1.0);
    expect(f1).toBe(0.8571);
  });
});
