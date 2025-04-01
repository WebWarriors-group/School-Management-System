import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppLayout from "@/layouts/app-layout";
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'toggle screen',
        
        href: '/student',
    },

    
];

interface Mark {
  id?: number;
  reg_no: string;
  subject_id: string;
  marks_obtained: number;
  grade: 'A' | 'B' | 'C' | 'S' | 'F';
}

const MarksPage: React.FC = () => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingMark, setEditingMark] = useState<Mark | null>(null);
  const [newMark, setNewMark] = useState<Mark>({ reg_no: '', subject_id: '', marks_obtained: 0, grade: 'A' });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [marksPerPage] = useState<number>(10);
  const [totalMarks, setTotalMarks] = useState<number>(0);

  const [searchRegNo, setSearchRegNo] = useState<string>('');
  const [searchSubjectId, setSearchSubjectId] = useState<string>('');

  const fetchMarks = useCallback(async (searchParams: { reg_no?: string; subject_id?: string }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...searchParams,
        page: currentPage.toString(),
        limit: marksPerPage.toString(),
      });
      const response = await fetch(`/api/marks/?${params}`);
      const data = await response.json();
      setMarks(data.data);
      setTotalMarks(Number(response.headers.get('x-total-count')) || 0);
    } catch (error) {
      console.error('Error fetching marks:', error);
      toast.error('Error fetching marks');
    } finally {
      setLoading(false);
    }
  }, [currentPage, marksPerPage]);

  useEffect(() => {
    fetchMarks({});
  }, [fetchMarks]);

  const handleSearch = () => {
    fetchMarks({ reg_no: searchRegNo, subject_id: searchSubjectId });
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleDeleteMark = async (id: number) => {
    try {
      await fetch(`/api/marks/${id}`, { method: 'DELETE' });
      setMarks((prevMarks) => prevMarks.filter((mark) => mark.id !== id));
      toast.success('Mark deleted successfully!');
    } catch (error) {
      console.error('Error deleting mark:', error);
      toast.error('Failed to delete mark.');
    }
  };

  const handleEditMark = (mark: Mark) => setEditingMark({ ...mark });

  const handleCancelEdit = () => setEditingMark(null);

  const handleSaveEdit = async () => {
    if (!editingMark) return;
    try {
      await fetch(`/api/marks/${editingMark.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMark),
      });
      toast.success('Mark updated successfully!');
      fetchMarks({});
      setEditingMark(null);
    } catch (error) {
      console.error('Error updating mark:', error);
      toast.error('Failed to update mark.');
    }
  };

  const handleCreateMark = async () => {
    try {
      const response = await fetch('/api/marks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMark),
      });
  
      if (response.ok) {
        const createdMark = await response.json();
        setMarks([createdMark.mark, ...marks]); // Adds the new mark at the start of the list
        setNewMark({ reg_no: '', subject_id: '', marks_obtained: 0, grade: 'A' }); // Reset form
        toast.success('Mark added successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to add mark: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding mark:', error);
      toast.error('Failed to add mark.');
    }
  };

  const totalPages = Math.ceil(totalMarks / marksPerPage);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Study Materials" />
      <div className="max-w-screen mx-auto my-5 p-10 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-red-700 mb-5">Student Marks</h1>
        <ToastContainer />

        <div className="flex justify-center items-center gap-3 mb-5 p-3 bg-white rounded-lg shadow-sm max-w-screen mx-auto">
          <input
            type="text"
            placeholder="Search by Reg No"
            value={searchRegNo}
            onChange={(e) => setSearchRegNo(e.target.value)}
            className="flex-1 p-3 border border-red-700 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-red-700"
          />
          <input
            type="text"
            placeholder="Search by Subject ID"
            value={searchSubjectId}
            onChange={(e) => setSearchSubjectId(e.target.value)}
            className="flex-1 p-3 border border-red-700 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-red-700"
          />
          <button
            onClick={handleSearch}
            className="bg-red-700 text-white px-6 py-3 text-lg font-bold rounded-md transition duration-300 ease-in-out hover:bg-red-600"
          >
            Search
          </button>
        </div>

        {loading ? <p>Loading...</p> : (
          <table className="w-full table-auto bg-white rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-red-700 text-white font-bold">
                <th className="px-5 py-3 text-center">Reg No</th>
                <th className="px-5 py-3 text-center">Subject ID</th>
                <th className="px-5 py-3 text-center">Marks Obtained</th>
                <th className="px-5 py-3 text-center">Grade</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Add Form as the first row */}
              <tr>
                <td className="px-1 py-2 text-center">
                  <input
                    type="text"
                    value={newMark.reg_no}
                    onChange={(e) => setNewMark({ ...newMark, reg_no: e.target.value })}
                    className="px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-1 py-2 text-center">
                  <input
                    type="text"
                    value={newMark.subject_id}
                    onChange={(e) => setNewMark({ ...newMark, subject_id: e.target.value })}
                    className="px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-1 py-2 text-center">
                  <input
                    type="number"
                    value={newMark.marks_obtained}
                    onChange={(e) => setNewMark({ ...newMark, marks_obtained: Number(e.target.value) })}
                    className="px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-1 py-2 text-center">
                  <select
                    value={newMark.grade}
                    onChange={(e) => setNewMark({ ...newMark, grade: e.target.value as 'A' | 'B' | 'C' | 'S' | 'F' })}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="S">S</option>
                    <option value="F">F</option>
                  </select>
                </td>
                <td className="px-5 py-3 text-center">
                  <button
                    onClick={handleCreateMark}
                    className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-red-800 transition duration-300"
                  >
                    Add
                  </button>
                </td>
              </tr>

              {/* Display Existing Marks */}
              {marks.map((mark) => (
                <tr key={mark.id} className="hover:bg-gray-200">
                  <td className="px-5 py-3 text-center">{mark.reg_no}</td>
                  <td className="px-5 py-3 text-center">{mark.subject_id}</td>
                  <td className="px-5 py-3 text-center">{mark.marks_obtained}</td>
                  <td className="px-5 py-3 text-center">{mark.grade}</td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => handleDeleteMark(mark.id!)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition duration-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditMark(mark)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ml-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {/* Edit Form */}
              {editingMark && (
                <tr key={editingMark.id}>
                  <td className="px-5 py-3 text-center">
                    <input
                      type="text"
                      value={editingMark.reg_no}
                      onChange={(e) => setEditingMark({ ...editingMark, reg_no: e.target.value })}
                      className="px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <input
                      type="text"
                      value={editingMark.subject_id}
                      onChange={(e) => setEditingMark({ ...editingMark, subject_id: e.target.value })}
                      className="px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <input
                      type="number"
                      value={editingMark.marks_obtained}
                      onChange={(e) => setEditingMark({ ...editingMark, marks_obtained: Number(e.target.value) })}
                      className="px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <select
                      value={editingMark.grade}
                      onChange={(e) => setEditingMark({ ...editingMark, grade: e.target.value as 'A' | 'B' | 'C' | 'S' | 'F' })}
                      className="px-2 py-1 border rounded"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="S">S</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 ml-2"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-red-700 text-white px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-red-700 text-white px-4 py-2 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default MarksPage;
