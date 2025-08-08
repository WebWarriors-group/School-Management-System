import AppLayout from '@/layouts/app-layout';
import { Head, Link ,usePage} from '@inertiajs/react';
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
    user_id:number;
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


type Task = {
  id: number;
  text: string;
  completed: boolean;
};
type LeaveRequest = {
  status: string;
  leave_type: string;
  leave_start_date: string;
  leave_end_date: string;
};
const COLORS = ['#34d399', '#fbbf24', '#f87171'];
export default function dashboard({ teacher }: { teacher: Teacher }) {
  const [date, setDate] = useState(new Date());
const [tasks, setTasks] = useState<Task[]>(() => {
  const saved = localStorage.getItem('teacher_todo_tasks');
  
  return saved ? JSON.parse(saved) as Task[] : [];
});

  const { latestLeaveRequest } = usePage<{ latestLeaveRequest: LeaveRequest | null }>().props;

  const [newTask, setNewTask] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false);
   const [leaveStats, setLeaveStats] = useState({ approved: 0, pending: 0, rejected: 0 });
useEffect(() => {
  console.log('Logged-in teacher NIC:', teacher.teacher_NIC);
  console.log('Logged-in user_id:', teacher.user_id);
  console.log('Logged-in teacher NIC:', teacher.teacher_NIC);
}, []);

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
 useEffect(() => {
    fetch('/api/teacher/leave-stats')
      .then(res => res.json())
      .then(data => setLeaveStats(data));
  }, []);

  const leaveData = [
    { name: 'Approved', value: leaveStats.approved },
    { name: 'Pending', value: leaveStats.pending },
    { name: 'Rejected', value: leaveStats.rejected },
  ];


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

        
        <nav className="bg-[#650000] text-white py-3 px-6 shadow-md relative z-10">
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
          {/* <div className="bg-white rounded-lg shadow p-4 text-center"> */}
            {/* Profile Card */}
<div className="bg-white rounded-xl shadow-md p-6 text-center space-y-4">
  {/* Title */}
  <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
    👤 <span>My Profile</span>
  </h2>

  {/* Profile Picture Placeholder */}
  <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 border-4 border-blue-500 flex items-center justify-center text-gray-400 text-2xl font-bold">
    ?
  </div>
<<<<<<< HEAD
   {/* View Profile Button */}
=======
  </div>


          {/* Calendar */}
          <div className="w-full max-w-[280px] mx-auto rounded-lg shadow-lg overflow-hidden">
  <Calendar
    value={date}
    
    className="text-sm border border-gray-300 rounded-lg"
  />

  {/* View Profile Button */}
>>>>>>> 2021_CSC_101_MarksPage
  <Link
    href={route('teacher.profile')}
    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2 rounded-full transition duration-300"
  >
    View My Profile
  </Link>

</div>
<<<<<<< HEAD
<<<<<<< HEAD
</div>
=======
=======
</div>
>>>>>>> student_dashboard

          

 
{/* </div> */}
{/* Calendar */}
          <div className="w-full max-w-[280px] mx-auto rounded-lg shadow-lg overflow-hidden">
  <Calendar
    value={date}
    
    className="text-sm border border-gray-300 rounded-lg"
  />

>>>>>>> risani
<div className="p-6">
      {latestLeaveRequest?.status === 'Approved' && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          ✅ Your leave from <strong>{latestLeaveRequest.leave_start_date}</strong> to <strong>{latestLeaveRequest.leave_end_date}</strong> has been <strong>Approved</strong>.
        </div>
      )}

      {latestLeaveRequest?.status === 'Rejected' && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          ❌ Your leave request from <strong>{latestLeaveRequest.leave_start_date}</strong> to <strong>{latestLeaveRequest.leave_end_date}</strong> was <strong>Rejected</strong>.
        </div>
      )}

      {/* Rest of the dashboard content */}
    </div>
          </div>

         


         {/* Leave Summary */}
<div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
  <h2 className="text-lg font-semibold text-purple-700 mb-6">🏖️ Leave Summary</h2>

  <div className="flex justify-around mb-6">
    <div className="text-center">
      <div className="w-14 h-14 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center">
        <span className="text-green-600 font-bold text-xl">{leaveStats.approved}</span>
      </div>
      <p className="text-sm mt-2 font-medium">Approved</p>
    </div>

    <div className="text-center">
      <div className="w-14 h-14 mx-auto rounded-full border-4 border-yellow-500 flex items-center justify-center">
        <span className="text-yellow-600 font-bold text-xl">{leaveStats.pending}</span>
      </div>
      <p className="text-sm mt-2 font-medium">Pending</p>
    </div>

    <div className="text-center">
      <div className="w-14 h-14 mx-auto rounded-full border-4 border-red-500 flex items-center justify-center">
        <span className="text-red-600 font-bold text-xl">{leaveStats.rejected}</span>
      </div>
      <p className="text-sm mt-2 font-medium">Rejected</p>
    </div>
  </div>

  <Link href="/leave">
    <button className="w-full bg-purple-700 text-white py-3 rounded hover:bg-purple-800 transition-colors text-sm font-semibold">
      Leave Request
    </button>
  </Link>
</div>

          {/* Leave Pie Chart */}
          {/* <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-pink-700 mb-4">📊 Leave Statistics</h2>
            <PieChart width={250} height={250}>
              <Pie
                data={leaveData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {leaveData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div> */}


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
            <p className="text-sm text-gray-100">NIC: {teacher.teacher_NIC}</p>
<p className="text-sm text-gray-100">User ID: {teacher.user_id}</p>

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
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Gender</th>
            <th className="px-4 py-2 border">Class</th>
            <th className="px-4 py-2 border">Average Marks</th>
            <th className="px-4 py-2 border">Attendance</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border">Ayesha Perera</td>
            <td className="px-4 py-2 border">Girl</td>
            <td className="px-4 py-2 border">10A</td>
            <td className="px-4 py-2 border">84%</td>
            <td className="px-4 py-2 border">95%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border">Ruwan Silva</td>
            <td className="px-4 py-2 border">Boy</td>
            <td className="px-4 py-2 border">10A</td>
            <td className="px-4 py-2 border">79%</td>
            <td className="px-4 py-2 border">91%</td>
          </tr>
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