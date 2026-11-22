import { AcademicRuleEngine, type StudentAcademicFeatures } from './rule-engine';
import type { PredictionResult, RecommendationItem, RiskLevel } from '../types';

export interface ComprehensiveAssessment {
  studentCode: string;
  prediction: PredictionResult;
  riskLevel: RiskLevel;
  recommendations: RecommendationItem[];
  generatedAt: string;
}

export class AcademicRecommendationService {
  public static generatePlan(
    features: StudentAcademicFeatures,
    predictedClass: number,
    confidence: number,
    probabilities?: Record<string, number>
  ): ComprehensiveAssessment {
    const outcomeLabel = features.predictedOutcome;
    const computedRisk = AcademicRuleEngine.determineRiskLevel(features);
    const recommendations = AcademicRuleEngine.evaluateInterventions(features);

    const prediction: PredictionResult = {
      studentId: features.studentCode,
      predictedClass,
      predictedLabel: outcomeLabel,
      riskLevel: computedRisk,
      confidence,
      probabilities,
    };

    return {
      studentCode: features.studentCode,
      prediction,
      riskLevel: computedRisk,
      recommendations,
      generatedAt: new Date().toISOString(),
    };
  }
}
