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
import { Card, CardContent } from "@/components/ui/card"; // If using shadcn/ui
import { User, GraduationCap, Home, Users } from "lucide-react"; // Optional: icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSchool ,faGraduationCap} from '@fortawesome/free-solid-svg-icons';

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
interface Card {
  id: number;
  title: string;
  value: string | number;
  footer: string;
  footerColor: string;
  icon: any;
  color: string;
}
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
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  
  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
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

  const cards = [
    {
      id: 1,
      color: 'bg-yellow-500',
      icon: faUsers,
      title: 'Total Students',
      value: students.length,
      footerColor: 'text-blue-500',
    },
    {
      id: 2,
      color: 'bg-stone-800',
      icon: faSchool,
      title: 'Class Enrolled',
      value: uniqueClassCount,
      footerColor: 'text-blue-500',
    },
   
    {
      id: 3,
      color: 'bg-sky-900',
      icon: faGraduationCap,
      title: 'Receiving Scholarship',
      value: scholarshipCount,
      footerColor: 'text-blue-500',
    },
  ];
 
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Student Dashboard" />
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col">
          <Toaster position="top-right" richColors />
          <header className="flex justify-end border-b bg-white shadow-sm">
            <SearchStudent students={students} />
          </header>
 <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4 mx-auto max-w-6xl p-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="relative mt-14 ml-5 h-35 w-78 border bg-white p-6 ml-[-10px] shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md flex items-center justify-center transform scale-90 z-40 cursor-pointer shadow-xl"
                  
                >
                  <div className={`absolute z-0 -top-10 left-4 flex h-28 w-28 items-center justify-center text-white shadow-lg ${card.color}`}>
                    <FontAwesomeIcon icon={card.icon} className="text-5xl" />
                  </div>
                  <div className="mt-[-30px] ml-30 pt-8 text-">
                    <p className="text-[16px] text-gray-500">{card.title}</p>
                    <h2 className="mt-1 text-2xl font-bold">{card.value}</h2>
                    <p className={`mt-3 text-[14px] ${card.footerColor}`}></p>
                  </div>
                </div>
              ))}
            </div>

          {/* <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
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
          </main> */}
          <div className="bg-gray-200 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">
      
      {/* Academic Info Card */}
      <Card className="shadow-lg border-t-4 border-blue-600 rounded">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-blue-700">Academic</h3>
            <GraduationCap className="text-blue-600 w-20 h-20" />
          </div>
          {/* <p className="mt-2 text-gray-700 text-sm">Class: {student?.academic?.class_name}</p>
          <p className="text-gray-700 text-sm">Reg No: {student?.academic?.reg_no}</p> */}
        </CardContent>
      </Card>

      {/* Personal Info Card */}
      <Card className="shadow-lg border-t-4 border-green-600 rounded ">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-green-700">Personal</h3>
            <User className="text-green-600 w-20 h-20" />
          </div>
          {/* <p className="mt-2 text-gray-700 text-sm">Name: {student?.personal?.full_name}</p>
          <p className="text-gray-700 text-sm">DOB: {student?.personal?.dob}</p> */}
        </CardContent>
      </Card>

      {/* Family Info Card */}
      <Card className="shadow-lg border-t-4 border-yellow-600 rounded">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-yellow-700">Family</h3>
            <Home className="text-yellow-600 w-20 h-20" />
          </div>
          {/* <p className="mt-2 text-gray-700 text-sm">Father: {student?.family?.father_name}</p>
          <p className="text-gray-700 text-sm">Mother: {student?.family?.mother_name}</p> */}
        </CardContent>
      </Card>

      {/* Siblings Info Card */}
      <Card className="shadow-lg border-t-4 border-purple-600 rounded">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-purple-700">Siblings</h3>
            <Users className="text-purple-600 w-20 h-20" />
          </div>
          {/* <p className="mt-2 text-gray-700 text-sm">
            Total Siblings: {student?.siblings?.length || 0}
          </p> */}
        </CardContent>
      </Card>

    </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;
