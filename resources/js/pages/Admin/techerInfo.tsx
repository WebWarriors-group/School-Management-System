import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '👩‍🏫 Teacher Management',
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
  },
  teachersaddress : {
  permanent_address: string;
  permanent_residential_address: string;
  grama_niladari_division: string;
  grama_niladari_division_number: string;
  election_division: string;
  election_division_number: string;
  },
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
  },
  teacherotherservice:{
  other_responsibilities_in_school: string;
  EDCS_membership: string;
  WSOP_Number: string;
  Agrahara_insuarence_membership: string;
  },

};

export default function TeachersTable() {
  const [teacherNIC, setTeacherNIC] = useState("");
  const [teachers, setTeachers] = useState<Teacher[] >([]);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [error, setError] = useState("");
const [selectedStep, setSelectedStep] = useState<number | null>(null);
const [currentPage, setCurrentPage] = useState(1); // Pagination state

const handleStepClick = (stepNumber: number) => {
  setCurrentPage(1); // Reset to page 1 whenever a card is clicked
  setSelectedStep(prevStep => (prevStep === stepNumber ? null : stepNumber));
};




const rowsPerPage = 10;

const paginatedTeachers = teachers.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);

const totalPages = Math.ceil(teachers.length / rowsPerPage);

const goToNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};

