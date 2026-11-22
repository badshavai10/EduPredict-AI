import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prediction = await prisma.prediction.findUnique({
      where: { id },
      include: {
        student: true,
        recommendations: true,
      },
    });
    if (!prediction) {
      return NextResponse.json({ success: false, error: 'Prediction not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: prediction });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
