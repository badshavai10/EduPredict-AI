import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createModel,
  DatasetParser,
  ModelEvaluator,
  StandardScaler,
  type AlgorithmType,
} from '../src/ml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runBenchmark() {
  console.log('--- EduPredict AI ML Benchmark ---');
  const csvPath = path.resolve(__dirname, '../data/sample_students.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf8');

  const parsed = DatasetParser.parseCsvString(csvContent);
  const featureCols = [
    'attendanceRate',
    'weeklyStudyHours',
    'quizAverage',
    'midtermScore',
    'assignmentScore',
    'priorFailures',
  ];

  const dataset = DatasetParser.buildFeatureMatrix(
    parsed.data as Record<string, unknown>[],
    featureCols,
    'finalOutcome'
  );

  console.log(`Loaded ${dataset.features.length} samples with ${featureCols.length} features.`);

  // Scale features
  const scaler = new StandardScaler();
  const scaledFeatures = scaler.fitTransform(dataset.features);

  // Train / Test split
  const split = DatasetParser.trainTestSplit(scaledFeatures, dataset.labels, 0.3, false);

  const algorithms: AlgorithmType[] = [
    'LOGISTIC_REGRESSION',
    'DECISION_TREE',
    'RANDOM_FOREST',
    'KNN',
    'SVM',
  ];

  for (const algo of algorithms) {
    try {
      const model = createModel(algo);
      model.train(split.trainFeatures, split.trainLabels);
      const predictions = model.predict(split.testFeatures);
      const metrics = ModelEvaluator.computeMetrics(split.testLabels, predictions);
      console.log(`[${model.name}] Accuracy: ${(metrics.accuracy * 100).toFixed(1)}%, F1: ${(metrics.f1Score * 100).toFixed(1)}%`);
    } catch (err) {
      console.error(`Error benchmarking ${algo}:`, (err as Error).message);
    }
  }

  console.log('--- Benchmark Complete ---');
}

runBenchmark().catch(console.error);
