import React, { useState, useEffect } from 'react';
import { FamilyRecord } from '@/types';

interface FamilyTableProps {
  familyData: FamilyRecord[];
}


const FamilyTable = ({ familyData }: FamilyTableProps) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const filteredData = familyData.filter((s) => {
    const searchLower = search.toLowerCase();
    return (
      !search || s.reg_no.toString().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-full">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">👨‍👩‍👧‍👦 Family Information</h2>


      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Reg. No"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="p-2 border">Reg. No</th>
              <th className="p-2 border">Mother Name</th>
              <th className="p-2 border">Mother Occupation</th>
              <th className="p-2 border">Mother Income</th>
              <th className="p-2 border">Mother Working Place</th>
              <th className="p-2 border">Mother Contact</th>
              <th className="p-2 border">Mother Email</th>
              <th className="p-2 border">Mother WhatsApp</th>
              <th className="p-2 border">Father Name</th>
              <th className="p-2 border">Father Occupation</th>
              <th className="p-2 border">Father Income</th>
              <th className="p-2 border">Father Working Place</th>
              <th className="p-2 border">Father Contact</th>
              <th className="p-2 border">Father Email</th>
              <th className="p-2 border">Father WhatsApp</th>
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
                  <td className="p-2 border">{s.mother_name?.trim() || 'Not provided'}</td>
                  <td className="p-2 border">{s.mother_occupation || '-'}</td>
                  <td className="p-2 border">{s.mother_income ?? '-'}</td>
                  <td className="p-2 border">{s.mother_working_place || '-'}</td>
                  <td className="p-2 border">{s.mother_contact || '-'}</td>
                  <td className="p-2 border">{s.mother_email || '-'}</td>
                  <td className="p-2 border">{s.mother_whatsapp || '-'}</td>

                  <td className="p-2 border">{s.father_name?.trim() || 'Not provided'}</td>
                  <td className="p-2 border">{s.father_occupation || '-'}</td>
                  <td className="p-2 border">{s.father_income ?? '-'}</td>
                  <td className="p-2 border">{s.father_working_place || '-'}</td>
                  <td className="p-2 border">{s.father_contact || '-'}</td>
                  <td className="p-2 border">{s.father_email || '-'}</td>
                  <td className="p-2 border">{s.father_whatsapp || '-'}</td>

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
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>
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
export default FamilyTable;