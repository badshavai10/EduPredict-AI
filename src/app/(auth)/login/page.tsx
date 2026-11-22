'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, CheckCircle2 } from 'lucide-react';

type PortalContext = 'Advisor / Faculty' | 'Dept. Chair' | 'System Admin';

export default function LoginPage() {
  const router = useRouter();

  // Form states
  const [portalContext, setPortalContext] = useState<PortalContext>('Advisor / Faculty');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Quick fill demo credentials
  const fillCredentials = (role: 'thorne' | 'admin') => {
    if (role === 'thorne') {
      setEmail('thorne@university.edu');
      setPassword('••••••••••••');
      setPortalContext('Advisor / Faculty');
      setNotification('Populated credentials for Dr. Aris Thorne (Advisor)');
    } else {
      setEmail('admin@university.edu');
      setPassword('••••••••••••');
      setPortalContext('System Admin');
      setNotification('Populated credentials for Office of the Registrar (Admin)');
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  const handleSSOLogin = () => {
    setIsLoading(true);
    setNotification('Connecting to University SSO (Canvas / Okta)...');
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* ======================================================== */}
      {/* LEFT COLUMN: Dark Brand, Hero & Institutional Proof Pane */}
      {/* ======================================================== */}
      <div
        className="relative flex-1 lg:max-w-[48%] min-h-[560px] lg:min-h-screen p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-white overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800"
        style={{
          backgroundColor: '#070f26',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      >
        {/* Subtle ambient radial glow behind hero */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 shrink-0">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">EduPredict</span>
              <span className="bg-blue-900/70 text-blue-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-700/60 tracking-wide">
                AI 3.2
              </span>
            </div>
            <p className="text-[9px] font-bold tracking-widest text-slate-400 mt-0.5 uppercase">
              Intelligent Academic Analytics &amp; Student Retention
            </p>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 my-10 lg:my-auto max-w-xl">
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-medium mb-6 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Predictive Student Intelligence Engine</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.15]">
            Early risk signals.
            <br />
            <span className="text-cyan-400">Timely student interventions.</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-lg font-normal">
            Harness verified institutional machine learning to forecast academic disengagement,
            automate advisor triage, and elevate graduation pathways.
          </p>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 py-7 my-4 border-y border-slate-800/80 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                45+
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Institutions Protected
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-tight">
                94.1%
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Model Precision Rate
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                FERPA
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                &amp; GDPR Compliant
              </div>
            </div>
          </div>

          {/* Testimonial Quote Card */}
          <div className="bg-slate-900/70 border border-slate-700/70 rounded-2xl p-5 shadow-2xl backdrop-blur-md max-w-lg relative">
            <p className="text-xs sm:text-[13px] text-slate-300 italic leading-relaxed">
              &ldquo;EduPredict detected subtle attendance and assignment drops weeks before
              midterms, reducing our first-year student attrition by 34% within a single academic
              term.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-800">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-semibold text-slate-200">
                AT
              </div>
              <div>
                <div className="text-xs font-bold text-white">Dr. Aris Thorne</div>
                <div className="text-[10px] text-slate-400">
                  Dean of Academic Success &amp; Institutional Research
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium">All Predictive Pipelines Operational</span>
          </div>
          <span className="font-medium text-slate-400">Fall 2024 Cycle</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT COLUMN: Institutional Authentication Form Pane     */}
      {/* ======================================================== */}
      <div className="flex-1 bg-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 min-h-screen">
        {/* Top Header / Access Request Link */}
        <div className="flex justify-end items-center">
          <div className="text-xs text-slate-500">
            New to EduPredict?{' '}
            <button
              onClick={() =>
                setNotification('Institutional onboarding request submitted for review.')
              }
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Request Institution Access
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-8">
          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Sign in to access student retention rosters, risk signals, and predictive
              intervention workflows.
            </p>
          </div>

          {/* Notification banner */}
          {notification && (
            <div className="mb-4 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
              <span>{notification}</span>
            </div>
          )}

          {/* SSO Button */}
          <button
            type="button"
            onClick={handleSSOLogin}
            className="w-full py-2.5 px-4 rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-between transition shadow-xs group"
          >
            <span className="w-16" />
            <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
              Sign in with University SSO
            </span>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200 tracking-tight">
              Canvas / Okta
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-white px-3">
              OR UNIVERSITY CREDENTIALS
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Context Switcher */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Portal Context
              </label>
              <div className="bg-slate-100 p-1 rounded-lg grid grid-cols-3 gap-1 border border-slate-200">
                {(['Advisor / Faculty', 'Dept. Chair', 'System Admin'] as PortalContext[]).map(
                  (tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPortalContext(tab)}
                      className={`py-1.5 text-xs rounded-md transition-all font-medium text-center ${
                        portalContext === tab
                          ? 'bg-white text-slate-900 shadow-sm font-semibold'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institutional Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. thorne@university.edu"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Must belong to an authorized partner university domain (.edu).
              </p>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Account Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setNotification('Password reset link sent to your institutional address.')
                  }
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                />
                <div>
                  <span className="text-xs font-medium text-slate-700">
                    Remember this workstation for 30 days
                  </span>
                  <span className="block text-[11px] text-slate-400 leading-normal mt-0.5">
                    Uncheck when using shared laboratory or library terminals.
                  </span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Workspace</span>
              )}
            </button>
          </form>

          {/* Instant Demo Access Container */}
          <div className="mt-5 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-800">Instant Demo Access</span>
              <span className="text-[9px] font-bold text-blue-700 bg-blue-100/90 border border-blue-300/60 px-1.5 py-0.5 rounded uppercase tracking-wider">
                EVALUATION MODE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2.5">
              Click to auto-populate credentials for role verification:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillCredentials('thorne')}
                className="py-1.5 px-2 bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-medium rounded-lg transition shadow-2xs text-center"
              >
                Dr. Thorne (Advisor)
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('admin')}
                className="py-1.5 px-2 bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-medium rounded-lg transition shadow-2xs text-center"
              >
                Registrar / Admin
              </button>
            </div>
          </div>
        </div>

        {/* Footer / Compliance Badges */}
        <div className="text-center pt-6">
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 flex-wrap">
            <span>256-bit SSL Encryption</span>
            <span>•</span>
            <span>Institutional 2FA Enforced</span>
            <span>•</span>
            <span>FERPA Privacy Shield</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            &copy; 2024 EduPredict AI Systems Inc. Authorized academic personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
