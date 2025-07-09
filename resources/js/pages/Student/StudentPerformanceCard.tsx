// src/pages/Student/StudentPerformanceCard.tsx
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

export type Mark = {
  subject_id: number;
  subject_name: string;
  marks_obtained: number;
  highest_mark_in_subject: number | string;
};

export type StudentPerformance = {
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
};

type Props = {
  student: StudentPerformance;
  onClose: () => void;
};

export default function StudentPerformanceCard({ student, onClose }: Props) {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (reportRef.current) {
      const content = reportRef.current.innerHTML;
      const original = document.body.innerHTML;
      document.body.innerHTML = content;
      window.print();
      document.body.innerHTML = original;
      window.location.reload();
    }
  };

  const handleDownload = () => {
    if (reportRef.current) {
      html2pdf()
        .from(reportRef.current)
        .set({
          filename: `${student.full_name}_report.pdf`,
          margin: 10,
          jsPDF: { format: 'a4', orientation: 'portrait' },
        })
        .save();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <div className="p-6 max-h-[90vh] overflow-auto" ref={reportRef}>
          <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
            Student Academic Report
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              ['👤 Full Name', student.full_name],
              ['🆔 Reg No', student.reg_no],
              ['🏫 Class', student.class_name],
              ['🎓 Grade', student.grade],
              ['📚 Section', student.section],
              ['👩‍🏫 Teacher', student.class_teacher_name],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-sm font-semibold text-gray-500">{label}</p>
                <p className="text-lg text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-100 p-4 rounded shadow text-center">
              <p className="text-sm text-indigo-800 font-bold">Total Marks</p>
              <p className="text-2xl font-extrabold">{student.total_marks}</p>
            </div>
            <div className="bg-green-100 p-4 rounded shadow text-center">
              <p className="text-sm text-green-800 font-bold">Average</p>
              <p className="text-2xl font-extrabold">{student.average_marks}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow text-center">
              <p className="text-sm text-yellow-800 font-bold">Rank</p>
              <p className="text-2xl font-extrabold">{student.rank}</p>
            </div>
          </div>

          <table className="w-full border divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">Subject ID</th>
                <th className="px-4 py-2 text-left text-gray-700">Subject Name</th>
                <th className="px-4 py-2 text-right text-gray-700">Marks</th>
                <th className="px-4 py-2 text-right text-gray-700">Highest</th>
              </tr>
            </thead>
            <tbody>
              {student.marks.map((m) => (
                <tr key={m.subject_id}>
                  <td className="px-4 py-2">{m.subject_id}</td>
                  <td className="px-4 py-2">{m.subject_name}</td>
                  <td className="px-4 py-2 text-right">{m.marks_obtained}</td>
                  <td className="px-4 py-2 text-right">{m.highest_mark_in_subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 p-4 print:hidden">
          <button onClick={handlePrint} className="bg-blue-600 text-white py-2 px-4 rounded">
            🖨️ Print
          </button>
          <button onClick={handleDownload} className="bg-green-600 text-white py-2 px-4 rounded">
            📄 Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
