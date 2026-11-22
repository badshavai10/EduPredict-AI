export function computeAccuracy(yTrue: number[], yPred: number[]): number {
  if (yTrue.length === 0 || yTrue.length !== yPred.length) {
    throw new Error('Predictions and ground truth must be non-empty and equal in length.');
  }

  let correct = 0;
  for (let i = 0; i < yTrue.length; i++) {
    if (yTrue[i] === yPred[i]) correct++;
  }

  return Math.round((correct / yTrue.length) * 10000) / 10000;
}
