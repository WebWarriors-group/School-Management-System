import React, { useState, useEffect } from 'react';
import { PersonalRecord } from '@/types';

interface PersonalTableProps {
  personalData: PersonalRecord[];
}

export default function PersonalTable({ personalData }: PersonalTableProps) {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<number | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const uniqueClasses = Array.from(new Set(personalData.map((s) => s.class_id))).sort((a, b) => a - b);

  const filteredData = personalData.filter((s) => {
    const searchLower = search.toLowerCase();
    return (
      (!search || s.student_id_no.toLowerCase().includes(searchLower) || s.reg_no.toString().includes(search)) &&
      (!filterClass || s.class_id === filterClass)
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterClass]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-full">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">👤 Personal Information</h2>


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


      <div className="w-full overflow-x-auto">

        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="p-2 border">Reg. No</th>
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Full Name with Initial</th>
              <th className="p-2 border">Birthday</th>
              <th className="p-2 border">Ethnicity</th>
              <th className="p-2 border">Religion</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Birth Certificate No</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">NIC Number</th>
              <th className="p-2 border">Postal IC Number</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Special Needs</th>
              <th className="p-2 border">Height (cm)</th>
              <th className="p-2 border">Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={15} className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              currentData.map((s) => (
                <tr key={s.reg_no} className="border-t hover:bg-green-50">
                  <td className="p-2 border">{s.reg_no}</td>
                  <td className="p-2 border">{s.full_name}</td>
                  <td className="p-2 border">{s.full_name_with_initial}</td>
                  <td className="p-2 border">{s.birthday}</td>
                  <td className="p-2 border">{s.ethnicity}</td>
                  <td className="p-2 border">{s.religion}</td>
                  <td className="p-2 border">{s.gender}</td>
                  <td className="p-2 border">{s.birth_certificate_number || '-'}</td>
                  <td className="p-2 border">{s.address}</td>
                  <td className="p-2 border">{s.nic_number || '-'}</td>
                  <td className="p-2 border">{s.postal_ic_number || '-'}</td>
                  <td className="p-2 border">{s.age}</td>
                  <td className="p-2 border">{s.special_needs || '-'}</td>
                  <td className="p-2 border">{s.height ?? '-'}</td>
                  <td className="p-2 border">{s.weight ?? '-'}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>


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
