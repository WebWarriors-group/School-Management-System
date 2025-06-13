import React, { useState, useEffect, useCallback } from 'react';
import {Toaster,toast} from "sonner";
//import 'react-toastify/dist/ReactToastify.css';
import AppLayout from "@/layouts/app-layout";
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"; // adjust the path if needed


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '📈 Student Marks',
        
        href: '/student',
    },

    
];

interface Mark {
  id: number; // Add this
  reg_no: string;
  subject_id: string;
  marks_obtained: number;
  grade: 'A' | 'B' | 'C' | 'S' | 'F';
}



const MarksPage: React.FC = () => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingMark, setEditingMark] = useState<Mark | null>(null);
  const [newMark, setNewMark] = useState({
    reg_no: '',  // Student's registration number
    subject_id: '',  // Subject ID
    marks_obtained: 0,  // Marks the student obtained
    grade: 'A',  // Grade the student got
  });
  
  const [searchParams,setSearchParams] = useState<{reg_no?: string; subject_id?: string; marks_obtained?: number; grade?: 'A' | 'B' | 'C' | 'S' | 'F'}>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [marksPerPage] = useState<number>(10);
  const [totalMarks, setTotalMarks] = useState<number>(10);
  
  const [results, setResults] = useState<Mark[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');

 
  
  
 //const [searchRegNo, setSearchRegNo] = useState<string>('');
 //const [searchSubjectId, setSearchSubjectId] = useState<string>('');
  //const [searchmarks_obtained, setmarks_obtained] = useState<number>();
//const [searchgrade, setSearchgrade] = useState<'A' | 'B' | 'C' | 'S' | 'F'>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [markToDelete, setMarkToDelete] = useState<Mark | null>(null);


const fetchMarks = useCallback(async () => {
  setLoading(true);
  try {
    const params = new URLSearchParams({
      ...Object.entries(searchParams).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value); // convert all values to string
        }
        return acc;
      }, {} as Record<string, string>),
      page: String(currentPage),
      limit: String(marksPerPage),
    });

    console.log("Fetching marks with params:", params.toString()); // Debugging log
    
    const response = await fetch(`/api/marks/?${params}`);
    const data = await response.json();

    console.log("Fetched data:", data); // Check the fetched data
    
    setMarks(data.data);
    setResults(data.data); // This updates the source used by filteredResults

    setTotalMarks(Number(response.headers.get('x-total-count')) || 0);

    if ((searchParams.reg_no || searchParams.subject_id) && data.data.length === 0) {
      toast.warning("No matching records found.", {
        className: "bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg px-4 py-3 shadow",
      });
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

  type Grade = "A" | "B" | "C" | "S" | "F";

  type SearchParams = {
    subject_id?: string;
    marks_obtained?: number;
    grade?: Grade;
    reg_no?: string;
  };
  
  const allowedGrades: Grade[] = ["A", "B", "C", "S", "F"];
  
  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
  
    const newSearchParams: SearchParams = {};
  
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
    try {
      await fetch(`/api/marks/${markToDelete.id}`, { method: 'DELETE' });
      setMarks((prevMarks) => prevMarks.filter((m) => m.id !== markToDelete.id));
      toast.success("Mark deleted successfully!");
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
  
    try {
      const markToSend = {
        ...editingMark,
        marks_obtained: parsedMarks, // Ensure it's a number
      };
  
      console.log("Sending to backend:", markToSend);
  
      await fetch(`/api/marks/${editingMark.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(markToSend),
      });
  
      toast("Successfully saved!", {
        className: "bg-green-50 text-green-800 border border-green-300 rounded-lg px-4 py-3 shadow",
      });
  
      fetchMarks();
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
        toast.success('Mark added successfully!' ,{
          className: 'bg-green-500 text-black'
        });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to add mark: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding mark:',error, {className: "bg-red-50 text-red-800 border border-red-300 rounded-lg px-4 py-3 shadow",
      });
      toast.error('Failed to add mark.');
    }
  };

  const totalPages = Math.ceil(totalMarks / marksPerPage);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Student Marks" />
      <div className="max-w-screen mx-auto my-5 p-10 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-sky-900 mb-5">Student Marks</h1>
        <Toaster position="top-right"/>
        <div className="flex justify-center items-center gap-3 mb-5 p-3 bg-white rounded-lg shadow-sm max-w-screen mx-auto">
  <input
    type="text"
    placeholder="Search by Reg No, Subject ID, Marks or Grade"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="flex-1 p-3 border border-yellow-700 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-red-700"
  />

  <button
    onClick={handleSearch}
    className="bg-yellow-600 text-white px-6 py-3 text-lg font-bold rounded-md transition duration-300 ease-in-out hover:bg-red-600"
  >
    Search
  </button>

  <button
  onClick={() => {
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
  }}
  className="bg-gray-300 text-black px-6 py-3 text-lg font-bold rounded-md hover:bg-gray-400"
>
  Reset
</button>

</div>



        

        {loading ? <p>Loading...</p> : (
          <table className="w-full table-auto bg-white rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-sky-900 text-white font-bold">
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
    onChange={(e) => setNewMark({ ...newMark, marks_obtained: parseInt(e.target.value) || 0 })}
    className="px-2 py-1 border rounded"
  />
</td>
<td className="px-1 py-2 text-center">
  <select
    value={newMark.grade}
    onChange={(e) => setNewMark({ ...newMark, grade: e.target.value as Mark["grade"] })}
    className="px-2 py-1 border rounded"
  >
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
    <option value="S">S</option>
    <option value="F">F</option>
  </select>
</td>
<td className="px-1 py-2 text-center">
  <button
    onClick={handleCreateMark}
    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
  >
    Add
  </button>
</td>

              </tr>

              {/* Display Existing Marks */}
              {results.map((mark) => (
                <React.Fragment key={mark.id}>
                  <tr className="hover:bg-gray-200">
                    <td className="px-5 py-3 text-center">{mark.reg_no}</td>
                    <td className="px-5 py-3 text-center">{mark.subject_id}</td>
                    <td className="px-5 py-3 text-center">{mark.marks_obtained}</td>
                    <td className="px-5 py-3 text-center">{mark.grade}</td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() => requestDeleteMark(mark)}
                    
                        className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-400 transition duration-300"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditMark(mark)}
                        className="bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ml-2"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                  {/* Edit Form */}
                {editingMark && editingMark.id === mark.id && (
                  <tr>
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
                      value={
                        editingMark && !isNaN(editingMark.marks_obtained)
                          ? editingMark.marks_obtained
                          : ''
                      }
                      
                      onChange={(e) =>
                        setEditingMark({ ...editingMark!, marks_obtained: Number(e.target.value) })
  }
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
              </React.Fragment>
              ))}

{!loading && marks.length === 0 && (
  <tr>
    <td colSpan={5} className="text-center py-4 text-gray-500">
      No data to display.
    </td>
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
  {/* Buttons Row */}
  <div className="flex justify-between items-center px-4">
    {/* Previous Button - Left Corner */}
    <button
      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-md font-semibold ${
        currentPage === 1
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gray-200 text-black hover:bg-gray-300'
      }`}
    >
      Previous
    </button>

    {/* Next Button - Right Corner */}
    <button
      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-md font-semibold ${
        currentPage === totalPages
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gray-200 text-black hover:bg-gray-300'
      }`}
    >
      Next
    </button>
  </div>

  {/* Page Numbers - Centered Below */}
  <div className="flex justify-center items-center mt-3 space-x-2">
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(index + 1)}
        className={`px-4 py-2 rounded-md font-semibold ${
          currentPage === index + 1
            ? 'bg-red-700 text-white'
            : 'bg-gray-200 text-black hover:bg-gray-300'
        }`}
      >
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