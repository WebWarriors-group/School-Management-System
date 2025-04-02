import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Table from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import StudentAdmissionForm from "./StudentAdmissionForm";

interface Student {
  reg_no: string;
  class_id: number;
  distance_to_school?: number;
  method_of_coming_to_school?: string;
  receiving_any_grade_5_scholarship: boolean;
  receiving_any_samurdhi_aswesuma: boolean;
  receiving_any_scholarship: boolean;
}

const breadcrumbs = [
  {
    title: "Student Dashboard",
    href: "/student/dashboard",
  },
];

const StudentDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [searchedStudent, setSearchedStudent] = useState<Student | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRegNo, setEditingRegNo] = useState<string | null>(null);
  const [editData, setEditData] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const searchStudent = async () => {
    if (!searchRegNo.trim()) {
      toast.error("Please enter a valid Registration Number.");
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students`);
      if (!response.ok) throw new Error("Error fetching students");
  
      const data = await response.json();
  
      // 🔹 Find the correct student by comparing reg_no
      const student = data.find((s: Student) => s.reg_no === searchRegNo);
  
      if (!student) {
        toast.error("Student not found. Please Check Registration Number");
        return;
      }
  
      setSearchedStudent(student); // Show the correct student
      setIsSearchModalOpen(true);
    } catch (error) {
      toast.error("Error searching for student.");
      setSearchedStudent(null);
    }
  };
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  
  const handleDeleteClick = (reg_no: string) => {
    setStudentToDelete(reg_no);
    setIsDeleteModalOpen(true);
  };
  const handleViewClick = (student: Student) => {
    setViewingStudent(student);
    setIsViewModalOpen(true);
  };
  const confirmDelete = async () => {
    if (!studentToDelete) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${studentToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
  
      if (!response.ok) throw new Error("Failed to delete student");
  
      toast.success("Student Deleted Successfully");
  
      // Update the UI
      setStudents((prevStudents) => prevStudents.filter((student) => student.reg_no !== studentToDelete));
    } catch (error) {
      toast.error("Failed to delete student. Please try again.");
      console.error("Error deleting student:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };
  const handleEditClick = (student: Student) => {
    setEditingRegNo(student.reg_no);
    setEditData({ ...student });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editData) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${editData.reg_no}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!response.ok) throw new Error("Error updating student");
      
      toast.success("Student updated successfully!");
      setStudents((prev) =>
        prev.map((student) => (student.reg_no === editData.reg_no ? editData : student))
      );
      setEditingRegNo(null);
      setEditData(null);
    } catch (error) {
      toast.error("Error updating student.");
      console.error("Error updating student:", error);
    }
  };

  
  useEffect(() => {
    fetchStudents(); // Fetch students on component mount
  }, []);

  // Fetch all students from the API
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/students");
      if (!response.ok) throw new Error("Error fetching students");

      const data = await response.json();
      setStudents(data); // Update students state
    } catch (error) {
      console.error("Error:", error);
    }
  };


//   const handleSendForm = async () => {
//     setLoading(true);
  

//     router.post("/send-admission-form", { reg_no: regNo }, {
//         onSuccess: (response) => {
//             toast.success("Admission form sent successfully!");
//             setRegNo("");
//         },
//         onError: (errors) => {
//             toast.error( "Failed to send form.");
//         },
//         onFinish: () => {
//             setLoading(false);
//         }
//     });
// };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Student Dashboard" />
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col">
          <Toaster position="top-right" richColors />

          <header className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
            <h1 className="text-xl font-semibold text-maroon-700">Student Dashboard</h1>
            <div className="flex items-center gap-2">
            <Input
            value={searchRegNo}
            onChange={(e) => setSearchRegNo(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Registration Number"
          />
          <Button onClick={searchStudent} className="bg-red-700 text-white">
            Search
          </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-9 mr-5 ml-5 mb-9">
                    <div className="border-green-900 rounded-2xl border-t-4 bg-white p-6 shadow ">
                             <h3 className="text-maroon-700 text-lg font-bold">Toal Students</h3>
                            <p className="mt-2 text-3xl font-bold text-green-600">{students.length}</p>
                         </div>
                         <div className="border-red-900 rounded-2xl border-t-4 bg-white p-6 shadow">
                             <h3 className="text-maroon-700 text-lg font-bold">Class Entrolled</h3>
                             <p className="mt-2 text-3xl font-bold text-red-600">95</p>

                         </div>
                         <div className="border-blue-900 rounded-2xl border-t-4 bg-white p-6 shadow">

                             <h3 className="text-maroon-700 text-lg font-bold">Receiving Scholarship</h3>
                            <p className="mt-2 text-3xl font-bold text-blue-600">{students.length}</p>
                         </div>
                     </div>
          <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <div className="flex justify-left">
          <Button onClick={() => setShowForm(true)} className="bg-green-700 text-white mb-4">
  Admission Form
</Button>

{showForm && <StudentAdmissionForm setShowForm={setShowForm} />}
        </div>
            {/* {!showAddForm && (
              <Button onClick={() => setShowAddForm(true)} className="bg-green-700 text-white mb-4">
                Add New Student
              </Button>
            )}

            {showAddForm && (
              <Card className="mb-8">
                <CardContent>
                  Student Details
                  <Input
                    type="text"
                    placeholder="Registration No"
                    value={newStudent.reg_no}
                    onChange={(e) => setNewStudent({ ...newStudent, reg_no: e.target.value })}
                    className="mb-4"
                  />
                  <Button onClick={addStudent} className="bg-green-700 text-white mr-2">
                    Save
                  </Button>
                  <Button onClick={() => setShowAddForm(false)} className="bg-red-600 text-white">
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            )} */}

<Table
              columns={["Reg No", "Class ID", "Distance", "Method", "Actions"]}
              data={students.map((student) =>
                editingRegNo === student.reg_no ? {
                  "Reg No": <Input value={editData?.reg_no} disabled />,
                  "Class ID": <Input name="class_id" value={editData?.class_id} onChange={handleEditChange} />,
                  "Distance": <Input name="distance_to_school" value={editData?.distance_to_school} onChange={handleEditChange} />,
                  "Method": <Input name="method_of_coming_to_school" value={editData?.method_of_coming_to_school} onChange={handleEditChange} />,
                  Actions: (
                    <div className="flex gap-2">
                      <Button onClick={handleUpdate} className="bg-green-500 text-white">Save</Button>
                      <Button onClick={() => setEditingRegNo(null)} className="bg-red-500 text-white">Cancel</Button>
                    </div>
                  ),
                } : {
                  "Reg No": student.reg_no,
                  "Class ID": student.class_id,
                  "Distance": student.distance_to_school,
                  "Method": student.method_of_coming_to_school,
                  Actions: (
                    <div className="flex gap-2">
                      <Button onClick={() => handleEditClick(student)} className="bg-blue-500 text-white">Edit</Button>
                      <Button onClick={() => handleDeleteClick(student.reg_no)} className="bg-red-600 text-white">Delete</Button>
                      <Button
                    onClick={() => handleViewClick(student)}
                    className="bg-purple-500 text-white mr-2"
                  >
                    View
                  </Button>
                    </div>
                  ),
                }
              )}
            />
            <ConfirmDeleteModal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  onConfirm={confirmDelete}
/>
          </main>
          {isViewModalOpen && viewingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Student Details</h2>

            <p><strong>Reg No:</strong> {viewingStudent.reg_no}</p>
            <p><strong>Class ID:</strong> {viewingStudent.class_id}</p>
            <p><strong>Distance to School:</strong> {viewingStudent.distance_to_school} km</p>
            <p><strong>Method of Coming:</strong> {viewingStudent.method_of_coming_to_school}</p>
            <p><strong>Grade 5 Scholarship:</strong> {viewingStudent.receiving_any_grade_5_scholarship ? "Yes" : "No"}</p>
            <p><strong>Samurdhi Beneficiary:</strong> {viewingStudent.receiving_any_samurdhi_aswesuma ? "Yes" : "No"}</p>
            <p><strong>Other Scholarship:</strong> {viewingStudent.receiving_any_scholarship ? "Yes" : "No"}</p>

            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-500 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {isSearchModalOpen && searchedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Student Details</h2>

            <p><strong>Reg No:</strong> {searchedStudent.reg_no}</p>
            <p><strong>Class ID:</strong> {searchedStudent.class_id}</p>
            <p><strong>Distance to School:</strong> {searchedStudent.distance_to_school} km</p>
            <p><strong>Method of Coming:</strong> {searchedStudent.method_of_coming_to_school}</p>
            <p><strong>Grade 5 Scholarship:</strong> {searchedStudent.receiving_any_grade_5_scholarship ? "Yes" : "No"}</p>
            <p><strong>Samurdhi Beneficiary:</strong> {searchedStudent.receiving_any_samurdhi_aswesuma ? "Yes" : "No"}</p>
            <p><strong>Other Scholarship:</strong> {searchedStudent.receiving_any_scholarship ? "Yes" : "No"}</p>

            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setIsSearchModalOpen(false)}
                className="bg-gray-500 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;
