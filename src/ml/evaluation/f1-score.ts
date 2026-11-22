import { computePrecision } from './precision';
import { computeRecall } from './recall';

export function computeF1Score(yTrue: number[], yPred: number[]): number {
  const p = computePrecision(yTrue, yPred);
  const r = computeRecall(yTrue, yPred);

  if (p + r === 0) return 0;
  return Math.round(((2 * p * r) / (p + r)) * 10000) / 10000;
}
