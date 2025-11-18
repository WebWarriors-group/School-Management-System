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
const isEmpty = attendanceData[0].value === 0 && attendanceData[1].value === 0;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <header className="sticky top-15 w-full border-b z-50 p-4 shadow-sm bg-white">
        <div className="max-w-5xl mx-auto px-6 text-blue-600 md:text-lg">
          Teachers' Attendance, Leave Requests & Management Overview
        </div>
      </header>
{/* ======= ATTENDANCE SUMMARY (Centered + Smaller) ======= */}
<div className="w-full flex justify-center mt-10">
  <div className="bg-white rounded-xl shadow-md border p-6 w-full max-w-md text-center">

    <h3 className="text-xl font-semibold mb-2">📋 Attendance Summary</h3>
    <p className="text-gray-600 mb-4">
      Date: <span className="font-semibold">{today}</span>
    </p>

    {isEmpty ? (
  <p className="text-gray-500 text-sm mt-6">Attendance data not available yet</p>
) : (
  <div className="w-full h-56 mx-auto flex justify-center items-center">
    <ResponsiveContainer width="85%" height="100%">
      <PieChart>
        <Pie data={attendanceData} dataKey="value" cx="50%" cy="50%" outerRadius={70}>
          <Cell fill="#2563EB" />
          <Cell fill="#DC2626" />
        </Pie>
        <Tooltip formatter={(value) => `${value} Teachers`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
)}


    <Link href="/admin/teacher-attendance">
      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Manage Attendance
      </button>
    </Link>

  </div>
</div>


      {/* ======= ACTION CARDS SECTION ======= */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

  {/* Registered Teachers Card */}
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center text-center gap-4">
    <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-3xl">
      👩‍🏫
    </div>
    <h3 className="text-xl font-semibold">Registered Teachers</h3>
    <div className="text-4xl font-bold text-blue-700">{teacherCount}</div>
    <Link href="/teacher-info" className="w-full">
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        View Teachers
      </button>
    </Link>
  </div>

  {/* Teacher Requests Card */}
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center text-center gap-4">
    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full text-3xl">
      📥
    </div>
    <h3 className="text-xl font-semibold">Teacher Requests</h3>

    {requestCount > 0 && (
      <div className="px-4 py-1 bg-red-600 text-white text-sm rounded-full">
        {requestCount} Pending
      </div>
    )}

    <div className="flex flex-col gap-3 w-full">
      <Link href="/teacher_requests">
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
          Add Request
        </button>
      </Link>
      {/* <Link href="/teacher-leave-requests">
        <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">
          Leave Requests
        </button>
      </Link> */}
    </div>
  </div>

  {/* Leave Today Card */}
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center text-center gap-4">
    <div className="w-16 h-16 bg-amber-100 text-amber-600 flex items-center justify-center rounded-full text-3xl">
      🏝️
    </div>
    <h3 className="text-xl font-semibold">Leave Today</h3>
    <div className="text-4xl font-bold text-amber-600">{leaveCount}</div>
    <Link href="/teacher-leave-requests" className="w-full">
      <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700">
        View Leave Records
      </button>
    </Link>
  </div>

</div>


    </AppLayout>
  );
}