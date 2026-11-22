'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'INSTRUCTOR',
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Register Account</CardTitle>
          <p className="text-xs text-slate-500 mt-1">
            Join the academic advising and early intervention portal
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Institutional Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="ACADEMIC_ADVISOR">Academic Advisor</option>
                <option value="INSTRUCTOR">Faculty / Instructor</option>
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <p className="text-xs text-center text-slate-500 mt-4">
              Already registered?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
