import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '👩‍🏫 Teacher Management',
    href: '/dashboard',
  },
];

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

  useEffect(() => {
    fetch('/admin/teacher/count')
      .then(response => response.json())
      .then(data => setTeacherCount(data.teacherCount));
  }, []);

  if (teacherCount === null) {
    return (
      <div className="text-center py-10 text-lg font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen">

        {/* Top Cards: Total Teachers & Registered Teachers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Total Teachers Card */}
          <div className="bg-white border-l-4 border-teal-600 rounded-2xl shadow-sm p-6 transition hover:shadow-md">
            <h3 className="text-lg font-medium text-gray-700 tracking-wide mb-4">
              Total Teachers
            </h3>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 border-2 border-teal-600 text-teal-700 flex items-center justify-center text-3xl font-semibold rounded-lg">
                {totalTeachers}
              </div>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={increase}
                  className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-all"
                  aria-label="Increase total teachers"
                >
                  ↑
                </button>
                <button
                  onClick={decrease}
                  className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-all"
                  aria-label="Decrease total teachers"
                >
                  ↓
                </button>
              </div>
            </div>
          </div>

          {/* Registered Teachers Card */}
          <div className="bg-white border-l-4 border-sky-500 rounded-2xl shadow-sm p-6 transition hover:shadow-md">
            <h3 className="text-lg font-medium text-gray-700 tracking-wide mb-4">
              Registered Teachers
            </h3>
            <div className="flex items-center justify-start space-x-6">
              <div className="w-20 h-20 border-2 border-sky-500 text-sky-700 flex items-center justify-center text-3xl font-semibold rounded-full">
                {teacherCount}
              </div>
            </div>
            <Link href="/teacher_details">
              <button className="mt-6 w-full bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all">
                View Details
              </button>
            </Link>
          </div>
        </div>

        {/* Requests and Leave Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Leave Records */}
          <div className="bg-white border-l-4 border-amber-500 rounded-2xl shadow-sm p-6 transition hover:shadow-md">
            <h3 className="text-lg font-medium text-gray-700 tracking-wide mb-4">
              Leave Records
            </h3>
            <div className="w-20 h-20 border-2 border-amber-600 text-amber-700 flex items-center justify-center text-3xl font-semibold rounded-full">
              95
            </div>
            <Link href="/leave_details">
              <button className="mt-6 w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-all">
                Leave Details
              </button>
            </Link>
          </div>

          {/* Teacher Requests */}
          <div className="bg-white border-l-4 border-indigo-500 rounded-2xl shadow-sm p-6 transition hover:shadow-md">
            <h3 className="text-lg font-medium text-gray-700 tracking-wide mb-4">
              Teacher Requests
            </h3>
            <div className="flex flex-col space-y-4">
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

        {/* Attendance and Performance Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Attendance */}
          <div className="bg-white border-l-4 border-gray-400 rounded-2xl shadow-sm p-6 transition hover:shadow-md">
            <h3 className="text-lg font-medium text-gray-700 tracking-wide mb-3">
              Attendance
            </h3>
            <p className="text-gray-600">
              Monitor and manage daily teacher attendance.
            </p>
          </div>

          {/* Performance */}
          <div className="bg-white border-l-4 border-rose-500 rounded-2xl shadow-sm p-6 transition hover:shadow-md">
            <h3 className="text-lg font-medium text-gray-700 tracking-wide mb-3">
              Performance
            </h3>
            <p className="text-gray-600">
              Review and assess teacher performance metrics.
            </p>
          </div>
        </div>

        {/* Salary Section */}
        <div className="bg-white border-l-4 border-neutral-500 rounded-2xl shadow-sm p-6 transition hover:shadow-md">
          <h3 className="text-lg font-medium text-gray-700 tracking-wide mb-3">
            Salary & Compensation
          </h3>
          <p className="text-gray-600">
            View payroll details and manage compensations.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
  