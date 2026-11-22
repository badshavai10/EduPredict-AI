import fs from 'node:fs';
import path from 'node:path';
import { createModel } from '../src/ml/algorithms';
import { compareModels } from '../src/ml/evaluation/compare-models';
import { StandardScaler } from '../src/ml/preprocessing/scaling';
import type { AlgorithmType, IEduPredictModel } from '../src/ml/types';

const processedDir = path.resolve(process.cwd(), 'data/processed');
const featuresData = JSON.parse(
  fs.readFileSync(path.join(processedDir, 'features.json'), 'utf8')
);
const labels = JSON.parse(
  fs.readFileSync(path.join(processedDir, 'labels.json'), 'utf8')
) as number[];

const scaler = new StandardScaler();
const scaled = scaler.fitTransform(featuresData.data);

const algorithms: AlgorithmType[] = [
  'LOGISTIC_REGRESSION',
  'DECISION_TREE',
  'RANDOM_FOREST',
  'KNN',
  'SVM',
];

const models: IEduPredictModel[] = algorithms.map((algo) => {
  const m = createModel(algo);
  m.train(scaled, labels);
  return m;
});

const comparison = compareModels(models, scaled, labels);

console.log('=== Model Performance Evaluation Comparison ===');
console.table(comparison);

const outDir = path.resolve(process.cwd(), 'artifacts/evaluation');
fs.writeFileSync(
  path.join(outDir, 'model-comparison.json'),
  JSON.stringify(comparison, null, 2)
);
console.log(`Evaluation report exported to ${outDir}`);
