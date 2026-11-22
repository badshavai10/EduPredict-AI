import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 flex-1 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Research &amp; Engineering Methodology</h1>
          <p className="text-sm text-slate-500 mt-1">
            Algorithmic formulation, data preprocessing pipelines, and prescriptive intervention mapping
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1. Machine Learning Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600 leading-relaxed">
              <p>
                The system benchmarks five classification architectures: Logistic Regression (custom vectorized TS implementation
                with L2 regularization), Decision Trees (CART), Random Forest (ensemble bagging), K-Nearest Neighbors (k=5 with
                Euclidean distance), and Support Vector Machines (linear/RBF kernels).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">2. Feature Engineering &amp; Normalization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600 leading-relaxed">
              <p>
                Continuous features are standardized using Z-score normalization (z = (x - &mu;) / &sigma;) to prevent feature
                magnitude bias in distance-based algorithms such as KNN and SVM. Categorical variables are mapped via deterministic
                label encoders.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">3. Prescriptive Recommendation Engine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600 leading-relaxed">
              <p>
                Probabilistic outputs and risk levels (Low, Medium, High, Critical) are mapped to multi-tiered actionable
                remedies—attendance interventions, peer tutoring allocations, structured study hour blocks, and academic advisor
                check-ins.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
