import { DecisionTreeClassifier } from 'ml-cart';
import type { AlgorithmType, IEduPredictModel } from '../types';

export interface DecisionTreeOptions {
  gainFunction?: 'gini' | 'entropy';
  minNumSamples?: number;
  maxDepth?: number;
}

export class DecisionTreeModel implements IEduPredictModel {
  readonly name = 'Decision Tree (CART)';
  readonly algorithm: AlgorithmType = 'DECISION_TREE';

  private classifier: DecisionTreeClassifier;
  private isFitted: boolean = false;

  constructor(options: DecisionTreeOptions = {}) {
    this.classifier = new DecisionTreeClassifier({
      gainFunction: options.gainFunction ?? 'gini',
      minNumSamples: options.minNumSamples ?? 3,
      maxDepth: options.maxDepth ?? 10,
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
