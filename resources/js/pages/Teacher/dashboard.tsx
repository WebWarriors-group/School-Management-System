import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { type BreadcrumbItem } from '@/types';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { NavUser } from '@/components/nav-user';
import { Facebook, Mail, MapPin, Menu, X } from 'lucide-react'; 

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '👩‍🏫 Teacher Dashboard',
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

  class: {
    class_name: string;
    grade: string;
    section: string;
    number_of_students: number;
    studentacademics: {
        reg_no: string;
        studentpersonal: {
            full_name: string;
        };
    }[];
  };

  subjects: {
    subject_id: number;
    subject_name: string;
    students: {
      reg_no: number;
      personal: {
        full_name: string;
      }
    }[];
  }[];

};

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function dashboard({ teacher }: { teacher: Teacher }) {
  const [date, setDate] = useState(new Date());
const [tasks, setTasks] = useState<Task[]>(() => {
  const saved = localStorage.getItem('teacher_todo_tasks');
  
  return saved ? JSON.parse(saved) as Task[] : [];
});

  const [newTask, setNewTask] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false);
useEffect(() => {
  localStorage.setItem('teacher_todo_tasks', JSON.stringify(tasks));
}, [tasks]);
const data = [
  { name: 'Boys', value: 55 },
  { name: 'Girls', value: 45 },
];

