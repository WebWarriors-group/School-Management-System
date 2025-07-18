import React, { useEffect, useState, useRef } from 'react';
import { PersonalRecord } from '@/types';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import ViewStudent from '../Admin/ViewStudent';
import StudentPreviewCard from './StudentPreviewCard';

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
  receiving_any_grade_5_scholarship: boolean;
  receiving_any_samurdhi_aswesuma: boolean;
  admission_date: string; 
};

type PaginationData<T> = {
  current_page: number;
  data: T[];
  total: number;
  per_page: number;
  last_page: number;
};

type AcademicTableProps = {
  academicData: PaginationData<AcademicRecord>;
};

export default function AcademicTable({ academicData }: AcademicTableProps) {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<number | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const [selectedStudent, setSelectedStudent] = useState<AcademicRecord | null>(null);
  const [previewStudent, setPreviewStudent] = useState<AcademicRecord | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleRowClick = (e: React.MouseEvent, student: AcademicRecord) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPreviewPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    });
    setPreviewStudent(student);
  };

  const handleViewIconClick = async (e: React.MouseEvent, reg_no: number) => {
    e.stopPropagation(); // Prevent row click from triggering
    
    try {
      const response = await fetch(`/api/students/${reg_no}`);
      const data = await response.json();
      if (response.ok) {
        setSelectedStudent(data as AcademicRecord);
        setIsViewModalOpen(true);
        setPreviewStudent(null); 
      } else {
        alert("Failed to load student details.");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      alert("An error occurred while loading the student data.");
    }
  };

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

  if (!academicData || !academicData.data) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg max-w-full">
       
        <p className="text-gray-500">No academic data available.</p>
      </div>
    );
  }

  const uniqueClasses = Array.from(new Set(academicData.data.map((a) => a.class_id))).sort(
    (a, b) => a - b
  );

  const filteredData = academicData.data.filter((student) => {
    const matchesSearch =
      !search ||
      student.reg_no.toString().includes(search) ||
      student.student_id_no.toLowerCase().includes(search.toLowerCase());

    const matchesClass = !filterClass || student.class_id === filterClass;

    return matchesSearch && matchesClass;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterClass]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (

    
    <div className="p-6 bg-white shadow-md rounded-lg w-300 ml-[-40px]">
      

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

      <div className="overflow-x-auto w-290 ">
        <table className="min-w-full  text-sm text-gray-700">
          <thead className="bg-blue-700 text-left text-sm font-semibold uppercase text-white z-10" >
            <tr>
              <th className="py-3 border font-semibold whitespace-nowrap ">Reg. No</th>
              <th className="z-5 p-2 border font-semibold ">Student ID</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Class</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Distance</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Method</th>
              <th className="p-2 border font-semibold whitespace-nowrap min-w-[120px]">Grade 6–9 Aesthetic</th>
              <th className="p-2 border font-semibold whitespace-nowrap min-w-[140px]">Grade 10–11 Basket1</th>
              <th className="p-2 border font-semibold whitespace-nowrap min-w-[140px]">Grade 10–11 Basket2</th>
              <th className="p-2 border font-semibold whitespace-nowrap min-w-[140px]">Grade 10–11 Basket3</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Grade 5 Scholarship</th>
              <th className="p-2 border font-semibold whitespace-nowrap">Aswesuma Scholarship</th>
              <th className="p-1 border font-semibold whitespace-nowrap">Any Other Scholarship</th>
              <th className="p-2  w-2 border font-semibold whitespace-nowrap">View</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={13} className="px-6 py-6 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              currentData.map((student) => (
                <tr 
                  key={student.reg_no} 
                  className="border-b hover:bg-blue-50 cursor-pointer"
                  onClick={(e) => handleRowClick(e, student)}
                >
                  <td className="py-4 px-12 border bg-blue-300 font-semibold text-black ">{student.reg_no}</td>
                  <td className="py-3 px-12 border">{student.student_id_no}</td>
                  <td className="p-2 px-12 border">{student.class_id}</td>
                  <td className="p-2 px-12 border">{student.distance_to_school ?? '—'}</td>
                  <td className="p-2 px-12 border">{student.method_of_coming_to_school ?? '—'}</td>
                  <td className="p-2 px-12 border whitespace-nowrap">{student.grade_6_9_asthectic_subjects ?? '—'}</td>
                  <td className="p-2 px-12 border whitespace-nowrap ">{student.grade_10_11_basket1_subjects ?? '—'}</td>
                  <td className="p-2  px-10 border whitespace-nowrap">{student.grade_10_11_basket2_subjects ?? '—'}</td>
                  <td className="p-2 px-12 border whitespace-nowrap ">{student.grade_10_11_basket3_subjects ?? '—'}</td>
                  <td className="p-2 px-10 border">
                    {student.receiving_any_grade_5_scholarship ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-500 font-medium">No</span>
                    )}
                  </td>
                  <td className="p-2 border">
                    {student.receiving_any_samurdhi_aswesuma ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-500 font-medium">No</span>
                    )}
                  </td>
                  <td className="p-2 border">
                    {student.receiving_any_scholarship ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-500 font-medium">No</span>
                    )}
                  </td>
                  <td className="p-2 border">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={(e) => handleViewIconClick(e, student.reg_no)}
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
          onClick={prevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          Next <ChevronRight size={16} />
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
}