# EduPredict AI — Step-by-Step Operational & Workflow Process Guide
> **Institutional AI-Based Early Student Performance Prediction and Personalized Academic Recommendation System**  
> *Final Year Degree Project (FYDP) / Thesis Project Operational Manual*

---

## 1. Executive Project Overview & Architecture

**EduPredict AI** is an institutional academic intelligence platform engineered to detect student academic disengagement weeks before midterms and prescribe targeted interventions.

### Key Architectural Pillars
- **Strict JavaScript / TypeScript Ecosystem:** 100% pure TypeScript (Strictly **NO Python** across the entire stack: no Flask, Django, Pandas, or Scikit-learn).
- **Core Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5.8 + Tailwind CSS v4.
- **Database & Persistence:** PostgreSQL via Prisma Client 7 (`@prisma/adapter-pg` + `pg`).
- **Authentication & Security:** NextAuth.js / Better-Auth with 3-tier Role-Based Access Control (RBAC) and FERPA compliance.
- **Pure TS Machine Learning Engine (`src/ml/`):**
  - **Random Forest Classifier (Production Default v2.4):** Ensemble bagging (`ml-random-forest`).
  - **Gradient Boosted Trees (GBDT):** Iterative loss minimization.
  - **Support Vector Machine (SVM):** Hyperplane classification (`ml-svm`).
  - **Logistic Regression (L2):** Vectorized custom TypeScript with L2 weight regularization.
  - **K-Nearest Neighbors (KNN):** Euclidean distance metric (`ml-knn`).
- **Feature Attribution:** Pure TypeScript Shapley Value (SHAP) calculation engine.
- **Package Manager:** `pnpm` exclusively.

---

## 2. Daily Environment Setup & Commands

All development and verification workflows must strictly use `pnpm`:

### 2.1 Initial Setup
```bash
# 1. Install all dependencies
pnpm install

# 2. Configure environment variables (.env)
# Ensure DATABASE_URL, NEXTAUTH_SECRET, etc. are properly set.

# 3. Generate Prisma client & sync database schema
pnpm prisma:generate
pnpm prisma:migrate

# 4. Populate demo cohort and institutional personnel
pnpm prisma:seed
```

### 2.2 Running Development Server
```bash
pnpm dev
```
The application runs at **`http://localhost:3000`**.

### 2.3 Quality Gate & Verification Commands
Before committing code or presenting demonstrations, run all verification steps:
```bash
# Run unit & integration test suite (Vitest - 17 tests)
pnpm test

# Run ML model comparative benchmark script
pnpm benchmark:ml

# TypeScript strict type checking
pnpm exec tsc --noEmit

# ESLint audit (Must return 0 errors, 0 warnings)
pnpm run lint

# Production compilation & static prerender check (24 routes)
pnpm run build
```

---

## 3. End-to-End Operational Workflow (The 12-Phase Process)

Follow this exact chronological process when running, evaluating, or demonstrating the platform:

```
  ┌─────────────────────────────────────────────────────────────┐
  │ PHASE 1: Institutional Access & Authentication (/login)     │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 2: Dataset Ingestion & Preprocessing (/upload-dataset) │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 3: Executive Academic Health Dashboard (/dashboard)   │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 4: Student Dossier & Trajectory Curves (/students)    │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 5: Early-Warning Student Risk Monitoring              │
  │          (/student-risk-list)                               │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 6: Multi-Model Inference & What-If Simulation         │
  │          (/prediction)                                      │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 7: Personalized Recommendations & Interventions       │
  │          (/recommendations)                                 │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 8: AI Academic Insights & Correlation Discovery       │
  │          (/ai-insights)                                     │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 9: Model Performance & FERPA Defense Dossier          │
  │          (/model-performance)                               │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 10: Institutional Reports & Executive Dossiers        │
  │           (/reports)                                        │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 11: Team Access Governance & RBAC (/team-management)  │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ PHASE 12: Platform Settings & ML Cutoff Tuning (/settings)  │
  └─────────────────────────────────────────────────────────────┘
```

---

### Phase 1: Institutional Authentication (`/login`)
- **Route:** `http://localhost:3000/login`
- **Purpose:** Secure enterprise single sign-on (SSO) and role-specific credential routing.
- **Workflow Steps:**
  1. Navigate to `/login`.
  2. Select portal context tab: `Advisor / Faculty`, `Dept. Chair`, or `System Admin`.
  3. Use **Instant Demo Access** quick-fill buttons:
     - Click **`Dr. Thorne (Advisor)`** to auto-populate senior advisor credentials.
     - Click **`Registrar / Admin`** to test high-privilege administrative access.
  4. Click **`Sign In to Workspace`** or test simulated Canvas / Okta SSO.

