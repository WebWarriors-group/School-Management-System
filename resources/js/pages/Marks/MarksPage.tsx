import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from "sonner";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '📈 Student Marks',
    href: '/student',
  },
];

interface Mark {
  id: number;
  reg_no: string;
  subject_id: string;
    subject_name?: string;
  marks_obtained: number;
  grade: 'A' | 'B' | 'C' | 'S' | 'F'; // grade for marks
  current_grade?: number;  
  section?: string;   // grade from classes (e.g., "Grade 10")
  year?: number;
   term?: string;
}

const MarksPage: React.FC = () => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingMark, setEditingMark] = useState<Mark | null>(null);
  const [newMark, setNewMark] = useState<Partial<Mark>>({
  reg_no: '',
  subject_id: '',
  subject_name: '',
  marks_obtained: 0,
  grade: 'A',
  term: 'Term 1',
  year: new Date().getFullYear(),     // Prevents year being undefined
  current_grade: 0,
});

 const [searchParams, setSearchParams] = useState<{
  reg_no?: string;
  subject_id?: string;
  marks_obtained?: number;
  grade?: 'A' | 'B' | 'C' | 'S' | 'F';
  current_grade?: string;
  year?: number; 
  term?: string;// 🔥 Add this line
    combined_grade?: string; // e.g. "8-B"
}>({});

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [marksPerPage] = useState<number>(10);
  const [totalMarks, setTotalMarks] = useState<number>(10);
  const [results, setResults] = useState<Mark[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [markToDelete, setMarkToDelete] = useState<Mark | null>(null);
  const [showFilters, setShowFilters] = useState(false);


  const fetchMarks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...Object.entries(searchParams).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>),
        page: String(currentPage),
        limit: String(marksPerPage),
      });

      const response = await fetch(`/marks/?${params}`);
      const data = await response.json();
      setMarks(data.data);
      setResults(data.data);
      setTotalMarks(Number(response.headers.get('x-total-count')) || 0);

      if ((searchParams.reg_no || searchParams.subject_id) && data.data.length === 0) {
        toast.warning("No matching records found.");
      }

    } catch (error) {
      console.error('Error fetching marks:', error);
      toast.error('Error fetching marks');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchParams, marksPerPage]);

  useEffect(() => {
    fetchMarks();
  }, [fetchMarks, searchParams, currentPage]);


  
  const allowedGrades = ["A", "B", "C", "S", "F"] as const;
  type Grade = typeof allowedGrades[number];

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    const newSearchParams: typeof searchParams = {};
    const upperQuery = trimmedQuery.toUpperCase();

    if (allowedGrades.includes(upperQuery as Grade)) {
      newSearchParams.grade = upperQuery as Grade;
    } else if (/^\d+$/.test(trimmedQuery)) {
      newSearchParams.marks_obtained = Number(trimmedQuery);
    } else if (trimmedQuery.length > 0 && trimmedQuery.length <= 10) {
      newSearchParams.subject_id = trimmedQuery;
    } else {
      newSearchParams.reg_no = trimmedQuery;
    }

    setSearchParams(newSearchParams);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const requestDeleteMark = (mark: Mark) => {
    setMarkToDelete(mark);
    setShowDeleteModal(true);
  };

