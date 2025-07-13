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
type PaginatedResponse<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};


const fetchStudents = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/students");
    if (!response.ok) throw new Error("Error fetching students");

    const data: PaginatedResponse<Student> = await response.json();
setStudents(data.data);


    if (Array.isArray(data.data)) {
      setStudents(data.data); // ✅ CORRECT: access the paginated array inside `data`
    } else {
      console.error("Invalid response format:", data);
      toast.error("Failed to load student data");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch students. Please try again.");
  }
};






useEffect(() => {
  fetchStudents();
}, []);

useEffect(() => {
  console.log("Fetched students:", students);
}, [students]);


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
    receiving_any_grade_5_scholarship: s.receiving_any_grade_5_scholarship ?? false,
receiving_any_samurdhi_aswesuma: s.receiving_any_samurdhi_aswesuma ?? false,

    admission_date: s.admission_date ?? '',
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
      <div className="flex h-full bg-gray-200">
        <div className="flex-1 flex flex-col">
          <Toaster position="top-right" richColors />

         <header className="sticky top-15 flex w-full  border-b  p-4 shadow-sm  bg-white z-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row  md:justify-end">
          
          <p className=" text-blue-600 md:text-lg  md:text-left md:text-base md:mt-2">
            Classes,Students,Subjects Overall performance
          </p>
        </div>
      </header>


        {!selectedSection && (
  <div className="grid grid-cols-4 gap-7 sm:grid-cols-2 md:grid-cols-3 mx-auto max-w-6xl p-6">
    {cards.map((card, index) => (
      <div
        key={index}
        className="relative mt-14  h-35 w-78 border bg-white p-6  shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md flex items-center justify-center transform scale-90 z-40 cursor-pointer shadow-xl"
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
              className="relative overflow-hidden  shadow-xl border-none bg-white transition-transform transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
              <CardContent className="p-6 backdrop-blur-md">
               
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-blue-800 tracking-wide">Academic</h3>
                    <div className="mt-2 w-12 h-1 bg-blue-600 "></div>
                  </div>
                  <GraduationCap className="text-blue-500 w-16 h-16 drop-shadow-sm" />
                </div>
              </CardContent>
            </Card>

            <Card onClick={() => handleCardClick("personal")}
              className="relative overflow-hidden  shadow-xl border-none bg-white transition-transform transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
              <CardContent className="p-6 backdrop-blur-md">
               
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-green-800 tracking-wide">Personal</h3>
                    <div className="mt-2 w-12 h-1 bg-green-600 rounded-full"></div>
                  </div>
                  <User className="text-green-500 w-16 h-16 drop-shadow-sm" />
                </div>
              </CardContent>
            </Card>

           <Card onClick={() => handleCardClick("family")}
              className="relative overflow-hidden  shadow-xl border-none bg-white to-blue-50 transition-transform transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
              <CardContent className="p-6 backdrop-blur-md">
               
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-yellow-800 tracking-wide">Family</h3>
                    <div className="mt-2 w-12 h-1 bg-yellow-600 rounded-full"></div>
                  </div>
                  <Home className="text-yellow-500 w-16 h-16 drop-shadow-sm" />
                </div>
              </CardContent>
            </Card>


            <Card onClick={() => handleCardClick("siblings")}
              className="relative overflow-hidden  shadow-xl border-none bg-white transition-transform transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
              <CardContent className="p-6 backdrop-blur-md">
               
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
   <AcademicTable academicData={{ 
  current_page: 1,
  data: getAcademicData(),
  total: getAcademicData().length,
  per_page: getAcademicData().length,
  last_page: 1
}} />




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