---

### Phase 2: Ingestion & Feature Engineering (`/upload-dataset`)
- **Route:** `http://localhost:3000/upload-dataset`
- **Purpose:** Intake raw semester transcripts, validate headers, handle missing values, and align schema.
- **Workflow Steps:**
  1. Drag and drop student grade CSV or click to browse `Fall_2024_Cohort.csv`.
  2. Review the **Automated Schema Alignment** matrix:
     - Map raw fields (`attendance_pct`, `study_hours`, `prior_gpa`, `quiz_avg`, `lms_logins`) to normalized feature tensors.
  3. Check data health indicators: Missing value imputations and SMOTE class balancing.
  4. Click **`Validate & Commit Ingestion`** to process student records into PostgreSQL.

---

### Phase 3: Executive Academic Health Dashboard (`/dashboard`)
- **Route:** `http://localhost:3000/dashboard`
- **Purpose:** High-level strategic overview of institutional retention and cohort health.
- **Workflow Steps:**
  1. Inspect the top KPI row:
     - **Active Monitored Cohort** (e.g. 1,250 students).
     - **Retention Health Index** (e.g. 94.4%).
     - **Flagged Critical Cases** (e.g. 48 urgent nudges).
     - **Active Interventions** (e.g. 142 ongoing plans).
  2. Review the **Risk Distribution Donut Chart** (High, Medium, Safe bands).
  3. Inspect the **Priority Predictions Table** showing top at-risk students with real-time confidence scores.
  4. View the **AI Synthesis Alert Card** for cohort-level pattern alerts.

---

### Phase 4: Student Roster & Academic Dossier (`/students`)
- **Route:** `http://localhost:3000/students`
- **Purpose:** Roster management, student record search, and deep-dive trajectory curves.
- **Workflow Steps:**
  1. Filter roster by department, semester standing, and risk level.
  2. Click on any student row (e.g., **Marcus Vance**, **Elena Rostova**) to open their **Academic Dossier**.
  3. Analyze the **Weeks 1–8 Academic Trajectory Curve** (Attendance vs. Coursework Submission).
  4. Review the student's **AI Prescribed Action Plan** and trigger direct actions:
     - `Book 1:1 Counseling`
     - `Peer Tutoring Pool`
     - `Parent Notification`

---

### Phase 5: Student Early-Warning Risk Monitoring (`/student-risk-list`)
- **Route:** `http://localhost:3000/student-risk-list`
- **Purpose:** Immediate operational triaging for academic advisors.
- **Workflow Steps:**
  1. Check risk count cards: High Risk (Tier 1 Interventions), Medium Risk (Monitoring Buffer), Low Risk/Safe.
  2. Review **Primary Contributing Risk Factors** (SHAP Global Feature Impact):
     - Low Attendance (<75% sessions): 45% of cases.
     - Missing LMS Assignments (>2 deadlines): 28% of cases.
     - Midterm Deficiencies (<60% mark): 19% of cases.
  3. Use attendance range sliders and department dropdowns to filter high-risk students.
  4. Click **`🚨 Intervene`** on any critical student row to launch an immediate remediation docket.

---

### Phase 6: AI Performance Inference Engine (`/prediction`)
- **Route:** `http://localhost:3000/prediction`
- **Purpose:** Interactive what-if simulation and multi-model classification comparison.
- **Workflow Steps:**
  1. Select a student profile (e.g., `STU-2024-041 Marcus Vance`).
  2. Inspect the **6 Normalized Predictors**:
     - Course Attendance Rate (58% — Critical Deficit)
     - Weekly Self-Study Hours (6.5 hrs)
     - Cumulative GPA (1.92 — Probation Zone)
     - Formative Quiz Average (52.0%)
     - Coursework & Assignments (64.0%)
     - LMS Portal Activity (3.0 logins/wk)
  3. Choose the active classifier engine:
     - `Random Forest Classifier v2.4 (94.1% Acc, F1: 0.94)`
     - `Gradient Boosted Trees (92.0% Acc)`
     - `Support Vector Machine (90.8% Acc)`
     - `Logistic Regression (88.1% Acc)`
     - `K-Nearest Neighbors (86.7% Acc)`
  4. Perform **What-If Simulation**: Adjust attendance or study hours sliders and click **`Run Inference Engine`** to observe real-time probability shifts.
  5. Inspect the **Feature Attribution (SHAP TreeExplainer)** additive weight breakdown.

