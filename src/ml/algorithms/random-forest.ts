import { RandomForestClassifier } from 'ml-random-forest';
import type { AlgorithmType, IEduPredictModel } from '../types';

export interface RandomForestOptions {
  nEstimators?: number;
  maxFeatures?: number | string;
  replacement?: boolean;
  seed?: number;
}

export class RandomForestModel implements IEduPredictModel {
  readonly name = 'Random Forest';
  readonly algorithm: AlgorithmType = 'RANDOM_FOREST';

  private classifier: RandomForestClassifier;
  private isFitted: boolean = false;

  constructor(options: RandomForestOptions = {}) {
    this.classifier = new RandomForestClassifier({
      nEstimators: options.nEstimators ?? 25,
      maxFeatures: options.maxFeatures ?? 0.8,
      replacement: options.replacement ?? true,
      seed: options.seed ?? 42,
    });
  }

  public train(X: number[][], y: number[]): void {
    if (X.length === 0 || y.length === 0) {
      throw new Error('Training dataset cannot be empty.');
    }
    this.classifier.train(X, y);
    this.isFitted = true;
  }

  public predict(X: number[][]): number[] {
    if (!this.isFitted) {
      throw new Error('Model must be trained before predicting.');
    }
    return this.classifier.predict(X);
  }

  public toJSON(): Record<string, unknown> {
    return this.classifier.toJSON();
  }
}
