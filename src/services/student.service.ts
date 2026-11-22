import prisma from '@/lib/prisma';
import type { StudentFormValues } from '@/validations/student.schema';

export class StudentService {
  public static async getAllStudents() {
    return prisma.student.findMany({
      include: {
        academicRecords: true,
        predictions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { studentCode: 'asc' },
    });
  }

  public static async getStudentById(id: string) {
    return prisma.student.findUnique({
      where: { id },
      include: {
        academicRecords: true,
        predictions: true,
        recommendations: true,
      },
    });
  }

  public static async createStudent(data: StudentFormValues) {
    const totalScore = Number(
      (
        data.quiz +
        data.assignment +
        data.midterm +
        data.final +
        data.attendance +
        data.presentation
      ).toFixed(2)
    );

    let currentRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (totalScore < 45 || data.attendance < 3.0 || data.final < 14) {
      currentRiskLevel = 'CRITICAL';
    } else if (totalScore < 60 || data.midterm < 11 || data.attendance < 3.5) {
      currentRiskLevel = 'HIGH';
    } else if (totalScore < 75) {
      currentRiskLevel = 'MEDIUM';
    }

    return prisma.student.create({
      data: {
        studentCode: data.studentCode,
        department: data.department,
        currentSemester: data.currentSemester,
        cumulativeGpa: data.cumulativeGpa,
        quiz: data.quiz,
        assignment: data.assignment,
        midterm: data.midterm,
        final: data.final,
        attendance: data.attendance,
        presentation: data.presentation,
        totalScore,
        attendanceRate: data.attendanceRate ?? (data.attendance / 7) * 100,
        weeklyStudyHours: data.weeklyStudyHours ?? 10,
        priorFailures: data.priorFailures ?? 0,
        currentRiskLevel,
      },
    });
  }
}