const COLORS = ['#CC7722', '#FFBF00'];

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  useEffect(() => {
  localStorage.setItem('teacher_todo_tasks', JSON.stringify(tasks));
}, [tasks]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Teacher Dashboard" />
  <div className="bg-yellow-500 text-brown-900 text-md py-4 px-6 flex justify-between items-center ">
          <div>Welcome to Mahadivulwewa National School</div>
          <div className="space-x-4 hidden md:flex">
            <a href="https://www.facebook.com/ttnmmv"><Facebook size={18} /></a>
            <a href="mailto:ttnmahadivulwewamv@gmail.com"><Mail size={18} /></a>
            <a href="https://maps.google.com?q=Mahadivulwewa School"><MapPin size={18} /></a>
            
          </div>
        </div>

        
        <nav className="bg-[#5D4037] text-white py-3 px-6 shadow-md relative z-10">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center">
              <img src="/images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
              <span className="ml-3 font-orbitron text-xl font-bold">
                T / Tn/ Mahadivulwewa Maha Vidyalaya(National School)
              </span>
            </div>

           
            <div className="flex items-center space-x-4">
              <NavUser />
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-4 text-yellow-300">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          
          {menuOpen && (
            <div className="bg-white text-black px-4 py-3 md:hidden">
              <a href="https://www.facebook.com/ttnmmv" className="flex items-center space-x-2 py-1 hover:text-blue-600">
                <Facebook size={20} /> <span>Facebook</span>
              </a>
              <a href="mailto:ttnmahadivulwewamv@gmail.com" className="flex items-center space-x-2 py-1 hover:text-blue-600">
                <Mail size={20} /> <span>Email</span>
              </a>
              <a href="https://maps.google.com?q=Mahadivulwewa School" className="flex items-center space-x-2 py-1 hover:text-blue-600">
                <MapPin size={20} /> <span>Location</span>
              </a>
              <Link href={route('login')} className="block mt-3 rounded bg-brown-800 text-white px-4 py-2 text-center">
                Login
              </Link>
            </div>
          )}
        </nav>
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-8 bg-gray-100">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Profile */}
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">👤 Profile</h2>
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-2"></div>
            <p className="text-sm text-gray-500">Welcome Teacher</p>
          </div>

          {/* Calendar */}
          <div className="w-full max-w-[280px] mx-auto rounded-lg shadow-lg overflow-hidden">
  <Calendar
    value={date}
    onChange={setDate}
    className="text-sm border border-gray-300 rounded-lg"
  />
</div>


          {/* Leave Summary */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-purple-700 mb-4">🏖️ Leave Summary</h2>
            <div className="flex justify-around">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">5</span>
                </div>
                <p className="text-xs mt-1">Taken</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto rounded-full border-4 border-yellow-500 flex items-center justify-center">
                  <span className="text-yellow-600 font-bold text-sm">7</span>
                </div>
                <p className="text-xs mt-1">Balance</p>
              </div>
            </div>
            <Link href="/leave">
              <button className="mt-4 w-full bg-purple-700 text-white px-3 py-2 rounded hover:bg-purple-800 text-xs">
                Leave Request
              </button>
            </Link>
          </div>

          {/* To-Do List */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">📌 To-Do</h2>
            <div className="flex mb-3">
              <input
                className="flex-1 border p-1 rounded-l text-xs"
                placeholder="New task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                className="bg-indigo-700 text-white px-3 rounded-r hover:bg-indigo-800 text-xs"
                onClick={addTask}
              >
                Add
              </button>
            </div>
            <ul className="text-xs space-y-1">
              {tasks.map((task: Task) => (
                <li key={task.id} className="flex justify-between items-center">
                  <span
                    className={`cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 text-xs"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Messaging Dropdown */}
          <div className="bg-white rounded-lg shadow">
            <button
              type="button"
              onClick={() => setIsMessagingOpen(!isMessagingOpen)}
              className="w-full flex justify-between items-center p-4 text-green-700 font-semibold text-lg rounded-t-lg focus:outline-none"
            >
              📧 Messaging
              <span className="ml-2 text-xl">{isMessagingOpen ? '▲' : '▼'}</span>
            </button>

            {isMessagingOpen && (
              <form className="p-4 space-y-3 border-t border-gray-200">
                <select
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  defaultValue=""
                  aria-label="Select recipient"
                >
                  <option value="" disabled>
                    Select recipient
                  </option>
                  <option value="teacher">Teacher</option>
                  <option value="principal">Principal</option>
                </select>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />

                <textarea
                  rows={3}
                  placeholder="Message"
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Banner */}
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-6 rounded-xl shadow">
            <h1 className="text-3xl font-bold">Welcome, Teacher!</h1>
            <p className="text-sm">Explore your dashboard for insights and actions</p>
          </div>

          {/* Teaching Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">🎓 Teaching Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[{
                label: 'Appointed Subject', value: 'Maths', icon: '📘', color: 'blue'
              }, {
                label: 'Current Subject', value: 'Maths', icon: '📗', color: 'green'
              }, {
                label: 'Other Subjects', value: 'Science', icon: '📙', color: 'yellow'
              }, {
                label: 'Class Assigned', value: '10A', icon: '🏫', color: 'purple'
              }].map(({ label, value, icon, color }) => (
                <div key={label} className={`flex items-center bg-${color}-50 border-l-4 border-${color}-600 p-4 rounded shadow-md`}>
                  <div className={`text-${color}-600 text-2xl mr-4`}>{icon}</div>
                  <div>
                    <p className={`text-${color}-700 font-semibold`}>{label}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Section: Student Info */}
         <div className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-2xl font-bold text-red-700 mb-4">📚 Student Information</h2>

  {/* Side-by-side info cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

    {/* Pie Chart */}
    <div className="bg-gray-50 rounded-lg shadow p-4 flex justify-center items-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          // label
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>

    {/* Marks Box */}
    <div className="bg-gray-50 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">📝 Marks</h3>
      <ul className="text-sm text-gray-700 list-disc list-inside">
        
      </ul>
      <Link href="/mark/MarksPage">
                    <button className="mt-6 w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-all">
                      Marks Details
                    </button>
                  </Link>
    </div>

    {/* Performance Box */}
    <div className="bg-gray-50 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">📈 Performance</h3>
      <p className="text-sm text-gray-700">Consistent growth across terms.</p>
      <p className="text-sm text-green-600 font-medium mt-2">⬆ 8% from last term</p>
    </div>

    {/* Attendance Box */}
    <div className="bg-gray-50 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">📅 Attendance</h3>
       <Link href="/leave_details">
                    <button className="mt-6 w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-all">
                      Attendance Details
                    </button>
                  </Link>
    </div>
  </div>

  {/* Student Details Table Below */}
  <div className="mt-8">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">👥 Student Details</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Registration No.</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Section & Class</th>
            {/* Add more headers if you have additional data */}
          </tr>
        </thead>
       <tbody>
          {teacher.class.studentacademics.map((student) => (
            <tr key={student.reg_no} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{student.reg_no}</td>
              <td className="px-4 py-2 border">{student.studentpersonal.full_name}</td>
              <td className="px-4 py-2 border">Section: {teacher.class.section} | Class: {teacher.class.grade}-{teacher.class.class_name}</td>
            </tr>
          ))}
          
          {teacher.subjects.map((subject) => (
            subject.students.map((student) => (
              <tr key={student.reg_no} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{student.reg_no}</td>
                <td className="px-4 py-2 border">{student.personal.full_name}</td>
                <td className="px-4 py-2 border">Section:  | Class: </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

        </main>
      </div>
    </AppLayout>
  );
}