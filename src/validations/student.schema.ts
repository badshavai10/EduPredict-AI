import { z } from 'zod';

export const StudentFormSchema = z.object({
  studentCode: z.string().min(3, 'Student code must be at least 3 characters'),
  department: z.string().min(2, 'Department is required'),
  currentSemester: z.coerce.number().int().min(1).max(12),
  cumulativeGpa: z.coerce.number().min(0).max(4.0).default(0.0),
  attendanceRate: z.coerce.number().min(0).max(100),
  weeklyStudyHours: z.coerce.number().min(0).max(100),
  priorFailures: z.coerce.number().int().min(0).default(0),
});

export type StudentFormValues = z.infer<typeof StudentFormSchema>;
