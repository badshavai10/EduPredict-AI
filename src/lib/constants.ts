export const APP_CONFIG = {
  name: 'EduPredict AI',
  description:
    'AI-Based Early Student Performance Prediction and Personalized Academic Recommendation System Using Machine Learning',
  version: '1.0.0',
  gradingDistribution: {
    quiz: { max: 15, deficitThreshold: 7.0 },
    assignment: { max: 5, deficitThreshold: 2.5 },
    midterm: { max: 25, deficitThreshold: 11.0 },
    final: { max: 40, deficitThreshold: 18.0 },
    attendance: { max: 7, deficitThreshold: 3.5 },
    presentation: { max: 8, deficitThreshold: 4.0 },
    total: 100,
  },
  riskThresholds: {
    lowRiskMin: 75.0,        // Total >= 75
    moderateRiskMin: 60.0,   // Total 60 - 74
    highRiskMin: 45.0,       // Total 45 - 59
    criticalRiskMax: 44.99,  // Total < 45
  },
  routes: {
    dashboard: '/dashboard',
    students: '/students',
    prediction: '/prediction',
    recommendations: '/recommendations',
    modelPerformance: '/model-performance',
    settings: '/settings',
    login: '/login',
    register: '/register',
  },
} as const;
