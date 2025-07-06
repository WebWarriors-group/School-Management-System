import React from 'react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

type ClassPerformance = {
  class_id: number;
  avg_marks: number;
};

type SubjectPerformance = {
  subject_id: number;
  avg_marks: number;
};

type GradeDistribution = {
  grade: string;
  count: number;
};

type Student = {
  id: number;
  student_personal: {
    name: string;
  };
  marks_avg_marks: number;
};

interface Props extends PageProps {
  totalStudents: number;
  avgByClass: ClassPerformance[];
  avgBySubject: SubjectPerformance[];
  gradeDistribution: GradeDistribution[];
  topPerformers: Student[];
  bottomPerformers: Student[];
}

export default function OverallPerformance({ auth, totalStudents }: Props) {
  return (
    <AppLayout user={auth.user}>
      <Head title="Overall Performance" />

      <div className="py-6 px-8">
        <h1 className="text-2xl font-bold mb-6">📊 Overall Performance Overview</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Total Students</h2>
            <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Average Class Score</h2>
            <p className="text-3xl font-bold text-green-600">–</p>
          </div>
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
