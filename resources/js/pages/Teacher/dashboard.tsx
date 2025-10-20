import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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

type StudentAcademic = {
  reg_no: string;
  class_name: string;
  personal?: { Full_name: string; Gender: string; Photo?: string };
  marks?: { subject: string; marks_obtained: number }[];
  attendance?: { date: string; status: string }[];
};

type ClassModel = {
  class_id: string;
  class_name: string;
  grade: number;
  section:string;
  studentacademics?: StudentAcademic[];
};

type Teacher = {
  teacher_NIC: string;
  user_id: number;
  class?: ClassModel[]; 
  personal: { Full_name: string; Photo: string | null; Gender: string };
  appointed_subject: string;
  current_teaching_subject: string;
  other_subjects_taught: string;
  assigned_class: string;
};


type Task = { id: number; text: string; completed: boolean };
type LeaveRequest = { status: string; leave_type: string; leave_start_date: string; leave_end_date: string };
type Message = { sender_id: string; sender_type: string; receiver_id: string; receiver_type: string; subject?: string; message: string; created_at: string; };

export default function Dashboard({ teacher }: { teacher: Teacher }) {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('teacher_todo_tasks');
    return saved ? JSON.parse(saved) as Task[] : [];
  });
  const [newTask, setNewTask] = useState('');
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaveStats, setLeaveStats] = useState({ approved: 0, pending: 0, rejected: 0 });
  const [messages, setMessages] = useState<Message[]>([]);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const { latestLeaveRequest } = usePage<{ latestLeaveRequest: LeaveRequest | null }>().props;

  
const students = Array.isArray(teacher.class)
  ? teacher.class.flatMap(cls => cls.studentacademics ?? [])
  : teacher.class?.studentacademics ?? [];

const [genderData, setGenderData] = useState<any[]>([]);


console.log('teacher:', teacher);
  console.log('students:', students);
  console.log('genderData:', genderData);
  console.log('teacher.class:', teacher.class);




