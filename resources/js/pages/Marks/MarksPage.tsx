import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/layouts/app-layout';

interface Class {
  class_id: number;
  section: string;
  year: number;
}

interface Student {
  reg_no: string;
  name: string | null;
}

interface MarkInput {
  reg_no: string;
  marks_obtained: number | '';
  grade: string;
  term: string;
  year: number;
  subject_id: string;
}

interface Props {
  classes: Class[];
  selectedClassId: number | null;
  students: Student[];
}

const allowedGrades = ['A', 'B', 'C', 'S', 'F'];

const MarksPage: React.FC<Props> = ({ classes, selectedClassId, students }) => {
  // State for term, year, subjectId
  const [term, setTerm] = useState('Term 1');
  const [year, setYear] = useState(new Date().getFullYear());
  const [subjectId, setSubjectId] = useState('');

  // Initialize marks state for each student whenever students, term, year or subjectId changes
  const [marks, setMarks] = useState<MarkInput[]>([]);

  useEffect(() => {
    if (students.length > 0 && subjectId) {
      setMarks(
        students.map((student) => ({
          reg_no: student.reg_no,
          marks_obtained: '',
          grade: '',
          term,
          year,
          subject_id: subjectId,
        }))
      );
    } else {
      setMarks([]);
    }
  }, [students, term, year, subjectId]);

  // Update marks or grade for a student
  const handleMarkChange = (
    index: number,
    field: 'marks_obtained' | 'grade',
    value: string
  ) => {
    setMarks((prev) => {
      const updated = [...prev];
      if (field === 'marks_obtained') {
        // Allow empty string or number between 0-100
        updated[index][field] = value === '' ? '' : Number(value);
      } else {
        updated[index][field] = value;
      }
      return updated;
    });
  };

  // Handle class dropdown change — reload page with class_id param
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  e.preventDefault(); // only needed if inside a form
  const classId = e.target.value;

  Inertia.get('/mark/MarksPage', { class_id: classId }, {
    preserveState: true,
    preserveScroll: true,
  });
};


  // Submit marks to backend
  const handleSubmit = async () => {
    // Validate marks before submit
    for (const mark of marks) {
      if (
        mark.marks_obtained === '' ||
        mark.marks_obtained < 0 ||
        mark.marks_obtained > 100 ||
        !allowedGrades.includes(mark.grade)
      ) {
        alert(
          'Please enter valid marks (0-100) and select a grade for all students.'
        );
        return;
      }
    }

    try {
      const res = await fetch('/marks/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ marks }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert('Error: ' + (errorData.message || 'Failed to submit marks'));
        return;
      }

      alert('Marks submitted successfully!');
      // Optionally reset marks and subjectId
      setSubjectId('');
      setMarks([]);
    } catch (error: any) {
      alert('Submission failed: ' + error.message);
    }
  };

  return(

  <AppLayout breadcrumbs={[{ title: '📄 Report Page', href: '#' }]}>
    <main className="bg-gray-100">
  <div className="max-w-6xl mx-auto mt-10 px-6">
    <div className="bg-white shadow-md p-8 space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800">📘 Enter Student Marks</h1>

      {/* Class Selector */}
      <div className="space-y-2">
        <label htmlFor="classSelect" className="block text-lg font-medium text-gray-700">
          Select Class
        </label>
        <select
          id="classSelect"
          value={selectedClassId ?? ''}
          onChange={handleClassChange}
          className="w-full max-w-sm border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            -- Select Class --
          </option>
          {classes.map((cls) => (
            <option key={cls.class_id} value={cls.class_id}>
              {cls.section} ({cls.year})
            </option>
          ))}
        </select>
      </div>

      {/* Term / Year / Subject Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-1 text-lg font-medium text-gray-700">Term</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option>Term 1</option>
            <option>Term 2</option>
            <option>Term 3</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-lg font-medium text-gray-700">Year</label>
          <input
            type="number"
            min={2000}
            max={2100}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-lg font-medium text-gray-700">Subject ID</label>
          <input
            type="text"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
      </div>

      {/* Student Marks Table */}
      {marks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-md border border-gray-800 rounded-md shadow-sm">
            <thead className="bg-blue-200 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2 border border-gray-900">Reg No</th>
                <th className="text-left px-4 py-2 border border-gray-900">Name</th>
                <th className="text-left px-4 py-2 border border-gray-900">Marks</th>
                <th className="text-left px-4 py-2 border border-gray-900">Grade</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark, i) => (
                <tr key={mark.reg_no} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{mark.reg_no}</td>
                  <td className="px-4 py-2 border">
                    {students.find((s) => s.reg_no === mark.reg_no)?.name ?? 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={mark.marks_obtained}
                      onChange={(e) => handleMarkChange(i, 'marks_obtained', e.target.value)}
                      className="w-24 border rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      value={mark.grade}
                      onChange={(e) => handleMarkChange(i, 'grade', e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="">Select Grade</option>
                      {allowedGrades.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No students found. Please select a class and subject.</p>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          onClick={handleSubmit}
          disabled={marks.length === 0}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          Submit All Marks
        </button>
      </div>
    </div>
  </div>
  </main>
</AppLayout>
  )
};

export default MarksPage;
