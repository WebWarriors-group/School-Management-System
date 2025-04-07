import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from "react";
import { router } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    
];
type Teacher = {
    teacher_NIC: string;
    personal:{
    Full_name: string;
    Full_name_with_initial: string;
    Photo: File | null;
    Gender: string;
    Region: string;
    Ethnicity: string;
    Birthdate: string;
    Title: string;
    Marital_status: string;
    Details_about_family_members: string;
    Emergency_telephone_number: string;
    Email_address: string;
    Fixed_telephone_number: string;
    Mobile_number: string;
    Whatsapp_number: string;
    };
    teachersaddress : {
    permanent_address: string;
    residential_address: string;
    grama_niladari_division: string;
    grama_niladari_division_number: string;
    election_division: string;
    election_division_number: string;
    };
    appointed_date: string;
    work_acceptance_date: string;
    
    // New Fields
    appointment_type: string;
    salary_increment_date: string; // ISO format date (YYYY-MM-DD)
    current_grade_of_teaching_service: "Grade I" | "Grade II" | "Grade III";
    work_acceptance_date_school: string; // ISO format date (YYYY-MM-DD)
    temporary_attachedschool_or_institute_name: string;
    appointed_subject: string;
    which_grades_teaching_done: string;
    current_teaching_subject: string;
    other_subjects_taught: string;
    assigned_class: string;
    other_responsibilities_assigned: string;
    is_150_hrs_tamil_course_completed: boolean;
    commuting_from_school: "Home" | "Boarding" | "Hostel" | "Other";
    distance_from_school: number;
    commuting_method_to_school: "Bicycle" | "MotorBike" | "Car" | "Bus" | "Threewheeler" | "Walk" | "Other";
    number_in_sign_sheet: string;
    number_in_salary_sheet: string;
    qualifications:{
    type_of_service_in_school:string;
    gce_al_subject_stream: string;
    highest_education_qualification: string;
    basic_degree_stream: string;
    highest_professional_qualification: string;
    present_class: string;
    present_grade: string;
    appointment_date_for_current_class: string;
    appointment_date_for_current_grade: string;
    current_appointment_service_medium: string;
    appointed_subject_section: string;
    subject_appointed: string;
    currentservice_appointed_date: string;
    subjects_taught_most_and_second_most: string;
    position_in_the_school: string;
    assign_date_for_the_school: string;
    };
    teacherotherservice:{
    other_responsibilities_in_school: string;
    EDCS_membership: string;
    WSOP_Number: number | null;
    Agrahara_insuarence_membership: string;
    };
  
  };
  

export default function Dashboard() {
     const [teacherNIC, setTeacherNIC] = useState("");
      const [teacher, setTeacher] = useState<Teacher | null>(null);
      const [error, setError] = useState("");
      
     const handleSearch = async () => {
        if (!teacherNIC) return;
    
        try {
          const res = await fetch(`/api/teachers/${teacherNIC}`);
          if (!res.ok) {
            throw new Error("Teacher not found");
          }
    
          const data = await res.json();
          console.log(data);
          setTeacher(data);
          setError("");
          // Redirect to personal dashboard if teacher exists
        router.visit(`/teacher/dashboard/${teacherNIC}`);

        } catch (err) {
          setError("Teacher not found");
          setTeacher(null);
        }
      };
    
    return (
        
  <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-8 bg-gray-100">
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Search for Teacher</h2>
        <input
          type="text"
          placeholder="Enter Teacher NIC"
          value={teacherNIC}
          onChange={(e) => setTeacherNIC(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {error && (
  <div className="mt-4 text-center">
    <p className="text-red-500">{error}</p>
    <Link href="/add-teacher">
      <button className="mt-3 bg-green-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-700">
        Fill Out Teacher Form
      </button>
    </Link>
  </div>
)}
      </div>
    </div>
    
    <div>
    

{/* Display Teacher Details */}
{/* {teacher && (
  <div className="mt-6 p-4 border rounded bg-gray-100">
    <h2 className="text-lg font-semibold">Teacher Details</h2>
    <p><strong>NIC:</strong> {teacher.teacher_NIC}</p>

    <p><strong>Full Name:</strong> {teacher?.personal?.Full_name || 'No name provided'}</p>
    <p><strong>Stream:</strong> {teacher?.qualifications?.gce_al_subject_stream || 'null'}</p>
    <p><strong>appointed_date:</strong> {teacher?.appointed_date || 'null'}</p>
    <p><strong>permanent_address:</strong> {teacher?.teachersaddress?.permanent_address ||'null'}</p>
    <p><strong>other_responsibilities_in_school:</strong> {teacher?.teacherotherservice?.other_responsibilities_in_school || 'null'}</p>
    {teacher?.personal?.Photo && teacher?.personal?.Photo instanceof File ? (
            <img
              src={URL.createObjectURL(teacher?.personal?.Photo)} // Convert File to URL
              alt="Teacher's Photo"
              className="w-32 h-32 object-cover rounded-full"
            />
          ) : (
            <p>No photo available</p>
          )}
    </div>
)} */}
</div>
  </div>



//         <AppLayout breadcrumbs={breadcrumbs}>
           
//             <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
//             <Link href="/add-teacher">
//                 <button className="bg-red-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-black transition-all ml-auto block">
//                      Add Teacher
//                 </button>
//                 </Link>
//                 <Link href={route("teacher.profile")} className="text-blue-500 underline">
//     View Profile
// </Link>

//                 <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                
//                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                 </div>
//                 <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
//                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                 </div>
//             </div>
//         </AppLayout>
    );
}