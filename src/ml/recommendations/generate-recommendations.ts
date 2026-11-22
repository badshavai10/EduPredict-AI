import { ACADEMIC_RULES, determineRiskLevel, type StudentPerformanceFeatures } from './rules';
import type { PredictionResult, RecommendationItem, RiskLevel } from '../types';

export interface StudentAcademicPlan {
  studentCode: string;
  prediction: PredictionResult;
  riskLevel: RiskLevel;
  recommendations: RecommendationItem[];
  generatedAt: string;
}

export function generateRecommendations(
  student: StudentPerformanceFeatures,
  predictedClass: number,
  confidence: number
): StudentAcademicPlan {
  const riskLevel = determineRiskLevel(student);
  const recommendations: RecommendationItem[] = [];

  for (const rule of ACADEMIC_RULES) {
    if (rule.condition(student)) {
      recommendations.push(rule.getAction(student));
    }
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: `good-${student.studentCode}`,
      category: 'ACADEMIC',
      title: 'Academic Enrichment & Honors Track',
      description: 'Student demonstrates balanced study habits and strong assessment consistency.',
      priority: 'LOW',
      suggestedActions: [
        'Explore undergraduate research assistantships',
        'Consider honors program electives',
      ],
    });
  }

  return {
    studentCode: student.studentCode,
    prediction: {
      studentId: student.studentCode,
      predictedClass,
      predictedLabel: student.predictedOutcome,
      riskLevel,
      confidence,
    },
    riskLevel,
    recommendations,
    generatedAt: new Date().toISOString(),
  };
}
