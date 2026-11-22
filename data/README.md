# EduPredict AI Datasets

This directory manages raw and preprocessed student performance datasets used for training and evaluating machine learning models.

## Directory Structure
- `raw/`: Unprocessed student academic records (e.g. `student_performance.csv`).
- `processed/`: Encoded, scaled, and split features (`X_train.json`, `y_train.json`, `X_test.json`, `y_test.json`).

## Dataset Schema
- `studentCode` (string): Unique identifier for each student.
- `department` (categorical): Department of enrollment.
- `currentSemester` (integer): Current enrolled semester (1-8).
- `attendanceRate` (float): Percentage of lectures attended (0.0 - 100.0).
- `weeklyStudyHours` (float): Independent study hours per week.
- `quizAverage` (float): Average score across continuous assessment quizzes (0.0 - 100.0).
- `midtermScore` (float): Midterm examination percentage (0.0 - 100.0).
- `assignmentScore` (float): Lab and homework score average (0.0 - 100.0).
- `priorFailures` (integer): Number of historical prerequisite / semester course failures.
- `finalOutcome` (binary/categorical): Target variable (1 = Pass / Satisfactory, 0 = At-Risk / Fail).
