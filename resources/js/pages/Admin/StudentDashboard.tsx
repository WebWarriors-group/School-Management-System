import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import { Trash2, Eye, FileText } from "lucide-react";
import { Student, AcademicRecord ,PersonalRecord,FamilyRecord,SiblingsRecord } from "@/types";
import SearchStudent from "./SearchStudent";
import ViewStudent from "./ViewStudent";
import DeleteStudent from "./DeleteStudent";
import { Card, CardContent } from "@/components/ui/card";
import { User, GraduationCap, Home, Users } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSchool ,faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import AcademicTable from "../Student/AcademicTable";
import PersonalTable from "../Student/PersonalTable";
import FamilyTable from "../Student/FamilyTable";
import SiblingsTable from "../Student/SiblingsTable";

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
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

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
  prevStudents.filter((student) => student.reg_no !== Number(studentToDelete))
);

    } catch (error) {
      toast.error("Failed to delete student. Please try again.");
      console.error("Error deleting student:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleCardClick = (section: string) => {
    setSelectedSection(prev => (prev === section ? null : section));
  };
const getAcademicData = (): AcademicRecord[] =>
  students.map((s) => ({
    reg_no: Number(s.reg_no), // ensure it's a number
    student_id_no: s.student_id_no || '',
    class_id: s.class_id,
    distance_to_school: s.distance_to_school ?? null,
    method_of_coming_to_school: s.method_of_coming_to_school ?? null,
    grade_6_9_asthectic_subjects: s.grade_6_9_asthectic_subjects ?? null,
    grade_10_11_basket1_subjects: s.grade_10_11_basket1_subjects ?? null,
    grade_10_11_basket2_subjects: s.grade_10_11_basket2_subjects ?? null,
    grade_10_11_basket3_subjects: s.grade_10_11_basket3_subjects ?? null,
    receiving_any_scholarship: s.receiving_any_scholarship ?? false,
  }));
const getPersonalData = (): PersonalRecord[] =>
  students.map((s) => ({
    reg_no: Number(s.reg_no),
    student_id_no: s.student_id_no || '',
    class_id: s.class_id,
    full_name: s.personal?.full_name || '',

    full_name_with_initial: s.personal?.full_name_with_initial || '',
    birthday: s.personal?.birthday || '',
    ethnicity: s.personal?.ethnicity || '',
    religion: s.personal?.religion || '',
    gender: s.personal?.gender || '',
    birth_certificate_number: s.personal?.birth_certificate_number ?? null,
    address: s.personal?.address || '',
    nic_number: s.personal?.nic_number ?? null,
    postal_ic_number: s.personal?.postal_ic_number ?? null,
    age: Number(s.personal?.age) || 0,
    special_needs: s.personal?.special_needs ?? null,
    height: s.personal?.height ?? null,
    weight: s.personal?.weight ?? null,
  }));

const getFamilyData = (): FamilyRecord[] =>
  students.map((s) => ({
    reg_no: Number(s.reg_no),
    student_id_no: s.student_id_no || '',
    class_id: s.class_id,
    mother_name: s.family?.mother_name || '',
    mother_occupation: s.family?.mother_occupation ?? null,
    mother_income: s.family?.mother_income ?? null,
    mother_working_place: s.family?.mother_working_place ?? null,
    mother_contact: s.family?.mother_contact ?? null,
    mother_email: s.family?.mother_email ?? null,
    mother_whatsapp: s.family?.mother_whatsapp ?? null,
    father_name: s.family?.father_name || '',
    father_occupation: s.family?.father_occupation ?? null,
    father_income: s.family?.father_income ?? null,
    father_working_place: s.family?.father_working_place ?? null,
    father_contact: s.family?.father_contact ?? null,
    father_email: s.family?.father_email ?? null,
    father_whatsapp: s.family?.father_whatsapp ?? null,
  }));

const getSiblingsData = (): SiblingsRecord[] =>
  students.flatMap((s) =>
    (s.siblings || []).map((sib) => ({
      reg_no: Number(s.reg_no),
      student_id_no: s.student_id_no || '',
      class_id: s.class_id,
      sibling_name: sib.sibling_name ?? null,
      relationship: sib.relationship ?? null,
      sibling_age: sib.sibling_age ?? null,
      occupation: sib.occupation ?? null,
      contact: sib.contact ?? null,
    }))
  );

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
      <div className="flex h-full bg-white">
        <div className="flex-1 flex flex-col">
          <Toaster position="top-right" richColors />
{/* 
          <header className="flex justify-end border-b bg-white shadow-sm">
            <SearchStudent students={students} />
          </header> */}

        {!selectedSection && (
  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4 mx-auto max-w-6xl p-6">
    {cards.map((card, index) => (
      <div
        key={index}
        className="relative mt-14 ml-5 h-35 w-78 border bg-white p-6 ml-[-10px] shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md flex items-center justify-center transform scale-90 z-40 cursor-pointer shadow-xl"
      >
        <div className={`absolute z-0 -top-10 left-4 flex h-28 w-28 items-center justify-center text-white shadow-lg ${card.color}`}>
          <FontAwesomeIcon icon={card.icon} className="text-5xl" />
        </div>
        <div className="mt-[-30px] ml-30 pt-8">
          <p className="text-[16px] text-gray-500">{card.title}</p>
          <h2 className="mt-1 text-2xl font-bold">{card.value}</h2>
        </div>
      </div>
    ))}
  </div>
)}


        {!selectedSection && (
  <div className="bg-gray-200 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">
            <Card onClick={() => handleCardClick("academic")}
              className="relative overflow-hidden rounded-2xl shadow-xl border-none bg-gradient-to-br from-blue-100 via-white to-blue-50 transition-transform transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
              <CardContent className="p-6 backdrop-blur-md">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-300 opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500 opacity-10 rounded-full"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-blue-800 tracking-wide">Academic</h3>
                    <div className="mt-2 w-12 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                  <GraduationCap className="text-blue-500 w-16 h-16 drop-shadow-sm" />
                </div>
              </CardContent>
            </Card>

            <Card onClick={() => handleCardClick("personal")} className="relative overflow-hidden rounded-2xl shadow-xl border-none bg-gradient-to-br from-green-100 via-white to-green-50 transition-transform transform hover:scale-[1.02] hover:shadow-2xl">
              <CardContent className="p-6 backdrop-blur-md">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-300 opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-green-500 opacity-10 rounded-full"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-green-800 tracking-wide">Personal</h3>
                    <div className="mt-2 w-12 h-1 bg-green-600 rounded-full"></div>
                  </div>
                  <User className="text-green-500 w-16 h-16 drop-shadow-sm" />
                </div>
              </CardContent>
            </Card>

            <Card  onClick={() => handleCardClick("family")} className="relative overflow-hidden rounded-2xl shadow-xl border-none bg-gradient-to-br from-yellow-100 via-white to-yellow-50 transition-transform transform hover:scale-[1.02] hover:shadow-2xl">
              <CardContent className="p-6 backdrop-blur-md">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-yellow-500 opacity-10 rounded-full"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-yellow-800 tracking-wide">Family</h3>
                    <div className="mt-2 w-12 h-1 bg-yellow-600 rounded-full"></div>
                  </div>
                  <Home className="text-yellow-500 w-16 h-16 drop-shadow-sm" />
                </div>
              </CardContent>
            </Card>

            <Card onClick={() => handleCardClick("siblings")} className="relative overflow-hidden rounded-2xl shadow-xl border-none bg-gradient-to-br from-purple-100 via-white to-purple-50 transition-transform transform hover:scale-[1.02] hover:shadow-2xl">
              <CardContent className="p-6 backdrop-blur-md">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-300 opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-500 opacity-10 rounded-full"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-purple-800 tracking-wide">Siblings</h3>
                    <div className="mt-2 w-12 h-1 bg-purple-600 rounded-full"></div>
                  </div>
                  <Users className="text-purple-500 w-16 h-16 drop-shadow-sm" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

{selectedSection === "academic" && (
  <div className="px-6 py-4 max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-blue-700 mb-4">Academic Information</h2>
    <AcademicTable academicData={getAcademicData()} />
    <div className="mt-4">
      <Button
        onClick={() => setSelectedSection(null)}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Back
      </Button>
    </div>
  </div>
)}
{selectedSection === "personal" && (
  <div className="px-6 py-4 max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-blue-700 mb-4">Personal Information</h2>
    <PersonalTable personalData={getPersonalData()} />
    <div className="mt-4">
      <Button
        onClick={() => setSelectedSection(null)}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Back
      </Button>
    </div>
  </div>
)}
{selectedSection && (
  <div className="flex justify-end px-6 mt-4">
    <Button variant="outline" onClick={() => setSelectedSection(null)}>
      Reset Dashboard
    </Button>
  </div>
)}

{selectedSection === "family" && (
  <div className="px-6 py-4 max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-blue-700 mb-4">Family Information</h2>
   <FamilyTable familyData={getFamilyData()} />


    <div className="mt-4">
      <Button
        onClick={() => setSelectedSection(null)}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Back
      </Button>
    </div>
  </div>
)}

{selectedSection === "siblings" && (
  <div className="px-6 py-4 max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-blue-700 mb-4">Siblings Information</h2>
    <SiblingsTable siblingsData={getSiblingsData()} />
    <div className="mt-4">
      <Button
        onClick={() => setSelectedSection(null)}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Back
      </Button>
    </div>
  </div>
)}

        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;