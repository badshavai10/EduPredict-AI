export const APP_CONFIG = {
  name: 'EduPredict AI',
  description:
    'AI-Based Early Student Performance Prediction and Personalized Academic Recommendation System Using Machine Learning',
  version: '1.0.0',
  defaultRiskThresholds: {
    criticalAttendance: 60.0,
    warningAttendance: 75.0,
    criticalMidterm: 45.0,
    warningMidterm: 55.0,
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
