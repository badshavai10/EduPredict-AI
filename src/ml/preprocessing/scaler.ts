export class StandardScaler {
  private means: number[] = [];
  private stds: number[] = [];
  private isFitted: boolean = false;

  public fit(X: number[][]): this {
    if (X.length === 0 || X[0].length === 0) {
      throw new Error('Dataset cannot be empty for StandardScaler.');
    }

    const numFeatures = X[0].length;
    const numSamples = X.length;

    this.means = new Array<number>(numFeatures).fill(0);
    this.stds = new Array<number>(numFeatures).fill(0);

    // Calculate means
    for (let j = 0; j < numFeatures; j++) {
      let sum = 0;
      for (let i = 0; i < numSamples; i++) {
        sum += X[i][j];
      }
      this.means[j] = sum / numSamples;
    }

    // Calculate standard deviations
    for (let j = 0; j < numFeatures; j++) {
      let varianceSum = 0;
      for (let i = 0; i < numSamples; i++) {
        const diff = X[i][j] - this.means[j];
        varianceSum += diff * diff;
      }
      const variance = varianceSum / (numSamples > 1 ? numSamples - 1 : 1);
      // Avoid division by zero with small epsilon
      this.stds[j] = Math.sqrt(variance) || 1e-8;
    }

    this.isFitted = true;
    return this;
  }

  public transform(X: number[][]): number[][] {
    if (!this.isFitted) {
      throw new Error('StandardScaler must be fitted before transform.');
    }

    return X.map((row) =>
      row.map((val, j) => (val - this.means[j]) / this.stds[j])
    );
  }

  public fitTransform(X: number[][]): number[][] {
    return this.fit(X).transform(X);
  }

  public inverseTransform(X: number[][]): number[][] {
    if (!this.isFitted) {
      throw new Error('StandardScaler must be fitted before inverseTransform.');
    }

    return X.map((row) =>
      row.map((val, j) => val * this.stds[j] + this.means[j])
    );
  }
}

export class MinMaxScaler {
  private mins: number[] = [];
  private maxs: number[] = [];
  private isFitted: boolean = false;

  public fit(X: number[][]): this {
    if (X.length === 0 || X[0].length === 0) {
      throw new Error('Dataset cannot be empty for MinMaxScaler.');
    }

    const numFeatures = X[0].length;
    this.mins = new Array<number>(numFeatures).fill(Infinity);
    this.maxs = new Array<number>(numFeatures).fill(-Infinity);

    for (let i = 0; i < X.length; i++) {
      for (let j = 0; j < numFeatures; j++) {
        if (X[i][j] < this.mins[j]) this.mins[j] = X[i][j];
        if (X[i][j] > this.maxs[j]) this.maxs[j] = X[i][j];
      }
    }

    this.isFitted = true;
    return this;
  }

  public transform(X: number[][]): number[][] {
    if (!this.isFitted) {
      throw new Error('MinMaxScaler must be fitted before transform.');
    }

    return X.map((row) =>
      row.map((val, j) => {
        const range = this.maxs[j] - this.mins[j];
        return range === 0 ? 0 : (val - this.mins[j]) / range;
      })
    );
  }

  public fitTransform(X: number[][]): number[][] {
    return this.fit(X).transform(X);
  }
}
