import React, { useState, useEffect, useRef } from 'react';
import { Student, PersonalRecord, SiblingsRecord } from '@/types';
import ViewStudent from '../Admin/ViewStudent';
import StudentPreviewCard from './StudentPreviewCard';
import { Eye } from 'lucide-react';

interface SiblingsTableProps {
  siblingsData: SiblingsRecord[];
}

export default function SiblingsTable({ siblingsData }: SiblingsTableProps) {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<number | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Preview states for click preview card
  const [previewStudent, setPreviewStudent] = useState<PersonalRecord | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

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

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterClass]);

  // Close preview card if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        setPreviewStudent(null);
        setPreviewPosition(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle row click to fetch preview data and show preview card near clicked row
  const handleRowClick = async (e: React.MouseEvent, reg_no: number) => {
    try {
      const res = await fetch(`/api/students/${reg_no}`);
      if (!res.ok) throw new Error('Failed to fetch student preview');
      const data = await res.json();
      setPreviewStudent(data as PersonalRecord);

      // Set preview position near the click
      setPreviewPosition({ x: e.clientX, y: e.clientY });
    } catch (err) {
      console.error('Click preview fetch error:', err);
      setPreviewStudent(null);
      setPreviewPosition(null);
    }
  };

  // Open modal with full details on double click or separate button (optional)
  const handleViewIconClick = async (e: React.MouseEvent, reg_no: number) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/students/${reg_no}`);
      const data = await response.json();
      if (response.ok) {
        setSelectedStudent(data as Student);
        setIsViewModalOpen(true);
        setPreviewStudent(null); // Close preview when modal opens
      } else {
        alert('Failed to load student details.');
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      alert('An error occurred while loading the student data.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-300 ml-[-40px]">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">👤 Siblings Information</h2>

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

      <div className="overflow-x-auto w-290">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-blue-100 text-black">
            <tr>
              <th className=" sticky left-4 z-40 py-4 px-12 border">Reg. No</th>
              <th className="  px-12  border">Student ID</th>
              <th className="  px-16  border">Sibling Name</th>
              <th className="  px-12  border">Relationship</th>
              <th className="  px-12  border">Age</th>
              <th className="  px-12  border">Occupation</th>
              <th className="  px-12  border">Contact</th>
              <th className="  px-12  border">View</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              currentData.map((s, i) => (
                <tr
                  key={i}
                  className="cursor-pointer border-t hover:bg-green-50"
                  onClick={(e) => handleRowClick(e, s.reg_no)}
                >
                  <td className="py-6 border sticky left-4 z-40">{s.reg_no}</td>
                  <td className="p-2 border">{s.student_id_no || '-'}</td>
                  <td className=" border">{s.sibling_name || '-'}</td>
                  <td className="p-2 border">{s.relationship || '-'}</td>
                  <td className="p-2 border">{s.sibling_age ?? '-'}</td>
                  <td className="p-2 border">{s.occupation || '-'}</td>
                  <td className="p-2 border">{s.contact || '-'}</td>
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
