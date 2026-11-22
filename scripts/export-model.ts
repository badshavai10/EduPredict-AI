import fs from 'node:fs';
import path from 'node:path';

const artifactsDir = path.resolve(process.cwd(), 'artifacts/models');

console.log('=== Exported Model Artifacts ===');
const files = fs.readdirSync(artifactsDir);
for (const file of files) {
  if (file.endsWith('.json')) {
    const stats = fs.statSync(path.join(artifactsDir, file));
    console.log(` - ${file} (${stats.size} bytes)`);
  }
}
