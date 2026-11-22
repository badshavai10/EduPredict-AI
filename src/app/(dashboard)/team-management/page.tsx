'use client';

import React, { useState, useMemo } from 'react';
import {
  Building,
  Check,
  CheckCircle2,
  Download,
  GraduationCap,
  Key,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  email: string;
  facultyId: string;
  role: string;
  roleScopeCategory: 'admin' | 'chair' | 'advisor' | 'ta' | 'dean';
  department: string;
  division: string;
  caseloadNumber: string;
  caseloadTag: string;
  caseloadColor: 'blue' | 'green';
  securityMethod: string;
  securityEnforcedText: string;
  lastActivity: string;
  sessionIp: string;
  isActiveNow?: boolean;
}

const mockTeam: TeamMember[] = [
  {
    id: 'usr-01',
    name: 'Dr. Aris Thorne',
    initials: 'AT',
    email: 'a.thorne@university.edu',
    facultyId: 'FAC-3821',
    role: 'Chief Admin / Model Auditor',
    roleScopeCategory: 'admin',
    department: 'Office of Academic Success',
    division: 'Provost Division',
    caseloadNumber: '50 Students',
    caseloadTag: 'Lead',
    caseloadColor: 'blue',
    securityMethod: 'Okta Verify',
    securityEnforcedText: '[Hardware Key]',
    lastActivity: 'Active now',
    sessionIp: 'IP: 192.168.1.42',
    isActiveNow: true,
  },
  {
    id: 'usr-02',
    name: 'Prof. Sarah Jenkins',
    initials: 'SJ',
    email: 's.jenkins@university.edu',
    facultyId: 'FAC-4102',
    role: 'Department Chair',
    roleScopeCategory: 'chair',
    department: 'Mechanical & Civil Engineering',
    division: 'College of Engineering',
    caseloadNumber: '162 Students',
    caseloadTag: 'Dept. Scope',
    caseloadColor: 'blue',
    securityMethod: 'SMS 2FA Enabled',
    securityEnforcedText: '',
    lastActivity: '18 mins ago',
    sessionIp: 'Session 49811-PAC',
  },
  {
    id: 'usr-03',
    name: 'Michael Chen, M.Ed.',
    initials: 'MC',
    email: 'm.chen@university.edu',
    facultyId: 'ADV-1896',
    role: 'Senior Academic Advisor',
    roleScopeCategory: 'advisor',
    department: 'College of Science & Computing',
    division: 'Undergraduate Advising',
    caseloadNumber: '34 Students',
    caseloadTag: 'Assigned',
    caseloadColor: 'green',
    securityMethod: 'Okta Push',
    securityEnforcedText: '[Enforced]',
    lastActivity: '1 hour ago',
    sessionIp: 'Case note authored',
  },
  {
    id: 'usr-04',
    name: 'Elena Rostova',
    initials: 'ER',
    email: 'e.rostova@campus.edu',
    facultyId: 'TA-4902',
    role: 'TA / Peer Mentor',
    roleScopeCategory: 'ta',
    department: 'Computer Science',
    division: 'Junior & Senior Labs',
    caseloadNumber: '12 Students',
    caseloadTag: 'Tutoring',
    caseloadColor: 'blue',
    securityMethod: 'Authenticator App',
    securityEnforcedText: '',
    lastActivity: '3 hours ago',
    sessionIp: 'Attendance synced',
  },
  {
    id: 'usr-05',
    name: 'Dr. David Vance',
    initials: 'DV',
    email: 'd.vance@university.edu',
    facultyId: 'ADM-5831',
    role: 'Dean of Student Affairs',
    roleScopeCategory: 'dean',
    department: 'University Executive Board',
    division: 'Student Success Taskforce',
    caseloadNumber: 'All Cohorts',
    caseloadTag: 'Executive Read-only',
    caseloadColor: 'blue',
    securityMethod: 'Duo Security',
    securityEnforcedText: '[Enforced]',
    lastActivity: 'Yesterday at 17:15',
    sessionIp: 'Board export created',
  },
];

