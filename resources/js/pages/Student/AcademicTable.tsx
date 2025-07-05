import React, { useEffect, useState } from 'react';

type AcademicRecord = {
  reg_no: number;
  student_id_no: string;
  class_id: number;
  distance_to_school: number | null;
  method_of_coming_to_school: string | null;
  grade_6_9_asthectic_subjects: string | null;
  grade_10_11_basket1_subjects: string | null;
  grade_10_11_basket2_subjects: string | null;
  grade_10_11_basket3_subjects: string | null;
  receiving_any_scholarship: boolean;
};

type AcademicTableProps = {
  academicData: AcademicRecord[];
};

export default function AcademicTable({ academicData }: AcademicTableProps) {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<number | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Get unique class IDs for class filter dropdown
  const uniqueClasses = Array.from(new Set(academicData.map((a) => a.class_id))).sort(
    (a, b) => a - b
  );

  // Filtering logic
  const filteredData = academicData.filter((student) => {
    const matchesSearch =
      !search ||
      student.reg_no.toString().includes(search) ||
      student.student_id_no.toLowerCase().includes(search.toLowerCase());

    const matchesClass = !filterClass || student.class_id === filterClass;

    return matchesSearch && matchesClass;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Reset page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterClass]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-full">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📘 Academic Information</h2>


      <div className="flex flex-col md:flex-row gap-4 mb-4">

        <input
          type="text"
          placeholder="Search by Reg. No or Student ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />


        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value ? Number(e.target.value) : '')}
          className="p-2 border border-gray-300 rounded w-full md:w-1/4"
        >
          <option value="">All Classes</option>
          {uniqueClasses.map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="p-2 border">Reg. No</th>
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Distance</th>
              <th className="p-2 border">Method</th>
              <th className="p-2 border">Grade 6–9 Aesthetic</th>
              <th className="p-2 border">Grade 10–11 Basket1</th>
              <th className="p-2 border">Grade 10–11 Basket2</th>
              <th className="p-2 border">Grade 10–11 Basket3</th>
              <th className="p-2 border">Scholarship</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              currentData.map((student) => (
                <tr key={student.reg_no} className="border-t hover:bg-blue-50 cursor-pointer">
                  <td className="p-2 border">{student.reg_no}</td>
                  <td className="p-2 border">{student.student_id_no}</td>
                  <td className="p-2 border">{student.class_id}</td>
                  <td className="p-2 border">{student.distance_to_school ?? '—'}</td>
                  <td className="p-2 border">{student.method_of_coming_to_school ?? '—'}</td>
                  <td className="p-2 border">{student.grade_6_9_asthectic_subjects ?? '—'}</td>
                  <td className="p-2 border">{student.grade_10_11_basket1_subjects ?? '—'}</td>
                  <td className="p-2 border">{student.grade_10_11_basket2_subjects ?? '—'}</td>
                  <td className="p-2 border">{student.grade_10_11_basket3_subjects ?? '—'}</td>
                  <td className="p-2 border">{student.receiving_any_scholarship ? 'Yes' : 'No'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
