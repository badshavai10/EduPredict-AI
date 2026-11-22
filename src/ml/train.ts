import { createModel } from './algorithms';
import { DEFAULT_MODEL_CONFIGS } from './model-config';
import { StandardScaler } from './preprocessing/scaling';
import type { AlgorithmType, IEduPredictModel } from './types';

export interface TrainModelResult {
  model: IEduPredictModel;
  scaler: StandardScaler;
  algorithm: AlgorithmType;
  trainedAt: string;
}

export function trainStudentModel(
  algorithm: AlgorithmType,
  X_train: number[][],
  y_train: number[]
): TrainModelResult {
  const scaler = new StandardScaler();
  const scaledX = scaler.fitTransform(X_train);

  const options = DEFAULT_MODEL_CONFIGS[algorithm];
  const model = createModel(algorithm, options as Record<string, unknown>);
  model.train(scaledX, y_train);

  return {
    model,
    scaler,
    algorithm,
    trainedAt: new Date().toISOString(),
  };
}
