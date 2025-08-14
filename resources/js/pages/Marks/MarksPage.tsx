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
  isNew?: boolean; // ✅ New flag to track if mark is new
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
  const [editingRows, setEditingRows] = useState<{ [reg_no: string]: boolean }>({});

  useEffect(() => {
    if (students.length > 0 && subjectId) {
      fetch(`/marks?subject_id=${subjectId}&term=${term}&year=${year}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            // ✅ Existing marks
            setMarks(data.map((m: any) => ({
              reg_no: m.reg_no,
              marks_obtained: m.marks_obtained,
              grade: m.grade,
              term: m.term,
              year: m.year,
              subject_id: m.subject_id.toString(),
              isNew: false
            })));
          } else {
            // ✅ New marks entry
            setMarks(students.map(student => ({
              reg_no: student.reg_no,
              marks_obtained: '',
              grade: '',
              term,
              year,
              subject_id: subjectId,
              isNew: true
            })));
          }
        })
        .catch(err => console.error('Failed to fetch marks', err));
    } else {
      setMarks([]);
    }
  }, [students, term, year, subjectId]);

  const handleMarkChange = (index: number, field: 'marks_obtained' | 'grade', value: string) => {
    setMarks(prev => {
      const updated = [...prev];
      updated[index][field] = field === 'marks_obtained' ? (value === '' ? '' : Number(value)) : value;
      return updated;
    });
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.target.value;
    Inertia.get('/mark/MarksPage', { class_id: classId }, { preserveState: true, preserveScroll: true });
  };

  const handleSubmit = async () => {
    for (const mark of marks) {
      if (
        mark.marks_obtained === '' ||
        mark.marks_obtained < 0 ||
        mark.marks_obtained > 100 ||
        !allowedGrades.includes(mark.grade)
      ) {
        alert('Please enter valid marks (0-100) and select a grade for all students.');
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

      if (!res.ok) {
        let message = 'Failed to submit marks';
        try {
          const errorData = await res.json();
          message = errorData.message || message;
        } catch {}
        alert('Error: ' + message);
        return;
      }

      alert('Marks submitted successfully!');
      setMarks([]);
      setSubjectId('');
    } catch (error: any) {
      alert('Submission failed: ' + error.message);
    }
  };

  const toggleEdit = (reg_no: string) => {
    setEditingRows(prev => ({ ...prev, [reg_no]: !prev[reg_no] }));
  };

  const handleEdit = async (mark: MarkInput) => {
    if (
      mark.marks_obtained === '' ||
      mark.marks_obtained < 0 ||
      mark.marks_obtained > 100 ||
      !allowedGrades.includes(mark.grade)
    ) {
      alert('Invalid mark or grade.');
      return;
    }

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
      const res = await fetch('/marks/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
        body: JSON.stringify(mark),
        credentials: 'same-origin',
      });

      if (!res.ok) {
        let message = 'Unknown error';
        try {
          const errorData = await res.json();
          message = errorData.message || message;
        } catch {}
        alert('Update failed: ' + message);
        return;
      }

      alert('Mark updated successfully!');
      toggleEdit(mark.reg_no);
    } catch (err: any) {
      alert('Update error: ' + err.message);
    }
  };

  const handleDelete = async (mark: MarkInput) => {
    if (!confirm('Are you sure you want to delete this mark?')) return;

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
      const res = await fetch('/marks/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
        body: JSON.stringify(mark),
        credentials: 'same-origin',
      });

      if (!res.ok) {
        let message = 'Unknown error';
        try {
          const errorData = await res.json();
          message = errorData.message || message;
        } catch {}
        alert('Delete failed: ' + message);
        return;
      }

      setMarks(prev => prev.filter(m =>
        !(m.reg_no === mark.reg_no && m.subject_id === mark.subject_id && m.term === mark.term && m.year === mark.year)
      ));
      alert('Mark deleted successfully!');
    } catch (err: any) {
      alert('Delete error: ' + err.message);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: '📄 Marks Page', href: '#' }]}>
      <main className="bg-gray-100">
        <div className="max-w-6xl mx-auto mt-10 px-6">
          <div className="bg-white shadow-md p-8 space-y-8">
            <h1 className="text-3xl font-semibold text-gray-800">📘 Student Marks</h1>

            {/* Class Selector */}
            <div className="space-y-2">
              <label htmlFor="classSelect" className="block text-lg font-medium text-gray-700">Select Class</label>
              <select
                id="classSelect"
                value={selectedClassId ?? ''}
                onChange={handleClassChange}
                className="w-full max-w-sm border border-gray-300 rounded-lg p-2"
              >
                <option value="" disabled>-- Select Class --</option>
                {classes.map(cls => (
                  <option key={cls.class_id} value={cls.class_id}>{cls.section} ({cls.year})</option>
                ))}
              </select>
            </div>

            {/* Term / Year / Subject */}
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
                <input type="number" min={2000} max={2100} value={year} onChange={e => setYear(Number(e.target.value))}
                  className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block mb-1 text-lg font-medium">Subject ID</label>
                <input type="text" value={subjectId} onChange={e => setSubjectId(e.target.value)}
                  className="w-full border rounded-lg p-2" />
              </div>
            </div>

            {/* Marks Table */}
            {marks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-md border rounded-md">
                  <thead className="bg-blue-200">
                    <tr>
                      <th className="px-4 py-2 border">Reg No</th>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Marks</th>
                      <th className="px-4 py-2 border">Grade</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((mark, i) => (
                      <tr key={mark.reg_no}>
                        <td className="px-4 py-2 border">{mark.reg_no}</td>
                        <td className="px-4 py-2 border">{students.find(s => s.reg_no === mark.reg_no)?.name ?? 'N/A'}</td>
                        <td className="px-4 py-2 border">
                          <input
                            type="number" min={0} max={100}
                            value={mark.marks_obtained}
                            readOnly={!editingRows[mark.reg_no]}
                            onChange={e => handleMarkChange(i, 'marks_obtained', e.target.value)}
                            className={`w-24 border rounded px-2 py-1 ${editingRows[mark.reg_no] ? '' : 'bg-gray-200'}`}
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <select
                            value={mark.grade}
                            disabled={!editingRows[mark.reg_no]}
                            onChange={e => handleMarkChange(i, 'grade', e.target.value)}
                            className={`border rounded px-2 py-1 ${editingRows[mark.reg_no] ? '' : 'bg-gray-200'}`}
                          >
                            <option value="">Select Grade</option>
                            {allowedGrades.map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-2 border flex gap-2">
                          <button
                            onClick={() => {
                              if (editingRows[mark.reg_no]) {
                                handleEdit(mark);
                              } else {
                                toggleEdit(mark.reg_no);
                              }
                            }}
                            className={`px-2 py-1 rounded text-white ${editingRows[mark.reg_no] ? 'bg-green-500' : 'bg-blue-500'}`}
                          >
                            {editingRows[mark.reg_no] ? 'Save' : 'Edit'}
                          </button>
                          <button
                            onClick={() => handleDelete(mark)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No students found. Please select a class and subject.</p>
            )}

            {/* Bulk Submit — only show if there are NEW marks */}
            {marks.some(m => m.isNew) && (
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
                >
                  Submit All Marks
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default MarksPage;
