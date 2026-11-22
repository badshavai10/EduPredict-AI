import { NextResponse } from 'next/server';
import { RecommendationService } from '@/services/recommendation.service';

export async function GET() {
  try {
    const recommendations = await RecommendationService.getAllRecommendations();
    return NextResponse.json({ success: true, data: recommendations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
