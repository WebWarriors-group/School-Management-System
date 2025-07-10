import React, { useRef } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Mark {
  subject_id: number;
  subject_name: string;
  marks_obtained: number;
  highest_mark_in_subject: number | string;
}

interface Student {
  full_name: string;
  reg_no: string;
  class_name: string;
  grade: string;
  section: string;
  class_teacher_name: string;
  total_marks: number;
  average_marks: number;
  rank: number | string;
  marks: Mark[];
  photo_url?: string;
}

type Props = {
  student: Student | null;
};

export default function ReportPage() {
  const { student } = usePage().props as unknown as Props;
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (reportRef.current) {
      const printContents = reportRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    if (reportRef.current) {
      html2pdf()
        .from(reportRef.current)
        .set({
          filename: `${student?.full_name}_report.pdf`,
          margin: 10,
          jsPDF: { format: 'a4', orientation: 'portrait' },
        })
        .save();
    }
  };

  if (!student) {
    return (
      <AppLayout breadcrumbs={[{ title: '📄 Report Page', href: '#' }]}>
        <Head title="Report Not Found" />
        <div className="flex justify-center items-center min-h-screen bg-gray-300">
          <p className="text-2xl font-semibold text-gray-500">No student data found.</p>
        </div>
      </AppLayout>
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: `📄 Report for ${student.full_name}`, href: `/mark/ReportPage/${student.reg_no}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Report Card - ${student.full_name}`} />

      <main className="min-h-screen bg-gray-200 py-12 px-4 w-full">
        {/* Action Buttons */}
        <div className="flex justify-between mb-8 print:hidden">
          <button
            onClick={() => router.visit('/admin/studentdashboard')}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 shadow-sm transition font-medium"
          >
            ← Back to Dashboard
          </button>
          <div className="flex gap-4">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 shadow"
            >
              🖨️ Print
            </button>
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
              📄 Download PDF
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="max-w-3xl mx-auto bg-white shadow-2xl border border-gray-200 p-8 sm:p-10 space-y-10">
          {/* Title */}
         <div className="relative text-center py-10 overflow-hidden">

  {/* Background image */}
  <img
    src="/images/tag4"
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-purple-700/80"></div>

  {/* Text content */}
  <div className="relative z-10">
    <h1 className="text-3xl font-bold text-white uppercase">Student Report Card</h1>
    <p className="text-gray-200 text-lg mt-2">Academic Performance Summary</p>
  </div>
</div>


          {/* 📌 Profile Info */}
          <section>
            <h2 className="text-lg font-bold text-purple-800 mb-4 border-b pb-1">📌 PROFILE INFO</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-36 h-36  overflow-hidden border-4 border-purple-200 shadow">
                
                  <img src="/images/tag4" className="object-cover w-full h-full" />
                
                  
               
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{student.full_name}</h2>
                <p className="text-gray-600 mt-2 text-lg"> Reg No: {student.reg_no}</p>
              </div>
            </div>
          </section>

          {/* 📌 Class Info */}
          <section>
            <h2 className="text-lg font-bold text-purple-800 mb-4 border-b pb-1 ">📌 ClASS INFORMATION</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
  {[
    ['Class Name', student.class_name],
    ['Grade', student.grade],
    ['Section', student.section],
    
  ].map(([label, value]) => (
    <div
      key={label}
      className="bg-white shadow-xl  overflow-hidden border border-gray-200 text-center w-50 h-30"
    >
      <div className="p-6">
        <p className="text-lg font-bold text-indigo-800">{value}</p>
      </div>
      <div className=" py-2 px-4 bg-gradient-to-br from-indigo-900 to-purple-700">
        <p className="text-sm text-white uppercase tracking-wide font-medium">
          {label}
        </p>
      </div>
    </div>
  ))}
</div>


          </section>

          {/* 📊 Summary */}
          <section>
            <h2 className="text-lg font-bold text-purple-800 mb-4 border-b pb-1">📌 SUMMARY</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-  ml-15">
              <div className="rounded-full bg-gradient-to-br from-sky-900 to-sky-600 p-6 h-33 w-33 text-white text-center shadow-lg border-15 border-blue-200">
                <h3 className="text-sm uppercase font-semibold">Total </h3>
                <p className="text-2xl font-bold mt-2">{student.total_marks}</p>
              </div>
              <div className="rounded-full bg-gradient-to-br from-pink-800 h-33 w-33 to-purple-700 p-6 text-white text-center shadow-lg border-15 border-purple-200">
                <h3 className="text-sm uppercase font-semibold ml-[-6px]">Average</h3>
                <p className="text-2xl font-bold mt-2 ">{student.average_marks}</p>
              </div>
              <div className="rounded-full bg-gradient-to-br from-green-800 to-green-500 p-6 h-33 w-33 text-white text-center shadow-lg border-14 border-green-200">
                <h3 className="text-sm uppercase font-semibold">Rank</h3>
                <p className="text-2xl font-bold mt-2">{student.rank}</p>
              </div>
            </div>
          </section>

          {/* 📚 Subject-wise Marks */}
          <section>
            <h2 className="text-lg font-bold text-purple-800 mb-4 border-b pb-1">📚 SUBJECT-WISE MARKS</h2>
            <div className="overflow-x-auto shadow border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-br from-indigo-900 to-purple-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Subject ID</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Subject Name</th>
                    <th className="px-6 py-3 text-right text-sm font-bold text-white uppercase tracking-wider">Marks Obtained</th>
                    <th className="px-6 py-3 text-right text-sm font-bold text-white uppercase tracking-wider">Highest Mark</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {student.marks.map((mark) => (
                    <tr key={mark.subject_id} className="hover:bg-sky-100">
                      <td className="px-6 py-4 text-sm text-gray-700">{mark.subject_id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{mark.subject_name}</td>
                      <td className="px-6 py-4 text-sm text-right text-blue-700 font-semibold">{mark.marks_obtained}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-600">{mark.highest_mark_in_subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </AppLayout>
  );
}
