import React, { useState } from 'react';
import { BreadcrumbItem, PageProps } from '@/types';
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
import PieChart from '@/components/PieChart';

interface StudentsPerClass {
  class_id: number;
  total: number;
  class: { name: string };
}

interface AvgByClass {
  class_id: number;
  avg_marks: number;
  class: { name: string };
}

interface AvgBySubject {
  subject_id: number;
  avg_marks: number;
  subject_name: string;
}

interface Props extends PageProps {
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  studentsPerClass: StudentsPerClass[];
  avgByClass: AvgByClass[];
  avgBySubject: AvgBySubject[];
}

export default function OverallPerformance({
  auth,
  totalStudents,
  maleStudents,
  femaleStudents,
  studentsPerClass,
  avgByClass,
  avgBySubject,
}: Props) {
  const [showTotalStudentsDetails, setShowTotalStudentsDetails] = useState(false);
  const [showAverageScoreDetails, setShowAverageScoreDetails] = useState(false);
  const [showSubjectAverageDetails, setShowSubjectAverageDetails] = useState(false);
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: ' 📊 Overall Performance Overview',
    href: '/',
  },
];
  const genderData = [
    { gender: 'Male', count: maleStudents },
    { gender: 'Female', count: femaleStudents },
  ];

  const bestSubject = avgBySubject.reduce((top, current) =>
    current.avg_marks > top.avg_marks ? current : top,
    avgBySubject[0]
  );

  // === Total Students Detail View ===
  if (showTotalStudentsDetails) {
    return (
      <AppLayout user={auth.user}>
        <Head title="Total Students Details" />
        <main className='flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200 item-center '>
        <div className="py-6 px-8 max-w-4xl mx-auto">
          <button
            onClick={() => setShowTotalStudentsDetails(false)}
            className="mb-4 px-14 py-2 rounded bg-yellow-400 hover:bg-yellow-200"
          >
            ← Back
          </button>
          <h1 className="text-xl text-white bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-bold mb-6 w-150">TOTAL STUDENTS - CLASS-WISE BREAKDOWN</h1>
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
              <BarChart data={studentsPerClass}>
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
            <ResponsiveContainer width="50%" height={250}>
              <BarChart data={genderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gender" />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value: number) => [`${value} students`, 'Count']} />
                <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
         </main>
      </AppLayout>
    );
  }

  // === Average Class Score Detail View ===
  if (showAverageScoreDetails) {
    const labels = avgByClass.map(item => item.class?.name ?? `Class ${item.class_id}`);
    const values = avgByClass.map(item => item.avg_marks);

    return (
      <AppLayout user={auth.user}>
        <Head title="Average Class Scores" />
        <main className='flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200 item-center '>

        <div className="py-6 px-8 max-w-10-xl mx-auto">
          <button
            onClick={() => setShowAverageScoreDetails(false)}
            className="mb-4 px-12 py-2 rounded bg-yellow-400 hover:bg-yellow-200"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-6">Average Class Scores</h1>
          <div className="bg-white border rounded shadow p-4 mb-8 w-200">
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
        </main>
      </AppLayout>
    );
  }

  // === Average Subject Score Detail View ===
  if (showSubjectAverageDetails) {
    const labels = avgBySubject.map(item => item.subject_name);
    const values = avgBySubject.map(item => item.avg_marks);

    return (
      <AppLayout user={auth.user}>
        <Head title="Average Subject Scores" />
        <main className='flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200 item-center '>

        <div className="py-6 px-8 max-w-4xl mx-auto">
          <button
            onClick={() => setShowSubjectAverageDetails(false)}
            className="mb-4 px-12 py-1 rounded bg-yellow-400 hover:bg-yellow-200"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-6">Average Subject Scores</h1>
          <div className="bg-white w-200 border rounded shadow p-4 mb-8">
            <ul>
              {avgBySubject.map((item, idx) => (
                <li key={idx} className="flex justify-between py-2 border-b last:border-b-0">
                  <span>{item.subject_name}</span>
                  <span>{item.avg_marks.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Average Marks by Subject (Pie Chart)</h2>
            <div style={{ width: '100%', height: 350 }}>
              <PieChart labels={labels} values={values} />
            </div>
          </div>
        </div>
        </main>
      </AppLayout>
    );
  }

  // === Dashboard View ===
  return (
    <AppLayout user={auth.user} breadcrumbs={breadcrumbs}>
      
      <Head title="Overall Performance" />
      <main className='flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200 item-center '>
     
        <h1 className="text-2xl font-bold mb-6"></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20 ">
          <div
            className="bg-white p-4  shadow-xl cursor-pointer flex flex-col"
            onClick={() => setShowTotalStudentsDetails(true)}
          >
            <h2 className="text-lg font-semibold text-gray-800">Total Students</h2>
            <p className="text-3xl font-bold text-blue-600 mb-2">{totalStudents}</p>
            <div style={{ width: '100%', height: 100 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentsPerClass}>
                  <XAxis dataKey="class.name" hide />
                  <YAxis hide />
                  <Tooltip formatter={(value: number) => [`${value} students`, 'Count']} />
                  <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            className="bg-white p-4  shadow-xl cursor-pointer"
            onClick={() => setShowAverageScoreDetails(true)}
          >
            <h2 className="text-lg font-semibold text-gray-800">Average Class Score</h2>
            <p className="text-3xl font-bold text-green-600">View</p>
          </div>

          <div
            className="bg-white p-4  shadow-xl cursor-pointer"
            onClick={() => setShowSubjectAverageDetails(true)}
          >
            <h2 className="text-lg font-semibold text-gray-800">Average Subject Score</h2>
            <p className="text-xl font-bold text-indigo-600">{bestSubject?.subject_name ?? '–'}</p>
            <p className="text-sm text-gray-600 mt-1">Avg Marks: {bestSubject?.avg_marks.toFixed(2)}</p>
          </div>
        </div>
      
      </main>
    </AppLayout>
  );
}
