import Papa from 'papaparse';
import { z } from 'zod';
import type { Dataset, TrainTestSplitResult } from '../types';

export const StudentAcademicRecordSchema = z.object({
  studentCode: z.string(),
  department: z.string().optional(),
  currentSemester: z.coerce.number().optional(),
  quiz: z.coerce.number().min(0).max(15).optional(),
  assignment: z.coerce.number().min(0).max(5).optional(),
  midterm: z.coerce.number().min(0).max(25).optional(),
  final: z.coerce.number().min(0).max(40).optional(),
  attendance: z.coerce.number().min(0).max(7).optional(),
  presentation: z.coerce.number().min(0).max(8).optional(),
  totalScore: z.coerce.number().min(0).max(100).optional(),
  // legacy compatibility
  attendanceRate: z.coerce.number().min(0).max(100).optional(),
  weeklyStudyHours: z.coerce.number().min(0).optional(),
  quizAverage: z.coerce.number().min(0).max(100).optional(),
  midtermScore: z.coerce.number().min(0).max(100).optional(),
  assignmentScore: z.coerce.number().min(0).max(100).optional(),
  priorFailures: z.coerce.number().min(0).optional(),
  finalOutcome: z.union([z.string(), z.number()]),
});

export type StudentAcademicRecord = z.infer<typeof StudentAcademicRecordSchema>;

export class DatasetParser {
  public static parseCsvString(csvContent: string): Papa.ParseResult<Record<string, string>> {
    return Papa.parse<Record<string, string>>(csvContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    });
  }

  public static buildFeatureMatrix(
    records: Record<string, unknown>[],
    featureColumns: string[],
    targetColumn: string
  ): Dataset {
    if (records.length === 0) {
      throw new Error('No records available to build feature matrix.');
    }

    const features: number[][] = [];
    const labels: number[] = [];

    for (const record of records) {
      const row: number[] = [];
      for (const col of featureColumns) {
        const val = Number(record[col]);
        if (Number.isNaN(val)) {
          throw new Error(`Non-numeric value encountered for feature "${col}": ${record[col]}`);
        }
        row.push(val);
      }
      features.push(row);

      const targetVal = Number(record[targetColumn]);
      if (Number.isNaN(targetVal)) {
        throw new Error(`Non-numeric target value for "${targetColumn}": ${record[targetColumn]}`);
      }
      labels.push(targetVal);
    }

    return {
      headers: [...featureColumns, targetColumn],
      features,
      labels,
      featureNames: featureColumns,
      targetName: targetColumn,
    };
  }

  public static trainTestSplit(
    features: number[][],
    labels: number[],
    testRatio: number = 0.2,
    shuffle: boolean = true
  ): TrainTestSplitResult {
    if (features.length !== labels.length) {
      throw new Error('Features and labels must have the same length.');
    }

    const indices = Array.from({ length: features.length }, (_, i) => i);
    if (shuffle) {
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
    }

    const splitIndex = Math.floor(features.length * (1 - testRatio));
    const trainIdx = indices.slice(0, splitIndex);
    const testIdx = indices.slice(splitIndex);

    return {
      trainFeatures: trainIdx.map((i) => features[i]),
      trainLabels: trainIdx.map((i) => labels[i]),
      testFeatures: testIdx.map((i) => features[i]),
      testLabels: testIdx.map((i) => labels[i]),
    };
  }
}
