import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  category: string;
  priority: string;
  description: string;
  actions: string[];
}

export function RecommendationCard({
  title,
  category,
  priority,
  description,
  actions,
}: RecommendationCardProps) {
  const Icon = priority === 'CRITICAL' ? AlertTriangle : priority === 'HIGH' ? AlertTriangle : Info;

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </div>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
            {category}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 font-semibold">
            {priority}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-slate-600 dark:text-slate-400">{description}</p>
        <div>
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Recommended Action Items:
          </p>
          <ul className="space-y-1">
            {actions.map((act, i) => (
              <li key={i} className="text-xs flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
