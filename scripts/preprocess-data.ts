import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';
import { StandardScaler } from '../src/ml/preprocessing/scaling';

import { FEATURE_COLUMNS } from '../src/ml/model-config';

const rawPath = path.resolve(process.cwd(), 'data/raw/student_performance.csv');
const processedDir = path.resolve(process.cwd(), 'data/processed');

if (!fs.existsSync(processedDir)) {
  fs.mkdirSync(processedDir, { recursive: true });
}

const fileContent = fs.readFileSync(rawPath, 'utf8');
const parsed = Papa.parse<Record<string, unknown>>(fileContent, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
});

const featureCols = [...FEATURE_COLUMNS];

const features: number[][] = [];
const labels: number[] = [];

for (const row of parsed.data) {
  features.push(featureCols.map((c) => Number(row[c]) || 0));
  labels.push(Number(row['finalOutcome']) || 0);
}

const scaler = new StandardScaler();
const scaledFeatures = scaler.fitTransform(features);

fs.writeFileSync(
  path.join(processedDir, 'features.json'),
  JSON.stringify({ featureCols, data: scaledFeatures }, null, 2)
);
fs.writeFileSync(
  path.join(processedDir, 'labels.json'),
  JSON.stringify(labels, null, 2)
);

console.log(`Preprocessed ${features.length} records. Scaled features exported to data/processed.`);
