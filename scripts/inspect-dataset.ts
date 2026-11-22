import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';

const csvPath = path.resolve(process.cwd(), 'data/raw/student_performance.csv');

if (!fs.existsSync(csvPath)) {
  console.error(`Dataset not found at ${csvPath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(csvPath, 'utf8');
const parsed = Papa.parse(fileContent, { header: true, dynamicTyping: true });

console.log('=== EduPredict AI: Dataset Inspection ===');
console.log(`Total Records: ${parsed.data.length}`);
console.log('Features Detected:');
if (parsed.data.length > 0) {
  const sample = parsed.data[0] as Record<string, unknown>;
  for (const [key, val] of Object.entries(sample)) {
    console.log(` - ${key}: typeof ${typeof val} (e.g. ${val})`);
  }
}
