export interface ConfusionMatrixResult {
  matrix: number[][];
  labels: number[];
  tp: number;
  fp: number;
  tn: number;
  fn: number;
}

export function computeConfusionMatrix(yTrue: number[], yPred: number[]): ConfusionMatrixResult {
  if (yTrue.length !== yPred.length) {
    throw new Error('yTrue and yPred lengths must match.');
  }

  const labels = Array.from(new Set([...yTrue, ...yPred])).sort((a, b) => a - b);
  const matrix: number[][] = Array.from({ length: labels.length }, () =>
    new Array(labels.length).fill(0)
  );

  const labelToIdx = new Map(labels.map((l, i) => [l, i]));

  for (let i = 0; i < yTrue.length; i++) {
    const actualIdx = labelToIdx.get(yTrue[i])!;
    const predIdx = labelToIdx.get(yPred[i])!;
    matrix[actualIdx][predIdx]++;
  }

  // Assuming binary classification (0 = negative, 1 = positive)
  const tn = matrix[0]?.[0] ?? 0;
  const fp = matrix[0]?.[1] ?? 0;
  const fn = matrix[1]?.[0] ?? 0;
  const tp = matrix[1]?.[1] ?? 0;

  return { matrix, labels, tp, fp, tn, fn };
}