---

### Phase 7: Personalized Recommendations & Interventions (`/recommendations`)
- **Route:** `http://localhost:3000/recommendations`
- **Purpose:** Actionable remediation blueprints and longitudinal intervention tracking.
- **Workflow Steps:**
  1. Check overall metrics: Total Active (142), In-Progress Support (86), Completed Plans (428).
  2. Inspect 2x2 multi-faceted blueprint cards:
     - **Marcus Vance:** 1-on-1 Peer Tutoring in Data Structures + Bi-weekly Attendance Contract.
     - **Liam Gallagher:** Academic Counseling & Study Habit Re-alignment Workshop.
     - **Devonte Washington:** Supplemental Lab Cohort + Teaching Assistant Mentorship.
     - **Carlos Mendoza:** Remediation Plan Succeeded (Weekly Math Clinic Intensive).
  3. Review the **Intervention Strategy Efficacy Comparison** bar chart.
  4. Click **`+ Create Custom Intervention Plan`** to open the modal and assign faculty mentors.

---

### Phase 8: AI Academic Insights & Correlation Discovery (`/ai-insights`)
- **Route:** `http://localhost:3000/ai-insights`
- **Purpose:** Empirical validation of academic patterns and bivariate scatter regressions.
- **Workflow Steps:**
  1. Examine the **Autonomous Pattern Discovery** banner:
     > *"Students with attendance falling below 65% in weeks 3–5 exhibit an 82% likelihood of scoring below 2.0 GPA without early intervention."*
  2. Inspect the **Attendance vs. Academic Performance Scatter Plot**:
     - View Pearson correlation ($r = +0.78$).
     - Observe the shaded **Zone of Concern** (<60% attendance, <2.0 GPA).
  3. Review **Shapley Global Feature Importance** rankings.
  4. Analyze **Study Hours vs. GPA Tiers** to identify the 15.0 hrs/week inflection threshold.
  5. Deploy automated prescriptive signals via **`Deploy Week 5 Notification`** or **`Notify Dept Chair`**.

---

### Phase 9: Model Performance & FERPA Defense Dossier (`/model-performance`)
- **Route:** `http://localhost:3000/model-performance`
- **Purpose:** Scientific and statistical defense of ML algorithms for thesis committee review.
- **Workflow Steps:**
  1. Inspect the 5-Model Comparison Benchmarking table:
     - Evaluates Accuracy, Precision, Recall, F1-Score, and ROC-AUC.
     - Demonstrates why **Random Forest v2.4 (94.1% Accuracy, 0.94 F1)** was chosen as the deployed production model.
  2. Inspect the **3x3 Production Confusion Matrix** (Low, Medium, High Risk classes) showing 94.4% High-Risk Sensitivity and 0 Missed dropouts.
  3. Review the **Methodology & Institutional Defense Dossier**:
     - **SMOTE Imbalance:** Synthetic over-sampling applied strictly within training folds.
     - **StandardScaler:** Z-score feature normalization.
     - **5-Fold Stratified Cross-Validation:** Cohen's Kappa = 0.881.
  4. View the **Gini / SHAP Feature Importance** rankings.

---

### Phase 10: Academic Reports & Executive Dossiers (`/reports`)
- **Route:** `http://localhost:3000/reports`
- **Purpose:** Audit-ready compliance documentation, PDF/CSV downloads, and bias logs.
- **Workflow Steps:**
  1. Filter reports by type: `Cohort Performance`, `Retention & Risk Audits`, `ML Fairness & Bias Logs`, `Executive Briefs`.
  2. Inspect cataloged dossiers:
     - *Fall 2024 Midterm Cohort Retention Audit & Early-Warning Diagnostic*
     - *Machine Learning Demographic Parity & Algorithmic Bias Assessment v2.4*
  3. Click **`Download Formal Board Presentation (PDF)`** or **`Export Full Tabular Data (CSV)`**.
  4. Review the **Executive Summary Snapshot** displaying monitored cohort metrics and attrition deflection rates (+14.2%).

---

