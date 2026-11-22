export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        © {new Date().getFullYear()} EduPredict AI — Machine Learning Student Early Warning &amp; Personalized Academic Recommendation System.
      </div>
    </footer>
  );
}
