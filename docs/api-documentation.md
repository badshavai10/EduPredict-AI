# EduPredict AI — REST API Documentation

## Base URL
`/api`

## Endpoints

### 1. Health Check
- **GET** `/api/health`
  - Returns service status, framework version, and server timestamp.

### 2. Student Records
- **GET** `/api/students`
  - Returns array of all registered student profiles and their latest predictions.
- **POST** `/api/students`
  - Creates a new student academic profile.
- **GET** `/api/students/[id]`
  - Returns details, academic course records, and historical predictions for a student.

### 3. Prediction & Inference
- **POST** `/api/predictions`
  - Executes ML classification inference on input features and generates personalized recommendations.
- **GET** `/api/predictions/[id]`
  - Retrieves a specific prediction record with its associated action items.

### 4. Recommendations
- **GET** `/api/recommendations`
  - Retrieves catalog of active recommendations across all monitored students.

### 5. Model Registry & Comparison
- **GET** `/api/model`
  - Returns comparative empirical evaluation metrics across all 5 trained models.
