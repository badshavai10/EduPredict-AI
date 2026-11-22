import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    system: 'EduPredict AI',
    framework: 'Next.js App Router',
    timestamp: new Date().toISOString(),
  });
}
