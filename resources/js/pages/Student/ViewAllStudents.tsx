import React, { useEffect, useState } from 'react';
import StudentID from '@/pages/Student/StudentID';
import StudentPerformanceCard, { StudentPerformance } from '@/pages/Student/StudentPerformanceCard';

export type Student = {
  reg_no: string;
  admission_date: Date;
  full_name: string;
  email: string;
  address?: string;
  photo?: string;
  class_name?: string;
  grade?: string;
  section?: string;             
};

const ViewAllStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const [showPerformanceCard, setShowPerformanceCard] = useState(false);
  const [performanceData, setPerformanceData] = useState<StudentPerformance | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 8;

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((response) => {
        const rawStudents = response.data;

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
      })
      .catch((err) => console.error("Failed to fetch students:", err));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterQuery, filterClass, filterGrade, filterSection]);

  const handlePerformanceClick = async (student: Student) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/student/${student.reg_no}/performance`);
      if (!res.ok) throw new Error('Failed to fetch performance');
      const data = await res.json();
      setPerformanceData(data);
      setShowPerformanceCard(true);
    } catch (error) {
      console.error("Error fetching performance data:", error);
      alert("Could not load performance card");
    }
  };

  const filteredStudents = students;
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  if (showIDCard && selectedStudent) {
    return (
      <StudentID
        student={selectedStudent}
        onClose={() => {
          setShowIDCard(false);
          setSelectedStudent(null);
        }}
      />
    );
  }

  if (showPerformanceCard && performanceData) {
    return (
      <StudentPerformanceCard
        student={performanceData}
        onClose={() => {
          setShowPerformanceCard(false);
          setPerformanceData(null);
        }}
      />
    );
  }

  return (
    <div className="mt-10 p-6 bg-white shadow-md rounded-lg">
     

      {showModal && selectedStudent ? (
        <div className="max-w-lg mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedStudent(null);
              }}
              className="absolute top-2 right-2 text-gray-700 text-2xl font-bold"
            >
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
                className="bg-blue-600 text-white py-2 rounded"
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
      ) : (
        <>
         <h2 className="text-2xl font-bold text-sky-900 mb-4">All Registered Students</h2>

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
          {[...new Set(students.map((s) => s.class_name))].map((c) => c && <option key={c}>{c}</option>)}
        </select>
        <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)} className="p-2 border rounded w-full md:w-1/4">
          <option value="">All Grades</option>
          {[...new Set(students.map((s) => s.grade))].map((g) => g && <option key={g}>{g}</option>)}
        </select>
        <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)} className="p-2 border rounded w-full md:w-1/4">
          <option value="">All Sections</option>
          {[...new Set(students.map((s) => s.section))].map((sec) => sec && <option key={sec}>{sec}</option>)}
        </select>
      </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-sky-800 text-white">
                <tr>
                  <th className="px-4 py-2 border">Reg. No</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Section</th>
                  <th className="px-4 py-2 border">Class</th>
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
                    <td className="px-4 py-2 border">{student.section || 'N/A'}</td>
                    <td className="px-4 py-2 border">{student.class_name || 'N/A'}</td>
                    <td className="px-4 py-2 border">{student.grade || 'N/A'}</td>
                    <td className="px-4 py-2 border">
                      {student.admission_date ? new Date(student.admission_date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
        </>
      )}

      </div>
  );
};

export default ViewAllStudents;
