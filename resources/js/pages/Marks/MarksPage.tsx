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

  return (
    <AppLayout breadcrumbs={[{ title: '📄 Report Page', href: '#' }]}>
      <main className='bg-gray-100 max-h-full'>
    <div className="max-w-5xl mx-auto p-6 bg">
      <h1 className="text-2xl font-bold mb-6">Enter Student Marks</h1>

      {/* Class selector */}
      <div className="mb-6">
        <label className="block mb-2 font-medium" htmlFor="classSelect">
          Select Class:
        </label>
        <select
          id="classSelect"
          value={selectedClassId ?? ''}
          onChange={handleClassChange}
          className="border p-2 rounded w-full max-w-xs"
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

      {/* Term, Year, Subject ID inputs */}
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block mb-1 font-medium" htmlFor="termSelect">
            Term
          </label>
          <select
            id="termSelect"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Term 1</option>
            <option>Term 2</option>
            <option>Term 3</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="yearInput">
            Year
          </label>
          <input
            id="yearInput"
            type="number"
            min={2000}
            max={2100}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border p-2 rounded w-24"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="subjectIdInput">
            Subject ID
          </label>
          <input
            id="subjectIdInput"
            type="text"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Marks table */}
      {marks.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-3 py-1">Reg No</th>
              <th className="border border-gray-300 px-3 py-1">Name</th>
              <th className="border border-gray-300 px-3 py-1">Marks Obtained</th>
              <th className="border border-gray-300 px-3 py-1">Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark, i) => (
              <tr key={mark.reg_no}>
                <td className="border border-gray-300 px-3 py-1">{mark.reg_no}</td>
                <td className="border border-gray-300 px-3 py-1">
                  {students.find((s) => s.reg_no === mark.reg_no)?.name ?? 'N/A'}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={mark.marks_obtained}
                    onChange={(e) =>
                      handleMarkChange(i, 'marks_obtained', e.target.value)
                    }
                    className="border rounded px-2 py-1 w-24"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-1">
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
      ) : (
        <p>No students found or please select a class and subject.</p>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
       
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Submit All Marks
      </button>
    </div>
    </main>
    </AppLayout>
  );
};

export default MarksPage;
