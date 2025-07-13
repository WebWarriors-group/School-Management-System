import React, { useState, useEffect, useRef } from 'react';
import { Student, PersonalRecord } from '@/types';
import ViewStudent from '../Admin/ViewStudent';
import StudentPreviewCard from './StudentPreviewCard';
import { Eye } from 'lucide-react';

interface PersonalTableProps {
  personalData: PersonalRecord[];
}

export default function PersonalTable({ personalData }: PersonalTableProps) {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<number | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [previewStudent, setPreviewStudent] = useState<PersonalRecord | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleRowClick = (e: React.MouseEvent, student: PersonalRecord) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPreviewPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    });
    setPreviewStudent(student);
  };

  const handleViewIconClick = async (e: React.MouseEvent, reg_no: number) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/students/${reg_no}`);
      const data = await response.json();
      if (response.ok) {
        setSelectedStudent(data as Student);
        setIsViewModalOpen(true);
        setPreviewStudent(null); // close preview if modal opens
      } else {
        alert("Failed to load student details.");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      alert("An error occurred while loading the student data.");
    }
  };

  // Close preview if clicking outside preview card
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        setPreviewStudent(null);
        setPreviewPosition(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="p-6 bg-white shadow-md rounded-lg w-300 ml-[-40px]">
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
          <thead className="bg-blue-100 text-black">
            <tr>
              <th className="py-5 px-12 border font-semibold whitespace-nowrap">Reg. No</th>
              <th className="p-2 px-12 border font-semibold whitespace-nowrap">Full Name</th>
              <th className="p-2 px-12 border font-semibold whitespace-nowrap">Full Name with Initial</th>
              <th className="p-2 px-12 border">Birthday</th>
              <th className="p-2 px-12 border">Ethnicity</th>
              <th className="p-2 px-12 border">Religion</th>
              <th className="p-2 px-12 border">Gender</th>
              <th className="p-2 px-12 border font-semibold whitespace-nowrap">Birth Certificate No</th>
              <th className="p-2 px-12 border">Address</th>
              <th className="p-2 px-12 border font-semibold whitespace-nowrap">NIC Number</th>
              <th className="p-2 px-12 border font-semibold whitespace-nowrap">Postal IC Number</th>
              <th className="p-2 px-12 border">Age</th>
              <th className="p-2 px-12 border font-semibold whitespace-nowrap">Special Needs</th>
              <th className="p-2 px-12 border font-semibold whitespace-nowrap">Height (cm)</th>
              <th className="p-2 px-12 border font-semibold whitespace-nowrap">Weight (kg)</th>
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
                  <td className="py-6 border">{s.reg_no}</td>
                  <td className="p-2 border whitespace-nowrap">{s.full_name}</td>
                  <td className="p-2 border">{s.full_name_with_initial}</td>
                  <td className="p-2 border">{s.birthday}</td>
                  <td className="p-2 border">{s.ethnicity}</td>
                  <td className="p-2 border">{s.religion}</td>
                  <td className="p-2 border">{s.gender}</td>
                  <td className="p-2 border">{s.birth_certificate_number || '-'}</td>
                  <td className="p-2 border whitespace-nowrap">{s.address}</td>
                  <td className="p-2 border">{s.nic_number || '-'}</td>
                  <td className="p-2 border">{s.postal_ic_number || '-'}</td>
                  <td className="p-2 border">{s.age}</td>
                  <td className="p-2 border">{s.special_needs || '-'}</td>
                  <td className="p-2 border">{s.height ?? '-'}</td>
                  <td className="p-2 border">{s.weight ?? '-'}</td>
                  <td className="p-2 border">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewIconClick(e, s.reg_no);
                      }}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      title="View full details"
                    >
                    <Eye size={18} />
                    </button>
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
          <StudentPreviewCard student={previewStudent} position={previewPosition} />
        </div>
      )}
    </div>
  );
}
