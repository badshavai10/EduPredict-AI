'use client';

import { useState } from 'react';
import type { PredictionInput } from '@/validations/prediction.schema';

export function usePrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const predict = async (input: PredictionInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate prediction');
      }
      setResult(data.data);
      return data.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { predict, loading, result, error };
}
