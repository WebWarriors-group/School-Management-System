import React, { useState } from 'react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

import PieChart from '@/components/PieChart';  // import the reusable pie chart

interface StudentsPerClass {
  class_id: number;
  total: number;
  class: {
    name: string;
  };
}

interface AvgByClass {
  class_id: number;
  avg_marks: number;
  class: {
    name: string;
  };
}

interface Props extends PageProps {
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  studentsPerClass: StudentsPerClass[];
  avgByClass: AvgByClass[];
}

export default function OverallPerformance({
  auth,
  totalStudents,
  maleStudents,
  femaleStudents,
  studentsPerClass,
  avgByClass,
}: Props) {
  const [showTotalStudentsDetails, setShowTotalStudentsDetails] = useState(false);
  const [showAverageScoreDetails, setShowAverageScoreDetails] = useState(false);

  const genderData = [
    { gender: 'Male', count: maleStudents },
    { gender: 'Female', count: femaleStudents },
  ];

  // === Total Students Detail View ===
  if (showTotalStudentsDetails) {
    return (
      <AppLayout user={auth.user}>
        <Head title="Total Students Details" />
        <div className="py-6 px-8 max-w-4xl mx-auto">
          <button
            onClick={() => setShowTotalStudentsDetails(false)}
            className="mb-4 px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-200"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold mb-6">Total Students - Class-wise Breakdown</h1>

          <div className="bg-white border rounded shadow p-4 mb-8">
            <ul>
              {studentsPerClass.map((item, idx) => (
                <li key={idx} className="flex justify-between py-2 border-b last:border-b-0">
                  <span>{item.class?.name ?? `Class ${item.class_id}`}</span>
                  <span>{item.total}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border rounded shadow p-4 mb-8">
            <h2 className="text-xl font-semibold mb-4">Student Count by Class (Chart)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentsPerClass} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class.name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value: number) => [`${value} students`, 'Count']} />
                <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Gender Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={genderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gender" />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value: number) => [`${value} students`, 'Count']} />
                <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </AppLayout>
    );
  }

  // === Average Class Score Detail View with Pie Chart ===
  if (showAverageScoreDetails) {
    // Prepare labels and values for PieChart
    const labels = avgByClass.map((item) => item.class?.name ?? `Class ${item.class_id}`);
    const values = avgByClass.map((item) => item.avg_marks);

    return (
      <AppLayout user={auth.user}>
        <Head title="Average Class Scores" />
        <div className="py-6 px-8 max-w-4xl mx-auto">
          <button
            onClick={() => setShowAverageScoreDetails(false)}
            className="mb-4 px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-200"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold mb-6">Average Class Scores</h1>

          <div className="bg-white border rounded shadow p-4 mb-8">
            <ul>
              {avgByClass.map((item, idx) => (
                <li key={idx} className="flex justify-between py-2 border-b last:border-b-0">
                  <span>{item.class?.name ?? `Class ${item.class_id}`}</span>
                  <span>{item.avg_marks.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Average Marks by Class (Pie Chart)</h2>
            <div style={{ width: '100%', height: 350 }}>
              <PieChart labels={labels} values={values} />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // === Overview Dashboard ===
  return (
    <AppLayout user={auth.user}>
      <Head title="Overall Performance" />
      <div className="py-6 px-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📊 Overall Performance Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Total Students Card */}
          <div
            className="bg-blue-100 p-4 rounded-lg shadow cursor-pointer flex flex-col"
            onClick={() => setShowTotalStudentsDetails(true)}
          >
            <h2 className="text-lg font-semibold text-gray-800">Total Students</h2>
            <p className="text-3xl font-bold text-blue-600 mb-2">{totalStudents}</p>
            <div style={{ width: '100%', height: 100 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentsPerClass} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <XAxis dataKey="class.name" hide />
                  <YAxis hide />
                  <Tooltip formatter={(value: number) => [`${value} students`, 'Count']} />
                  <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Average Score Card */}
          <div
            className="bg-green-100 p-4 rounded-lg shadow cursor-pointer"
            onClick={() => setShowAverageScoreDetails(true)}
          >
            <h2 className="text-lg font-semibold text-gray-800">Average Class Score</h2>
            <p className="text-3xl font-bold text-green-600">View</p>
          </div>

          {/* Placeholder Cards */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Top Performing Class</h2>
            <p className="text-3xl font-bold text-yellow-600">–</p>
          </div>

          <div className="bg-indigo-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Best Subject</h2>
            <p className="text-3xl font-bold text-indigo-600">–</p>
          </div>

          <div className="bg-pink-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Grade A+ Students</h2>
            <p className="text-3xl font-bold text-pink-600">–</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
