import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  Database,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16 flex-1">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Final Year Degree Project (FYDP)</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            AI-Based Early Student Performance Prediction &amp; Personalized Academic Recommendations
          </h1>
          <p className="text-base md:text-lg text-slate-600">
            A full-stack machine learning early warning system empowering educational institutions to identify
            at-risk students proactively and deliver personalized, prescriptive interventions.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition shadow-sm"
            >
              <span>Launch Advisor Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition"
            >
              <span>Read Methodology</span>
            </Link>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg w-fit">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">5 ML Algorithms</h3>
            <p className="text-sm text-slate-600">
              Logistic Regression, Decision Tree (CART), Random Forest, KNN, and SVM trained on student transcript
              and attendance patterns.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg w-fit">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Prescriptive Rule Engine</h3>
            <p className="text-sm text-slate-600">
              Translates probabilistic ML risk scores into actionable, personalized study plans, tutoring referrals,
              and academic probation remedies.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="p-2.5 bg-purple-100 text-purple-600 rounded-lg w-fit">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">PostgreSQL &amp; Prisma</h3>
            <p className="text-sm text-slate-600">
              Enterprise database architecture maintaining historical student records, serialized model artifacts, and
              audit logs.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
