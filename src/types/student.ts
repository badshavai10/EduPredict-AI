export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface StudentProfile {
  id: string;
  studentCode: string;
  department: string;
  currentSemester: number;
  cumulativeGpa: number;
  attendanceRate: number;
  weeklyStudyHours: number;
  priorFailures: number;
  currentRiskLevel: RiskLevel;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AcademicRecordData {
  id: string;
  studentId: string;
  courseCode: string;
  courseName: string;
  semester: number;
  creditHours: number;
  attendanceRate: number;
  quizAverage: number;
  midtermScore: number;
  assignmentScore: number;
  finalExamScore?: number | null;
  letterGrade?: string | null;
}
