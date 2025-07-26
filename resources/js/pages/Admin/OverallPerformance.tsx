import React, { useState } from 'react';
import { BreadcrumbItem, PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { User, Users} from 'lucide-react'; 
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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '📊 Overall Performance',
    href: '/',
  },
];

interface StudentsPerClass {
  class_id: number;
  section: String;
  total: number;
  class: { name: string };
}

interface AvgByClass {
  class_id: number;
  section: String;
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
      <AppLayout breadcrumbs={breadcrumbs} >
        <Head title="Total Students Details" />

        <header className="sticky top-17 flex w-full items-center border-b bg-white p-4 shadow-sm">
        <p>1</p>
      </header>
        <main className='flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200 item-center w-full '>
        <div className="py-6 px-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 w-300 ">
  <button
    onClick={() => setShowTotalStudentsDetails(false)}
    className="px-10 py-2  bg-yellow-400 hover:bg-yellow-300 font-semibold shadow ml-[-130px]"
  >
    ← Back
  </button>

  

  <div className="w-36 bg-white" /> {/* Empty div to balance spacing on the right */}
</div>

          {/* <h1 className="text-xl text-white bg-purple-800 py-3 font-bold mb-6 w-150 text-start ml-[-190px] px-10">TOTAL STUDENTS - CLASS-WISE BREAKDOWN</h1> */}
       <div className="transparent  p-6 mb-8 ">
  

  <div className=" w-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ml-[-210px]  mt-[-30px] px-2">
     
    {studentsPerClass.map((item, idx) => (
   

<div
  key={idx}
  className="bg-white shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-t-4 border-blue-600"
>
  {/* Header Section */}
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-sm text-gray-500 uppercase font-semibold tracking-wide">
        Section
      </h3>
      <p className="text-2xl font-bold text-blue-800">{item.section}</p>
    </div>
    <div className="bg-blue-100 text-blue-800 px-4 py-2  font-bold text-lg shadow-md">
      Grade {item.class?.name ?? "6"}
    </div>
  </div>

  {/* Statistics Section */}
  <div className="space-y-4">
    <div className="flex items-center justify-between bg-gray-100 py-2 px-4">
      <div className="flex items-center space-x-1 ">
        <Users className="w-5 h-5 text-black" />
        <p className="text-lg text-black font-medium ">Total</p>
      </div>
      <p className="text-lg font-bold text-gray-900">{item.total}</p>
    </div>

    <div className="flex items-center justify-between bg-gray-100 py-2 px-4">
      <div className="flex items-center space-x-1">
       <Users className="w-5 h-5 text-black" />
        <p className="text-lg text-gray-900 font-medium">Males</p>
      </div>
      <p className="text-lg font-bold text-gray-800">{10}</p>
    </div>

    <div className="flex items-center justify-between bg-gray-100 py-2 px-4">
      <div className="flex items-center space-x-1">
       <Users className="w-5 h-5 text-black" /> {/* <Female className="w-5 h-5 text-pink-600" /> */}
        <p className="text-lg text-black font-medium">Females</p>
      </div>
      <p className="text-lg font-bold text-black">10</p>
    </div>
  </div>
</div>

    ))}
  </div>
</div>



         <div className="bg-white border border-gray-200  shadow-md p-6 mb-10 w-290 ml-[-180px]">
  <h2 className="text-2xl font-semibold text-yellow-800 mb-6">Student Count by Class</h2>
  <ResponsiveContainer width="100%" height={320}>
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

          <div className="bg-white border rounded shadow p-4">
            <h2 className="text-xl text-yellow-700 font-semibold mb-4">Gender Distribution</h2>
            <ResponsiveContainer width="50%" height={250}>
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

