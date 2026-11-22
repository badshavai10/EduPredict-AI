# EduPredict AI — Database Design & Schema Specification

## Database Engine
- **RDBMS:** PostgreSQL
- **ORM:** Prisma Client

## Entity-Relationship Overview
1. **User / Account / Session / Verification (NextAuth Authentication):**
   - Stores institutional credentials, JWT sessions, and RBAC roles (`STUDENT`, `INSTRUCTOR`, `ACADEMIC_ADVISOR`, `ADMIN`).
2. **Student:**
   - Primary domain entity representing undergraduate profiles.
   - Fields: `studentCode`, `department`, `currentSemester`, `cumulativeGpa`, `attendanceRate`, `weeklyStudyHours`, `priorFailures`, `currentRiskLevel`.
3. **AcademicRecord:**
   - Granular course-by-course performance records tracking semester, credit hours, attendance, quiz averages, midterm marks, and final exam grades.
4. **ModelRegistry:**
   - Tracks trained ML model versions, hyperparameter configurations, serialized artifact paths, and empirical metrics (Accuracy, Precision, Recall, F1).
5. **Prediction:**
   - Stores inference results, output classification labels (`PASS`, `FAIL`, `AT_RISK`), confidence scores, and probability distributions.
6. **Recommendation:**
   - Stores prescriptive interventions linked to students and prediction runs, detailing category (`ATTENDANCE`, `STUDY_HABIT`, `ACADEMIC`), priority level, and actionable steps.