export default function TeamManagementPage() {
  const [activeTab, setActiveTab] = useState<
    'All Users' | 'Active' | 'Pending Invite' | 'Suspended'
  >('All Users');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedAccess, setSelectedAccess] = useState('Access: Active Personnel');
  const [selectedMfa, setSelectedMfa] = useState('MFA: Enforced');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Academic Advisor');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredTeam = useMemo(() => {
    return mockTeam.filter((member) => {
      if (selectedRole !== 'All Roles' && !member.role.includes(selectedRole)) {
        return false;
      }

      if (
        selectedDept !== 'All Departments' &&
        !member.department.includes(selectedDept) &&
        !member.division.includes(selectedDept)
      ) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = member.name.toLowerCase().includes(q);
        const matchesEmail = member.email.toLowerCase().includes(q);
        const matchesId = member.facultyId.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesId) return false;
      }

      return true;
    });
  }, [selectedRole, selectedDept, searchQuery]);

  const handleExportAuditCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'User Name,Faculty ID,Email,Role,Department,Caseload,Security Method,Last Activity',
        ...filteredTeam.map(
          (m) =>
            `"${m.name}","${m.facultyId}","${m.email}","${m.role}","${m.department}","${m.caseloadNumber}","${m.securityMethod}","${m.lastActivity}"`
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduPredict_FERPA_Audit_Log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Exported FERPA compliance access audit log CSV.');
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviteModalOpen(false);
    showToast(`Invitation sent to ${inviteEmail} with ${inviteRole} permissions.`);
    setInviteName('');
    setInviteEmail('');
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
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Team &amp; User Access Governance
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Manage academic advisors, faculty mentors, department chairs, and system administrators
            with granular FERPA data visibility protocols.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={handleExportAuditCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Audit Log (CSV)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-white" />
            <span>+ Invite Academic Personnel</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Top Cohort Reporting Stat Cards (4 Cards)             */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Platform Directory */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Platform Directory
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">38</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Okta &amp; Active Directory SSO Synced
          </span>
        </div>

        {/* Card 2: Academic Advisors */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Academic Advisors
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">18</span>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              47.4% staff
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Avg. caseload: 29 students/advisor
          </span>
        </div>

        {/* Card 3: Faculty & Chairs */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Faculty &amp; Chairs
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">14</span>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              9 Departments
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Read/Intervene Departmental Access
          </span>
        </div>

        {/* Card 4: Admins & ML Auditors */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Admins &amp; ML Auditors
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Key className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">6</span>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Tier 0 / Super
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Full Pipeline &amp; Threshold Governance
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Filter Toolbar & Tabs                                 */}
      {/* ======================================================== */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or faculty ID..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="py-1.5 px-3 border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none"
            >
              <option value="All Roles">All Roles</option>
              <option value="Admin">Chief Admin / Auditors</option>
              <option value="Chair">Department Chairs</option>
              <option value="Advisor">Academic Advisors</option>
              <option value="TA">TA / Peer Mentors</option>
              <option value="Dean">Deans</option>
            </select>

            {/* Department */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="py-1.5 px-3 border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none"
            >
              <option value="All Departments">All Departments</option>
              <option value="Academic Success">Academic Success</option>
              <option value="Engineering">Engineering</option>
              <option value="Science & Computing">Science &amp; Computing</option>
              <option value="Executive Board">Executive Board</option>
            </select>

            {/* Access Status */}
            <select
              value={selectedAccess}
              onChange={(e) => setSelectedAccess(e.target.value)}
              className="py-1.5 px-3 border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none"
            >
              <option>Access: Active Personnel</option>
              <option>Access: All Records</option>
              <option>Access: Suspended Only</option>
            </select>

            {/* MFA Status */}
            <select
              value={selectedMfa}
              onChange={(e) => setSelectedMfa(e.target.value)}
              className="py-1.5 px-3 border border-slate-200 rounded-lg text-slate-700 bg-white font-medium focus:outline-none"
            >
              <option>MFA: Enforced</option>
              <option>MFA: Hardware Token</option>
              <option>MFA: Software Authenticator</option>
            </select>
          </div>
        </div>

        {/* Tab row with live FERPA indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('All Users')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'All Users'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Users (38)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Active')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeTab === 'Active'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Active (35)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Pending Invite')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeTab === 'Pending Invite'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Pending Invite (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Suspended')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeTab === 'Suspended'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Suspended (0)
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>FERPA Compliant Logging On</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Team Table                                            */}
      {/* ======================================================== */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">User &amp; Identity</th>
                <th className="py-3 px-4 text-center">Role &amp; Scope</th>
                <th className="py-3 px-4">Department &amp; College</th>
                <th className="py-3 px-4 text-center">Active Caseload</th>
                <th className="py-3 px-4">Security &amp; MFA</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredTeam.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* User & Identity */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0 border border-blue-800">
                        {member.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs">{member.name}</span>
                          {member.isActiveNow && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          )}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          {member.email} • ID: {member.facultyId}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role & Scope */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                        member.roleScopeCategory === 'admin'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : member.roleScopeCategory === 'chair'
                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                            : member.roleScopeCategory === 'advisor'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : member.roleScopeCategory === 'ta'
                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                : 'bg-purple-50 text-purple-800 border-purple-200'
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>

                  {/* Department & College */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-800 text-xs block">
                      {member.department}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{member.division}</span>
                  </td>

                  {/* Active Caseload */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs">
                        {member.caseloadNumber}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          member.caseloadColor === 'green'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {member.caseloadTag}
                      </span>
                    </div>
                  </td>

                  {/* Security & MFA */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800 text-xs">
                        {member.securityMethod}
                      </span>
                      {member.securityEnforcedText && (
                        <span className="text-[10px] text-slate-400">
                          {member.securityEnforcedText}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Last Activity */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      {member.isActiveNow && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      )}
                      <span
                        className={`font-semibold text-xs ${
                          member.isActiveNow ? 'text-emerald-700' : 'text-slate-800'
                        }`}
                      >
                        {member.lastActivity}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                      {member.sessionIp}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        showToast(`Managing RBAC permissions for ${member.name}.`)
                      }
                      className="text-blue-600 hover:text-blue-800 font-semibold hover:underline cursor-pointer"
                    >
                      Edit / Permissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-800">1 to 5</span> of{' '}
            <span className="font-semibold text-slate-800">38</span> registered faculty and
            personnel
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
              8
            </button>
            <span className="px-2 py-1 text-slate-600 hover:text-slate-900 font-medium text-xs cursor-pointer">
              Next
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. Bottom Section: RBAC & FERPA Policy Enforcement       */}
      {/* ======================================================== */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Role-Based Access Control (RBAC) &amp; FERPA Policy Enforcement
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Strict isolation guidelines mapped to Family Educational Rights and Privacy Act
                (FERPA) regulations.
              </p>
            </div>
          </div>

          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ACTIVE GUARDRAIL MATRIX V4.2</span>
          </span>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Tier 1: Operations */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                  Tier 1 • Operations
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  Cohort Limited
                </span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-xs">
                Advisor / Faculty Mentors
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Direct student-level interaction rights with strict pseudonymization for
                non-caseload profiles.
              </p>

              <div className="space-y-1.5 pt-2 text-[11px] text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Student Risk Roster (Direct Caseload)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Intervention Log &amp; Meeting Scheduler</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Automated Behavioral Nudge Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Qualitative Advising Case Notes</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Scope: Assigned Cohort Only</span>
              <span className="font-bold text-blue-700">Read / Write</span>
            </div>
          </div>

          {/* Tier 2: Leadership */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                  Tier 2 • Leadership
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  Departmental
                </span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-xs">
                Department Chairs &amp; Deans
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Longitudinal aggregate insights and staff performance tracking across colleges and
                majors.
              </p>

              <div className="space-y-1.5 pt-2 text-[11px] text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Aggregated Cohort Risk Analytics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Model Performance &amp; Bias Benchmarks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Long-term Attrition Forecasting</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Advisor Workload &amp; Response Times</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Scope: All Department Students</span>
              <span className="font-bold text-blue-700">Read Only (Aggregated)</span>
            </div>
          </div>

          {/* Tier 0: Engineering */}
          <div className="p-4 rounded-xl border border-red-200 bg-red-50/20 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-red-600 uppercase tracking-wider">
                  Tier 0 • Engineering
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800">
                  Super-Admin
                </span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-xs">
                System Admin &amp; ML Auditors
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Full control over training data ingress, model thresholds, external integrations,
                and FERPA logs.
              </p>

              <div className="space-y-1.5 pt-2 text-[11px] text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>CSV Ingestion &amp; Schema Mapping</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Algorithm Tuning &amp; Risk Thresholds</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Webhook APIs &amp; SIS Integrations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>System-Wide FERPA Audit Trail &amp; Logs</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-red-200 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Scope: Entire Institution &amp; Models</span>
              <span className="font-bold text-red-700">Root Privilege</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. Invite Academic Personnel Modal                       */}
      {/* ======================================================== */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Invite Academic Personnel</h3>
                  <p className="text-[11px] text-slate-400">Provision RBAC &amp; FERPA access credentials</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty / Staff Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rebecca Vance"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institutional Email (.edu)</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. r.vance@university.edu"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Portal Role Scope</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 bg-white"
                >
                  <option value="Academic Advisor">Academic Advisor (Tier 1)</option>
                  <option value="Department Chair">Department Chair (Tier 2)</option>
                  <option value="TA / Peer Mentor">TA / Peer Mentor (Tier 1 Limited)</option>
                  <option value="System Admin">System Admin / Model Auditor (Tier 0)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