useEffect(() => {
  const stats = students.reduce((acc: Record<string, number>, s: StudentAcademic) => {
    const gender = s.personal?.gender ?? 'Unknown'; 
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const formatted = Object.entries(stats).map(([name, value]) => ({ name, value }));
  setGenderData(formatted);
}, [students]);



  const COLORS = ['#CC7722', '#FFBF00', '#34d399'];

  
  
const assignedClassStudents = students.filter(
  (s: StudentAcademic) => s.class_name === teacher.assigned_class
);


const assignedClassAvg =
  assignedClassStudents.length > 0
    ? assignedClassStudents.reduce((sum: number, student: any) => {
        const totalMarks = student.marks?.reduce(
          (acc: number, m: any) => acc + (m.marks_obtained ?? 0),
          0
        ) ?? 0;
        const marksCount = student.marks?.length || 1;
        return sum + totalMarks / marksCount;
      }, 0) / assignedClassStudents.length
    : 0;


 
  useEffect(() => {
    fetch('/api/teacher/leave-stats')
      .then(res => res.json())
      .then(data => setLeaveStats(data));
  }, []);

  
  useEffect(() => {
    fetch('/teacher/messages')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  
  useEffect(() => {
    localStorage.setItem('teacher_todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/teacher/messages/send', { subject, message: text }, {
      onSuccess: () => {
        setText('');
        setSubject('');
        fetch('/teacher/messages').then(res => res.json()).then(data => setMessages(data));
      }
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Teacher Dashboard" />

      {}
      <div className="bg-yellow-500 text-brown-900 text-md py-4 px-6 flex justify-between items-center ">
        <div>Welcome to Mahadivulwewa National School</div>
        <div className="space-x-4 hidden md:flex">
          <a href="https://www.facebook.com/ttnmmv"><Facebook size={18} /></a>
          <a href="mailto:ttnmahadivulwewamv@gmail.com"><Mail size={18} /></a>
          <a href="https://maps.google.com?q=Mahadivulwewa School"><MapPin size={18} /></a>
        </div>
      </div>

      {}
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

      {}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-8 bg-gray-100">
        {}
        <aside className="lg:col-span-1 space-y-6">
          {}
          <div className="bg-white rounded-xl shadow-md p-6 text-center space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
              👤 <span>My Profile</span>
            </h2>
             <div className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 overflow-hidden">
              {teacher.personal?.Photo ? (
                <img
                  src={`/images/${teacher.personal.Photo}`}
                  alt="Teacher"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 italic">No Photo</span>
              )}
            </div>
            <Link
              href={route('teacher.profile')}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2 rounded-full transition duration-300"
            >
              View My Profile
            </Link>
          </div>

          {}
          <div className="w-full max-w-[280px] mx-auto rounded-lg shadow-lg overflow-hidden">
            <Calendar value={date} className="text-sm border border-gray-300 rounded-lg" />
          </div>

          {}
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

          {}
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

          {}
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
              <div className="bg-white p-4 shadow-md rounded">
                <div className="h-64 overflow-y-auto border p-2 mb-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-2 ${msg.sender_type === 'teacher' ? 'text-right' : 'text-left'}`}>
                      <span className={`inline-block px-3 py-2 rounded ${msg.sender_type === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                        {msg.message}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={sendMessage} className="space-y-2">
                  <input
                    placeholder="Subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                  <textarea
                    placeholder="Message"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  />
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
                </form>
              </div>
            )}
          </div>
        </aside>

        {}
        <main className="lg:col-span-3 space-y-6">
          {}
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-6 rounded-xl shadow">
            <h1 className="text-3xl font-bold">Welcome, {teacher.personal?.Full_name ?? "Teacher"}!</h1>
            <p className="text-sm">Explore your dashboard for insights and actions</p>
          </div>

          {}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">🎓 Teaching Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[{
                label: 'Appointed Subject', value: teacher.appointed_subject ?? 'Not Assigned', icon: '📘', color: 'blue'
              }, {
                label: 'Current Subject', value: teacher.current_teaching_subject ?? 'Not Assigned', icon: '📗', color: 'green'
              }, {
                label: 'Other Subjects', value: teacher.other_subjects_taught ?? 'None', icon: '📙', color: 'yellow'
              }, {
                label: 'Class Assigned', value:  [teacher.class?.grade ?? 'Not Assigned',teacher.class?.section ?? 'Not Assigned'], icon: '🏫', color: 'purple'
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

          {}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-red-700 mb-4">📚 Student Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-gray-50 rounded-lg shadow p-4 flex justify-center items-center">
  {genderData.length > 0 ? (
  <PieChart width={250} height={250}>
    <Pie
      data={genderData}
      cx="50%"
      cy="50%"
      outerRadius={90}
      dataKey="value"
      label={({ name, value }) => `${name}: ${value}`}
    >
      {genderData.map((_entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value) => `${value} Students`} />
    <Legend />
  </PieChart>
) : (
  <p className="text-gray-400">No data to display</p>
)}

</div>


              {}
              <div className="bg-gray-50 rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📝 Marks</h3>
                <Link href="/mark/MarksPage">
                  <button className="mt-6 w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-all">
                    Marks Details
                  </button>
                </Link>
              </div>

              {}
              <div className="bg-gray-50 rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📈 Performance</h3>
                <p className="text-sm text-gray-700">
                  Class Average for {teacher.class?.grade ?? 'Not Assigned'}: <strong>{assignedClassAvg.toFixed(2)}</strong>
                </p>
              </div>

              {}
              <div className="bg-gray-50 rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📅 Attendance</h3>
                <Link href="/leave_details">
                  <button className="mt-6 w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-all">
                    Attendance Details
                  </button>
                </Link>
              </div>

            </div>

            {}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">👥 Student Details</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left text-gray-600">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Gender</th>
                      {}
                      <th className="px-4 py-2 border">Average Marks</th>
                      <th className="px-4 py-2 border">Attendance</th>
                    </tr>
                  </thead>
<tbody>
  {students.map((student: any) => (
    <tr key={student.reg_no}>
      <td>{student.personal?.full_name ?? 'Not Assigned'}</td>
      <td>{student.personal?.gender ?? '—'}</td>
      {}
      <td>
        {student.marks?.length
          ? (student.marks.reduce((sum: number, m: any) => sum + (m.marks_obtained ?? 0), 0) / student.marks.length).toFixed(2)
          : '—'}
      </td>
      <td>
        {student.attendance?.length > 0
          ? `${student.attendance.length} days`
          : 'No records'}
      </td>
    </tr>
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
