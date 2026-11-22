import { z } from 'zod';

export const StudentFormSchema = z.object({
  studentCode: z.string().min(3, 'Student code must be at least 3 characters'),
  department: z.string().min(2, 'Department is required'),
  currentSemester: z.coerce.number().int().min(1).max(12),
  cumulativeGpa: z.coerce.number().min(0).max(4.0).default(0.0),
  quiz: z.coerce.number().min(0, 'Quiz mark must be >= 0').max(15, 'Quiz maximum is 15 marks').default(10),
  assignment: z.coerce.number().min(0, 'Assignment mark must be >= 0').max(5, 'Assignment maximum is 5 marks').default(4),
  midterm: z.coerce.number().min(0, 'Mid-term mark must be >= 0').max(25, 'Mid-term maximum is 25 marks').default(18),
  final: z.coerce.number().min(0, 'Final Exam mark must be >= 0').max(40, 'Final Exam maximum is 40 marks').default(28),
  attendance: z.coerce.number().min(0, 'Attendance mark must be >= 0').max(7, 'Attendance maximum is 7 marks').default(6),
  presentation: z.coerce.number().min(0, 'Presentation mark must be >= 0').max(8, 'Presentation maximum is 8 marks').default(6),
  // Optional legacy fields for backward compatibility
  attendanceRate: z.coerce.number().min(0).max(100).optional(),
  weeklyStudyHours: z.coerce.number().min(0).max(100).optional(),
  priorFailures: z.coerce.number().int().min(0).default(0).optional(),
});

export type StudentFormValues = z.infer<typeof StudentFormSchema>;

export function calculateStudentTotalMarks(scores: {
  quiz: number;
  assignment: number;
  midterm: number;
  final: number;
  attendance: number;
  presentation: number;
}): number {
  return Number(
    (
      scores.quiz +
      scores.assignment +
      scores.midterm +
      scores.final +
      scores.attendance +
      scores.presentation
    ).toFixed(2)
  );
}
