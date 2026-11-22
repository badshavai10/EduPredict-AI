'use client';

import React, { useState, useMemo } from 'react';
import {
  CalendarClock,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileArchive,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Layers,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

interface ReportItem {
  id: string;
  sha: string;
  title: string;
  scope: string;
  reportType: 'Retention & Risk' | 'ML Fairness & Bias' | 'Executive Brief' | 'Cohort Performance';
  generatedDate: string;
  frequency: string;
  authorName: string;
  authorRole: string;
}

const mockReports: ReportItem[] = [
  {
    id: 'rep-01',
    sha: '8f7e2a9b',
    title: 'Fall 2024 Midterm Cohort Retention Audit & Early-Warning Diagnostic',
    scope: '1,250 Student Scope',
    reportType: 'Retention & Risk',
    generatedDate: 'Nov 02, 2024 • 09:15 AM',
    frequency: 'One-time Snapshot',
    authorName: 'Dr. Aris Thorne',
    authorRole: 'Chief Academic Advisor',
  },
  {
    id: 'rep-02',
    sha: '4c3b51ee',
    title: 'Machine Learning Demographic Parity & Algorithmic Bias Assessment v2.4',
    scope: 'Equal Opportunity Index: 0.99',
    reportType: 'ML Fairness & Bias',
    generatedDate: 'Oct 28, 2024 • 14:30 PM',
    frequency: 'Bi-weekly Scheduled',
    authorName: 'System Engine',
    authorRole: 'Automated AI Auditor',
  },
  {
    id: 'rep-03',
    sha: '1c32a918',
    title: 'First-Year Attrition Risk Distribution & Advisor Intervention Impact',
    scope: 'Board of Trustees Briefing',
    reportType: 'Executive Brief',
    generatedDate: 'Oct 25, 2024 • 08:00 AM',
    frequency: 'Monthly Strategic',
    authorName: 'Dean Vance',
    authorRole: 'Office of the Dean',
  },
  {
    id: 'rep-04',
    sha: '67f80c2f',
    title: 'STEM Departmental Attrition Forecast & Calculus I Recovery Report',
    scope: 'Targeting 241 Enrollees',
    reportType: 'Cohort Performance',
    generatedDate: 'Oct 20, 2024 • 11:20 AM',
    frequency: 'Ad-hoc Faculty Request',
    authorName: 'Prof. S. Jenkins',
    authorRole: 'Registrar Liaison',
  },
  {
    id: 'rep-05',
    sha: '9bcde141',
    title: 'Undergraduate Course Withdrawal Trajectory & Drop-Out Warning Log',
    scope: 'Historical Cycle Archival',
    reportType: 'Retention & Risk',
    generatedDate: 'Oct 15, 2024 • 16:45 PM',
    frequency: 'Quarterly Sync',
    authorName: 'Office of IR',
    authorRole: 'Institutional Research',
  },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<
    | 'All Reports'
    | 'Cohort Performance'
    | 'Retention & Risk Audits'
    | 'ML Fairness & Bias Logs'
    | 'Executive Briefs'
  >('All Reports');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedDateRange, setSelectedDateRange] = useState('Fall 2024 Cycle');
  const [selectedDept, setSelectedDept] = useState('Dept: Engineering & Computing');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [newReportTitle, setNewReportTitle] = useState('');
  const [newReportType, setNewReportType] = useState('Retention & Risk');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredReports = useMemo(() => {
    return mockReports.filter((r) => {
      if (activeTab === 'Cohort Performance' && r.reportType !== 'Cohort Performance') return false;
      if (activeTab === 'Retention & Risk Audits' && r.reportType !== 'Retention & Risk') return false;
      if (activeTab === 'ML Fairness & Bias Logs' && r.reportType !== 'ML Fairness & Bias') return false;
      if (activeTab === 'Executive Briefs' && r.reportType !== 'Executive Brief') return false;

      if (selectedType !== 'All Types' && r.reportType !== selectedType) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesSha = r.sha.toLowerCase().includes(q);
        const matchesAuthor = r.authorName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSha && !matchesAuthor) return false;
      }

      return true;
    });
  }, [activeTab, selectedType, searchQuery]);

  const handleDownloadPDF = (report: ReportItem) => {
    showToast(`Downloading certified PDF: ${report.title.slice(0, 36)}...`);
  };

  const handleExportCSV = (report: ReportItem) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'SHA,Report Title,Scope,Type,Generated,Frequency,Author,Role',
        `"${report.sha}","${report.title}","${report.scope}","${report.reportType}","${report.generatedDate}","${report.frequency}","${report.authorName}","${report.authorRole}"`,
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduPredict_${report.sha}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported CSV dataset for ${report.sha}.`);
  };

  const handleBulkDownload = () => {
    showToast('Packaging 5 institutional reports into compressed ZIP archive...');
  };

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerateModalOpen(false);
    showToast(`Report generated and indexed: "${newReportTitle || 'Executive Brief'}" (SHA: e8f4a102).`);
    setNewReportTitle('');
  };

  return (
    <div className="space-y-6 pb-14 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 bg-slate-900 text-white rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. Page Header & Actions                                 */}
      {/* ======================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Academic Intelligence Suite • Institutional Reporting Engine
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Reports &amp; Executive Dossiers
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Generate, schedule, and distribute audit-ready institutional retention dossiers, machine
            learning bias reports, and student cohort performance summaries.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <CalendarClock className="w-3.5 h-3.5 text-slate-500" />
            <span>Schedule Automated Dispatch</span>
          </button>

          <button
            type="button"
            onClick={() => setIsGenerateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Generate New Report</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Top Cohort Reporting Stat Cards (4 Cards)             */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Reports Generated */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              +12 this cycle
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
            Total Reports Generated
          </span>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">184</div>
          <span className="text-[11px] text-slate-500 font-medium">catalogued</span>
        </div>

        {/* Card 2: Scheduled Dispatches */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Sync</span>
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
            Scheduled Dispatches
          </span>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">6 Active</div>
          <span className="text-[11px] text-slate-500 font-medium">Every Monday 08:00 AM SIS sync</span>
        </div>

        {/* Card 3: Accreditations & Audits */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Audited Q4
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
            Accreditations &amp; Audits
          </span>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">100%</div>
          <span className="text-[11px] text-slate-500 font-medium">FERPA &amp; Title III Compliant</span>
        </div>

        {/* Card 4: Export Caseload */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Multi-Format
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
            Export Caseload
          </span>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">2.4 GB</div>
          <span className="text-[11px] text-slate-500 font-medium">PDF, CSV &amp; LaTeX summaries</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Category Tabs                                         */}
      {/* ======================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 text-xs font-semibold">
        {[
          { label: 'All Reports (184)', key: 'All Reports' },
          { label: 'Cohort Performance (48)', key: 'Cohort Performance' },
          { label: 'Retention & Risk Audits (62)', key: 'Retention & Risk Audits' },
          { label: 'ML Fairness & Bias Logs (21)', key: 'ML Fairness & Bias Logs' },
          { label: 'Executive Briefs (53)', key: 'Executive Briefs' },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-3.5 py-2 rounded-t-lg transition-colors cursor-pointer shrink-0 font-bold ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 4. Filter Toolbar & Search                               */}
      {/* ======================================================== */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by title, cohort, author, or SHA..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* Report Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-1.5 px-3 border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none"
            >
              <option value="All Types">Report Type: All Types</option>
              <option value="Retention & Risk">Retention &amp; Risk</option>
              <option value="ML Fairness & Bias">ML Fairness &amp; Bias</option>
              <option value="Executive Brief">Executive Brief</option>
              <option value="Cohort Performance">Cohort Performance</option>
            </select>

            {/* Date Range */}
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="py-1.5 px-3 border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none"
            >
              <option>Date Range: Fall 2024 Cycle</option>
              <option>Date Range: Spring 2024 Cycle</option>
              <option>Date Range: Full Academic Year 2023-24</option>
            </select>

            {/* Department */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="py-1.5 px-3 border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none"
            >
              <option>Dept: Engineering &amp; Computing</option>
              <option>Dept: Business &amp; Analytics</option>
              <option>Dept: Health &amp; Bio Sciences</option>
              <option>All University Departments</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleBulkDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <FileArchive className="w-3.5 h-3.5 text-slate-500" />
            <span>Bulk Download ZIP</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. Main Reports Table                                    */}
      {/* ======================================================== */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Report Title &amp; Scope</th>
                <th className="py-3 px-4 text-center">Report Type</th>
                <th className="py-3 px-4">Generated &amp; Frequency</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Title & Scope */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-xs hover:text-blue-600 cursor-pointer block">
                          {report.title}
                        </span>
                        <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                          SHA: {report.sha} • {report.scope}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Report Type */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        report.reportType === 'Retention & Risk'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : report.reportType === 'ML Fairness & Bias'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : report.reportType === 'Executive Brief'
                              ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {report.reportType}
                    </span>
                  </td>

                  {/* Generated & Frequency */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 text-xs block">
                      {report.generatedDate}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{report.frequency}</span>
                  </td>

                  {/* Author */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 text-xs block">
                      {report.authorName}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{report.authorRole}</span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDownloadPDF(report)}
                        className="px-2.5 py-1 text-xs border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md font-medium cursor-pointer"
                      >
                        PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExportCSV(report)}
                        className="px-2.5 py-1 text-xs border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md font-medium cursor-pointer"
                      >
                        CSV
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-800">5</span> of{' '}
            <span className="font-semibold text-slate-800">184</span> institutional reports
          </div>

          <div className="flex items-center gap-1">
            <span className="px-2 py-1 text-slate-400 font-medium text-xs">Prev</span>
            <button
              type="button"
              className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-2xs"
            >
              1
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold text-xs"
            >
              2
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold text-xs"
            >
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button
              type="button"
              className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold text-xs"
            >
              37
            </button>
            <span className="px-2 py-1 text-slate-600 hover:text-slate-900 font-medium text-xs cursor-pointer">
              Next
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. Executive Summary Snapshot (Active Preview)           */}
      {/* ======================================================== */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Executive Summary Snapshot
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                  Active Preview
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Fall 2024 Midterm Retention Health Diagnostic Dossier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => showToast('Generated Board Presentation PDF.')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download Formal Board Presentation (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Exporting full tabular dataset CSV...')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Full Tabular Data (CSV)</span>
            </button>
          </div>
        </div>

        {/* Content Split: 4 Metrics (Left) and Key Findings (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
          {/* Left: 4 Metric Cards (2x2 Grid) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
                Monitored Cohort
              </span>
              <div className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">1,250</div>
              <span className="text-[10px] text-slate-500 font-medium">100% active roster</span>
            </div>

            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/30">
              <span className="text-[10px] font-bold tracking-wider text-red-600 uppercase block">
                Flagged High Risk
              </span>
              <div className="text-2xl font-black text-red-600 tracking-tight mt-0.5">42</div>
              <span className="text-[10px] text-red-600 font-semibold">&Delta; 3.4% of total group</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
                Intervention Uptake
              </span>
              <div className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">88.4%</div>
              <span className="text-[10px] text-emerald-600 font-bold">&nearr; +5.2% vs baseline</span>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40">
              <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase block">
                Projected Uplift
              </span>
              <div className="text-2xl font-black text-blue-600 tracking-tight mt-0.5">+0.48</div>
              <span className="text-[10px] text-slate-600 font-medium">Cumulative GPA Shift</span>
            </div>
          </div>

          {/* Right: Key Diagnostic Findings */}
          <div className="lg:col-span-7 p-4 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Key Diagnostic Findings</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Confidence Level: 97.6% (p &lt; 0.01)
                </span>
              </div>

              {/* Bullet 1 */}
              <div className="flex items-start gap-2 text-xs leading-relaxed text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[11px]">
                  <span className="font-bold text-slate-900">
                    Automated early flags in Week 4
                  </span>{' '}
                  reduced projected midterm failure rate by{' '}
                  <span className="font-bold text-slate-900">22%</span> compared to Fall 2023
                  baseline.
                </p>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start gap-2 text-xs leading-relaxed text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[11px]">
                  Students attending{' '}
                  <span className="font-bold text-slate-900">&ge;3 advisor tutoring checkpoints</span>{' '}
                  exhibited{' '}
                  <span className="font-bold text-blue-700">94% retention stability</span> across
                  STEM prerequisite gateways.
                </p>
              </div>

              {/* Bullet 3 */}
              <div className="flex items-start gap-2 text-xs leading-relaxed text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[11px]">
                  <span className="font-bold text-slate-900">
                    No statistical demographic variance
                  </span>{' '}
                  detected across gender or first-generation student subgroups, maintaining perfect
                  parity threshold standards.
                </p>
              </div>
            </div>

            {/* Bottom Trajectory Sparkline and Provost verification */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-16 h-4">
                  <svg className="w-full h-full" viewBox="0 0 60 16">
                    <path
                      d="M 2,12 Q 20,10 35,4 T 58,2"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span className="font-bold text-slate-800 text-[10px]">
                  Trajectory Gradient: +14.2% Attrition Deflection
                </span>
              </div>
              <span className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                <span>Verified by Provost Office</span>
                <Check className="w-3 h-3 text-emerald-600" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 7. Generate New Report Modal                             */}
      {/* ======================================================== */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Generate Custom Report Dossier</h3>
                  <p className="text-[11px] text-slate-400">Institutional Audit &amp; Performance Digest</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGenerateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGenerateSubmit} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-of-Semester Retention Health Assessment"
                  value={newReportTitle}
                  onChange={(e) => setNewReportTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dossier Category</label>
                <select
                  value={newReportType}
                  onChange={(e) => setNewReportType(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 bg-white"
                >
                  <option value="Retention & Risk">Retention &amp; Risk Audits</option>
                  <option value="ML Fairness & Bias">ML Fairness &amp; Bias Logs</option>
                  <option value="Executive Brief">Executive Brief (Board of Trustees)</option>
                  <option value="Cohort Performance">Cohort Academic Performance</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Department Scope</label>
                <select className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 bg-white">
                  <option>University-wide Census (1,250 Students)</option>
                  <option>College of Engineering &amp; Computing</option>
                  <option>School of Business &amp; Analytics</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGenerateModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Compile &amp; Index
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. Schedule Dispatch Modal                               */}
      {/* ======================================================== */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Automated Dispatch Schedule</h3>
                  <p className="text-[11px] text-slate-400">Configure recurring email &amp; SIS digests</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Weekly Dean &amp; Chair Briefing</span>
                <span className="text-[11px] text-slate-500">Every Monday at 08:00 AM Eastern Time</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Bi-Weekly Model Bias Parity Audit</span>
                <span className="text-[11px] text-slate-500">Alternate Fridays at 17:00 PM</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsScheduleModalOpen(false);
                  showToast('Automated dispatch schedules updated.');
                }}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
