import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/layouts/app-layout';

interface Class {
  class_id: number;
  section: string;
  year: number;
  grade: number;
}

interface Student {
  reg_no: number;
  name: string | null;
}

interface MarkInput {
  reg_no: number;
  marks_obtained: number | null;
  grade: string;
  term: string;
  year: number;
  subject_id: string;
  class_id: number;
  isNew?: boolean;
}

interface ExistingMark {
  id?: number;
  reg_no: number;
  marks_obtained: number;
  grade: string;
}

interface Props {
  classes: Class[];
  selectedClassId: number | null;
  students: Student[];
}

const allowedGrades = ['A', 'B', 'C', 'S', 'F'];

const MarksPage: React.FC<Props> = ({ classes, selectedClassId, students }) => {
  const [term, setTerm] = useState('Term 1');
  const [year, setYear] = useState(new Date().getFullYear());
  const [subjectId, setSubjectId] = useState('');
  const [marks, setMarks] = useState<MarkInput[]>([]);
  const [existingMarks, setExistingMarks] = useState<ExistingMark[]>([]);
  const [loadingMarks, setLoadingMarks] = useState(false);

  useEffect(() => {
    if (students.length > 0 && subjectId) {
      setMarks(
        students.map(student => ({
          reg_no: student.reg_no,
          marks_obtained: null,
          grade: '',
          term,
          year,
          subject_id: subjectId,
          class_id: selectedClassId ?? 0,
          isNew: true,
        }))
      );
    } else {
      setMarks([]);
    }
  }, [students, term, year, subjectId, selectedClassId]);

  // 🔹 Fetch existing marks when subject/class/term/year changes
  useEffect(() => {
    if (!subjectId || !selectedClassId) return;
    const fetchMarks = async () => {
      setLoadingMarks(true);
      try {
        const res = await fetch(
          `/marks/getMarks?subject_id=${subjectId}&term=${term}&year=${year}&class_id=${selectedClassId}`
        );
        if (res.ok) {
          const data = await res.json();
          setExistingMarks(data);
        } else {
          setExistingMarks([]);
        }
      } catch {
        setExistingMarks([]);
      } finally {
        setLoadingMarks(false);
      }
    };
    fetchMarks();
  }, [subjectId, term, year, selectedClassId]);

  const handleMarkChange = (index: number, value: string) => {
    setMarks(prev => {
      const updated = [...prev];
      updated[index].marks_obtained =
        value === '' ? null : Math.min(100, Math.max(0, Number(value)));
      return updated;
    });
  };

  const handleGradeChange = (index: number, value: string) => {
    setMarks(prev => {
      const updated = [...prev];
      updated[index].grade = value;
      return updated;
    });
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = Number(e.target.value);
    Inertia.get('/mark/MarksPage', { class_id: classId }, { preserveState: true, preserveScroll: true });
  };

  const handleSubmit = async () => {
    for (const mark of marks) {
      if (
        mark.marks_obtained === null ||
        mark.marks_obtained < 0 ||
        mark.marks_obtained > 100 ||
        !allowedGrades.includes(mark.grade)
      ) {
        alert('Please enter valid marks (0–100) and select a grade for all students.');
        return;
      }
    }

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
      const res = await fetch('/marks/storeBulkMarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
        body: JSON.stringify({ marks }),
        credentials: 'same-origin',
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to submit marks');
        return;
      }

      alert('Marks submitted successfully!');
      setMarks([]);
      setSubjectId('');
      setExistingMarks([]); // refresh existing table
    } catch (err: any) {
      alert('Submission error: ' + err.message);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: '📄 Marks Page', href: '#' }]}>
      <main className="bg-gray-200 min-h-screen">
        <div className="max-w-6xl mx-auto mt-10 px-6">
          <div className="bg-white shadow-md p-8 space-y-8 rounded-xl">
            <h1 className="text-3xl font-semibold text-gray-800">📘 Student Marks</h1>

            {/* Class Selection */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">Select Class</label>
              <select
                value={selectedClassId ?? ''}
                onChange={handleClassChange}
                className="w-full max-w-sm border rounded-lg p-2"
              >
                <option value="" disabled>-- Select Class --</option>
                {classes.map(cls => (
                  <option key={cls.class_id} value={cls.class_id}>
                    Grade {cls.grade} ({cls.section})
                  </option>
                ))}
              </select>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-1 text-lg font-medium">Term</label>
                <select value={term} onChange={e => setTerm(e.target.value)} className="w-full border rounded-lg p-2">
                  <option>Term 1</option>
                  <option>Term 2</option>
                  <option>Term 3</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-lg font-medium">Year</label>
                <input
                  type="number"
                  min={2000}
                  max={2100}
                  value={year}
                  onChange={e => setYear(Number(e.target.value))}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block mb-1 text-lg font-medium">Subject ID</label>
                <input
                  type="text"
                  value={subjectId}
                  onChange={e => setSubjectId(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter subject ID"
                />
              </div>
            </div>

            {/* Enter Marks Table */}
            {marks.length > 0 ? (
              <div className="overflow-x-auto">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">✏️ Enter Marks</h2>
                <table className="w-full text-md border rounded-md">
                  <thead className="bg-blue-200">
                    <tr>
                      <th className="px-4 py-2 border">Reg No</th>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Marks</th>
                      <th className="px-4 py-2 border">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((mark, i) => (
                      <tr key={mark.reg_no}>
                        <td className="px-4 py-2 border">{mark.reg_no}</td>
                        <td className="px-4 py-2 border">
                          {students.find(s => s.reg_no === mark.reg_no)?.name ?? 'N/A'}
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={mark.marks_obtained ?? ''}
                            onChange={e => handleMarkChange(i, e.target.value)}
                            className="w-24 border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <select
                            value={mark.grade}
                            onChange={e => handleGradeChange(i, e.target.value)}
                            className="border rounded px-2 py-1"
                          >
                            <option value="">Select Grade</option>
                            {allowedGrades.map(g => <option key={g} value={g}>{g}</option>)}
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
            {marks.length > 0 && (
              <div className="pt-4">
                <button onClick={handleSubmit} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg">
                  Submit All Marks
                </button>
              </div>
            )}

            {/* Existing Marks Table */}
            <div className="pt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">📊 Existing Marks</h2>
              {loadingMarks ? (
                <p>Loading existing marks...</p>
              ) : existingMarks.length > 0 ? (
                <table className="w-full text-md border rounded-md">
                  <thead className="bg-green-200">
                    <tr>
                      <th className="px-4 py-2 border">Reg No</th>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Marks</th>
                      <th className="px-4 py-2 border">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {existingMarks.map((mark) => (
                      <tr key={mark.reg_no}>
                        <td className="px-4 py-2 border">{mark.reg_no}</td>
                        <td className="px-4 py-2 border">
                          {students.find(s => s.reg_no === mark.reg_no)?.name ?? 'N/A'}
                        </td>
                        <td className="px-4 py-2 border text-center">{mark.marks_obtained}</td>
                        <td className="px-4 py-2 border text-center">{mark.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600">No existing marks found for this subject, term, and year.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default MarksPage;
