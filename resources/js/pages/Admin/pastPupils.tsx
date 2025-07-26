import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { faUsers, faSchool, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GraduationCap, Home, User, Users } from "lucide-react";

import { Student, AcademicRecord, PersonalRecord, FamilyRecord, SiblingsRecord } from "@/types";
import AcademicTable from "../Student/AcademicTable";
import PersonalTable from "../Student/PersonalTable";
import FamilyTable from "../Student/FamilyTable";
import SiblingsTable from "../Student/SiblingsTable";
import { Card, CardContent } from "@/components/ui/card";

interface PageProps {
  auth: {
    user: any;
  };
  students: Student[];
  [key: string]: any;
}

const breadcrumbs = [
  { title: "🎓 Past Pupils", href: "/students/past" },
];

const PastPupilsDashboard: React.FC = () => {
  const { props } = usePage<PageProps>();
  const user = props.auth.user;

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    setStudents(props.students);
  }, [props.students]);

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
      title: 'Total Past Pupils',
      value: students.length,
    },
    {
      id: 2,
      color: 'bg-stone-800',
      icon: faSchool,
      title: 'Class Enrolled',
      value: uniqueClassCount,
    },
    {
      id: 3,
      color: 'bg-sky-900',
      icon: faGraduationCap,
      title: 'Received Scholarships',
      value: scholarshipCount,
    },
  ];

  const handleCardClick = (section: string) => {
    setSelectedSection(prev => (prev === section ? null : section));
  };

  const getAcademicData = (): AcademicRecord[] =>
    students.map((s) => ({
      reg_no: Number(s.reg_no),
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

  return (
    <AppLayout breadcrumbs={breadcrumbs} user={user}>
      <Head title="Past Pupils Dashboard" />
      <div className="flex h-full bg-gray-200">
        <div className="flex-1 flex flex-col">
          <Toaster position="top-right" richColors />

          {!selectedSection && (
            <>
              <div className="grid grid-cols-4 gap-7 sm:grid-cols-2 md:grid-cols-3 mx-auto max-w-6xl p-6">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="relative mt-14 h-35 w-78 bg-white p-6 shadow-xl transform scale-90 hover:scale-100 cursor-pointer"
                    onClick={() => handleCardClick("academic")} // you can update this per card if needed
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

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">
                <Card onClick={() => handleCardClick("academic")} className="shadow-xl bg-gradient-to-br from-blue-100 via-white to-blue-50 hover:scale-[1.02] cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-blue-800">Academic</h3>
                    <GraduationCap className="text-blue-500 w-16 h-16" />
                  </CardContent>
                </Card>
                <Card onClick={() => handleCardClick("personal")} className="shadow-xl bg-gradient-to-br from-blue-100 via-white to-blue-50 hover:scale-[1.02] cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-green-800">Personal</h3>
                    <User className="text-green-500 w-16 h-16" />
                  </CardContent>
                </Card>
                <Card onClick={() => handleCardClick("family")} className="shadow-xl bg-gradient-to-br from-blue-100 via-white to-blue-50 hover:scale-[1.02] cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-yellow-800">Family</h3>
                    <Home className="text-yellow-500 w-16 h-16" />
                  </CardContent>
                </Card>
                <Card onClick={() => handleCardClick("siblings")} className="shadow-xl bg-gradient-to-br from-blue-100 via-white to-blue-50 hover:scale-[1.02] cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-purple-800">Siblings</h3>
                    <Users className="text-purple-500 w-16 h-16" />
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {selectedSection === "academic" && (
            <div className="px-6 py-4 max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Academic Information</h2>
              <AcademicTable academicData={{
                current_page: 1,
                data: getAcademicData(),
                total: getAcademicData().length,
                per_page: getAcademicData().length,
                last_page: 1,
              }} />
              <Button onClick={() => setSelectedSection(null)} className="mt-4 bg-blue-600 text-white">Back</Button>
            </div>
          )}

          {selectedSection === "personal" && (
            <div className="px-6 py-4 max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Personal Information</h2>
              <PersonalTable personalData={getPersonalData()} />
              <Button onClick={() => setSelectedSection(null)} className="mt-4 bg-blue-600 text-white">Back</Button>
            </div>
          )}

          {selectedSection === "family" && (
            <div className="px-6 py-4 max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Family Information</h2>
              <FamilyTable familyData={getFamilyData()} />
              <Button onClick={() => setSelectedSection(null)} className="mt-4 bg-blue-600 text-white">Back</Button>
            </div>
          )}

          {selectedSection === "siblings" && (
            <div className="px-6 py-4 max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Siblings Information</h2>
              <SiblingsTable siblingsData={getSiblingsData()} />
              <Button onClick={() => setSelectedSection(null)} className="mt-4 bg-blue-600 text-white">Back</Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default PastPupilsDashboard;
