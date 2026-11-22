export class LabelEncoder {
  private labelToIdx: Map<string, number> = new Map();
  private idxToLabel: Map<number, string> = new Map();
  private isFitted: boolean = false;

  public fit(labels: (string | number)[]): this {
    this.labelToIdx.clear();
    this.idxToLabel.clear();

    const uniqueLabels = Array.from(new Set(labels.map(String))).sort();
    uniqueLabels.forEach((label, idx) => {
      this.labelToIdx.set(label, idx);
      this.idxToLabel.set(idx, label);
    });

    this.isFitted = true;
    return this;
  }

  public transform(labels: (string | number)[]): number[] {
    if (!this.isFitted) {
      throw new Error('LabelEncoder must be fitted before transform.');
    }

    return labels.map((label) => {
      const str = String(label);
      const idx = this.labelToIdx.get(str);
      if (idx === undefined) {
        throw new Error(`Unseen label encountered during transform: "${str}"`);
      }
      return idx;
    });
  }

  public fitTransform(labels: (string | number)[]): number[] {
    return this.fit(labels).transform(labels);
  }

  public inverseTransform(indices: number[]): string[] {
    if (!this.isFitted) {
      throw new Error('LabelEncoder must be fitted before inverseTransform.');
    }

    return indices.map((idx) => {
      const label = this.idxToLabel.get(idx);
      if (label === undefined) {
        throw new Error(`Unseen index encountered during inverseTransform: ${idx}`);
      }
      return label;
    });
  }

  public get classes(): string[] {
    return Array.from(this.labelToIdx.keys());
  }
}
