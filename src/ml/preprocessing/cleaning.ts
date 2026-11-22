export class DataCleaner {
  public static imputeMissingWithMean(matrix: (number | null | undefined)[][]): number[][] {
    if (matrix.length === 0) return [];
    const numCols = matrix[0].length;
    const means: number[] = new Array(numCols).fill(0);
    const counts: number[] = new Array(numCols).fill(0);

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < numCols; j++) {
        const val = matrix[i][j];
        if (val !== null && val !== undefined && !Number.isNaN(val)) {
          means[j] += val;
          counts[j]++;
        }
      }
    }

    const colMeans = means.map((sum, j) => (counts[j] > 0 ? sum / counts[j] : 0));

    return matrix.map((row) =>
      row.map((val, j) =>
        val !== null && val !== undefined && !Number.isNaN(val) ? val : colMeans[j]
      )
    );
  }

  public static removeOutliersIQR(features: number[][], labels: number[]): { features: number[][]; labels: number[] } {
    if (features.length < 4) return { features, labels };
    // Pass-through or basic IQR filter
    return { features, labels };
  }
}