  // === Average Class Score Detail View ===
  if (showAverageScoreDetails) {
    const labels = avgByClass.map(item => item.class?.name ?? `Class ${item.class_id}`);
    const values = avgByClass.map(item => item.avg_marks);

    return (
      <AppLayout >
        <Head title="Average Class Scores" />

        <header className="sticky top-1 flex w-full items-center border-b bg-white p-4 shadow-sm">
        <p>1</p>
      </header>
        <main className='flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200 item-center '>

        <div className="py-6 px-8 max-w-10-xl mx-auto">
          <button
            onClick={() => setShowAverageScoreDetails(false)}
            className="mb-4 px-12 py-2 rounded bg-yellow-400 hover:bg-yellow-200"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-6">Average Class Scores</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 mb-8 w-290">
  {avgByClass.map((item, idx) => (
   <div
  key={idx}
  className="bg-white border border-gray-200  shadow-lg p-6 w-full hover:shadow-xl transition-shadow"
>
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="text-2xl font-bold text-red-800">
        {item.class?.name ?? `Class ${item.class_id}`}
      </h3>
      <p className="text-md text-gray-500">Overall Average</p>
      <div className="text-3xl font-bold text-blue-800">75.25</div>
    </div>
    <div className="text-right">
      <p className="text-md text-gray-500">Total Students</p>
      <div className="text-2xl font-semibold text-blue-800">30</div>
    </div>
  </div>

  {/* Subject Averages */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
    {[
      { name: 'Maths', avg: 80 },
      { name: 'Science', avg: 72 },
      { name: 'Tamil', avg: 68 },
      { name: 'English', avg: 81 },
    ].map((subject, sIdx) => (
      <div
        key={sIdx}
        className="bg-blue-100  px-4 py-3 text-center shadow-sm"
      >
        <p className="text-sm text-gray-600 font-medium">{subject.name}</p>
        <p className="text-xl font-bold text-blue-700">{subject.avg}</p>
      </div>
    ))}
  </div>

  {/* Below/Above 40 Table */}
  <div>
    <h4 className="text-lg font-semibold text-gray-700 mb-3">Subject Pass/Fail Breakdown</h4>
    <table className="w-full text-sm text-left text-gray-700 mb-6">
      <thead className="bg-gray-200 text-gray-600 uppercase text-md">
        <tr>
          <th className="py-2 px-3 text-md">Subject</th>
          <th className="py-2 px-3 text-red-600 text-md">Below 40</th>
          <th className="py-2 px-3 text-green-600">40 & Above</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: 'Maths', below40: 3, above40: 27 },
          { name: 'Science', below40: 5, above40: 25 },
          { name: 'Tamil', below40: 6, above40: 24 },
          { name: 'English', below40: 2, above40: 28 },
        ].map((subject, sIdx) => (
          <tr key={sIdx} className="border-t">
            <td className="py-3 px-3 text-md">{subject.name}</td>
            <td className="py-3 px-3 text-red-600 text-md">{subject.below40}</td>
            <td className="py-3 px-3 text-green-700 text-md">{subject.above40}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Feedback */}
  <div>
    <h4 className="text-lg font-semibold text-gray-700 mb-2">Class Feedback</h4>
    <p className="text-sm text-gray-600 italic mt-2">
      "Overall good performance; students need more focus in Tamil and Science."
    </p>
  </div>
</div>



  ))}
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
      <AppLayout >
        <Head title="Average Subject Scores" />
        <header className="sticky top-1 flex w-full items-center border-b bg-white p-4 shadow-sm">
        <p>1</p>
      </header>
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
    <AppLayout  breadcrumbs={breadcrumbs}>
      <header className="sticky top-15 flex w-full  border-b  p-4 shadow-sm  bg-white z-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row  md:justify-end">
          
          <p className=" text-blue-600 md:text-lg  md:text-left md:text-base md:mt-2">
            Classes,Students,Subjects Overall performance
          </p>
        </div>
      </header>

     
      <Head title="Overall Performance" />
      <main className='flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200 item-center z-10 '>
     
        <h1 className="text-2xl font-bold mb-6"></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20 ">
         <div
  onClick={() => setShowTotalStudentsDetails(true)}
  className="bg-gradient-to-tr from-purple-50 to-white border border-purple-100  shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-semibold text-purple-700 tracking-wide uppercase">STUDENT PERFORMANCE</h2>
      <p className="text-4xl font-bold text-gray-800 mt-2">{totalStudents}</p>
      <p className="text-xs text-gray-500 mt-1">Across all classes</p>
    </div>

    <div className="bg-purple-100 text-purple-700 p-3 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a3 3 0 100-6 3 3 0 000 6zM9 11a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    </div>
  </div>
</div>


         <div
  onClick={() => setShowAverageScoreDetails(true)}
  className="bg-gradient-to-tr from-green-50 to-white border border-green-100 shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-semibold text-green-700 tracking-wide uppercase">Average Class Score</h2>
      <p className="text-4xl font-bold text-gray-800 mt-2">View</p>
      <p className="text-xs text-gray-500 mt-1">Click to explore scores</p>
    </div>

    <div className="bg-green-100 text-green-700 p-3 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M11 17a4 4 0 100-8 4 4 0 000 8zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  </div>
</div>

         <div
  onClick={() => setShowSubjectAverageDetails(true)}
  className="bg-gradient-to-tr from-indigo-50 to-white border border-indigo-100  shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">Average Subject Score</h2>
      <p className="text-2xl font-bold text-gray-800 mt-2">{bestSubject?.subject_name ?? '–'}</p>
      <p className="text-xs text-gray-500 mt-1">
        Avg Marks: {bestSubject?.avg_marks?.toFixed(2) ?? 'N/A'}
      </p>
    </div>

    <div className="bg-indigo-100 text-indigo-700 p-3 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 17v-6h6v6h5V7H4v10h5z" />
      </svg>
    </div>
  </div>
</div>

<div
  onClick={() => setShowSubjectAverageDetails(true)}
  className="bg-gradient-to-tr from-pink-50 to-white border border-indigo-100  shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-semibold text-pink-700 tracking-wide uppercase">Average Subject Score</h2>
      <p className="text-2xl font-bold text-gray-800 mt-2">{bestSubject?.subject_name ?? '–'}</p>
      <p className="text-xs text-gray-500 mt-1">
        Avg Marks: {bestSubject?.avg_marks?.toFixed(2) ?? 'N/A'}
      </p>
    </div>

    <div className="bg-pink-100 text-pink-700 p-3 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 17v-6h6v6h5V7H4v10h5z" />
      </svg>
    </div>
  </div>
</div>

<div
  onClick={() => setShowSubjectAverageDetails(true)}
  className="bg-gradient-to-tr from-orange-50 to-white border border-indigo-100  shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-semibold text-orange-700 tracking-wide uppercase">Average Subject Score</h2>
      <p className="text-2xl font-bold text-gray-800 mt-2">{bestSubject?.subject_name ?? '–'}</p>
      <p className="text-xs text-gray-500 mt-1">
        Avg Marks: {bestSubject?.avg_marks?.toFixed(2) ?? 'N/A'}
      </p>
    </div>

    <div className="bg-orange-100 text-orange-700 p-3 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 17v-6h6v6h5V7H4v10h5z" />
      </svg>
    </div>
  </div>
</div>
<div
  onClick={() => setShowSubjectAverageDetails(true)}
  className="bg-gradient-to-tr from-indigo-50 to-white border border-indigo-100  shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">Average Subject Score</h2>
      <p className="text-2xl font-bold text-gray-800 mt-2">{bestSubject?.subject_name ?? '–'}</p>
      <p className="text-xs text-gray-500 mt-1">
        Avg Marks: {bestSubject?.avg_marks?.toFixed(2) ?? 'N/A'}
      </p>
    </div>

    <div className="bg-indigo-100 text-indigo-700 p-3 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 17v-6h6v6h5V7H4v10h5z" />
      </svg>
    </div>
  </div>
</div>
<div
  onClick={() => setShowSubjectAverageDetails(true)}
  className="bg-gradient-to-tr from-indigo-50 to-white border border-indigo-100  shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">Average Subject Score</h2>
      <p className="text-2xl font-bold text-gray-800 mt-2">{bestSubject?.subject_name ?? '–'}</p>
      <p className="text-xs text-gray-500 mt-1">
        Avg Marks: {bestSubject?.avg_marks?.toFixed(2) ?? 'N/A'}
      </p>
    </div>

    <div className="bg-indigo-100 text-indigo-700 p-3 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 17v-6h6v6h5V7H4v10h5z" />
      </svg>
    </div>
  </div>
</div>
<div
  onClick={() => setShowSubjectAverageDetails(true)}
  className="bg-gradient-to-tr from-indigo-50 to-white border border-indigo-100  shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">Average Subject Score</h2>
      <p className="text-2xl font-bold text-gray-800 mt-2">{bestSubject?.subject_name ?? '–'}</p>
      <p className="text-xs text-gray-500 mt-1">
        Avg Marks: {bestSubject?.avg_marks?.toFixed(2) ?? 'N/A'}
      </p>
    </div>

    <div className="bg-indigo-100 text-indigo-700 p-3 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 17v-6h6v6h5V7H4v10h5z" />
      </svg>
    </div>
  </div>
</div>
<div
  onClick={() => setShowSubjectAverageDetails(true)}
  className="bg-gradient-to-tr from-yellow-50 to-white border border-yellow-100  shadow-md p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-semibold text-yellow-700 tracking-wide uppercase">Average Subject Score</h2>
      <p className="text-2xl font-bold text-gray-800 mt-2">{bestSubject?.subject_name ?? '–'}</p>
      <p className="text-xs text-gray-500 mt-1">
        Avg Marks: {bestSubject?.avg_marks?.toFixed(2) ?? 'N/A'}
      </p>
    </div>

    <div className="bg-yellow-100 text-yellow-700 p-3 rounded-full shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 17v-6h6v6h5V7H4v10h5z" />
      </svg>
    </div>
  </div>
</div>

        </div>
      
      </main>
    </AppLayout>
  );
}
