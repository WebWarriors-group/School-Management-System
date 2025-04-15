import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";

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

export default function TeachersTable() {
  const [teacherNIC, setTeacherNIC] = useState("");
  const [teachers, setTeachers] = useState<Teacher[] >([]);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [error, setError] = useState("");

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
      const res = await fetch(`/api/teachers/${teacher_NIC}`, { method: "DELETE" ,headers: {
        "Content-Type": "application/json",
      },});

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setTeachers(teachers.filter((teacher) => teacher.teacher_NIC !== teacher_NIC));
    } catch (error) {
      console.error("Error deleting teacher:", error);
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
    <AppLayout>
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="max-w-4xl mx-auto p-4">
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
  <div className="mt-6 p-6 border rounded bg-gray-100 max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold text-center mb-4">Teacher Details</h2>

    {/* Personal Information */}
    <div className="mb-4 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold border-b pb-2 mb-2">Personal Information</h3>
      <p><strong>NIC:</strong> {teacher.teacher_NIC}</p>
      <p><strong>Full Name:</strong> {teacher.personal?.Full_name || 'No name provided'}</p>
      <p><strong>Full Name with Initial:</strong> {teacher.personal?.Full_name_with_initial || 'Not provided'}</p>
      <p><strong>Gender:</strong> {teacher.personal?.Gender || 'Not provided'}</p>
      <p><strong>Birthdate:</strong> {teacher.personal?.Birthdate || 'Not provided'}</p>
      <p><strong>Marital Status:</strong> {teacher.personal?.Marital_status || 'Not provided'}</p>
      <p><strong>Mobile Number:</strong> {teacher.personal?.Mobile_number || 'Not provided'}</p>
      <p><strong>Email:</strong> {teacher.personal?.Email_address || 'Not provided'}</p>

      {teacher.personal?.Photo && teacher.personal?.Photo instanceof File ? (
        <img
          src={URL.createObjectURL(teacher.personal.Photo)}
          alt="Teacher's Photo"
          className="w-32 h-32 object-cover rounded-full mt-2"
        />
      ) : (
        <p>No photo available</p>
      )}
    </div>

    {/* Address Information */}
    <div className="mb-4 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold border-b pb-2 mb-2">Address Information</h3>
      <p><strong>Permanent Address:</strong> {teacher.teachersaddress?.permanent_address || 'Not provided'}</p>
      <p><strong>Residential Address:</strong> {teacher.teachersaddress?.residential_address || 'Not provided'}</p>
      <p><strong>Grama Niladari Division:</strong> {teacher.teachersaddress?.grama_niladari_division || 'Not provided'}</p>
      <p><strong>Election Division:</strong> {teacher.teachersaddress?.election_division || 'Not provided'}</p>
    </div>

    {/* Work Information */}
    <div className="mb-4 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold border-b pb-2 mb-2">Work Information</h3>
      <p><strong>Appointed Date:</strong> {teacher.appointed_date || 'Not provided'}</p>
      <p><strong>Appointment Type:</strong> {teacher.appointment_type || 'Not provided'}</p>
      <p><strong>Current Teaching Grade:</strong> {teacher.current_grade_of_teaching_service || 'Not provided'}</p>
      <p><strong>Current Teaching Subject:</strong> {teacher.current_teaching_subject || 'Not provided'}</p>
      <p><strong>Other Subjects Taught:</strong> {teacher.other_subjects_taught || 'Not provided'}</p>
      <p><strong>Assigned Class:</strong> {teacher.assigned_class || 'Not provided'}</p>
      <p><strong>Other Responsibilities:</strong> {teacher.other_responsibilities_assigned || 'Not provided'}</p>
    </div>

    {/* Qualifications */}
    <div className="mb-4 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold border-b pb-2 mb-2">Qualifications</h3>
      <p><strong>AL Subject Stream:</strong> {teacher.qualifications?.gce_al_subject_stream || 'Not provided'}</p>
      <p><strong>Highest Education Qualification:</strong> {teacher.qualifications?.highest_education_qualification || 'Not provided'}</p>
      <p><strong>Basic Degree Stream:</strong> {teacher.qualifications?.basic_degree_stream || 'Not provided'}</p>
      <p><strong>Highest Professional Qualification:</strong> {teacher.qualifications?.highest_professional_qualification || 'Not provided'}</p>
    </div>

    {/* Other Service Information */}
    <div className="mb-4 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold border-b pb-2 mb-2">Other Services</h3>
      <p><strong>Other Responsibilities in School:</strong> {teacher.teacherotherservice?.other_responsibilities_in_school || 'Not provided'}</p>
      <p><strong>EDCS Membership:</strong> {teacher.teacherotherservice?.EDCS_membership || 'Not provided'}</p>
      <p><strong>WSOP Number:</strong> {teacher.teacherotherservice?.WSOP_Number || 'Not provided'}</p>
      <p><strong>Agrahara Insurance Membership:</strong> {teacher.teacherotherservice?.Agrahara_insuarence_membership || 'Not provided'}</p>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-between mt-4">
      <button
        onClick={() => handleEdit(teacher)}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        Edit Records
      </button>
      <button
        onClick={() => handleDelete(teacher.teacher_NIC)}
        className="bg-red-500 text-white px-4 py-2 rounded shadow"
      >
        Delete Entire Records
      </button>
    </div>
  </div>
)}

      {/* Edit Modal */}
      {editingTeacher && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
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
          <input
            type="text"
            value={editingTeacher.personal?.Gender || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              personal: { ...editingTeacher.personal, Gender: e.target.value }
            })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-bold">Birthdate:</label>
          <input
            type="date"
            value={editingTeacher.personal?.Birthdate || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              personal: { ...editingTeacher.personal, Birthdate: e.target.value }
            })}
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

        {/* Address */}
        <h4 className="font-bold text-lg mt-4 mb-2">Address Information</h4>

        <div className="mb-2">
          <label className="block text-sm font-bold">Permanent Address:</label>
          <input
            type="text"
            value={editingTeacher.teachersaddress?.permanent_address || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              teachersaddress: { 
                ...editingTeacher.teachersaddress, 
                permanent_address: e.target.value 
              }
            })}
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
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              appointed_date: e.target.value 
            })}
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
          <label className="block text-sm font-bold">Basic Degree Stream:</label>
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
          <label className="block text-sm font-bold">EDCS Membership:</label>
          <input
            type="text"
            value={editingTeacher.teacherotherservice?.EDCS_membership || ""}
            onChange={(e) => setEditingTeacher({
              ...editingTeacher,
              teacherotherservice: { 
                ...editingTeacher.teacherotherservice, 
                EDCS_membership: e.target.value 
              }
            })}
            className="border p-2 w-full"
          />
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
    </AppLayout>
  );
  
}
