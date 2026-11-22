import fs from 'node:fs';
import path from 'node:path';
import { createModel } from '../src/ml/algorithms';
import { StandardScaler } from '../src/ml/preprocessing/scaling';
import type { AlgorithmType } from '../src/ml/types';

const processedDir = path.resolve(process.cwd(), 'data/processed');
const featuresPath = path.join(processedDir, 'features.json');
const labelsPath = path.join(processedDir, 'labels.json');

if (!fs.existsSync(featuresPath) || !fs.existsSync(labelsPath)) {
  console.log('Processed data not found. Running preprocessor...');
  import('./preprocess-data');
}

const featuresData = JSON.parse(fs.readFileSync(featuresPath, 'utf8'));
const labels = JSON.parse(fs.readFileSync(labelsPath, 'utf8')) as number[];

const algorithms: AlgorithmType[] = [
  'LOGISTIC_REGRESSION',
  'DECISION_TREE',
  'RANDOM_FOREST',
  'KNN',
  'SVM',
];

console.log('=== Training EduPredict Models ===');

const scaler = new StandardScaler();
const scaled = scaler.fitTransform(featuresData.data);

for (const algo of algorithms) {
  const model = createModel(algo);
  model.train(scaled, labels);
  const outPath = path.resolve(
    process.cwd(),
    `artifacts/models/${algo.toLowerCase().replace(/_/g, '-')}.json`
  );
  if (typeof (model as any).toJSON === 'function') {
    fs.writeFileSync(outPath, JSON.stringify((model as any).toJSON(), null, 2));
  }
  console.log(`✓ Model [${model.name}] trained and serialized.`);
}
