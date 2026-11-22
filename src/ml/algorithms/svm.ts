import SVM from 'ml-svm';
import type { AlgorithmType, IEduPredictModel } from '../types';

export interface SVMOptions {
  kernel?: 'linear' | 'gaussian' | 'rbf' | 'polynomial';
  cost?: number;
}

export class SVMModel implements IEduPredictModel {
  readonly name = 'Support Vector Machine (SVM)';
  readonly algorithm: AlgorithmType = 'SVM';

  private classifier: SVM;
  private isFitted: boolean = false;
  private classes: number[] = [];

  constructor(options: SVMOptions = {}) {
    this.classifier = new SVM({
      kernel: options.kernel ?? 'linear',
      cost: options.cost ?? 1,
    });
  }

  public train(X: number[][], y: number[]): void {
    if (X.length === 0 || y.length === 0) {
      throw new Error('Training dataset cannot be empty.');
    }

    this.classes = Array.from(new Set(y)).sort((a, b) => a - b);
    if (this.classes.length !== 2) {
      throw new Error('Binary SVM requires exactly 2 distinct classes.');
    }

    // ml-svm strictly requires {-1, 1} targets
    const mappedY = y.map((label) => (label === this.classes[1] ? 1 : -1));

    this.classifier.train(X, mappedY);
    this.isFitted = true;
  }

  public predict(X: number[][]): number[] {
    if (!this.isFitted) {
      throw new Error('Model must be trained before predicting.');
    }

    const rawPredictions = this.classifier.predict(X);
    // Map {-1, 1} back to original domain classes
    return rawPredictions.map((pred) => (pred >= 0 ? this.classes[1] : this.classes[0]));
  }

  public toJSON(): Record<string, unknown> {
    return {
      classifier: this.classifier.toJSON(),
      classes: this.classes,
      isFitted: this.isFitted,
    };
  }
}
