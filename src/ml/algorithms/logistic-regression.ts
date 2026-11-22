import type { AlgorithmType, IEduPredictModel } from '../types';

export interface LogisticRegressionOptions {
  learningRate?: number;
  maxIterations?: number;
  tolerance?: number;
  lambda?: number; // L2 regularization coefficient
  fitIntercept?: boolean;
}

export class LogisticRegressionModel implements IEduPredictModel {
  readonly name = 'Logistic Regression';
  readonly algorithm: AlgorithmType = 'LOGISTIC_REGRESSION';

  private learningRate: number;
  private maxIterations: number;
  private tolerance: number;
  private lambda: number;
  private fitIntercept: boolean;

  // Weights for each class (for multiclass via One-vs-Rest)
  // Each entry is a weight vector including bias if fitIntercept is true
  private weights: number[][] = [];
  private classes: number[] = [];
  private isFitted: boolean = false;

  constructor(options: LogisticRegressionOptions = {}) {
    this.learningRate = options.learningRate ?? 0.05;
    this.maxIterations = options.maxIterations ?? 1000;
    this.tolerance = options.tolerance ?? 1e-5;
    this.lambda = options.lambda ?? 0.01;
    this.fitIntercept = options.fitIntercept ?? true;
  }

  private sigmoid(z: number): number {
    if (z > 35) return 1.0;
    if (z < -35) return 0.0;
    return 1 / (1 + Math.exp(-z));
  }

  private addIntercept(X: number[][]): number[][] {
    return X.map((row) => [1, ...row]);
  }

  private dotProduct(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i];
    }
    return sum;
  }

  public train(X: number[][], y: number[]): void {
    if (X.length === 0 || y.length === 0 || X.length !== y.length) {
      throw new Error('Invalid training dataset dimensions.');
    }

    // Extract unique classes
    this.classes = Array.from(new Set(y)).sort((a, b) => a - b);
    if (this.classes.length < 2) {
      throw new Error('Logistic regression requires at least two distinct classes.');
    }

    const XWithIntercept = this.fitIntercept ? this.addIntercept(X) : X;
    const numSamples = XWithIntercept.length;
    const numFeatures = XWithIntercept[0].length;

    this.weights = [];

    // Binary or Multiclass via One-vs-Rest
    const targetClasses = this.classes.length === 2 ? [this.classes[1]] : this.classes;

    for (const targetClass of targetClasses) {
      // Binary target vector for this class
      const binaryY = y.map((label) => (label === targetClass ? 1 : 0));
      const currentWeights = new Array<number>(numFeatures).fill(0);

      for (let iter = 0; iter < this.maxIterations; iter++) {
        const gradients = new Array<number>(numFeatures).fill(0);
        let maxGradientChange = 0;

        for (let i = 0; i < numSamples; i++) {
          const z = this.dotProduct(XWithIntercept[i], currentWeights);
          const prediction = this.sigmoid(z);
          const error = prediction - binaryY[i];

          for (let j = 0; j < numFeatures; j++) {
            gradients[j] += error * XWithIntercept[i][j];
          }
        }

        // Apply gradient step with L2 regularization
        for (let j = 0; j < numFeatures; j++) {
          // Do not regularize intercept term (j=0 when fitIntercept is true)
          const reg = this.fitIntercept && j === 0 ? 0 : this.lambda * currentWeights[j];
          const grad = (gradients[j] + reg) / numSamples;
          const delta = this.learningRate * grad;
          currentWeights[j] -= delta;
          if (Math.abs(delta) > maxGradientChange) {
            maxGradientChange = Math.abs(delta);
          }
        }

        if (maxGradientChange < this.tolerance) {
          break;
        }
      }

      this.weights.push(currentWeights);
    }

    this.isFitted = true;
  }

  public predictProbability(X: number[][]): number[][] {
    if (!this.isFitted) {
      throw new Error('Model must be trained before predicting.');
    }

    const XWithIntercept = this.fitIntercept ? this.addIntercept(X) : X;
    const probabilities: number[][] = [];

    for (const sample of XWithIntercept) {
      if (this.classes.length === 2) {
        // Binary classification
        const p1 = this.sigmoid(this.dotProduct(sample, this.weights[0]));
        const p0 = 1 - p1;
        probabilities.push([p0, p1]);
      } else {
        // Multiclass One-vs-Rest: normalize raw probabilities with softmax
        const rawScores = this.weights.map((w) => this.dotProduct(sample, w));
        const maxScore = Math.max(...rawScores);
        const expScores = rawScores.map((score) => Math.exp(score - maxScore));
        const sumExp = expScores.reduce((acc, v) => acc + v, 0);
        probabilities.push(expScores.map((exp) => exp / (sumExp || 1)));
      }
    }

    return probabilities;
  }

  public predict(X: number[][]): number[] {
    const probs = this.predictProbability(X);
    return probs.map((sampleProbs) => {
      let maxIdx = 0;
      let maxProb = sampleProbs[0];
      for (let i = 1; i < sampleProbs.length; i++) {
        if (sampleProbs[i] > maxProb) {
          maxProb = sampleProbs[i];
          maxIdx = i;
        }
      }
      return this.classes[maxIdx];
    });
  }

  public getWeights(): number[][] {
    return this.weights;
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      algorithm: this.algorithm,
      weights: this.weights,
      classes: this.classes,
      learningRate: this.learningRate,
      fitIntercept: this.fitIntercept,
      lambda: this.lambda,
      isFitted: this.isFitted,
    };
  }

  public static fromJSON(json: Record<string, unknown>): LogisticRegressionModel {
    const model = new LogisticRegressionModel({
      learningRate: json.learningRate as number,
      fitIntercept: json.fitIntercept as boolean,
      lambda: json.lambda as number,
    });
    model.weights = json.weights as number[][];
    model.classes = json.classes as number[];
    model.isFitted = json.isFitted as boolean;
    return model;
  }
}