const confirmDeleteMark = async () => {
  if (!markToDelete) return;

  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

  try {
    const response = await fetch(`/marks/${markToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete mark');
    }

    toast.success("Mark deleted successfully!");

    const updatedMarks = marks.filter((m) => m.id !== markToDelete.id);
    const isLastItemOnPage = updatedMarks.length === 0 && currentPage > 1;

    if (isLastItemOnPage) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    } else {
      fetchMarks();
    }
  } catch (error) {
    console.error("Error deleting mark:", error);
    toast.error("Failed to delete mark.");
  } finally {
    setShowDeleteModal(false);
    setMarkToDelete(null);
  }
};


  const handleEditMark = (mark: Mark) => setEditingMark({ ...mark });
  const handleCancelEdit = () => setEditingMark(null);

  const handleSaveEdit = async () => {
  if (!editingMark) return;

  const parsedMarks = Number(editingMark.marks_obtained);
  if (isNaN(parsedMarks)) {
    toast.error("Please enter a valid number for marks.");
    return;
  }

  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

  try {
    const response = await fetch(`/marks/${editingMark.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
      body: JSON.stringify({ ...editingMark, marks_obtained: parsedMarks }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update mark');
    }

    toast.success("Successfully saved!");
    fetchMarks();
    setEditingMark(null);
  } catch (error) {
    console.error('Error updating mark:', error);
    toast.error('Failed to update mark.');
  }
};


 const handleCreateMark = async () => {
  const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

  if (!newMark.reg_no || !newMark.subject_id || !newMark.marks_obtained || !newMark.grade || !newMark.term || !newMark.year) {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch('/marks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken, // ✅ Laravel needs this
      },
      body: JSON.stringify(newMark),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      toast.error("Error adding mark.");
      return;
    }

    const data = await response.json();
    toast.success("Mark added successfully!");
    fetchMarks(); // Refresh list
    setNewMark({ reg_no: '', subject_id: '', marks_obtained: '', grade: '', term: '' });
  } catch (error) {
    console.error("Error adding mark:", error);
    toast.error("Error adding mark.");
  }
};


  const totalPages = Math.ceil(totalMarks / marksPerPage);
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Student Marks" />

       <header className="sticky top-15 flex w-full  border-b  p-4 shadow-sm  bg-white z-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row  md:justify-end">
          
          <p className=" text-blue-600 md:text-lg  md:text-left md:text-base md:mt-2">
            Classes,Students,Subjects Overall performance
          </p>
        </div>
      </header>
      <div className="max-w-screen mx-auto my-5 p-10 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-sky-900 mb-5">Student Marks</h1>
        <Toaster position="top-right" />

       {/* 🔽 Advanced Filter Toggle Button */}
<div className="mb-4 text-right">
  <button
    onClick={() => setShowFilters(prev => !prev)}
    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-red-500 hover:to-yellow-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-all"
  >
    {showFilters ? 'Hide ▲' : 'Search ▼'}
  </button>
</div>

{/* 🔍 Collapsible Advanced Filters */}
{showFilters && (
  <div className="bg-white border border-gray-200 p-6 mb-6 rounded-xl shadow-xl transition-all">
    <h2 className="text-lg font-bold text-gray-700 mb-4">🎯 Search</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Reg No */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">🔢 Reg No</label>
        <input
          type="text"
          value={searchParams.reg_no || ''}
          onChange={(e) => setSearchParams(prev => ({ ...prev, reg_no: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-500 text-sm"
          placeholder="Enter Reg No"
        />
      </div>

      {/* 2. Current Grade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">🎓 Current Grade</label>
        <input
          type="text"
          value={searchParams.current_grade || ''}
          onChange={(e) => setSearchParams(prev => ({ ...prev, current_grade: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-500 text-sm"
          placeholder="e.g. 8-B"
        />
      </div>

      {/* 3. Term */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">📘 Term</label>
        <select
          value={searchParams.term || ''}
          onChange={(e) => setSearchParams(prev => ({ ...prev, term: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-500 text-sm"
        >
          <option value="">All</option>
          <option value="Term 1">Term 1</option>
          <option value="Term 2">Term 2</option>
          <option value="Term 3">Term 3</option>
        </select>
      </div>

      {/* 4. Year */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">📅 Year</label>
        <input
          type="number"
          value={searchParams.year || ''}
          onChange={(e) => setSearchParams(prev => ({ ...prev, year: Number(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-500 text-sm"
          placeholder="e.g. 2024"
        />
      </div>

      {/* 5. Subject ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">🆔 Subject ID</label>
        <input
          type="text"
          value={searchParams.subject_id || ''}
          onChange={(e) => setSearchParams(prev => ({ ...prev, subject_id: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-500 text-sm"
          placeholder="e.g. MAT101"
        />
      </div>

      {/* 6. Subject Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">📖 Subject Name</label>
        <input
          type="text"
          value={searchParams.subject_name || ''}
          onChange={(e) => setSearchParams(prev => ({ ...prev, subject_name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-500 text-sm"
          placeholder="e.g. Mathematics"
        />
      </div>

      {/* 7. Marks Obtained */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">✍️ Marks</label>
        <input
          type="number"
          value={searchParams.marks_obtained || ''}
          onChange={(e) => setSearchParams(prev => ({ ...prev, marks_obtained: Number(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-500 text-sm"
          placeholder="e.g. 85"
        />
      </div>

      {/* 8. Grade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">🏅 Grade</label>
        <select
          value={searchParams.grade || ''}
          onChange={(e) => setSearchParams(prev => ({ ...prev, grade: e.target.value as Mark["grade"] }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-500 text-sm"
        >
          <option value="">All</option>
          {allowedGrades.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
    </div>

    {/* 🔄 Reset Button */}
    <div className="mt-6 text-right">
      <button
        onClick={() => setSearchParams({})}
        className="bg-blue-800 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-sm"
      >
        Reset
      </button>
    </div>
  </div>
)}

        {/* Table */}
        {loading ? <p>Loading...</p> : (
          <table className="w-full table-auto bg-white rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-sky-900 text-white font-bold">
                <th className="px-5 py-3 text-center">Reg No</th>
                <th className="px-5 py-3 text-center">Current Grade</th>
                <th className="px-5 py-3 text-center">Term</th>
                <th className="px-5 py-3 text-center">Year</th>
                <th className="px-5 py-3 text-center">Subject ID</th>
                 <th className="px-5 py-3 text-center">Subject Name</th>
                <th className="px-5 py-3 text-center">Marks Obtained</th>
                <th className="px-5 py-3 text-center">Grade</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Add New Mark Row */}
              <tr>
                <td className="px-1 py-2 text-center">
                  <input type="text" value={newMark.reg_no}
                    onChange={(e) => setNewMark({ ...newMark, reg_no: e.target.value })}
                    className="px-2 py-1 border rounded" />
                </td>
              <td className="px-1 py-2 text-center">
  <select
    value={newMark.current_grade || ''}
    onChange={(e) =>
      setNewMark({ ...newMark, current_grade: e.target.value })
    }
    className="px-2 py-1 border rounded"
  >
    <option value="">Select Grade</option>
    {Array.from({ length: 8 }, (_, i) => 6 + i).map((grade) =>
      ['A', 'B', 'C', 'D', 'E', 'F'].map((section) => {
        const value = `${grade}-${section}`;
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })
    )}
  </select>
</td>

              <td className="px-1 py-2 text-center">
  <select
    value={newMark.term || ''}
    onChange={(e) => setNewMark({ ...newMark, term: e.target.value })}
    className="px-2 py-1 border rounded"
  >
    <option value="">Select Term</option>
    <option value="Term 1">Term 1</option>
    <option value="Term 2">Term 2</option>
    <option value="Term 3">Term 3</option>
  </select>
</td>

 
                <td className="px-1 py-2 text-center">
                  <input type="number" value={newMark.year}
                    onChange={(e) => setNewMark({ ...newMark, year: parseInt(e.target.value)})}
                    className="px-2 py-1 border rounded" />
                </td>
                <td className="px-1 py-2 text-center">
                  <input type="number" value={newMark.subject_id}
                    onChange={(e) => setNewMark({ ...newMark, subject_id: e.target.value })}
                    className="px-2 py-1 border rounded" />
                </td>
                   <td className="px-1 py-2 text-center">
                  <input type="text" value={newMark.subject_name}
                    onChange={(e) => setNewMark({ ...newMark, subject_name: e.target.value })}
                    className="px-2 py-1 border rounded" />
                </td>
                <td className="px-1 py-2 text-center">
                  <input type="number" value={newMark.marks_obtained}
                    onChange={(e) => setNewMark({ ...newMark, marks_obtained: parseInt(e.target.value) || 0 })}
                    className="px-2 py-1 border rounded" />
                </td>
                <td className="px-1 py-2 text-center">
                  <select value={newMark.grade}
                    onChange={(e) => setNewMark({ ...newMark, grade: e.target.value as Mark["grade"] })}
                    className="px-2 py-1 border rounded">
                    {allowedGrades.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </td>
                <td className="px-1 py-2 text-center">
                  <button onClick={handleCreateMark} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-500">
                    Add
                  </button>
                </td>
              </tr>

              {/* Existing Marks */}
              {results.map((mark) => (
                <React.Fragment key={mark.id}>
                  <tr className="hover:bg-gray-200">
                    <td className="px-5 py-3 text-center">
                      <Link
    href={`/mark/ReportPage/${mark.reg_no}?from=mark`}
    className="text-black hover:text-blue-600 font-semibold underline-offset-2 hover:underline transition duration-200"
  >
    {mark.reg_no}
  </Link>
                    </td>
                    <td className="px-5 py-3 text-center">
                    {mark.current_grade && mark.section
                     ? `${mark.current_grade}-${mark.section}`
                    : mark.current_grade ?? '-'}
</td>

                    <td className="px-5 py-3 text-center">{mark.term?.trim() || '-'}</td>
                      <td className="px-5 py-3 text-center">{mark.year}</td>
                    <td className="px-5 py-3 text-center">{mark.subject_id}</td>
                    <td className="px-5 py-3 text-center">{mark.subject_name ?? '-'}</td>
                    <td className="px-5 py-3 text-center">{mark.marks_obtained}</td>
                    <td className="px-5 py-3 text-center">{mark.grade}</td>
                    <td className="px-5 py-3 text-center">
                      <button onClick={() => requestDeleteMark(mark)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-300 transition duration-300">
                        Delete
                      </button>
                      <button onClick={() => handleEditMark(mark)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-300 transition duration-300 ml-2">
                        Edit
                      </button>
                    </td>
                  </tr>
                  {editingMark && editingMark.id === mark.id && (
                    <tr>
                      <td className="px-5 py-3 text-center">
                        <input type="text" value={editingMark.reg_no}
                          onChange={(e) => setEditingMark({ ...editingMark, reg_no: e.target.value })}
                          className="px-2 py-1 border rounded" />
                      </td>
                       <td className="px-5 py-3 text-center">
                        <input type="number" value={editingMark.current_grade}
                          onChange={(e) => setEditingMark({ ...editingMark, current_grade: e.target.value })}
                          className="px-2 py-1 border rounded" />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <input type="text" value={editingMark.term}
                          onChange={(e) => setEditingMark({ ...editingMark, term: e.target.value })}
                          className="px-2 py-1 border rounded" />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <input type="text" value={editingMark.year}
                          onChange={(e) => setEditingMark({ ...editingMark, year: e.target.value })}
                          className="px-2 py-1 border rounded" />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <input type="text" value={editingMark.subject_id}
                          onChange={(e) => setEditingMark({ ...editingMark, subject_id: e.target.value })}
                          className="px-2 py-1 border rounded" />
                      </td>
                        <td className="px-5 py-3 text-center">
                        <input type="text" value={editingMark.subject_name}
                          onChange={(e) => setEditingMark({ ...editingMark, subject_name: e.target.value })}
                          className="px-2 py-1 border rounded" />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <input type="number" value={editingMark.marks_obtained}
                          onChange={(e) => setEditingMark({ ...editingMark, marks_obtained: Number(e.target.value) })}
                          className="px-2 py-1 border rounded" />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <select value={editingMark.grade}
                          onChange={(e) => setEditingMark({ ...editingMark, grade: e.target.value as Grade })}
                          className="px-2 py-1 border rounded">
                          {allowedGrades.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <button onClick={handleSaveEdit}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400">
                          Save
                        </button>
                        <button onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 ml-2">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {!loading && marks.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">No data to display.</td>
                </tr>
              )}
              <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => {
                  setShowDeleteModal(false);
                  setMarkToDelete(null);
                }}
                onConfirm={confirmDeleteMark}
              />
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="mt-5">
          <div className="flex justify-between items-center px-4">
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md font-semibold ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>
              Previous
            </button>
            <button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md font-semibold ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>
              Next
            </button>
          </div>
          <div className="flex justify-center mt-3 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md font-semibold ${currentPage === index + 1 ? 'bg-red-700 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MarksPage;
