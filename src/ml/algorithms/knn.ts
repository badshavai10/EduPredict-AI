import KNN from 'ml-knn';
import type { AlgorithmType, IEduPredictModel } from '../types';

export interface KNNOptions {
  k?: number;
}

export class KNNModel implements IEduPredictModel {
  readonly name = 'K-Nearest Neighbors (KNN)';
  readonly algorithm: AlgorithmType = 'KNN';

  private k: number;
  private classifier: KNN | null = null;

  constructor(options: KNNOptions = {}) {
    this.k = options.k ?? 5;
  }

  public train(X: number[][], y: number[]): void {
    if (X.length === 0 || y.length === 0) {
      throw new Error('Training dataset cannot be empty.');
    }
    // ml-knn fits during instance creation
    this.classifier = new KNN(X, y, { k: this.k });
  }

  public predict(X: number[][]): number[] {
    if (!this.classifier) {
      throw new Error('Model must be trained before predicting.');
    }
    return this.classifier.predict(X);
  }

  public toJSON(): Record<string, unknown> {
    if (!this.classifier) throw new Error('Classifier is not initialized');
    return this.classifier.toJSON();
  }
}
