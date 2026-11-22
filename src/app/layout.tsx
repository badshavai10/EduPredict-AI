import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduPredict AI — Analytics Platform',
  description:
    'AI-Based Early Student Performance Prediction and Personalized Academic Recommendation System Using Machine Learning',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
