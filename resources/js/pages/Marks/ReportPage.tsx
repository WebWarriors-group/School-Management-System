import React, { useRef } from 'react';
import { usePage } from '@inertiajs/react';
import html2pdf from 'html2pdf.js';

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
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (reportRef.current) {
      const printContents = reportRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // optional
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-2xl font-semibold text-gray-500">No student data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-white to-slate-50 shadow-xl rounded-xl mt-10">
      {/* 🔘 Action Buttons */}
      <div className="flex justify-end mb-6 gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
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

      {/* 📄 Report Content */}
      <div ref={reportRef}>
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center border-b pb-4">
          Student Academic Report
        </h1>

        {/* Student Info Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {[
            ['👤 Full Name', student.full_name],
            ['🆔 Registration No', student.reg_no],
            ['🏫 Class', student.class_name],
            ['🎓 Grade', student.grade],
            ['📚 Section', student.section],
            ['👩‍🏫 Class Teacher', student.class_teacher_name],
          ].map(([label, value]) => (
            <div key={label}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {label}
              </h2>
              <p className="mt-1 text-lg font-medium text-gray-900">{value}</p>
            </div>
          ))}
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-indigo-100 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-base font-bold text-indigo-800 uppercase tracking-wide">
              Total Marks
            </h3>
            <p className="text-3xl font-extrabold text-indigo-900 mt-2">{student.total_marks}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-base font-bold text-green-800 uppercase tracking-wide">
              Average Marks
            </h3>
            <p className="text-3xl font-extrabold text-green-900 mt-2">{student.average_marks}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-base font-bold text-yellow-800 uppercase tracking-wide">Rank</h3>
            <p className="text-3xl font-extrabold text-yellow-900 mt-2">{student.rank}</p>
          </div>
        </section>

        {/* Subject Marks Table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Subject-wise Marks
          </h2>
          <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">
                    Subject ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">
                    Subject Name
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-800 uppercase tracking-wide">
                    Marks Obtained
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-800 uppercase tracking-wide">
                    Highest Mark
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {student.marks.map((mark) => (
                  <tr key={mark.subject_id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{mark.subject_id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{mark.subject_name}</td>
                    <td className="px-6 py-4 text-sm text-right text-indigo-700 font-bold">
                      {mark.marks_obtained}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-600">
                      {mark.highest_mark_in_subject}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
