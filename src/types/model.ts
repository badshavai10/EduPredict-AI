export interface MLModelSummary {
  id: string;
  name: string;
  algorithm: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  status: 'READY' | 'TRAINING' | 'DEPRECATED';
  trainedAt: string;
}