const goToPreviousPage = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};

  // Fetch teachers from API
  useEffect(() => {
    fetch("/api/teachers")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle delete
  const handleDelete = async (teacher_NIC: string) => {
  if (!confirm("Are you sure you want to delete this teacher?")) return;

  try {
    const res = await fetch(`/api/teachers/${teacher_NIC}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete");
    }

    const responseData = await res.json();

    setTeachers(teachers.filter((teacher) => teacher.teacher_NIC !== teacher_NIC));

    // ✅ Show success toast message
    toast.success(responseData.message || "Teacher deleted successfully");
  } catch (error: any) {
    console.error("Error deleting teacher:", error);
    toast.error("Failed to delete teacher");
  }
};


  // Handle edit (open modal)
const handleEdit = (teacher: Teacher) => {
  setEditingTeacher(teacher);
};

// Handle update teacher
const handleUpdate = async (event: React.FormEvent) => {
  event.preventDefault();
  if (!editingTeacher) return;

  try {
   

    const res = await fetch(`/api/teachers/${editingTeacher.teacher_NIC}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTeacher),
    });

    if (!res.ok) {
      throw new Error("Failed to update teacher");
    }

    // Update teacher list in the UI after successful update
    setTeachers(teachers.map((t) => (t.teacher_NIC === editingTeacher.teacher_NIC ? editingTeacher : t)));

    // Close the modal or clear the form
    setEditingTeacher(null);
  } catch (error) {
    console.error("Error updating teacher:", error);
  }
};

  const handleSearch = async () => {
    if (!teacherNIC) return;

    try {
      const res = await fetch(`/api/teachers/${teacherNIC}`);
      if (!res.ok) {
        throw new Error("Teacher not found");
      }

      const data = await res.json();
      setTeacher(data);
      setError("");
    } catch (err) {
      setError("Teacher not found");
      setTeacher(null);
    }
  };

  return (
    <AppLayout   breadcrumbs={breadcrumbs}>
      <main className="bg-gray-200 ">
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="max-w-9xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Search Teacher by NIC</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Enter Teacher NIC"
        value={teacherNIC}
        onChange={(e) => setTeacherNIC(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>

      {/* Display Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display Teacher Details */}
{teacher && (
  <div className="mt-6 p-8 border rounded-lg bg-gray-50 max-w-10xl mx-auto shadow-lg w-300">
    <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-10 tracking-wide drop-shadow-md">
      Teacher Details
    </h2>

    {/* Personal Information */}
    <section className="bg-blue-100 shadow-lg rounded-lg p-8  border-l-8 border-blue-700  max-w-10xl">
      <h3 className="text-2xl font-bold text-blue-800 mb-6 uppercase tracking-wide border-b-2 border-blue-300 pb-2">
        Personal Information
      </h3>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Photo */}
        <div className="flex-shrink-0">
          {teacher.personal?.Photo ? (
            <img
              src={`/storage/${teacher.personal.Photo}`}
              alt="Teacher"
              className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-blue-600 ring-4 ring-blue-200"
            />
          ) : (
            <span className="text-gray-400 italic">No Photo</span>
          )}
        </div>
        <div className="flex-1 space-y-9 text-gray-800 text-lg leading-relaxed w-600">
          <p><strong className="text-blue-700 font-semibold">NIC:</strong> {teacher.teacher_NIC}</p>
          <p><strong className="text-blue-700 font-semibold">Full Name:</strong> {teacher.personal?.Full_name || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Full Name with Initial:</strong> {teacher.personal?.Full_name_with_initial || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Gender:</strong> {teacher.personal?.Gender || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Birthdate:</strong> {teacher.personal?.Birthdate || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Marital Status:</strong> {teacher.personal?.Marital_status || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Mobile Number:</strong> {teacher.personal?.Mobile_number || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Email:</strong> {teacher.personal?.Email_address || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Region:</strong> {teacher.personal?.Region || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Ethnicity:</strong> {teacher.personal?.Ethnicity || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Title:</strong> {teacher.personal?.Title || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Emergency Contact No:</strong> {teacher.personal?.Emergency_telephone_number || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Fixed Phone No:</strong> {teacher.personal?.Fixed_telephone_number || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">WhatsApp No:</strong> {teacher.personal?.Whatsapp_number || 'Not provided'}</p>
          <p><strong className="text-blue-700 font-semibold">Family Details:</strong> {teacher.personal?.Details_about_family_members || 'Not provided'}</p>
        </div>
      </div>
    </section>

    {/* Address Information */}
    <section className="mb-10 p-8 bg-white rounded-lg shadow-lg border-l-8 border-green-700">
      <h3 className="text-2xl font-bold text-green-800 mb-6 uppercase tracking-wide border-b-2 border-green-300 pb-2">
        Address Information
      </h3>
      <div className="space-y-2 text-gray-800 text-lg leading-relaxed">
        <p><strong className="text-green-700 font-semibold">Permanent Address:</strong> {teacher.teachersaddress?.permanent_address || 'Not provided'}</p>
        <p><strong className="text-green-700 font-semibold">Residential Address:</strong> {teacher.teachersaddress?.permanent_residential_address || 'Not provided'}</p>
        <p><strong className="text-green-700 font-semibold">Grama Niladari Division:</strong> {teacher.teachersaddress?.grama_niladari_division || 'Not provided'}</p>
        <p><strong className="text-green-700 font-semibold">Grama Niladari Division No:</strong> {teacher.teachersaddress?.grama_niladari_division_number ?? 'Not provided'}</p>
        <p><strong className="text-green-700 font-semibold">Election Division:</strong> {teacher.teachersaddress?.election_division || 'Not provided'}</p>
        <p><strong className="text-green-700 font-semibold">Election Division No:</strong> {teacher.teachersaddress?.election_division_number ?? 'Not provided'}</p>
      </div>
    </section>

    {/* Work Information */}
    <section className="mb-10 p-8 bg-white rounded-lg shadow-lg border-l-8 border-purple-700">
      <h3 className="text-2xl font-bold text-purple-800 mb-6 uppercase tracking-wide border-b-2 border-purple-300 pb-2">
        Work Information
      </h3>
      <div className="space-y-2 text-gray-800 text-lg leading-relaxed">
        <p><strong className="text-purple-700 font-semibold">Appointed Date:</strong> {teacher.appointed_date || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Work Acceptance Date:</strong> {teacher.work_acceptance_date || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Appointment Type:</strong> {teacher.appointment_type || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Salary Increment Date:</strong> {teacher.salary_increment_date || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Current Grade of Teaching Service:</strong> {teacher.current_grade_of_teaching_service || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Work Acceptance Date at School:</strong> {teacher.work_acceptance_date_school || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Temporary Attached School/Institute:</strong> {teacher.temporary_attachedschool_or_institute_name || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Appointed Subject:</strong> {teacher.appointed_subject || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Which Grades Teaching Done:</strong> {teacher.which_grades_teaching_done || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Current Teaching Subject:</strong> {teacher.current_teaching_subject || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Other Subjects Taught:</strong> {teacher.other_subjects_taught || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Assigned Class:</strong> {teacher.assigned_class || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Other Responsibilities:</strong> {teacher.other_responsibilities_assigned || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">150 Hrs Tamil Course Completed:</strong> {teacher.is_150_hrs_tamil_course_completed ? 'Yes' : 'No'}</p>
        <p><strong className="text-purple-700 font-semibold">Commuting From School:</strong> {teacher.commuting_from_school || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Distance From School (km):</strong> {teacher.distance_from_school || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Commuting Method to School:</strong> {teacher.commuting_method_to_school || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Number in Sign Sheet:</strong> {teacher.number_in_sign_sheet || 'Not provided'}</p>
        <p><strong className="text-purple-700 font-semibold">Number in Salary Sheet:</strong> {teacher.number_in_salary_sheet || 'Not provided'}</p>
      </div>
    </section>

    {/* Qualifications */}
    <section className="mb-19 p-30 bg-white rounded-lg shadow-lg border-l-8 border-yellow-700">
      <h3 className="text-2xl font-bold text-yellow-900 mb-6 uppercase tracking-wide border-b-2 border-yellow-300 pb-2">
        Qualifications
      </h3>
      <div className="space-y-2 text-gray-800 text-lg leading-relaxed">
        <p><strong className="text-yellow-800 font-semibold">AL Subject Stream:</strong> {teacher.qualifications?.gce_al_subject_stream || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Type of Service in School:</strong> {teacher.qualifications?.type_of_service_in_school || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Highest Education Qualification:</strong> {teacher.qualifications?.highest_education_qualification || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Basic Degree Stream:</strong> {teacher.qualifications?.basic_degree_stream || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Highest Professional Qualification:</strong> {teacher.qualifications?.highest_professional_qualification || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Present Class:</strong> {teacher.qualifications?.present_class || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Present Grade:</strong> {teacher.qualifications?.present_grade || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Appointment Date for Current Class:</strong> {teacher.qualifications?.appointment_date_for_current_class || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Appointment Date for Current Grade:</strong> {teacher.qualifications?.appointment_date_for_current_grade || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Current Appointment Service Medium:</strong> {teacher.qualifications?.current_appointment_service_medium || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Appointment Subject Section:</strong> {teacher.qualifications?.appointed_subject_section || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Appointed Subject:</strong> {teacher.qualifications?.subject_appointed || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Date of Current Appointed Service:</strong> {teacher.qualifications?.currentservice_appointed_date || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">First and Most Subjects That Taught:</strong> {teacher.qualifications?.subjects_taught_most_and_second_most || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Position in the School:</strong> {teacher.qualifications?.position_in_the_school || 'Not provided'}</p>
        <p><strong className="text-yellow-800 font-semibold">Assign Date for the School:</strong> {teacher.qualifications?.assign_date_for_the_school || 'Not provided'}</p>
      </div>
    </section>

    {/* Other Service Information */}
    <section className="mb-10 p-8 bg-white rounded-lg shadow-lg border-l-8 border-red-700">
      <h3 className="text-2xl font-bold text-red-800 mb-6 uppercase tracking-wide border-b-2 border-red-300 pb-2">
        Other Services
      </h3>
      <div className="space-y-2 text-gray-800 text-lg leading-relaxed">
        <p><strong className="text-red-700 font-semibold">Other Responsibilities in School:</strong> {teacher.teacherotherservice?.other_responsibilities_in_school || 'Not provided'}</p>
        <p><strong className="text-red-700 font-semibold">Have EDCS Membership?:</strong> {teacher.teacherotherservice?.EDCS_membership || 'Not provided'}</p>
        <p><strong className="text-red-700 font-semibold">WSOP Number:</strong> {teacher.teacherotherservice?.WSOP_Number || 'Not provided'}</p>
        <p><strong className="text-red-700 font-semibold">Have Agrahara Insurance Membership?:</strong> {teacher.teacherotherservice?.Agrahara_insuarence_membership || 'Not provided'}</p>
      </div>
    </section>

    {/* Action Buttons */}
    <div className="flex justify-center gap-8 mt-8">
      <button
        onClick={() => handleEdit(teacher)}
        className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition duration-200"
      >
        Edit Records
      </button>
      <button
        onClick={() => handleDelete(teacher.teacher_NIC)}
        className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition duration-200"
      >
        Delete Entire Records
      </button>
    </div>
  </div>
)}

      {/* Edit Modal */}
      {editingTeacher && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    aria-modal="true"
    role="dialog"
    aria-labelledby="edit-teacher-title"
  >
    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Edit Teacher</h3>
      <form onSubmit={handleUpdate}>

        {/* Personal Information */}
        <h4 className="font-bold text-lg mt-4 mb-2">Personal Information</h4>
        
        <div className="mb-2">
          <label className="block text-sm font-bold">Full Name:</label>
          <input
            type="text"
            value={editingTeacher.personal?.Full_name || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              personal: { ...editingTeacher.personal, Full_name: e.target.value }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-bold">Full Name with Initial:</label>
          <input
            type="text"
            value={editingTeacher.personal?.Full_name_with_initial || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              personal: { ...editingTeacher.personal, Full_name_with_initial: e.target.value }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
  <label className="block text-sm font-bold">Gender:</label>
  <select
    value={editingTeacher.personal?.Gender || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        personal: {
          ...editingTeacher.personal,
          Gender: e.target.value as "Male" | "Female" | "Other",
        },
      })
    }
    className="border p-2 w-full"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>


        <div className="mb-2">
  <label className="block text-sm font-bold">Birthdate:</label>
  <input
    type="date"
    value={editingTeacher.personal?.Birthdate || ""}
    max={new Date().toISOString().split("T")[0]} // ✅ Set max date to today
    onChange={(e) => {
      const selectedDate = e.target.value;
      const today = new Date().toISOString().split("T")[0];

      if (selectedDate > today) {
        alert("Birthdate cannot be in the future.");
        return; // prevent update
      }

      setEditingTeacher({
        ...editingTeacher,
        personal: { ...editingTeacher.personal, Birthdate: selectedDate }
      });
    }}
    className="border p-2 w-full"
  />
</div>


        {/* Contact Information */}
        <h4 className="font-bold text-lg mt-4 mb-2">Contact Information</h4>

        <div className="mb-2">
          <label className="block text-sm font-bold">Email Address:</label>
          <input
            type="email"
            value={editingTeacher.personal?.Email_address || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              personal: { ...editingTeacher.personal, Email_address: e.target.value }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-bold">Mobile Number:</label>
          <input
            type="text"
            value={editingTeacher.personal?.Mobile_number || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              personal: { ...editingTeacher.personal, Mobile_number: e.target.value }
            })}
            className="border p-2 w-full"
          />
        </div>
{/* Personal Information Continued */}
<div className="mb-2">
  <label className="block text-sm font-bold">Region:</label>
  <input
    type="text"
    value={editingTeacher.personal?.Region || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      personal: { ...editingTeacher.personal, Region: e.target.value }
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Ethnicity:</label>
  <input
    type="text"
    value={editingTeacher.personal?.Ethnicity || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      personal: { ...editingTeacher.personal, Ethnicity: e.target.value }
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Title:</label>
  <input
    type="text"
    value={editingTeacher.personal?.Title || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      personal: { ...editingTeacher.personal, Title: e.target.value }
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Marital Status:</label>
  <select
    value={editingTeacher.personal?.Marital_status || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        personal: {
          ...editingTeacher.personal,
          Marital_status: e.target.value as "Single" | "Married" | "Divorced" | "Widowed",
        },
      })
    }
    className="border p-2 w-full"
  >
    <option value="">Select Marital Status</option>
    <option value="Single">Single</option>
    <option value="Married">Married</option>
    <option value="Divorced">Divorced</option>
    <option value="Widowed">Widowed</option>
  </select>
</div>


<div className="mb-2">
  <label className="block text-sm font-bold">Emergency Telephone Number:</label>
  <input
    type="text"
    value={editingTeacher.personal?.Emergency_telephone_number || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      personal: { ...editingTeacher.personal, Emergency_telephone_number: e.target.value }
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Fixed Telephone Number:</label>
  <input
    type="text"
    value={editingTeacher.personal?.Fixed_telephone_number || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      personal: { ...editingTeacher.personal, Fixed_telephone_number: e.target.value }
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">WhatsApp Number:</label>
  <input
    type="text"
    value={editingTeacher.personal?.Whatsapp_number || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      personal: { ...editingTeacher.personal, Whatsapp_number: e.target.value }
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold mb-1">Details About Family Members:</label>
  <textarea
    value={editingTeacher.personal?.Details_about_family_members || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        personal: { ...editingTeacher.personal, Details_about_family_members: e.target.value },
      })
    }
    className="border p-2 w-full rounded resize-y"
    rows={5}
    style={{ lineHeight: "1.5", fontSize: "1rem" }}
  />
</div>

        {/* Address */}
        <h4 className="font-bold text-lg mt-4 mb-2">Address Information</h4>

       

<div className="mb-2">
  <label className="block text-sm font-bold">Permanent Address:</label>
  <input
    type="text"
    value={editingTeacher.teachersaddress?.permanent_address || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        teachersaddress: {
          ...editingTeacher.teachersaddress,
          permanent_address: e.target.value,
        },
      })
    }
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Residential Address:</label>
  <input
    type="text"
    value={editingTeacher.teachersaddress?.permanent_residential_address || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        teachersaddress: {
          ...editingTeacher.teachersaddress,
          permanent_residential_address: e.target.value,
        },
      })
    }
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Grama Niladari Division:</label>
  <input
    type="text"
    value={editingTeacher.teachersaddress?.grama_niladari_division || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        teachersaddress: {
          ...editingTeacher.teachersaddress,
          grama_niladari_division: e.target.value,
        },
      })
    }
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Grama Niladari Division Number:</label>
  <input
    type="text"
    value={editingTeacher.teachersaddress?.grama_niladari_division_number ?? ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        teachersaddress: {
          ...editingTeacher.teachersaddress,
          grama_niladari_division_number: (e.target.value) ,
        },
      })
    }
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Election Division:</label>
  <input
    type="text"
    value={editingTeacher.teachersaddress?.election_division || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        teachersaddress: {
          ...editingTeacher.teachersaddress,
          election_division: e.target.value,
        },
      })
    }
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Election Division Number:</label>
  <input
    type="text"
    value={editingTeacher.teachersaddress?.election_division_number ?? ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        teachersaddress: {
          ...editingTeacher.teachersaddress,
          election_division_number: (e.target.value) ,
        },
      })
    }
    className="border p-2 w-full"
  />
</div>

        

        {/* Work Information */}
        <h4 className="font-bold text-lg mt-4 mb-2">Work Information</h4>

      

<div className="mb-2">
  <label className="block text-sm font-bold">Appointed Date:</label>
  <input
    type="date"
    value={editingTeacher.appointed_date || ""}
    max={new Date().toISOString().split("T")[0]} // Limit to today
    onChange={(e) => {
      const selectedDate = e.target.value;
      const today = new Date().toISOString().split("T")[0];

      if (selectedDate > today) {
        alert("Appointed date cannot be in the future.");
        return;
      }

      setEditingTeacher({
        ...editingTeacher,
        appointed_date: selectedDate
      });
    }}
    className="border p-2 w-full"
  />
</div>


<div className="mb-2">
  <label className="block text-sm font-bold">Work Acceptance Date:</label>
  <input
    type="date"
    value={editingTeacher.work_acceptance_date || ""}
    max={new Date().toISOString().split("T")[0]} // Disables future date selection
    onChange={(e) => {
      const selectedDate = e.target.value;
      const today = new Date().toISOString().split("T")[0];

      if (selectedDate > today) {
        alert("Work acceptance date cannot be in the future.");
        return;
      }

      setEditingTeacher({
        ...editingTeacher,
        work_acceptance_date: selectedDate
      });
    }}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Appointment Type:</label>
  <input
    type="text"
    value={editingTeacher.appointment_type || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      appointment_type: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Salary Increment Date:</label>
  <input
    type="date"
    value={editingTeacher.salary_increment_date || ""}
    max={new Date().toISOString().split("T")[0]} // UI restriction
    onChange={(e) => {
      const selectedDate = e.target.value;
      const today = new Date().toISOString().split("T")[0];

      if (selectedDate > today) {
        alert("Salary Increment Date cannot be in the future.");
        return;
      }

      setEditingTeacher({
        ...editingTeacher,
        salary_increment_date: selectedDate
      });
    }}
    className="border p-2 w-full"
  />
</div>


<div className="mb-2">
  <label className="block text-sm font-bold">Current Grade of Teaching Service:</label>
  <select
  
    value={editingTeacher.current_grade_of_teaching_service || ""}
    onChange={(e) =>
  setEditingTeacher({
    ...editingTeacher,
    current_grade_of_teaching_service: e.target.value as "Grade I" | "Grade II" | "Grade III",
  })
}

    className="border p-2 w-full"
  >
    <option value="">Select Grade</option>
    <option value="Grade I">Grade I</option>
    <option value="Grade II">Grade II</option>
    <option value="Grade III">Grade III</option>
  </select>
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Work Acceptance Date in School:</label>
  <input
    type="date"
    value={editingTeacher.work_acceptance_date_school || ""}
    max={new Date().toISOString().split("T")[0]} // restrict future dates in UI
    onChange={(e) => {
      const selectedDate = e.target.value;
      const today = new Date().toISOString().split("T")[0];

      if (selectedDate > today) {
        alert("Work Acceptance Date in School cannot be in the future.");
        return;
      }

      setEditingTeacher({
        ...editingTeacher,
        work_acceptance_date_school: selectedDate
      });
    }}
    className="border p-2 w-full"
  />
</div>


<div className="mb-2">
  <label className="block text-sm font-bold">Temporary Attached School / Institute:</label>
  <input
    type="text"
    value={editingTeacher.temporary_attachedschool_or_institute_name || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      temporary_attachedschool_or_institute_name: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Appointed Subject:</label>
  <input
    type="text"
    value={editingTeacher.appointed_subject || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      appointed_subject: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Which Grades Teaching Done:</label>
  <input
    type="text"
    value={editingTeacher.which_grades_teaching_done || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      which_grades_teaching_done: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Current Teaching Subject:</label>
  <input
    type="text"
    value={editingTeacher.current_teaching_subject || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      current_teaching_subject: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Other Subjects Taught:</label>
  <input
    type="text"
    value={editingTeacher.other_subjects_taught || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      other_subjects_taught: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Assigned Class:</label>
  <input
    type="text"
    value={editingTeacher.assigned_class || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      assigned_class: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Other Responsibilities Assigned:</label>
  <input
    type="text"
    value={editingTeacher.other_responsibilities_assigned || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      other_responsibilities_assigned: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">150 Hours Tamil Course Completed:</label>
  <input
    type="checkbox"
    checked={editingTeacher.is_150_hrs_tamil_course_completed || false}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      is_150_hrs_tamil_course_completed: e.target.checked
    })}
    className="mr-2"
  />
  <span>Yes</span>
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Commuting From School:</label>
  <select
    value={editingTeacher.commuting_from_school || ""}
    onChange={(e) =>
  setEditingTeacher({
    ...editingTeacher,
    commuting_from_school: e.target.value as "Home" | "Boarding" | "Hostel" | "Other",
  })
}

    
    className="border p-2 w-full"
  >
    <option value="">Select</option>
    <option value="Home">Home</option>
    <option value="Boarding">Boarding</option>
    <option value="Hostel">Hostel</option>
    <option value="Other">Other</option>
  </select>
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Distance From School (km):</label>
  <input
    type="number"
    value={editingTeacher.distance_from_school || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      distance_from_school: parseFloat(e.target.value)
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Commuting Method To School:</label>
  <select
    value={editingTeacher.commuting_method_to_school || ""}
    onChange={(e) =>
  setEditingTeacher({
    ...editingTeacher,
    commuting_method_to_school: e.target.value as
      | "Other"
      | "Bicycle"
      | "MotorBike"
      | "Car"
      | "Bus"
      | "Threewheeler"
      | "Walk",
  })
}

    className="border p-2 w-full"
  >
    <option value="">Select Method</option>
    <option value="Bicycle">Bicycle</option>
    <option value="MotorBike">MotorBike</option>
    <option value="Car">Car</option>
    <option value="Bus">Bus</option>
    <option value="Threewheeler">Threewheeler</option>
    <option value="Walk">Walk</option>
    <option value="Other">Other</option>
  </select>
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Number in Sign Sheet:</label>
  <input
    type="text"
    value={editingTeacher.number_in_sign_sheet || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      number_in_sign_sheet: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>

<div className="mb-2">
  <label className="block text-sm font-bold">Number in Salary Sheet:</label>
  <input
    type="text"
    value={editingTeacher.number_in_salary_sheet || ""}
    onChange={(e) => setEditingTeacher({
      ...editingTeacher,
      number_in_salary_sheet: e.target.value
    })}
    className="border p-2 w-full"
  />
</div>


        {/* Qualification Information */}
        <h4 className="font-bold text-lg mt-4 mb-2">Qualification Information</h4>

        <div className="mb-2">
          <label className="block text-sm font-bold">Highest Education Qualification:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.highest_education_qualification || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                highest_education_qualification: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

         <div className="mb-2">
          <label className="block text-sm font-bold">GCE AL subject stream:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.gce_al_subject_stream || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                gce_al_subject_stream: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

         <div className="mb-2">
          <label className="block text-sm font-bold">Type of service in school:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.type_of_service_in_school || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                type_of_service_in_school: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

         <div className="mb-2">
          <label className="block text-sm font-bold">Basic degree stream:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.basic_degree_stream || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                basic_degree_stream: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>
         <div className="mb-2">
          <label className="block text-sm font-bold">Highest professinal Qualification:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.highest_professional_qualification || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                highest_professional_qualification: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

         <div className="mb-2">
  <label className="block text-sm font-bold">Present class:</label>
  <select
    value={editingTeacher.qualifications?.present_class || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        qualifications: {
          ...editingTeacher.qualifications,
          present_class: e.target.value as "Class 1" | "Class 2" | "Class 3",
        },
      })
    }
    className="border p-2 w-full"
  >
    <option value="">Select Class</option>
    <option value="Class 1">Class 1</option>
    <option value="Class 2">Class 2</option>
    <option value="Class 3">Class 3</option>
  </select>
</div>


        <div className="mb-2">
  <label className="block text-sm font-bold">Present grade:</label>
  <select
    value={editingTeacher.qualifications?.present_grade || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        qualifications: {
          ...editingTeacher.qualifications,
          present_grade: e.target.value as "Grade I" | "Grade II" | "Grade III",
        },
      })
    }
    className="border p-2 w-full"
  >
    <option value="">Select Grade</option>
    <option value="Grade I">Grade I</option>
    <option value="Grade II">Grade II</option>
    <option value="Grade III">Grade III</option>
  </select>
</div>

         <div className="mb-2">
  <label className="block text-sm font-bold">Appointment Date for Current Class:</label>
  <input
    type="date"
    value={editingTeacher.qualifications?.appointment_date_for_current_class || ""}
    max={new Date().toISOString().split("T")[0]} // disable future dates in picker
    onChange={(e) => {
      const selectedDate = e.target.value;
      const today = new Date().toISOString().split("T")[0];

      if (selectedDate > today) {
        alert("Appointment date cannot be in the future.");
        return;
      }

      setEditingTeacher({
        ...editingTeacher,
        qualifications: {
          ...editingTeacher.qualifications,
          appointment_date_for_current_class: selectedDate,
        },
      });
    }}
    className="border p-2 w-full"
  />
</div>


         <div className="mb-2">
  <label className="block text-sm font-bold">Appointment Date for Current Grade:</label>
  <input
    type="date"
    value={editingTeacher.qualifications?.appointment_date_for_current_grade || ""}
    max={new Date().toISOString().split("T")[0]} // prevents future dates
    onChange={(e) => {
      const selectedDate = e.target.value;
      const today = new Date().toISOString().split("T")[0];

      if (selectedDate > today) {
        alert("Appointment date cannot be in the future.");
        return;
      }

      setEditingTeacher({
        ...editingTeacher,
        qualifications: {
          ...editingTeacher.qualifications,
          appointment_date_for_current_grade: selectedDate,
        },
      });
    }}
    className="border p-2 w-full"
  />
</div>

         <div className="mb-2">
          <label className="block text-sm font-bold">Current appointment service medium:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.current_appointment_service_medium || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                current_appointment_service_medium: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-bold">Appointment subject section:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.appointed_subject_section || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                appointed_subject_section: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-bold">appointed subject:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.subject_appointed || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                subject_appointed: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-bold">Appointed date for current service:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.currentservice_appointed_date || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                currentservice_appointed_date: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-bold">subjects that are taught first and second most:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.subjects_taught_most_and_second_most || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                subjects_taught_most_and_second_most: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-bold">Position in the school:</label>
          <input
            type="text"
            value={editingTeacher.qualifications?.position_in_the_school || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              qualifications: { 
                ...editingTeacher.qualifications, 
                position_in_the_school: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
  <label className="block text-sm font-bold">Assign Date for the School:</label>
  <input
    type="date"
    value={editingTeacher.qualifications?.assign_date_for_the_school || ""}
    max={new Date().toISOString().split("T")[0]} // Prevent future date selection
    onChange={(e) => {
      const selectedDate = e.target.value;
      const today = new Date().toISOString().split("T")[0];

      if (selectedDate > today) {
        alert("Assign date for the school cannot be in the future.");
        return;
      }

      setEditingTeacher({
        ...editingTeacher,
        qualifications: {
          ...editingTeacher.qualifications,
          assign_date_for_the_school: selectedDate
        }
      });
    }}
    className="border p-2 w-full"
  />
</div>


        

        {/* Other Service Information */}
        <h4 className="font-bold text-lg mt-4 mb-2">Other Service Information</h4>

        <div className="mb-2">
          <label className="block text-sm font-bold">Other Responsibilities in School:</label>
          <input
            type="text"
            value={editingTeacher.teacherotherservice?.other_responsibilities_in_school || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              teacherotherservice: { 
                ...editingTeacher.teacherotherservice, 
                other_responsibilities_in_school: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
  <label className="block text-sm font-bold">Have EDCS Membership?:</label>
  <select
    value={editingTeacher.teacherotherservice?.EDCS_membership || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        teacherotherservice: {
          ...editingTeacher.teacherotherservice,
          EDCS_membership: e.target.value as "Yes" | "No",
        },
      })
    }
    className="border p-2 w-full"
  >
    <option value="">Select Option</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

        <div className="mb-2">
          <label className="block text-sm font-bold">WSOP number:</label>
          <input
            type="text"
            value={editingTeacher.teacherotherservice?.WSOP_Number || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              teacherotherservice: { 
                ...editingTeacher.teacherotherservice, 
                WSOP_Number: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
        </div>

       <div className="mb-2">
  <label className="block text-sm font-bold">Have Agrahara insurance membership?:</label>
  <select
    value={editingTeacher.teacherotherservice?.Agrahara_insuarence_membership || ""}
    onChange={(e) =>
      setEditingTeacher({
        ...editingTeacher,
        teacherotherservice: {
          ...editingTeacher.teacherotherservice,
          Agrahara_insuarence_membership: e.target.value as "Yes" | "No",
        },
      })
    }
    className="border p-2 w-full"
  >
    <option value="">Select Option</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>


        {/* Save and Cancel Buttons */}
        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
          <button onClick={() => setEditingTeacher(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
    
    </div>
     <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
  <div className="max-w-6xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">📋 Teacher's Information Overview</h1>

    {/* Card Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      <button
        onClick={() => handleStepClick(1)}
        className="bg-blue-100 hover:bg-blue-200 transition-all duration-200 p-6 rounded-xl shadow-lg text-left border border-blue-300"
      >
        <h3 className="text-lg font-semibold text-blue-800 mb-1">👤 Step 1</h3>
        <p className="text-sm text-gray-700">Basic Information</p>
      </button>

      <button
        onClick={() => handleStepClick(2)}
        className="bg-green-100 hover:bg-green-200 transition-all duration-200 p-6 rounded-xl shadow-lg text-left border border-green-300"
      >
        <h3 className="text-lg font-semibold text-green-800 mb-1">🏡 Step 2</h3>
        <p className="text-sm text-gray-700">Address Info</p>
      </button>

      <button
        onClick={() => handleStepClick(3)}
        className="bg-yellow-100 hover:bg-yellow-200 transition-all duration-200 p-6 rounded-xl shadow-lg text-left border border-yellow-300"
      >
        <h3 className="text-lg font-semibold text-yellow-800 mb-1">🛠️ Step 3</h3>
        <p className="text-sm text-gray-700">Work Info</p>
      </button>

      <button
        onClick={() => handleStepClick(4)}
        className="bg-purple-100 hover:bg-purple-200 transition-all duration-200 p-6 rounded-xl shadow-lg text-left border border-purple-300"
      >
        <h3 className="text-lg font-semibold text-purple-800 mb-1">🎓 Step 4</h3>
        <p className="text-sm text-gray-700">Qualification</p>
      </button>

      <button
        onClick={() => handleStepClick(5)}
        className="bg-pink-100 hover:bg-pink-200 transition-all duration-200 p-6 rounded-xl shadow-lg text-left border border-pink-300"
      >
        <h3 className="text-lg font-semibold text-pink-800 mb-1">🧾 Step 5</h3>
        <p className="text-sm text-gray-700">Other Info</p>
      </button>
    </div>
  </div>
</div>

{selectedStep === 1 && (
<div className="bg-white p-6 shadow-md rounded-lg mb-6 max-w-full">
    <h3 className="text-2xl font-semibold mb-4 text-blue-800">Step 1: Teacher's Basic Information</h3>

      <div className="w-[1100px] border rounded overflow-x-auto">
    {/* Outer scroll container handles horizontal scrolling */}

    <div className="max-h-[500px] overflow-y-auto">
      {/* Inner container handles vertical scrolling only */}

      <table className="min-w-[2000px] border border-gray-300 text-sm text-left">
        {/* Your table head + body */}
         <thead className="bg-gray-100 text-gray-900">
              <tr>
                {[
                  "No.",
                  "NIC Number",
                  
                  "Full Name",
                  "Name with Initials",
                  "Photo",
                  "DOB",
                  "Gender",
                  "Ethnicity",
                  "Religion",
                  "Title",
                  "Marital status",
                  "Details about family members",
                  "Emergency telephone number",
                  "Email address",
                  "Fixed telephone number",
                  "Mobile number",
                  "Whatsapp number",
                ].map((title, i) => (
                <th
  key={i}
  className={`border px-3 py-2 min-w-[150px] font-medium ${
    title === "NIC Number" ? "sticky left-0 z-10 bg-gray-100" : ""
  }`}
>
  {title}
</th>

                ))}
              </tr>
            </thead>
           <tbody>
  {paginatedTeachers.map((teacher, index) => (

    <tr key={teacher.teacher_NIC} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="border px-3 py-1">{index + 1}</td>
      

<td className="border px-3 py-1 sticky left-0 z-10 bg-white">
  {teacher.teacher_NIC}
</td>
      {/* <td className="border px-2 py-1">{teacher.reg_ ?? "-"}</td> */}
      <td className="border px-3 py-1">{teacher.personal?.Full_name ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Full_name_with_initial ?? "-"}</td>
      <td className="border px-3 py-1">
        {teacher.personal?.Photo ? (
          <img src={`/storage/${teacher.personal.Photo}`} alt="Teacher" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          "No Photo"
        )}
      </td>
      <td className="border px-3 py-1">{teacher.personal?.Birthdate ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Gender ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Ethnicity ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Region ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Title ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Marital_status ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Details_about_family_members ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Emergency_telephone_number ?? "-"}</td>
      <td className="border px-3 py-1">{(teacher.personal?.Email_address)}</td>
      <td className="border px-3 py-1">{teacher.personal?.Fixed_telephone_number ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Mobile_number ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.personal?.Whatsapp_number ?? "-"}</td>
      <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
</div>
        {/* <div className="flex justify-end mt-4">
          <button
            onClick={handleNextStep}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div> */}
        <div className="flex justify-between items-center mt-4">
  <button
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
  >
    Prev
  </button>
  <span className="text-gray-700 font-medium">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

      
  </div>
)}

{selectedStep === 2 && (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">

    <h3 className="text-2xl font-semibold mb-4 text-blue-800">Step 2: Address Information</h3>
    
          <div className="w-[1100px] border rounded overflow-x-auto">
    {/* Outer scroll container handles horizontal scrolling */}

    <div className="max-h-[500px] overflow-y-auto">
      {/* Inner container handles vertical scrolling only */}

      <table className="min-w-[2000px] border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 text-gray-900">
            
              <tr>
                {[
                  "No.",
                  "NIC Number",
                  "Permanent Address",
                  "Residential Address",
                  "GN Division",
                  "GN Division No.",
                  "Election Division",
                  "Election Division No.",
                ].map((title, i) => (
                  <th
  key={i}
  className={`border px-3 py-2 min-w-[150px] font-medium ${
    title === "NIC Number" ? "sticky left-0 z-10 bg-gray-100" : ""
  }`}
>
  {title}
</th>

                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedTeachers.map((teacher, index) => (

    <tr key={teacher.teacher_NIC} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="border px-3 py-1">{index + 1}</td>

      <td className="border px-3 py-1 sticky left-0 z-10 bg-white">
  {teacher.teacher_NIC}
</td>

      {/* <td className="border px-3 py-1">{teacher.reg_ ?? "-"}</td> */}
      <td className="border px-3 py-1">{teacher.teachersaddress?.permanent_address ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.teachersaddress?.permanent_residential_address ?? "-"}</td>
      
      <td className="border px-3 py-1">{teacher.teachersaddress?.grama_niladari_division ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.teachersaddress?.grama_niladari_division_number ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.teachersaddress?.election_division ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.teachersaddress?.election_division_number ?? "-"}</td>
               <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
 </tr>
  ))}
            </tbody>
          </table>
        </div>
</div>
        {/* <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevStep}
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
          <button
            onClick={handleNextStep}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
       */}
       <div className="flex justify-between items-center mt-4">
  <button
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
  >
    Prev
  </button>
  <span className="text-gray-700 font-medium">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

   
  </div>
)}
{selectedStep === 3 && (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">

    <h3 className="text-2xl font-semibold mb-4 text-blue-800">Step 3: Work Information</h3>
             <div className="w-[1100px] border rounded overflow-x-auto">
    {/* Outer scroll container handles horizontal scrolling */}

    <div className="max-h-[500px] overflow-y-auto">
      {/* Inner container handles vertical scrolling only */}

      <table className="min-w-[2000px] border border-gray-300 text-sm text-left">
         <thead className="bg-gray-100 text-gray-900">
              <tr>
                {[
                  "No.",
                  "NIC",
                  "Appointment Date",
                  "Work Acceptance Date",
                  "Appointment Type",
                  "Salary Increment Date",
                  "Current Grade",
                  "School Acceptance Date",
                  "Attached School/Institute",
                  "Appointed Subject",
                  "Grades Taught",
                  "Current Subject",
                  "Subjects Taught",
                  "Assigned Class",
                  "Other Responsibilities",
                  "150-Hour Course Done",
                  "Computing from School",
                  "Distance to School",
                  "Commuting Method",
                  "Sign Sheet No.",
                  "Salary Sheet No.",
                ].map((title, i) => (
                  <th
  key={i}
  className={`border px-3 py-2 min-w-[150px] font-medium ${
    title === "NIC Number" ? "sticky left-0 z-10 bg-gray-100" : ""
  }`}
>
  {title}
</th>

                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedTeachers.map((teacher, index) => (

    <tr key={teacher.teacher_NIC} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="border px-3 py-1">{index + 1}</td>

      <td className="border px-3 py-1 sticky left-0 z-10 bg-white">
  {teacher.teacher_NIC}
</td>

      {/* <td className="border px-3 py-1">{teacher.reg_ ?? "-"}</td> */}
      <td className="border px-3 py-1">{teacher.appointed_date ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.work_acceptance_date_school ?? "-"}</td>
      
      <td className="border px-3 py-1">{teacher.appointment_type ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.salary_increment_date ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.current_grade_of_teaching_service ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.work_acceptance_date_school ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.temporary_attachedschool_or_institute_name ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.appointed_subject ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.which_grades_teaching_done ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.current_teaching_subject ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.other_subjects_taught ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.assigned_class ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.other_responsibilities_assigned ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.is_150_hrs_tamil_course_completed ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.commuting_from_school ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.distance_from_school ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.commuting_method_to_school?? "-"}</td>
      <td className="border px-3 py-1">{teacher.number_in_sign_sheet ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.number_in_salary_sheet ?? "-"}</td>
             <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
 </tr>
  ))}
            </tbody>
          </table>
        </div>
</div>
        {/* <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevStep}
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
          <button
            onClick={handleNextStep}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div> */}
        <div className="flex justify-between items-center mt-4">
  <button
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
  >
    Prev
  </button>
  <span className="text-gray-700 font-medium">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

      
  </div>
)}
{selectedStep === 4 && (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">

    <h3 className="text-2xl font-semibold mb-4 text-blue-800">Step 4: Qualification</h3>
            <div className="w-[1100px] border rounded overflow-x-auto">
    {/* Outer scroll container handles horizontal scrolling */}

    <div className="max-h-[500px] overflow-y-auto">
      {/* Inner container handles vertical scrolling only */}

      <table className="min-w-[2000px] border border-gray-300 text-sm text-left">
           <thead className="bg-gray-100 text-gray-900">
           
              <tr>
                {[
                  "No.",
                  "NIC",
                  "Service Type",
                  "A/L Stream",
                  "Highest Education",
                  "Degree Stream",
                  "Professional Qualification",
                  "Present Class",
                  "Present Grade",
                  "Class Appointment Date",
                  "Grade Appointment Date",
                  "Service Medium",
                  "Subject Section",
                  "Appointed Subject",
                  "Service Start Date",
                  "Top Subjects Taught",
                  "School Position",
                  "School Join Date",
                ].map((title, i) => (
                  <th
  key={i}
  className={`border px-3 py-2 min-w-[150px] font-medium ${
    title === "NIC Number" ? "sticky left-0 z-10 bg-gray-100" : ""
  }`}
>
  {title}
</th>

                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedTeachers.map((teacher, index) => (

    <tr key={teacher.teacher_NIC} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="border px-3 py-1">{index + 1}</td>

<td className="border px-3 py-1 sticky left-0 z-10 bg-white">
  {teacher.teacher_NIC}
</td>
      {/* <td className="border px-3 py-1">{teacher.reg_ ?? "-"}</td> */}
      <td className="border px-3 py-1">{teacher.qualifications?.type_of_service_in_school ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.gce_al_subject_stream ?? "-"}</td>
      
      <td className="border px-3 py-1">{teacher.qualifications?.highest_education_qualification ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.basic_degree_stream ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.highest_professional_qualification ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.present_class ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.present_grade ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.appointment_date_for_current_class ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.appointment_date_for_current_grade ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.current_appointment_service_medium ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.appointed_subject_section ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.subject_appointed ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.currentservice_appointed_date ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.subjects_taught_most_and_second_most ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.position_in_the_school ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.qualifications?.assign_date_for_the_school ?? "-"}</td>
            <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
</tr>
  ))}
            </tbody>
          </table>
        </div>
</div>
        {/* <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevStep}
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
          <button
            onClick={handleNextStep}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div> */}
        <div className="flex justify-between items-center mt-4">
  <button
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
  >
    Prev
  </button>
  <span className="text-gray-700 font-medium">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

      
  </div>
)}
{selectedStep === 5 && (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">

    <h3 className="text-2xl font-semibold mb-4 text-blue-800">Step 5: Responsibilities & Memberships</h3>
          <div className="w-[1100px] border rounded overflow-x-auto">
    {/* Outer scroll container handles horizontal scrolling */}

    <div className="max-h-[500px] overflow-y-auto">
      {/* Inner container handles vertical scrolling only */}

      <table className="min-w-[2000px] border border-gray-300 text-sm text-left">
           <thead className="bg-gray-100 text-gray-900">
              <tr>
                {[
                  "No.",
                  "NIC",
                  "School Responsibilities",
                  "EDCS Membership",
                  "WSOP No.",
                  "Agrahara Insurance",
                ].map((title, i) => (
                  <th
  key={i}
  className={`border px-3 py-2 min-w-[150px] font-medium ${
    title === "NIC Number" ? "sticky left-0 z-10 bg-gray-100" : ""
  }`}
>
  {title}
</th>

                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedTeachers.map((teacher, index) => (

    <tr key={teacher.teacher_NIC} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="border px-3 py-1">{index + 1}</td>
      

<td className="border px-3 py-1 sticky left-0 z-10 bg-white">
  {teacher.teacher_NIC}
</td>
      {/* <td className="border px-3 py-1">{teacher.reg_ ?? "-"}</td> */}
      <td className="border px-3 py-1">{teacher.teacherotherservice?.other_responsibilities_in_school ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.teacherotherservice?.EDCS_membership ?? "-"}</td>
      
      <td className="border px-3 py-1">{teacher.teacherotherservice?.WSOP_Number ?? "-"}</td>
      <td className="border px-3 py-1">{teacher.teacherotherservice?.Agrahara_insuarence_membership ?? "-"}</td>
     
     <td>{(currentPage - 1) * rowsPerPage + index + 1}</td> </tr>
  ))}
            </tbody>
          </table>
        </div>
</div>
        {/* <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevStep}
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
          
        </div> */}
        <div className="flex justify-between items-center mt-4">
  <button
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
  >
    Prev
  </button>
  <span className="text-gray-700 font-medium">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

      
  </div>
)}



   
<ToastContainer position="top-right" autoClose={3000} hideProgressBar />
</main>

    </AppLayout>
  );
  
}

