import React, { useState } from 'react';
import { BreadcrumbItem, PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import PieChart from '@/components/PieChart';

const breadcrumbs: BreadcrumbItem[] = [
  { title: '📊 Overall Performance', href: '/' },
];

interface StudentsPerClass {
  class_id: number;
  section: string;
  grade: number;
  total: number;
  class: { name: string };
  male: number;
  female: number;
}

interface AvgByClass {
  class_id: number;
  section: string;
  grade: number;
  avg_marks: number;
  class: { name: string };
}

interface SubjectAvg {
  subject_id: number;
  name: string;
  avg_marks: number;
}

interface Props extends PageProps {
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  studentsPerClass: StudentsPerClass[];
  avgByClass: AvgByClass[];
  avgBySubject: SubjectAvg[];
}

export default function OverallPerformance({
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

  // Gender data
  const genderData = [
    { gender: 'Male', count: maleStudents },
    { gender: 'Female', count: femaleStudents },
  ];

  // Best subject for dashboard card
  const bestSubject = avgBySubject.reduce(
    (top, current) => (current.avg_marks > (top.avg_marks ?? 0) ? current : top),
    { subject_id: 0, name: 'N/A', avg_marks: 0 } as SubjectAvg
  );

  /** ---------- Total Students Details ---------- */
  if (showTotalStudentsDetails) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Total Students Details" />
        <main className="flex flex-col min-h-screen gap-8 p-6 bg-gray-100">
          <button
            onClick={() => setShowTotalStudentsDetails(false)}
            className="self-start px-4 py-2 bg-yellow-400 hover:bg-yellow-300 font-semibold rounded"
          >
            ← Back
          </button>

          {/* Students per class cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {studentsPerClass.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-xl p-6 rounded-lg border-t-4 border-blue-600 hover:shadow-2xl transition-all"
              >
                <div className="mb-4">
                  <h3 className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Class</h3>
                  <p className="text-2xl font-bold text-blue-800">
                    {item.grade}-{item.section} ({item.class.name})
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between bg-gray-100 py-2 px-4 rounded">
                    <p className="text-lg font-medium flex items-center gap-1">
                      <Users className="w-5 h-5" /> Total
                    </p>
                    <p className="text-lg font-bold">{item.total}</p>
                  </div>

                  <div className="flex justify-between bg-gray-100 py-2 px-4 rounded">
                    <p className="text-lg font-medium flex items-center gap-1">
                      <Users className="w-5 h-5" /> Males
                    </p>
                    <p className="text-lg font-bold">{item.male}</p>
                  </div>

                  <div className="flex justify-between bg-gray-100 py-2 px-4 rounded">
                    <p className="text-lg font-medium flex items-center gap-1">
                      <Users className="w-5 h-5" /> Females
                    </p>
                    <p className="text-lg font-bold">{item.female}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Student Count by Class</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentsPerClass}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                  <XAxis dataKey="class.name" tick={{ fontSize: 13, fill: '#4b5563' }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 13, fill: '#4b5563' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', borderColor: '#d1d5db' }}
                    formatter={(value: number) => [`${value} students`, 'Count']}
                  />
                  <Bar dataKey="total" fill="#0c3181ff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border rounded shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Gender Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={genderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="gender" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value: number) => [`${value} students`, 'Count']} />
                  <Bar dataKey="count" fill="#57032bff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </AppLayout>
    );
  }

  /** ---------- Average Class Score Details ---------- */
  
  if (showAverageScoreDetails) {
    const labels = avgByClass.map(item => item.class?.name ?? `Class ${item.class_id}`);
    const values = avgByClass.map(item => item.avg_marks ?? 0);

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Average Class Scores" />
        <main className="flex flex-col min-h-screen gap-8 p-6 bg-gray-100">
          <button
            onClick={() => setShowAverageScoreDetails(false)}
            className="self-start px-4 py-2 bg-yellow-400 hover:bg-yellow-300 font-semibold rounded"
          >
            ← Back
          </button>

        
          <h1 className="text-2xl font-bold mb-6 text-center">Average Class Scores</h1>
          <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 w-64 sm:w-72 md:w-300 h-40 flex flex-wrap justify-center gap-4 mt-4">
            {avgByClass.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow "
              >
                <h3 className="text-2xl font-bold text-red-800">{item.class?.name ?? item.grade}</h3>
                <p className="text-md text-gray-500 mb-2">Overall Average</p>
                <div className="text-3xl font-bold text-blue-800">{(item.avg_marks ?? 0).toFixed(2)}</div>
                <p className="text-md text-gray-500 mt-2">
                  Total Students: {studentsPerClass.find(c => c.class_id === item.class_id)?.total ?? 0}
                </p>
              </div>
            ))}
          </div>
            </div>
          <div className="bg-white border rounded shadow p-6">
  <h2 className="text-xl font-semibold mb-4 text-center">Average Marks by Class (Pie Chart)</h2>

  <div className="flex justify-center items-center w-full">
    <div style={{ width: 350, height: 350 }}>
      <PieChart labels={labels} values={values} />
    </div>
  </div>
</div>

        </main>
      </AppLayout>
    );
  }

  /** ---------- Average Subject Score Details ---------- */
  if (showSubjectAverageDetails) {
    const subjectData = Array.isArray(avgBySubject)
      ? avgBySubject.map(s => ({
          subject_id: s?.subject_id ?? 0,
          name: s?.name ?? "Unknown",
          avg_marks: Number(s?.avg_marks ?? 0),
        }))
      : [];

    const labels = subjectData.map(s => s.name);
    const values = subjectData.map(s => s.avg_marks);

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Average Subject Scores" />
        <main className="flex flex-col min-h-screen gap-8 p-6 bg-gray-100">
          <button
            onClick={() => setShowSubjectAverageDetails(false)}
            className="self-start px-4 py-2 bg-yellow-400 hover:bg-yellow-300 font-semibold rounded"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold mb-6 flex justify-center items-center">Average Subject Scores</h1>

          <div className="flex justify-center items-center">
            <table className="min-w-300 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-1000 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-1000 uppercase tracking-wider">
                    Average Marks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjectData.map((subject, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{subject.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {subject.avg_marks.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
              
          <div className="flex justify-center items-center w-full">
          <div className="bg-white border rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Average Marks by Subject (Pie Chart)</h2>
            <div style={{ width: "100%", height: 350 }}>
              <PieChart labels={labels} values={values} />
            </div>
          </div>
          </div>
        </main>
      </AppLayout>
    );
  }

  /** ---------- Main Dashboard ---------- */
return (
  <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Overall Performance" />
    {/* Increased the top padding (pt-12) of the main element to push content down */}
    <main className="flex flex-col min-h-screen gap-8 p-6 bg-gray-100 pt-45">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* 1. 🎓 Student Performance Card (Compact Design) */}
        <div
          onClick={() => setShowTotalStudentsDetails(true)}
          className="bg-white border-b-4 border-purple-500 shadow-lg p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:border-purple-600 cursor-pointer flex flex-col justify-between h-44"
        >
          {/* Header Section */}
          <h2 className="text-xl font-bold text-purple-700 tracking-wide uppercase mb-0">
            STUDENT PERFORMANCE
          </h2>

          {/* Main Data Section */}
          <div className='flex flex-col'>
            <p className="text-5xl font-extrabold text-gray-800 leading-tight">
              {totalStudents}
            </p>
            {/* Description at the bottom */}
            <p className="text-base text-gray-500 mt-1">
              Across all classes
            </p>
          </div>
        </div>

        {/* 2. 📚 Average Class Score Card (Compact Design) */}
        <div
          onClick={() => setShowAverageScoreDetails(true)}
          className="bg-white border-b-4 border-green-500 shadow-lg p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:border-green-600 cursor-pointer flex flex-col justify-between h-44"
        >
          {/* Header Section */}
          <h2 className="text-lg font-bold text-green-700 tracking-wide uppercase mb-0">
            Average Class Score
          </h2>

          {/* Main Data Section */}
          <div className='flex flex-col'>
            <p className="text-4xl font-extrabold text-gray-800 leading-tight">
              View
            </p>
            {/* Description at the bottom */}
            <p className="text-sm text-gray-500 mt-1">
              Click to explore scores
            </p>
          </div>
        </div>

        {/* 3. 🎯 Average Subject Score Card (Compact Design) */}
        <div
          onClick={() => setShowSubjectAverageDetails(true)}
          className="bg-white border-b-4 border-yellow-500 shadow-lg p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:border-yellow-600 cursor-pointer flex flex-col justify-between h-44"
        >
          {/* Header Section */}
          <h2 className="text-lg font-bold text-yellow-700 tracking-wide uppercase mb-0">
            Average Subject Score
          </h2>

          {/* Main Data Section */}
          <div className='flex flex-col'>
            <p className="text-4xl font-extrabold text-gray-800 leading-tight">
              View
            </p>
            {/* Description at the bottom (Score value) */}
            <p className="text-sm text-gray-500 mt-1">
              {(bestSubject.avg_marks ?? 0).toFixed(2)}
            </p>
          </div>
        </div>

      </div>
    </main>
  </AppLayout>
);
}
