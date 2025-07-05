import React, { useState, useEffect } from 'react';
import { SiblingsRecord } from '@/types';

interface SiblingsTableProps {
  siblingsData: SiblingsRecord[];
}

export default function SiblingsTable({ siblingsData }: SiblingsTableProps) {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<number | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
const uniqueClasses = Array.from(
  new Set(siblingsData.map((s) => s.class_id).filter((cls) => cls !== undefined))
).sort((a, b) => a - b);

const filteredData = siblingsData.filter((s) => {
  const searchLower = search.toLowerCase();
  return (
    (!search ||
      (s.student_id_no?.toLowerCase().includes(searchLower) ?? false) ||
      s.reg_no.toString().includes(search)) &&
    (!filterClass || s.class_id === filterClass)
  );
});

console.log("Original Data:", siblingsData);
console.log("Filtered Siblings:", filteredData);


  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterClass]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-full">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">👤 Siblings Information</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Reg. No or ID"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          
          
            <thead className="bg-green-100 text-green-800">
  <tr>
    <th className="p-2 border">Reg. No</th>
    <th className="p-2 border">Student ID</th>
    <th className="p-2 border">Sibling Name</th>
    <th className="p-2 border">Relationship</th>
    <th className="p-2 border">Age</th>
    <th className="p-2 border">Occupation</th>
    <th className="p-2 border">Contact</th>
  </tr>
</thead>
<tbody>
  {currentData.length === 0 ? (
    <tr>
      <td colSpan={7} className="text-center p-4 text-gray-500">
        No records found.
      </td>
    </tr>
  ) : (
    currentData.map((s, i) => (
      <tr key={i} className="border-t hover:bg-green-50">
        <td className="p-2 border">{s.reg_no}</td>
        <td className="p-2 border">{s.student_id_no || '-'}</td>
        <td className="p-2 border">{s.sibling_name || '-'}</td>
        <td className="p-2 border">{s.relationship || '-'}</td>
        <td className="p-2 border">{s.sibling_age ?? '-'}</td>
        <td className="p-2 border">{s.occupation || '-'}</td>
        <td className="p-2 border">{s.contact || '-'}</td>
      </tr>
    ))
  )}
</tbody>


        </table>
      </div>


      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages || 1}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
