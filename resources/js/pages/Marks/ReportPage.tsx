import React from 'react';
import { usePage } from '@inertiajs/react';

type Mark = {
  subject_id: number;
  subject_name: string;
  marks_obtained: number;
  highest_mark_in_subject: number | string;
};

type Student = {
  full_name: string;
  reg_no: string;
  class_name: string;
  grade: string;
  section: string;
  class_teacher_name: string;
  total_marks: number;
  average_marks: number;
  rank: number;
  marks: Mark[];
} | null;

type Props = {
  student: Student;
};

export default function ReportPage() {
  const { student } = usePage().props as unknown as Props;

  if (!student) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">No student data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
        Student Academic Report
      </h1>

      {/* Student Info */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Student Name</h2>
          <p className="mt-1 text-lg font-medium text-gray-900">{student.full_name}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Registration No</h2>
          <p className="mt-1 text-lg font-medium text-gray-900">{student.reg_no}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Class Name</h2>
          <p className="mt-1 text-lg font-medium text-gray-900">{student.class_name}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Grade</h2>
          <p className="mt-1 text-lg font-medium text-gray-900">{student.grade}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Section</h2>
          <p className="mt-1 text-lg font-medium text-gray-900">{student.section}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Class Teacher</h2>
          <p className="mt-1 text-lg font-medium text-gray-900">{student.class_teacher_name}</p>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="flex flex-wrap gap-6 mb-10">
        <div className="flex-1 min-w-[180px] bg-indigo-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xs font-semibold text-indigo-600 uppercase mb-1">Total Marks</h3>
          <p className="text-2xl font-bold text-indigo-900">{student.total_marks}</p>
        </div>
        <div className="flex-1 min-w-[180px] bg-green-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xs font-semibold text-green-600 uppercase mb-1">Average Marks</h3>
          <p className="text-2xl font-bold text-green-900">{student.average_marks}</p>
        </div>
        <div className="flex-1 min-w-[180px] bg-yellow-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xs font-semibold text-yellow-600 uppercase mb-1">Rank</h3>
          <p className="text-2xl font-bold text-yellow-900">{student.rank}</p>
        </div>
      </section>

      {/* Marks Table */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Subject-wise Marks
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Marks Obtained
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Highest Mark
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {student.marks.map((mark) => (
                <tr key={mark.subject_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {mark.subject_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mark.subject_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-indigo-600 font-semibold">
                    {mark.marks_obtained}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {mark.highest_mark_in_subject}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
