# EduPredict AI

> **AI-Based Early Student Performance Prediction and Personalized Academic Recommendation System Using Machine Learning**  
> *Final Year Degree Project (FYDP)*

## Features

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5.8
- **Pure JavaScript/TypeScript ML:**
  - **Logistic Regression:** Custom vectorized TypeScript implementation with L2 regularization
  - **Decision Tree:** CART algorithm (`ml-cart`)
  - **Random Forest:** Ensemble bagging (`ml-random-forest`)
  - **K-Nearest Neighbors (KNN):** Euclidean metric classification (`ml-knn`)
  - **Support Vector Machine (SVM):** Linear hyperplane classification (`ml-svm`)
- **Prescriptive Recommendations:** Rule engine generating personalized intervention plans
- **Database & Authentication:** PostgreSQL, Prisma Client 7, NextAuth.js
- **Styling:** Tailwind CSS v4, Lucide React, shadcn/ui components
- **Testing:** Vitest (Unit & Integration) and Playwright (E2E)

## Project Structure

```text
edupredict-ai/
├── public/                 # Static assets, SVG logos and illustrations
├── prisma/                 # PostgreSQL schema, migrations, and seed script
├── data/
│   ├── raw/                # Raw student performance transcripts
│   └── processed/          # Preprocessed feature tensors
├── artifacts/
│   ├── models/             # Serialized model JSON files
│   └── evaluation/         # Comparative benchmark reports
├── scripts/                # Data inspection, training, and evaluation scripts
├── src/
│   ├── app/                # Next.js App Router pages and API route handlers
│   ├── components/         # UI design primitives and domain widgets
│   ├── ml/                 # Algorithms, preprocessing, evaluation, and rules
│   ├── lib/                # Prisma, NextAuth, and utility singletons
│   ├── services/           # Backend business logic
│   ├── validations/        # Zod input schemas
│   ├── types/              # Domain TypeScript interfaces
│   └── hooks/              # Custom client hooks
├── tests/
│   ├── unit/               # Algorithm, preprocessing, and metric tests
│   ├── integration/        # Service and API integration tests
│   └── e2e/                # Playwright end-to-end tests
└── docs/                   # Architecture, database, API, and testing documentation
```

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

### 3. Database Migration & Seed
```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Run Verification Benchmarks & Tests
```bash
# Unit & Integration Tests
pnpm test

# ML Model Evaluation Benchmark
pnpm benchmark:ml

# Type Check & Linting
pnpm exec tsc --noEmit
pnpm lint

# Production Build
pnpm build
```
