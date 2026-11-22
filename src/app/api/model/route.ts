import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.resolve(process.cwd(), 'artifacts/evaluation/model-comparison.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return NextResponse.json({ success: true, data });
  }
  return NextResponse.json({ success: true, data: [] });
}
