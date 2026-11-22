import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function PredictionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/prediction" className="p-2 border rounded-lg hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Prediction Record Details</h1>
          <p className="text-xs text-slate-500">Record ID: {id}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Inference Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <p className="text-slate-600">
            Historical prediction record logged to database registry with full feature attributions and risk scores.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
