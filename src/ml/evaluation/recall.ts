import { computeConfusionMatrix } from './confusion-matrix';

export function computeRecall(yTrue: number[], yPred: number[]): number {
  const { tp, fn } = computeConfusionMatrix(yTrue, yPred);
  if (tp + fn === 0) return 0;
  return Math.round((tp / (tp + fn)) * 10000) / 10000;
}
