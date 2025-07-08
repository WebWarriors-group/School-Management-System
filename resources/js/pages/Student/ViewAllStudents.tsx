import React, { useEffect, useState } from 'react';
import StudentID from '@/pages/Student/StudentID'; // update path if needed

type Student = {
  reg_no: string;
  admission_date:Date;
  personal: {
    full_name: string;
    email: string;
  };
  class: {
    class_name: string;
    grade: string;
    section: string;
  };
};
interface ViewAllStudentsProps {
  students: Student[];
}



const ViewAllStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
 const [filterQuery, setFilterQuery] = useState('');
const [filterClass, setFilterClass] = useState('');
const [filterGrade, setFilterGrade] = useState('');
const [filterSection, setFilterSection] = useState('');
const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
const [showModal, setShowModal] = useState(false);

const [showIDCard, setShowIDCard] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 8;

  useEffect(() => {
    fetchStudents();
  }, []);
const fetchStudents = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/students');
    const data = await res.json();
    console.log("One sample student:", data[0]);

    console.log("Fetched students:", data); 
    setStudents(data.data);  // ✅ Extract array from pagination

  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

const filteredStudents = students.filter((student) => {
  const query = filterQuery.toLowerCase();
  const matchesQuery =
    !filterQuery ||
    student.reg_no.toString().includes(query) ||
    student.personal?.full_name.toLowerCase().includes(query);

  const matchesClass =
    !filterClass || student.class?.class_name === filterClass;

  const matchesGrade =
  !filterGrade || student.class?.grade?.toString().trim() === filterGrade.trim();


  const matchesSection =
    !filterSection || student.class?.section === filterSection;

  return matchesQuery && matchesClass && matchesGrade && matchesSection;
});




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
useEffect(() => {
  setCurrentPage(1);
}, [filterQuery, filterClass, filterGrade, filterSection]);

  return (
   
      <div className="mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-sky-900 mb-4">All Registered Students</h2>
<div className="flex flex-col md:flex-row gap-4 mb-4">
  {/* Reg. No / Name Filter */}
  <select
    value={filterQuery}
    onChange={(e) => setFilterQuery(e.target.value)}
    className="p-2 border border-gray-300 rounded w-full md:w-1/4"
  >
    <option value="">All Reg. No / Name</option>
    {students.map((student) => (
      <option key={student.reg_no} value={student.reg_no}>
        {student.reg_no} - {student.personal?.full_name}
      </option>
    ))}
  </select>

  {/* Class Filter */}
  <select
    value={filterClass}
    onChange={(e) => setFilterClass(e.target.value)}
    className="p-2 border border-gray-300 rounded w-full md:w-1/4"
  >
    <option value="">All Classes</option>
    {[...new Set(students.map((s) => s.class?.class_name))].map(
      (className) =>
        className && (
          <option key={className} value={className}>
            {className}
          </option>
        )
    )}
  </select>

  {/* Grade Filter */}
  <select
    value={filterGrade}
    onChange={(e) => setFilterGrade(e.target.value)}
    className="p-2 border border-gray-300 rounded w-full md:w-1/4"
  >
    <option value="">All Grades</option>
    {[...new Set(students.map((s) => s.class?.grade?.toString().trim()))].map(
  (grade) =>
    grade && (
      <option key={grade} value={grade}>
        {grade}
      </option>
    )
)}

  </select>

  {/* Section Filter */}
  <select
    value={filterSection}
    onChange={(e) => setFilterSection(e.target.value)}
    className="p-2 border border-gray-300 rounded w-full md:w-1/4"
  >
    <option value="">All Sections</option>
    {[...new Set(students.map((s) => s.class?.section))].map(
      (section) =>
        section && (
          <option key={section} value={section}>
            {section}
          </option>
        )
    )}
  </select>
</div>


        {filteredStudents.length === 0 ? (
          <p className="text-gray-500">No matching student data available.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
             <table className="min-w-full text-left border border-gray-300 text-sm md:text-base">

                <thead className="bg-sky-800 text-white">
                  <tr>
                    <th className="px-4 py-2 border">Reg. No</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Class</th>
                    <th className="px-4 py-2 border">Grade</th>
                    <th className="px-4 py-2 border">Section</th>
                    <th className="px-4 py-2 border">Admission Date</th>
                  </tr>
                </thead>
                <tbody>
  {currentStudents.map(student=> (
    <tr
  key={student.reg_no}
  className="hover:bg-yellow-100 cursor-pointer"
  onClick={() => {
    setSelectedStudent(student);
    setShowModal(true);
  }}
>
      <td className="px-4 py-2 border">{student.reg_no}</td>
      <td className="px-4 py-2 border">{student.personal?.full_name ?? '—'}</td>
      <td className="px-4 py-2 border">{student.class?.class_name ?? '—'}</td>
      <td className="px-4 py-2 border">{student.class?.grade ?? '—'}</td>
      <td className="px-4 py-2 border">{student.class?.section ?? '—'}</td>
      <td className="px-4 py-2 border">
  {student.admission_date ? new Date(student.admission_date).toLocaleDateString() : '-'}
</td>

    </tr>
  ))}
</tbody>
{showModal && selectedStudent && (
  <button
  onClick={() => {
    setShowModal(false);
    setShowIDCard(true);
  }}
  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
>
  Generate ID
</button>

)}

              </table>
              {showModal && selectedStudent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-[400px]">
  {/* Close button */}
  <button
    onClick={() => setShowModal(false)}
    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl font-bold"
    aria-label="Close modal"
  >
    &times;
  </button>

  <h2 className="text-xl font-bold mb-4 text-sky-800 text-center">Student Actions</h2>
  <p className="mb-4 text-center">
    What do you want to do for <strong>{selectedStudent.personal.full_name}</strong>?
  </p>

  <div className="flex flex-col gap-3">
    <button
      onClick={() => {
        setShowModal(false);
        setShowIDCard(true);
      }}
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
    >
      Generate ID
    </button>
    <button
      onClick={() => {
        setShowModal(false);
        alert("Performance Card - feature coming soon!");
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      Performance Card
    </button>
  </div>
</div>

  </div>
)}

            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
        {showIDCard && selectedStudent && (
  <StudentID
    student={selectedStudent}
    onClose={() => setShowIDCard(false)}
  />
)}

      </div>
    
  );
  
}

export default ViewAllStudents;
