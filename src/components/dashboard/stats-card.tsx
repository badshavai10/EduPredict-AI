import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ title, value, subtitle, icon: Icon, iconColor = 'text-blue-600' }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </CardTitle>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{value}</div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
