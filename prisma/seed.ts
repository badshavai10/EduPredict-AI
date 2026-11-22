import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding EduPredict AI database...');

  // Upsert test user
  await prisma.user.upsert({
    where: { email: 'advisor@edupredict.ai' },
    update: {},
    create: {
      name: 'Dr. Sarah Connor',
      email: 'advisor@edupredict.ai',
      role: 'ACADEMIC_ADVISOR',
      emailVerified: true,
    },
  });

  // Upsert test students
  const sampleStudents = [
    {
      studentCode: 'STU1001',
      department: 'Computer Science',
      currentSemester: 4,
      cumulativeGpa: 3.75,
      attendanceRate: 92.5,
      weeklyStudyHours: 18.0,
      priorFailures: 0,
      currentRiskLevel: 'LOW' as const,
    },
    {
      studentCode: 'STU1002',
      department: 'Computer Science',
      currentSemester: 4,
      cumulativeGpa: 1.85,
      attendanceRate: 58.0,
      weeklyStudyHours: 4.5,
      priorFailures: 2,
      currentRiskLevel: 'CRITICAL' as const,
    },
  ];

  for (const stu of sampleStudents) {
    await prisma.student.upsert({
      where: { studentCode: stu.studentCode },
      update: stu,
      create: stu,
    });
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
