import { NextResponse } from 'next/server';
import { PredictionService } from '@/services/prediction.service';
import { PredictionInputSchema } from '@/validations/prediction.schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = PredictionInputSchema.parse(body);
    const plan = await PredictionService.executePrediction(validated);
    return NextResponse.json({ success: true, data: plan });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
