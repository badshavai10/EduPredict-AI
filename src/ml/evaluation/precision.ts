import { computeConfusionMatrix } from './confusion-matrix';

export function computePrecision(yTrue: number[], yPred: number[]): number {
  const { tp, fp } = computeConfusionMatrix(yTrue, yPred);
  if (tp + fp === 0) return 0;
  return Math.round((tp / (tp + fp)) * 10000) / 10000;
}
