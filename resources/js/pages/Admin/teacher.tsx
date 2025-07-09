import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs'; 

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '👩‍🏫 Teacher Management',
    href: '/dashboard',
  },
];
const COLORS = ['#2563EB', '#DC2626']; // Present: blue-600, Absent: red-600

export default function AdminTeacherDashboard() {
  const [teacherCount, setTeacherCount] = useState<number | null>(null);
   const [totalTeachers, setTotalTeachers] = useState<number>(() => {
    const saved = localStorage.getItem('totalTeachers');
    return saved ? parseInt(saved) : 0;
  });

  const increase = () => {
    const updated = totalTeachers + 1;
    setTotalTeachers(updated);
    localStorage.setItem('totalTeachers', updated.toString());
  };

  const decrease = () => {
    const updated = totalTeachers > 0 ? totalTeachers - 1 : 0;
    setTotalTeachers(updated);
    localStorage.setItem('totalTeachers', updated.toString());
  };
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // Fetch the count of teacher requests from your backend API endpoint
    fetch('/api/teacher-requests/count')
      .then(res => res.json())
      .then(data => {
        setRequestCount(data.count || 0);
      });
  }, []);


  const [data, setData] = useState([
    { name: 'Present', value: 0 },
    { name: 'Absent', value: 0 },
  ]);
  const [today, setToday] = useState('');

  useEffect(() => {
    fetch('/api/teacher-attendance-summary')
      .then(res => res.json())
      .then(summary => {
        setData([
          { name: 'Present', value: summary.present },
          { name: 'Absent', value: summary.absent },
        ]);
        setToday(summary.date);
      });
  }, []);

  useEffect(() => {
    fetch('/admin/teacher/count')
      .then(response => response.json())
      .then(data => setTeacherCount(data.teacherCount));
  }, []);
const [leaveCount, setLeaveCount] = useState<number>(0);

  useEffect(() => {
    fetch('/api/teacher/today-leave-count')
      .then(res => res.json())
      .then(data => setLeaveCount(data.count))
      .catch(() => setLeaveCount(0));
  }, []);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-10 px-8 py-10 bg-gray-50 min-h-screen">
  {/* Section: Attendance and Registered Teachers */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    
    {/* Attendance Summary */}
    <div className="bg-white border border-blue-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">📋 Attendance Summary</h3>
      <p className="text-sm text-gray-500 mb-4">
        Date: <span className="font-semibold">{today}</span>
      </p>
      <div className="w-full h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              //label={({ name, value }) => `${name}: ${value}`}
            >
              <Cell fill="#2563EB" /> {/* Blue for Present */}
              <Cell fill="#DC2626" /> {/* Red for Absent */}
            </Pie>
            <Tooltip formatter={(value) => `${value} Teachers`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <Link href="/admin/teacher-attendance">
        <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
          Manage Attendance
        </button>
      </Link>
    </div>

    {/* Teacher Requests */}
   <div className="bg-white border border-indigo-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex-grow">📥 Teacher Requests</h3>
        {requestCount > 0 && (
          <span className="ml-3 inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-full">
            {requestCount}
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-4 mt-auto">
        <Link href="/teacher_requests">
          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all">
            View Requests
          </button>
        </Link>
        <Link href="/add-teacher">
          <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-all">
            Add Teacher
          </button>
        </Link>
      </div>
    </div>

    
</div>
  {/* Section: Leave and Requests */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

    {/* Registered Teachers */}
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between items-center">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 w-full text-left">
    👩‍🏫 Registered Teachers
  </h3>

  <div className="flex items-center justify-center flex-grow">
    <div className="w-24 h-24 border-4 border-blue-500 text-blue-700 flex items-center justify-center text-4xl font-bold rounded-full">
      {teacherCount}
    </div>
  </div>

  <Link href="/teacher-info" className="w-full">
    <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
      View Details
    </button>
  </Link>
</div>
    
    {/* Leave Records */}
    <div className="bg-white border border-yellow-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">📅 Leave Records</h3>
      <div className="w-24 h-24 mx-auto border-4 border-yellow-400 text-yellow-600 flex items-center justify-center text-4xl font-bold rounded-full">
        {leaveCount}
      </div>
      <Link href="teacher-leave-requests">
        <button className="mt-6 w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-all">
          View Leave Requests
        </button>
      </Link>
    </div>

    
  </div>

  {/* Section: Performance and Salary */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Performance */}
    <div className="bg-white border border-rose-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">📊 Performance</h3>
      <p className="text-gray-600 mb-4">
        Review and assess teacher performance metrics.
      </p>
      <button className="w-full bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-all">
        View Performance
      </button>
    </div>

    {/* Salary & Compensation */}
    <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">💰 Salary & Compensation</h3>
      <p className="text-gray-600">
        View payroll details and manage compensations.
      </p>
    </div>
  </div>
</div>

    </AppLayout>
  );
}
