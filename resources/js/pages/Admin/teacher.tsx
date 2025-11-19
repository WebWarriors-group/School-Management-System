import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const breadcrumbs: BreadcrumbItem[] = [
  { title: '👩‍🏫 Teacher Management', href: '/dashboard' },
];
const COLORS = ['#2563EB', '#DC2626']; // Present: blue, Absent: red

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
  }, []);

  useEffect(() => {
    fetch('/api/teacher-attendance-summary')
      .then(res => res.json())
      .then(summary => {
        if (summary.present + summary.absent > 0) {
          setAttendanceData([
            { name: 'Present', value: summary.present },
            { name: 'Absent', value: summary.absent },
          ]);
        }
        setToday(summary.date);
      });
  }, []);

  useEffect(() => {
    fetch('/admin/teacher/count')
      .then(res => res.json())
      .then(data => setTeacherCount(data.teacherCount));
  }, []);

  useEffect(() => {
    fetch('/api/teacher/today-leave-count')
      .then(res => res.json())
      .then(data => setLeaveCount(data.count))
      .catch(() => setLeaveCount(0));
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="px-8 py-10 bg-gray-200 min-h-screen flex flex-col gap-10">

        {/* Attendance Section */}
        <div className="flex justify-center">
          <div className="bg-white border border-blue-100 rounded-2xl shadow-md p-8 w-full max-w-md text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">📋 Attendance Summary</h3>
            <p className="text-sm text-gray-500 mb-6">
              Date: <span className="font-semibold">{today || dayjs().format('YYYY-MM-DD')}</span>
            </p>
            
            {attendanceData[0].value + attendanceData[1].value > 0 ? (
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                    >
                      <Cell fill="#2563EB" />
                      <Cell fill="#DC2626" />
                    </Pie>
                    <Tooltip formatter={(value) => `${value} Teachers`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-400 mt-12 text-lg">No attendance marked yet today</p>
            )}
            
            <Link href="/admin/teacher-attendance">
              <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
                Manage Attendance
              </button>
            </Link>
          </div>
        </div>

        {/* Other Sections: Teachers, Requests, Leaves */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Registered Teachers */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 w-full text-center">👩‍🏫 Registered Teachers</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 border-4 border-blue-500 text-blue-700 flex items-center justify-center text-3xl font-bold rounded-full">
                {teacherCount ?? 0}
              </div>
            </div>
            <Link href="/teacher-info" className="w-full">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
                View Details
              </button>
            </Link>
          </div>

          {/* Teacher Requests */}
          <div className="bg-white border border-indigo-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 w-full text-center">📥 Teacher Requests</h3>
            {requestCount > 0 && (
              <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-full mb-4">
                {requestCount} Pending
              </span>
            )}
            <Link href="/teacher_requests" className="w-full mt-auto">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all">
                View Requests
              </button>
            </Link>
          </div>

          {/* Leave Records */}
          <div className="bg-white border border-yellow-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 w-full text-center">📅 Leave Records</h3>
            <div className="w-20 h-20 border-4 border-yellow-400 text-yellow-600 flex items-center justify-center text-3xl font-bold rounded-full mb-4">
              {leaveCount}
            </div>
            <Link href="teacher-leave-requests" className="w-full mt-auto">
              <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-all">
                View Leave Requests
              </button>
            </Link>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
