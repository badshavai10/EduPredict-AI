import { describe, expect, it } from 'vitest';
import {
  DecisionTreeModel,
  KNNModel,
  LogisticRegressionModel,
  RandomForestModel,
  SVMModel,
} from '../../src/ml/algorithms';

describe('Machine Learning Algorithms Suite', () => {
  const X_train = [
    [1.0, 1.0],
    [1.2, 0.9],
    [0.8, 1.1],
    [5.0, 5.0],
    [5.2, 4.9],
    [4.8, 5.1],
  ];
  const y_train = [0, 0, 0, 1, 1, 1];

  const X_test = [
    [1.1, 1.0],
    [5.1, 5.0],
  ];
  const expectedLabels = [0, 1];

  it('Logistic Regression trains and predicts binary targets', () => {
    const lr = new LogisticRegressionModel({ learningRate: 0.2, maxIterations: 500 });
    lr.train(X_train, y_train);
    expect(lr.predict(X_test)).toEqual(expectedLabels);
  });

  it('Decision Tree (CART) trains and predicts accurately', () => {
    const dt = new DecisionTreeModel();
    dt.train(X_train, y_train);
    expect(dt.predict(X_test)).toEqual(expectedLabels);
  });

  it('Random Forest trains and predicts with ensemble bagging', () => {
    const rf = new RandomForestModel({ nEstimators: 15, seed: 42 });
    rf.train(X_train, y_train);
    expect(rf.predict(X_test)).toEqual(expectedLabels);
  });

  it('KNN finds nearest neighbors and predicts targets', () => {
    const knn = new KNNModel({ k: 1 });
    knn.train(X_train, y_train);
    expect(knn.predict(X_test)).toEqual(expectedLabels);
  });

  it('SVM separates maximal margin hyperplane', () => {
    const svm = new SVMModel({ kernel: 'linear', cost: 1.0 });
    svm.train(X_train, y_train);
    expect(svm.predict(X_test)).toEqual(expectedLabels);
  });
});
