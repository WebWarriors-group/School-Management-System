import React, { useState, useEffect, useRef } from 'react';
import { Student, FamilyRecord } from '@/types';
import ViewStudent from '../Admin/ViewStudent';
import StudentPreviewCard from './StudentPreviewCard';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface FamilyTableProps {
  familyData: FamilyRecord[];
}

const FamilyTable = ({ familyData }: FamilyTableProps) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [previewStudent, setPreviewStudent] = useState<FamilyRecord | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleViewIconClick = async (e: React.MouseEvent, reg_no: number) => {
    e.stopPropagation(); // prevent row click
    try {
      const response = await fetch(`/api/students/${reg_no}`);
      const data = await response.json();
      if (response.ok) {
        setSelectedStudent(data as Student);
        setIsViewModalOpen(true);
        setPreviewStudent(null); // close preview on modal open
      } else {
        alert("Failed to load student details.");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      alert("An error occurred while loading the student data.");
    }
  };

  const handleRowClick = (e: React.MouseEvent, student: FamilyRecord) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPreviewPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    });
    setPreviewStudent(student);
  };

  // Close preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (previewRef.current && !previewRef.current.contains(e.target as Node)) {
        setPreviewStudent(null);
        setPreviewPosition(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredData = familyData.filter((s) => {
    const searchLower = search.toLowerCase();
    return !search || s.reg_no.toString().includes(searchLower);
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
              <th className="p-2 border font-semibold whitespace-nowrap">Reg. No</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Mother Name</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Mother Occupation</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Mother Income</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Mother Working Place</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Mother Contact</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Mother Email</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Mother WhatsApp</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Father Name</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Father Occupation</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Father Income</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Father Working Place</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Father Contact</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Father Email</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Father WhatsApp</th>
              <th className="p-2 border font-semibold whitespace-nowrap">View</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={16} className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              currentData.map((s) => (
                <tr
                  key={s.reg_no}
                  className="cursor-pointer border-t hover:bg-green-50"
                  onClick={(e) => handleRowClick(e, s)}
                >
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
                  <td className="p-2 border">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={(e) => handleViewIconClick(e, s.reg_no)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="View full details"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
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

      <ViewStudent
        student={selectedStudent}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onStudentUpdated={(updated) => {
          setSelectedStudent(updated);
        }}
      />

      {previewStudent && previewPosition && (
        <div ref={previewRef}>
          <StudentPreviewCard
            student={{
              reg_no: previewStudent.reg_no,
              class_id: previewStudent.class_id,
              student_id_no: previewStudent.student_id_no
            }}
            position={previewPosition}
          />
        </div>
      )}
    </div>
  );
};

export default FamilyTable;
