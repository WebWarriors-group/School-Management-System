import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { type BreadcrumbItem } from '@/types';


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
interface Task {
    id: number;
    text: string;
    completed: boolean;
  };

  const breadcrumbs: BreadcrumbItem[] = [
      {
          title: '👩‍🏫 Teacher Dashboard',
          href: '/dashboard',
      },
  
      
  ];

export default function PersonalDash({ teacher }: { teacher: Teacher }) {
    const [showProfile, setShowProfile] = useState(false);
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const addTask = () => {
    if (newTask.trim() === "") return;
    const task: Task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Toggle Task Completion
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete Task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


    if (!teacher) {
        return <div className="text-center text-red-500">Teacher not found.</div>;
    }

    // Construct the photo URL properly
    const photoUrl = teacher.personal.Photo
        ? `/storage/${teacher.personal.Photo}`
        : null;

    return (
        <AppLayout  breadcrumbs={breadcrumbs}>
            <Head title="Teacher Dashboard" />

            <div className="container mx-auto px-4 py-6 relative">
        {/* Toggle Profile Button */}
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="bg-gray-200 text-purple-900 px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 absolute top-20 right-4"
        >
          {showProfile ? "Close Profile" : "Profile"}
        </button>

        {/* Profile Dropdown */}
        {showProfile && (
            <div className="absolute top-20 right-4 w-96 max-h-[80vh] overflow-y-auto bg-white p-5 rounded-lg shadow-xl border border-gray-200 space-y-4 z-50">
            <h2 className="text-xl font-bold text-center text-purple-700">Teacher Profile</h2>

            <div className="flex justify-center">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-purple-500" />
              ) : (
                <div className="w-20 h-20 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full">
                  No Photo
                </div>
              )}
            </div>

                {/* Personal Details */}
                 <div className="space-y-2 text-sm text-gray-700">
              <h3 className="font-semibold border-b">Personal Info</h3>                    <p><strong>Full Name:</strong> {teacher.personal?.Full_name || 'Not provided'}</p>
                    <p><strong>Full Name with Initial:</strong> {teacher.personal?.Full_name_with_initial || 'Not provided'}</p>
                    <p><strong>Gender:</strong> {teacher.personal?.Gender || 'Not provided'}</p>
                    <p><strong>Region:</strong> {teacher.personal?.Region || 'Not provided'}</p>
                    <p><strong>Ethnicity:</strong> {teacher.personal?.Ethnicity || 'Not provided'}</p>
                    <p><strong>Birthdate:</strong> {teacher.personal?.Birthdate|| 'Not provided'}</p>
                    <p><strong>Title:</strong> {teacher.personal?.Title || 'Not provided'}</p>
                    <p><strong>Marital Status:</strong> {teacher.personal?.Marital_status || 'Not provided'}</p>
                    <p><strong>Email:</strong> {teacher.personal?.Email_address || 'Not provided'}</p>
                    <p><strong>Mobile Number:</strong> {teacher.personal?.Mobile_number || 'Not provided'}</p>
                    <p><strong>Fixed Telephone:</strong> {teacher.personal?.Fixed_telephone_number || 'Not provided'}</p>
                    <p><strong>Whatsapp Number:</strong> {teacher.personal?.Whatsapp_number || 'Not provided'}</p>
                    <p><strong>Emergency Contact:</strong> {teacher.personal?.Emergency_telephone_number || 'Not provided'}</p>

                </div>

                {/* Address */}
                <div className="space-y-2 text-sm text-gray-700">

                    <h3 className="font-semibold text-gray-700 border-b mb-2">Address</h3>
                    <p><strong>Permanent Address:</strong> {teacher.teachersaddress?.permanent_address || 'Not provided'}</p>
                    <p><strong>Residential Address:</strong> {teacher.teachersaddress?.residential_address || 'Not provided'}</p>
                    <p><strong>Grama Niladari Division:</strong> {teacher.teachersaddress?.grama_niladari_division || 'Not provided'}</p>
                    <p><strong>Election Division:</strong> {teacher.teachersaddress?.election_division || 'Not provided'}</p>
                </div>

                {/* Work Info */}
                <div className="space-y-2 text-sm text-gray-700">

                    <h3 className="font-semibold text-gray-700 border-b mb-2">Work Info</h3>
                    <p><strong>Appointment Type:</strong> {teacher.appointment_type || 'Not provided'}</p>
                    <p><strong>Appointed Date:</strong> {teacher.appointed_date || 'Not provided'}</p>
                    <p><strong>Work Acceptance Date:</strong> {teacher.work_acceptance_date || 'Not provided'}</p>
                    <p><strong>Salary Increment Date:</strong> {teacher.salary_increment_date || 'Not provided'}</p>
                    <p><strong>Current Grade:</strong> {teacher.current_grade_of_teaching_service || 'Not provided'}</p>
                    <p><strong>Teaching Subject:</strong> {teacher.current_teaching_subject || 'Not provided'}</p>
                    <p><strong>Commuting Method:</strong> {teacher.commuting_method_to_school || 'Not provided'}</p>
                    <p><strong>Distance from School:</strong> {teacher.distance_from_school || 'Not provided'} km</p>
                </div>

                {/* Qualifications */}
                <div className="space-y-2 text-sm text-gray-700">

                    <h3 className="font-semibold text-gray-700 border-b mb-2">Qualifications</h3>
                    <p><strong>Highest Education Qualification:</strong> {teacher.qualifications?.highest_education_qualification || 'Not provided'}</p>
                    <p><strong>Basic Degree Stream:</strong> {teacher.qualifications?.basic_degree_stream || 'Not provided'}</p>
                    <p><strong>Highest Professional Qualification:</strong> {teacher.qualifications?.highest_professional_qualification || 'Not provided'}</p>
                    <p><strong>Present Grade:</strong> {teacher.qualifications?.present_grade || 'Not provided'}</p>
                    <p><strong>Appointment Date for Current Grade:</strong> {teacher.qualifications?.appointment_date_for_current_grade || 'Not provided'}</p>
                </div>

                {/* Other Responsibilities */}
                <div className="space-y-2 text-sm text-gray-700">

                    <h3 className="font-semibold text-gray-700 border-b mb-2">Other Responsibilities</h3>
                    <p><strong>Other Responsibilities in School:</strong> {teacher.teacherotherservice?.other_responsibilities_in_school || 'Not provided'}</p>
                    <p><strong>EDCS Membership:</strong> {teacher.teacherotherservice?.EDCS_membership || 'Not provided'}</p>
                    <p><strong>WSOP Number:</strong> {teacher.teacherotherservice?.WSOP_Number || 'Not provided'}</p>
                    <p><strong>Agrahara Insurance Membership:</strong> {teacher.teacherotherservice?.Agrahara_insuarence_membership || 'Not provided'}</p>
                </div>

                {/* Close Button */}
                <div className="text-center mt-4">
              <button
                onClick={() => setShowProfile(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
   
    {/* The rest of your content */}
</div>
                {/* Welcome Banner */}
                <div className="bg-purple-900 text-white p-7 rounded-lg shadow-md text-center mb-6">
                <h1 className="text-2xl font-bold">Welcome, {teacher.personal?.Full_name || 'Teacher'}!</h1>
                    <p className="text-lg mt-1">Teacher's Personal Dashboard</p>
                </div>
                {/* Calendar and Leave Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">📅 Teacher Calendar</h2>
            <Calendar value={date} onChange={() => {}} />
          </div>

<div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">🏖️ Leave Summary</h2>      
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium">Leave Taken</th>
          <th className="px-6 py-3 text-left text-sm font-medium">Balance</th>
        </tr>
      </thead>
      <tbody className="text-gray-800">
        <tr className="border-t hover:bg-gray-50">
        <td className="px-6 py-4 text-sm font-medium">
            <div className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 border-4 border-green-500 rounded-full flex items-center justify-center">
                <span className="text-green-500">5</span>
              </div>
              <span>Days</span>
            </div>
          </td>
          <td className="px-6 py-4 text-sm font-medium">
            <div className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 border-4 border-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-yellow-500">7</span>
              </div>
              <span>Days</span>
            </div>
          </td>
        </tr>

        {/* Add more rows as needed */}
        
        <tr>
        <td colSpan={2} className="py-4">
            <Link href="/leave">
              <button className="bg-purple-900 text-white px-6 py-3 rounded-md shadow-md hover:bg-black transition-all w-full mx-auto">
                Leave Request Form
              </button>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
      </div>
      </div>
      
      {/* To-Do List Section (Fixed to Bottom Right) */}
      <div className="fixed bottom-4 right-4 w-72 z-40">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-full bg-purple-900 text-white py-2 rounded shadow"        >
          📌 To-Do List {isOpen ? "▲" : "▼"}
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="bg-white p-4 rounded shadow-lg mt-2">
          <h2 className="text-lg font-semibold mb-2">📌 Tasks</h2>
          <div className="flex mb-3">

              <input
                 className="flex-1 border p-2 rounded-l"
                 placeholder="Enter a task..."
                 value={newTask}
                 onChange={(e) => setNewTask(e.target.value)}
              />
              <button className="bg-purple-900 text-white px-4 rounded-r" onClick={addTask}>Add</button>
            </div>

            {/* Task List */}
            <ul className="text-sm space-y-2">
                {tasks.map(task => (
                  <li key={task.id} className="flex justify-between items-center">
                    <span
                      onClick={() => toggleTask(task.id)}
                      className={`cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
                    >
                      {task.text}
                    </span>
                    <button onClick={() => deleteTask(task.id)} className="text-red-500 text-sm">❌</button>
                  </li>
                ))}
              </ul>
          </div>
        )}
      </div>
                    
                
            
        </AppLayout>
    );
}
