import { describe, expect, it } from 'vitest';
import {
  DatasetParser,
  LabelEncoder,
  MinMaxScaler,
  StandardScaler,
} from '../../src/ml/preprocessing';

describe('Preprocessing & Feature Transformation', () => {
  it('StandardScaler: scales features to zero-mean and unit variance', () => {
    const data = [
      [10, 100],
      [20, 200],
      [30, 300],
    ];
    const scaler = new StandardScaler();
    const scaled = scaler.fitTransform(data);

    // Sum of scaled values for each feature should be approximately 0
    const col0Sum = scaled[0][0] + scaled[1][0] + scaled[2][0];
    expect(Math.abs(col0Sum)).toBeLessThan(1e-5);

    // Inverse transform should restore original values
    const restored = scaler.inverseTransform(scaled);
    expect(Math.round(restored[1][1])).toBe(200);
  });

  it('MinMaxScaler: normalizes features to [0, 1]', () => {
    const data = [
      [10, 50],
      [20, 100],
      [30, 150],
    ];
    const scaler = new MinMaxScaler();
    const scaled = scaler.fitTransform(data);

    expect(scaled[0][0]).toBe(0);
    expect(scaled[2][0]).toBe(1);
    expect(scaled[1][0]).toBe(0.5);
  });

  it('LabelEncoder: maps string classes to integers and back', () => {
    const labels = ['PASS', 'FAIL', 'AT_RISK', 'PASS'];
    const encoder = new LabelEncoder();
    const encoded = encoder.fitTransform(labels);

    expect(encoded.length).toBe(4);
    const inverse = encoder.inverseTransform(encoded);
    expect(inverse).toEqual(labels);
  });

  it('DatasetParser: parses CSV strings and produces valid numeric matrix', () => {
    const csv = `studentCode,attendance,gpa,passed
STU1,90,3.5,1
STU2,60,2.1,0`;

    const parsed = DatasetParser.parseCsvString(csv);
    expect(parsed.data.length).toBe(2);

    const dataset = DatasetParser.buildFeatureMatrix(
      parsed.data as Record<string, unknown>[],
      ['attendance', 'gpa'],
      'passed'
    );

    expect(dataset.features.length).toBe(2);
    expect(dataset.features[0]).toEqual([90, 3.5]);
    expect(dataset.labels).toEqual([1, 0]);
  });
});
