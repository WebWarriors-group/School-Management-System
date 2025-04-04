import { useEffect, useState } from "react";

type Teacher = {
  teacher_NIC: string;
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
  permanent_address: string;
  residential_address: string;
  grama_niladari_division: string;
  grama_niladari_division_number: string;
  election_division: string;
  election_division_number: string;
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
  other_responsibilities_in_school: string;
  EDCS_membership: string;
  WSOP_Number: number | null;
  Agrahara_insuarence_membership: string;

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

      setTeachers(
        teachers.map((t) =>
          t.teacher_NIC === editingTeacher.teacher_NIC ? editingTeacher : t
        )
      );

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
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold">Teacher Details</h2>
          <p><strong>NIC:</strong> {teacher.teacher_NIC}</p>
          <p><strong>Full Name:</strong> {teacher.Full_name}</p>
          <p><strong>Email:</strong> {teacher.Email_address}</p>
          <p><strong>Gender:</strong> {teacher.Gender}</p>
          <p><strong>Birthdate:</strong> {teacher.Birthdate}</p>
          <p><strong>Marital Status:</strong> {teacher.Marital_status}</p>
          <p><strong>Address:</strong> {teacher.permanent_address}</p>
          <p><strong>Appointed Date:</strong> {teacher.appointed_date}</p>
          <p><strong>Work Acceptance Date:</strong> {teacher.work_acceptance_date}</p>
          <p><strong>Appointment Type:</strong> {teacher.appointment_type}</p>
          <p><strong>Current Grade:</strong> {teacher.current_grade_of_teaching_service}</p>
          <p><strong>Appointed Subject:</strong> {teacher.appointed_subject}</p>
          <p><strong>Grades Teaching:</strong> {teacher.which_grades_teaching_done}</p>
          <p><strong>Other Subjects:</strong> {teacher.other_subjects_taught}</p>
          <p><strong>Assigned Class:</strong> {teacher.assigned_class}</p>
          <p><strong>Commuting Method:</strong> {teacher.commuting_method_to_school}</p>
          <button onClick={() => handleEdit(teacher)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit records
                  </button>
                  <button onClick={() => handleDelete(teacher.teacher_NIC)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">
                    Delete entire records
                  </button> 
        </div>
        
      )}
    
    
      {/* Edit Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Teacher</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-2">
                <label className="block text-sm font-bold">full name:</label>
                <input
                  type="text"
                  value={editingTeacher.other_responsibilities_in_school}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, Full_name: e.target.value })}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-bold">EDCS Membership</label>
                <input
                  type="text"
                  value={editingTeacher.EDCS_membership}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, EDCS_membership: e.target.value })}
                  className="border p-2 w-full"
                />
              </div>
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
  );
}
