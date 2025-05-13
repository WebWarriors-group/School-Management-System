import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import EditStudent from "./EditStudent";
import Table from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import StudentAdmissionForm from "./StudentAdmissionForm";
import AddStudent from "./AddStudent";
import { Edit, Trash2, Eye } from "lucide-react";
import { Student } from "@/types";
import ImportStudent from "./ImportStudent";
import SearchStudent from "./SearchStudent";
import ViewStudent from "./ViewStudent";
import DeleteStudent from "./DeleteStudent";

const breadcrumbs = [
  { title: "🎓 Student Dashboard", href: "/student/dashboard" },
];

const StudentDashboard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showImportForm, setImportForm] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [searchedStudents, setSearchedStudents] = useState<Student[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/students");
      if (!response.ok) throw new Error("Error fetching students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
  };

  const handleSearchResults = (results: Student[]) => {
    setSearchedStudents(results);
    setIsSearchModalOpen(true);
  };

  const handleDeleteClick = (reg_no: string) => {
    setStudentToDelete(reg_no);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${studentToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to delete student");

      toast.success("Student Deleted Successfully");

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.reg_no !== studentToDelete)
      );
    } catch (error) {
      toast.error("Failed to delete student. Please try again.");
      console.error("Error deleting student:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleViewClick = (student: Student) => {
    setViewingStudent(student);
    setIsViewModalOpen(true);
  };


  const uniqueClassCount = new Set(students.map((s) => s.class_id)).size;
  const scholarshipCount = students.filter(
  (s) =>
    s.receiving_any_grade_5_scholarship ||
    s.receiving_any_samurdhi_aswesuma ||
    s.receiving_any_scholarship
).length;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Student Dashboard" />
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col">
          <Toaster position="top-right" richColors />
          <header className="flex justify-end border-b bg-white shadow-sm">
           <SearchStudent students={students} />
          </header>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-9 mr-5 ml-5 mb-9">
            <div className="border-green-900 rounded-2xl border-t-4 bg-white p-6 shadow">
              <h3 className="text-maroon-700 text-lg font-bold">Total Students</h3>
              <p className="mt-2 text-3xl font-bold text-green-600">{students.length}</p>
            </div>
            <div className="border-red-900 rounded-2xl border-t-4 bg-white p-6 shadow">
              <h3 className="text-maroon-700 text-lg font-bold">Class Enrolled</h3>
              <p className="mt-2 text-3xl font-bold text-red-600">{uniqueClassCount}</p>
            </div>
            <div className="border-blue-900 rounded-2xl border-t-4 bg-white p-6 shadow">
              <h3 className="text-maroon-700 text-lg font-bold">Receiving Scholarship</h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">{scholarshipCount}</p>
            </div>
          </div>

          {/* Main Content */}
          <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
            <div className="flex justify-left mb-4">
              <Button onClick={() => setShowForm(true)} className="bg-green-700 text-white">
                Admission Form
              </Button>
              <Button onClick={() => setShowAddForm(true)} className="bg-green-600 text-white ml-2">
                Add New Student
              </Button>
              <Button onClick={() => setImportForm(true)} className="bg-green-600 text-white ml-2">
                Import Students
              </Button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                  <StudentAdmissionForm setShowForm={setShowForm} />
                </div>
              </div>
            )}

            {showImportForm && (
              <ImportStudent
                fetchStudents={fetchStudents}
                onClose={() => setImportForm(false)}
              />
            )}

            {showAddForm && (
              <AddStudent
                onClose={() => setShowAddForm(false)}
                onStudentAdded={(newStudent) => {
                  setStudents((prev) => [...prev, newStudent]);
                  setShowAddForm(false);
                }}
              />
            )}

            <Table
              columns={["Reg No", "Class ID", "Distance", "Method", "Actions"]}
              data={students.map((student) => ({
                "Reg No": student.reg_no,
                "Class ID": student.class_id,
                "Distance": student.distance_to_school,
                "Method": student.method_of_coming_to_school,
                Actions: (
                  <div className="flex gap-2">
                    <Button onClick={() => handleEditClick(student)} className="bg-blue-500 text-white">
                      <Edit size={16} />
                    </Button>
                    <Button onClick={() => handleDeleteClick(student.reg_no)} className="bg-red-600 text-white">
                      <Trash2 size={16} />
                    </Button>
                    <Button onClick={() => handleViewClick(student)} className="bg-purple-500 text-white">
                      <Eye size={16} />
                    </Button>
                  </div>
                ),
              }))}
            />

            <EditStudent
              editingStudent={editingStudent}
              setEditingStudent={setEditingStudent}
              setStudents={setStudents}
            />

            <ViewStudent
              student={viewingStudent}
              isOpen={isViewModalOpen}
              onClose={() => setIsViewModalOpen(false)}
            />

            <DeleteStudent
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
            />
          </main>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;
