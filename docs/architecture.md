# EduPredict AI — System Architecture Document

## Overview
**EduPredict AI** is a full-stack, machine learning-driven educational intelligence platform designed to forecast early student performance and generate personalized, actionable academic interventions.

## Technology Stack
- **Framework:** Next.js 16 (App Router with Server & Client Components)
- **Language:** TypeScript 5.8 (Strict type safety, zero Python)
- **Styling:** Tailwind CSS v4 with PostCSS & shadcn/ui components
- **Database & ORM:** PostgreSQL with Prisma Client 7
- **Authentication:** NextAuth.js with Prisma adapter & JWT session strategy
- **ML Subsystem:** 5 Pure TypeScript/JavaScript classification models:
  1. Logistic Regression (Custom vectorized TypeScript implementation)
  2. Decision Tree CART (`ml-cart`)
  3. Random Forest (`ml-random-forest`)
  4. K-Nearest Neighbors (`ml-knn`)
  5. Support Vector Machine (`ml-svm` with calibrated $\{-1, 1\}$ mapper)
- **Testing:** Vitest (Unit/Integration) and Playwright (E2E)

## Architectural Flow
```
User/Advisor Browser
        │
        ▼
Next.js App Router (Client Components)
        │
        ▼  [REST API / Route Handlers]
Next.js API Routes (src/app/api/*)
        │
        ├──► Prisma ORM ──► PostgreSQL Database
        │
        └──► ML Subsystem (src/ml/*)
                ├── Data Preprocessing (Scaling / Encoding / Cleaning)
                ├── Trained Model Inference (LR / CART / RF / KNN / SVM)
                └── Academic Rule Engine ──► Actionable Interventions
```
