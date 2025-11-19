import React, { useEffect, useState } from 'react';
import StudentID from '@/pages/Student/StudentID';
import StudentPerformanceCard, { StudentPerformance } from '@/pages/Student/StudentPerformanceCard';

export type StudentItem = {
  reg_no: string;
  admission_date?: string | Date;
  full_name: string;
  email?: string;
  address?: string;
  photo?: string;
  class_name?: string;
  grade?: string;
  section?: string;
};

const ViewAllStudents: React.FC = () => {
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const [showPerformanceCard, setShowPerformanceCard] = useState(false);
  const [performanceData, setPerformanceData] = useState<StudentPerformance | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 8;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/students');
        const json = await res.json();
        const rawStudents = Array.isArray(json.data) ? json.data : json.data ?? json;
        if (!Array.isArray(rawStudents)) {
          setStudents([]);
          return;
        }

        const mapped = rawStudents.map((student: any) => ({
          reg_no: student.reg_no,
          admission_date: student.admission_date,
          full_name: student.personal?.full_name ?? 'N/A',
          email: student.personal?.email ?? '',
          address: student.personal?.address ?? '',
          photo: student.personal?.photo ?? '',
          class_name: student.class?.class_name ?? 'N/A',
          grade: student.class?.grade ?? 'N/A',
          section: student.class?.section ?? 'N/A',
        }));

        setStudents(mapped);
      } catch (err) {
        console.error('Failed to fetch students:', err);
        setStudents([]);
      }
    };

    load();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterQuery, filterClass, filterGrade, filterSection]);

  const handlePerformanceClick = async (student: StudentItem) => {
    try {
      const res = await fetch(`${window.location.origin}/api/students/${student.reg_no}/performance`);
      if (!res.ok) throw new Error('Failed to fetch performance');
      const data = await res.json();
      // normalize payload shape
      setPerformanceData((data.data ?? data) as StudentPerformance);
      setShowPerformanceCard(true);
    } catch (error) {
      console.error('Error fetching performance data:', error);
      alert('Could not load performance card');
    }
  };

  // simple filtering (uncomment / expand as needed)
  const filteredStudents = students.filter((s) => {
    const query = filterQuery.toLowerCase();
    const matchesQuery =
      !filterQuery ||
      s.reg_no.toLowerCase().includes(query) ||
      s.full_name.toLowerCase().includes(query);
    const matchesClass = !filterClass || (s.class_name ?? '') === filterClass;
    const matchesGrade = !filterGrade || (s.grade ?? '').toString().trim() === filterGrade.trim();
    const matchesSection = !filterSection || (s.section ?? '') === filterSection;
    return matchesQuery && matchesClass && matchesGrade && matchesSection;
  });

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // helper to get unique non-empty values
  const unique = (arr: (string | undefined)[]) => Array.from(new Set(arr.filter(Boolean))) as string[];

  return (
    <div className="mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-sky-900 mb-4">All Registered Students</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} className="p-2 border rounded w-full md:w-1/4">
          <option value="">All Reg. No / Name</option>
          {students.map((student) => (
            <option key={student.reg_no} value={student.reg_no}>
              {student.reg_no} - {student.full_name}
            </option>
          ))}
        </select>

        <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="p-2 border rounded w-full md:w-1/4">
          <option value="">All Classes</option>
          {unique(students.map((s) => s.class_name)).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)} className="p-2 border rounded w-full md:w-1/4">
          <option value="">All Grades</option>
          {unique(students.map((s) => s.grade)).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)} className="p-2 border rounded w-full md:w-1/4">
          <option value="">All Sections</option>
          {unique(students.map((s) => s.section)).map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="px-4 py-2 border">Reg. No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Class</th>
              <th className="px-4 py-2 border">Section</th>
              <th className="px-4 py-2 border">Grade</th>
              <th className="px-4 py-2 border">Admission</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr
                key={student.reg_no}
                className="hover:bg-yellow-100 cursor-pointer"
                onClick={() => {
                  setSelectedStudent(student);
                  setShowModal(true);
                }}
              >
                <td className="px-4 py-2 border">{student.reg_no || 'N/A'}</td>
                <td className="px-4 py-2 border">{student.full_name || 'N/A'}</td>
                <td className="px-4 py-2 border">{student.class_name || 'N/A'}</td>
                <td className="px-4 py-2 border">{student.section || 'N/A'}</td>
                <td className="px-4 py-2 border">{student.grade || 'N/A'}</td>
                <td className="px-4 py-2 border">{student.admission_date ? new Date(student.admission_date).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for ID or Performance */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-700 text-2xl font-bold">
              &times;
            </button>

            <h2 className="text-xl text-sky-800 font-bold mb-4 text-center">Student Actions</h2>
            <p className="text-center mb-4">
              What do you want to do for <strong>{selectedStudent.full_name}</strong>?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowIDCard(true);
                }}
                className="bg-green-600 text-white py-2 rounded"
              >
                Generate ID
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handlePerformanceClick(selectedStudent);
                }}
                className="cursor-pointer bg-blue-600 text-white py-2 rounded"
              >
                Performance Card
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedStudent(null);
                }}
                className="bg-gray-200 text-gray-800 py-2 rounded"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-300 px-4 py-2 rounded">
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-300 px-4 py-2 rounded">
          Next
        </button>
      </div>

      {/* Render ID Card */}
      {showIDCard && selectedStudent && <StudentID student={selectedStudent} onClose={() => setShowIDCard(false)} />}

      {/* Render Performance Card */}
      {showPerformanceCard && performanceData && (
        <StudentPerformanceCard student={performanceData} onClose={() => setShowPerformanceCard(false)} />
      )}
    </div>
  );
};

export default ViewAllStudents;