export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface StudentProfile {
  id: string;
  studentCode: string;
  department: string;
  currentSemester: number;
  cumulativeGpa: number;
  quiz: number;          // 0–15 marks
  assignment: number;    // 0–5 marks
  midterm: number;       // 0–25 marks
  final: number;         // 0–40 marks
  attendance: number;    // 0–7 marks
  presentation: number;  // 0–8 marks
  totalScore: number;    // 0–100 marks
  attendanceRate?: number;
  weeklyStudyHours?: number;
  priorFailures?: number;
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
  quiz: number;          // 0–15 marks
  assignment: number;    // 0–5 marks
  midterm: number;       // 0–25 marks
  final?: number | null; // 0–40 marks
  attendance: number;    // 0–7 marks
  presentation: number;  // 0–8 marks
  totalScore: number;    // 0–100 marks
  gradePoint?: number | null;
  letterGrade?: string | null;
  attendanceRate?: number;
  quizAverage?: number;
  midtermScore?: number;
  assignmentScore?: number;
  finalExamScore?: number | null;
}
