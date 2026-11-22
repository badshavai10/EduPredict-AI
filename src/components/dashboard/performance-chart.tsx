'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { semester: 'Sem 1', avgGpa: 3.12 },
  { semester: 'Sem 2', avgGpa: 3.25 },
  { semester: 'Sem 3', avgGpa: 3.08 },
  { semester: 'Sem 4', avgGpa: 3.35 },
  { semester: 'Sem 5', avgGpa: 3.42 },
];

export function PerformanceChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Semester GPA Progression</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="semester" fontSize={12} />
            <YAxis domain={[0, 4.0]} fontSize={12} />
            <Tooltip />
            <Bar dataKey="avgGpa" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
