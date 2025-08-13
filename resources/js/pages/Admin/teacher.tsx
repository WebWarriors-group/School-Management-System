import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '👩‍🏫 Teacher Management',
    href: '/dashboard',
  },
];

export default function AdminTeacherDashboard() {
  const [teacherCount, setTeacherCount] = useState<number | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState<number>(0);
  const [attendanceData, setAttendanceData] = useState([
    { name: 'Present', value: 0 },
    { name: 'Absent', value: 0 },
  ]);
  const [today, setToday] = useState('');

  useEffect(() => {
    fetch('/api/teacher-requests/count')
      .then(res => res.json())
      .then(data => setRequestCount(data.count || 0));

    fetch('/api/teacher-attendance-summary')
      .then(res => res.json())
      .then(summary => {
        setAttendanceData([
          { name: 'Present', value: summary.present },
          { name: 'Absent', value: summary.absent },
        ]);
        setToday(summary.date);
      });

    fetch('/admin/teacher/count')
      .then(response => response.json())
      .then(data => setTeacherCount(data.teacherCount));

    fetch('/api/teacher/today-leave-count')
      .then(res => res.json())
      .then(data => setLeaveCount(data.count))
      .catch(() => setLeaveCount(0));
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <header className="sticky top-15 w-full border-b z-50 p-4 shadow-sm bg-white">
        <div className="max-w-5xl mx-auto px-6 text-blue-600 md:text-lg">
          Teachers' Attendance, Leave Requests & Management Overview
        </div>
      </header>

      <div className="flex flex-col gap-10 px-8 py-10 bg-gray-200 min-h-screen">
        
        {/* ===== Top Section: Quick Stats ===== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Attendance */}
          <div className="bg-white border border-blue-100 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📋 Attendance Summary</h3>
            <p className="text-sm text-gray-500 mb-4">Date: <span className="font-semibold">{today}</span></p>
            <div className="w-full h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={attendanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    <Cell fill="#2563EB" />
                    <Cell fill="#DC2626" />
                  </Pie>
                  <Tooltip formatter={(value) => `${value} Teachers`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Link href="/admin/teacher-attendance">
              <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Manage Attendance
              </button>
            </Link>
          </div>

          {/* Requests */}
          <div className="bg-white border border-indigo-200 shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between">
            <h3 className="text-xl font-semibold flex justify-between">
              📥 Teacher Requests
              {requestCount > 0 && (
                <span className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-full">
                  {requestCount}
                </span>
              )}
            </h3>
            <Link href="/teacher_requests" className="mt-6">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                View Requests
              </button>
            </Link>
          </div>

          {/* Registered Teachers */}
          <div className="bg-white border border-slate-200 shadow-md p-6 hover:shadow-lg transition flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">👩‍🏫 Registered Teachers</h3>
            <div className="w-24 h-24 border-4 border-blue-500 text-blue-700 flex items-center justify-center text-4xl font-bold rounded-full">
              {teacherCount}
            </div>
            <Link href="/teacher-info" className="w-full mt-6">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                View Details
              </button>
            </Link>
          </div>

          {/* Leave Records */}
          <div className="bg-white border border-yellow-200 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">📅 Leave Records</h3>
            <div className="w-24 h-24 mx-auto border-4 border-yellow-400 text-yellow-600 flex items-center justify-center text-4xl font-bold rounded-full">
              {leaveCount}
            </div>
            <Link href="teacher-leave-requests">
              <button className="mt-6 w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                View Leave Requests
              </button>
            </Link>
          </div>
        </div>

        {/* ===== Management Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Training */}
          <div className="bg-white border border-rose-200 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">📚 Training & Development</h3>
            <p className="text-gray-600 mb-4">Plan workshops and track teacher training progress.</p>
            <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              Schedule Training
            </button>
          </div>

          {/* Salary */}
          <div className="bg-white border border-gray-300 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">💰 Salary & Compensation</h3>
            <p className="text-gray-600 mb-4">View payroll details and manage compensations.</p>
            <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Manage Salary
            </button>
          </div>

          {/* Direct Communication */}
          <div className="bg-white border border-gray-300 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">📧 Direct Communication</h3>
            <p className="text-gray-600 mb-4">Send announcements or personal messages to teachers.</p>
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Send Message
            </button>
          </div>

          {/* Announcements */}
          <div className="bg-white border border-gray-300 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">📢 Announcements</h3>
            <p className="text-gray-600 mb-4">Post updates for all teachers.</p>
            <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
              Manage Announcements
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