### Phase 11: Team & User Access Governance (`/team-management`)
- **Route:** `http://localhost:3000/team-management`
- **Purpose:** Personnel directory, active student caseloads, and 3-tier RBAC enforcement.
- **Workflow Steps:**
  1. View platform directory count cards (38 Platform Live, 18 Advisors, 14 Chairs, 6 Admins).
  2. Filter staff by role, department, MFA enforcement status (`Okta Verify [Hardware Key]`, `SMS 2FA`, `Duo`).
  3. Review the **Role-Based Access Control (RBAC) & FERPA Policy Enforcement Matrix**:
     - **Tier 1 - Operations (Advisors & Mentors):** Cohort-limited Read/Write access.
     - **Tier 2 - Leadership (Chairs & Deans):** Department-wide aggregated Read-Only access.
     - **Tier 0 - Engineering (System Admins & ML Auditors):** Root privilege, algorithm threshold tuning, and FERPA logs.
  4. Click **`+ Invite Academic Personnel`** to simulate inviting staff with department and clearance assignments.

---

### Phase 12: Platform Settings & ML Cutoff Governance (`/settings`)
- **Route:** `http://localhost:3000/settings`
- **Purpose:** Calibrating algorithmic sensitivity thresholds, LMS bridges, and notification matrices.
- **Workflow Steps:**
  1. Navigate to the **Academic Parameters & AI Thresholds** tab.
  2. Tune the **Classification Probability Thresholds**:
     - **On-Track:** $P(\text{Attrition}) < 0.40$
     - **Watchlist:** $0.40 \le P(\text{Attrition}) < 0.70$
     - **Critical Risk:** $P(\text{Attrition}) \ge 0.70$
  3. Adjust the **Minimum Attendance Warning Floor** slider (Default: 65%).
  4. Configure the **Escalation & Notification Protocol Matrix**:
     - Toggle Instant SMS Escalation for students with $>85\%$ attrition probability.
     - Toggle Weekly Cohort Digest dispatch.
     - Verify Institutional Slack / Microsoft Teams channel bridge.
  5. Click **`Save Preferences`** to apply updated parameters.

---

## 4. Development & Code Modification Rules

When extending or maintaining this project, strictly follow these engineering guardrails:

| Rule | Requirement |
| :--- | :--- |
| **No Python Anywhere** | All models, preprocessing, and metrics must remain in pure TypeScript under `src/ml/`. Never create `.py` scripts or Python backends. |
| **Package Manager** | Use `pnpm` exclusively (`pnpm add`, `pnpm run`, `pnpm test`). Never run `npm` or `yarn`. |
| **Type Safety** | No implicit `any` types. Verify all changes with `pnpm exec tsc --noEmit`. |
| **ESLint Standards** | Remove all unused imports and variables before committing (`pnpm run lint` must yield 0 warnings and 0 errors). |
| **Test Integrity** | Maintain 100% pass rate across the 17 unit and integration tests in `tests/`. |
| **App Router Standards** | Place dashboard views under `src/app/(dashboard)/<route>/page.tsx` with `'use client'` where React hooks are used. |

---

## 5. Thesis Presentation / Defense Demonstration Script

When presenting this project to your thesis advisor or examination committee, follow this proven 7-minute demonstration sequence:

1. **Thesis Motivation (1 min):** Start at `/login`, explain the high rate of unaddressed midterm student attrition and the need for early algorithmic triage under FERPA compliance.
2. **Executive Overview (1 min):** Navigate to `/dashboard`, highlight the retention health index (94.4%) and priority predictions table.
3. **Data & Methodology (1.5 min):** Open `/model-performance`. Present the 5-model benchmark, explain why Random Forest was selected over SVM/KNN/Logistic Regression, and show the 3x3 confusion matrix with 94.4% high-risk sensitivity.
4. **Interactive What-If Simulation (1.5 min):** Go to `/prediction`. Select Marcus Vance, show the SHAP feature attributions (attendance accounting for +35% risk). Adjust attendance from 58% to 80% and click `Run Inference Engine` to demonstrate real-time risk reduction.
5. **Prescriptive Interventions (1 min):** Open `/recommendations`, showcase personalized multi-step remediation blueprints and efficacy comparisons.
6. **Governance & Ethics (1 min):** Show `/team-management` (3-tier RBAC matrix) and `/settings` (calibrating probability cutoffs and FERPA student privacy shields).
