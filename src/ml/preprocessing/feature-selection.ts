export class FeatureSelector {
  public static varianceThreshold(features: number[][], threshold: number = 0.01): {
    selectedIndices: number[];
    filteredFeatures: number[][];
  } {
    if (features.length === 0) return { selectedIndices: [], filteredFeatures: [] };
    const numCols = features[0].length;
    const selectedIndices: number[] = [];

    for (let j = 0; j < numCols; j++) {
      const colValues = features.map((r) => r[j]);
      const mean = colValues.reduce((a, b) => a + b, 0) / colValues.length;
      const variance =
        colValues.reduce((a, b) => a + (b - mean) ** 2, 0) / colValues.length;

      if (variance >= threshold) {
        selectedIndices.push(j);
      }
    }

    const filteredFeatures = features.map((row) =>
      selectedIndices.map((idx) => row[idx])
    );

    return { selectedIndices, filteredFeatures };
  }
}
