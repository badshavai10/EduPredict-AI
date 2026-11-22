import prisma from '@/lib/prisma';

export class RecommendationService {
  public static async getStudentRecommendations(studentId: string) {
    return prisma.recommendation.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  public static async getAllRecommendations() {
    return prisma.recommendation.findMany({
      include: {
        student: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
