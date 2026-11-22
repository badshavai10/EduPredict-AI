declare module 'ml-cart' {
  export interface DecisionTreeClassifierOptions {
    gainFunction?: 'gini' | 'entropy';
    minNumSamples?: number;
    maxDepth?: number;
  }

  export class DecisionTreeClassifier {
    constructor(options?: DecisionTreeClassifierOptions);
    train(trainingSet: number[][], trainingLabels: number[]): void;
    predict(toPredict: number[][]): number[];
    toJSON(): Record<string, unknown>;
    static load(model: Record<string, unknown>): DecisionTreeClassifier;
  }
}

declare module 'ml-random-forest' {
  export interface RandomForestClassifierOptions {
    nEstimators?: number;
    maxFeatures?: number | string;
    replacement?: boolean;
    seed?: number;
    useSampleBagging?: boolean;
  }

  export class RandomForestClassifier {
    constructor(options?: RandomForestClassifierOptions);
    train(trainingSet: number[][], trainingLabels: number[]): void;
    predict(toPredict: number[][]): number[];
    toJSON(): Record<string, unknown>;
    static load(model: Record<string, unknown>): RandomForestClassifier;
  }
}

declare module 'ml-knn' {
  export interface KNNOptions {
    k?: number;
    distance?: (a: number[], b: number[]) => number;
  }

  export default class KNN {
    constructor(trainingSet: number[][], trainingLabels: number[], options?: KNNOptions);
    predict(toPredict: number[][]): number[];
    toJSON(): Record<string, unknown>;
    static load(model: Record<string, unknown>): KNN;
  }
}

declare module 'ml-svm' {
  export interface SVMOptions {
    kernel?: 'linear' | 'gaussian' | 'rbf' | 'polynomial';
    cost?: number;
    gamma?: number;
    degree?: number;
  }

  export default class SVM {
    constructor(options?: SVMOptions);
    train(trainingSet: number[][], trainingLabels: number[]): void;
    predict(toPredict: number[][]): number[];
    toJSON(): Record<string, unknown>;
    static load(model: Record<string, unknown>): SVM;
  }
}
