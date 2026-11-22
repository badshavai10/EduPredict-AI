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
    return prisma.student.create({
      data: {
        studentCode: data.studentCode,
        department: data.department,
        currentSemester: data.currentSemester,
        cumulativeGpa: data.cumulativeGpa,
        attendanceRate: data.attendanceRate,
        weeklyStudyHours: data.weeklyStudyHours,
        priorFailures: data.priorFailures,
      },
    });
  }
}
