import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 flex-1 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">About EduPredict AI</h1>
          <p className="text-sm text-slate-500 mt-1">
            Final Year Degree Project (FYDP) — Academic Machine Learning Solution
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Project Scope &amp; Motivation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong>EduPredict AI</strong> addresses the critical challenge of undergraduate student attrition and
              academic difficulty by employing early machine learning prediction models alongside prescriptive intervention
              rule engines.
            </p>
            <p>
              By evaluating continuous assessment telemetry (attendance frequency, study hours, quiz averages, midterm
              performance, and historical failure records), the system flags students before end-of-semester examinations,
              enabling timely academic counseling.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
