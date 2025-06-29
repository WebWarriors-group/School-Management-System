import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import { Trash2, Eye, FileText } from "lucide-react"; // FileText is used for "Marks" button
import { Student } from "@/types";
import SearchStudent from "./SearchStudent";
import ViewStudent from "./ViewStudent";
import DeleteStudent from "./DeleteStudent";


const breadcrumbs = [
  { title: "🎓 Student Dashboard", href: "/student/dashboard" },
];

const StudentDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchedStudents, setSearchedStudents] = useState<Student[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchResults = (results: Student[]) => {
    setSearchedStudents(results);
    setIsSearchModalOpen(true);
  };

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

          <div className="grid grid-cols-3 gap-1 md:grid-cols-3 mt-4 mx-2 mb-2">
            <div className="border-yellow-500 rounded-xl border-t-4 bg-white p-3 shadow">
              <h3 className="text-maroon-700 text-base font-semibold">Total Students</h3>
              <p className="mt-1 text-lg font-bold text-green-600">{students.length}</p>
            </div>
            <div className="border-yellow-500 rounded-xl border-t-4 bg-white p-3 shadow">
              <h3 className="text-maroon-700 text-base font-semibold">Class Enrolled</h3>
              <p className="mt-1 text-lg font-bold text-red-600">{uniqueClassCount}</p>
            </div>
            <div className="border-yellow-500 rounded-xl border-t-4 bg-white p-3 shadow">
              <h3 className="text-maroon-700 text-base font-semibold">Receiving Scholarship</h3>
              <p className="mt-1 text-lg font-bold text-blue-600">{scholarshipCount}</p>
            </div>
          </div>

          <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
            <Table
              columns={["Reg No", "Distance", "Method", "Actions"]}
              data={students.map((student) => ({
                "Reg No": student.reg_no,
                "Distance": student.distance_to_school,
                "Method": student.method_of_coming_to_school,
                Actions: (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDeleteClick(student.reg_no)}
                      className="bg-red-600 text-white"
                    >
                      <Trash2 size={16} />
                    </Button>
                    <Button
                      onClick={() => handleViewClick(student)}
                      className="bg-purple-500 text-white"
                    >
                      <Eye size={16} />
                    </Button>
                  <Button
  onClick={() => router.visit(`/mark/ReportPage/${student.reg_no}`)}
  className="bg-indigo-700 text-white flex items-center gap-2 px-3 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
  title="View Report Card"
>
  <FileText size={18} />
  
</Button>
                  </div>
                ),
              }))}
            />

            <ViewStudent
              student={viewingStudent}
              isOpen={isViewModalOpen}
              onClose={() => setIsViewModalOpen(false)}
              onStudentUpdated={(updatedStudent) => {
                setViewingStudent(updatedStudent);
                setStudents((prev) =>
                  prev.map((s) =>
                    s.reg_no === updatedStudent.reg_no ? updatedStudent : s
                  )
                );
              }}
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
