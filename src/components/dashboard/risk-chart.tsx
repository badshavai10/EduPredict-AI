'use client';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const riskData = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 20, color: '#f59e0b' },
  { name: 'High Risk', value: 10, color: '#f97316' },
  { name: 'Critical Risk', value: 5, color: '#ef4444' },
];

export function RiskChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Cohort Attrition Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskData}
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {riskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
