import StudyMaterials from '../studyMaterial/studyMaterials';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import {
  Facebook, Mail, MapPin, Menu, X,
  User, Book, Users, Award, CalendarCheck,
  FileText, Home, ClipboardList, BarChart2,
  Bell, MessageSquare, Settings, LogOut, Sun, Moon, Search
} from 'lucide-react';
import { NavUser } from '@/components/nav-user';

const breadcrumbs = [
  { title: 'Student Dashboard', href: '/dashboard' },
];

interface DashboardData {
  classes: any[];
  upcomingExams: any[];
  latestGrades: { marks_obtained: number }[];
  feeStatus?: { status: string };
  scholarship?: { status: string };
  monthlyMarks: { month: number; avg_marks: number }[];
}

export default function StudentDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [data, setData] = useState<DashboardData | null>({
    classes: [{ name: "10A" }],
    upcomingExams: [],
    latestGrades: [{ marks_obtained: 88 }],
    feeStatus: { status: "Paid" },
    scholarship: { status: "Eligible" },
    monthlyMarks: [
      { month: 1, avg_marks: 85 },
      { month: 2, avg_marks: 88 },
      { month: 3, avg_marks: 82 }
    ]
  });

  if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const infoCards = [
    { id: 1, label: 'Class Enrolled', value: '10A', icon: <Users size={24} />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, label: 'Scholarship', value: 'Eligible', icon: <Award size={24} />, color: 'bg-amber-100 text-amber-600' },
    { id: 3, label: 'Attendance', value: '96%', icon: <CalendarCheck size={24} />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 4, label: 'Avg Marks', value: '82%', icon: <BarChart2 size={24} />, color: 'bg-purple-100 text-purple-600' },
  ];
  const [coursesOpen, setCoursesOpen] = useState(false);
    const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [subjectsError, setSubjectsError] = useState<string | null>(null);
  const [subjectsQuery, setSubjectsQuery] = useState("");
const [currentDateTime,setCurrentDateTime] = useState('');
useEffect(() => {
  const updateDateTime = () =>{
    const now = new Date();

    const formattedDate = now.toLocaleDateString('en-US' , {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-US' , {
      hour: '2-digit',
      minute: '2-digit'
    });

    setCurrentDateTime(`${formattedDate}  ,  ${formattedTime}`)
  };
  updateDateTime();

  const intervalId = setInterval(updateDateTime, 60000);

  return () => clearInterval(intervalId);

},[]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Student Dashboard" />


      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="font-medium text-center md:text-left">
          <span className="hidden sm:inline">Welcome to</span> Mahadivulwewa National School
        </div>
        <div className="flex space-x-5 mt-2 md:mt-0">
          <a href="https://www.facebook.com/ttnmmv" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors">
            <Facebook size={20} />
          </a>
          <a href="mailto:ttnmahadivulwewamv@gmail.com"
            className="hover:text-white transition-colors">
            <Mail size={20} />
          </a>
          <a href="https://maps.google.com?q=Mahadivulwewa School" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors">
            <MapPin size={20} />
          </a>
        </div>
      </div>

      <nav className="bg-gradient-to-r from-[#7a0000] to-[#650000] text-white py-3 px-6 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/images/School.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
            <span className="font-orbitron text-lg font-bold truncate">
              T / Tn/ Mahadivulwewa Maha Vidyalaya(National School)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <NavUser />

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-amber-600 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-amber-300 bg-[#7a0000] p-2 rounded-lg hover:bg-[#5a0000] transition-colors"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
          {/* Courses Modal */}
          <Dialog open={coursesOpen} onClose={() => setCoursesOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-2xl w-full relative z-10">
              <Dialog.Title className="text-xl font-bold mb-4 flex items-center">
                <Book className="mr-2 text-amber-600" size={20} />
                All Subjects
              </Dialog.Title>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={subjectsQuery}
                  onChange={(e) => setSubjectsQuery(e.target.value)}
                  placeholder="Search subjects..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  className="px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  onClick={() => {
                    setSubjectsLoading(true);
                    setSubjectsError(null);

                    fetch('/api/subjects')
                      .then(async (res) => {
                        if (!res.ok) {
                          const text = await res.text();
                          console.log("Subjects", text);
                          throw new Error(`HTTP ${res.status}: ${text?.slice(0, 200)}`);
                        }
                        return res.json();
                      })
                      .then((data) => setSubjects(Array.isArray(data) ? data : []))
                      .catch((err) => setSubjectsError((err as any)?.message ?? 'Failed to load subjects'))
                      .finally(() => setSubjectsLoading(false));
                  }}
                >
                  Refresh
                </button>
              </div>

              {coursesOpen && subjects.length === 0 && !subjectsLoading && !subjectsError && (
                <script dangerouslySetInnerHTML={{ __html: `setTimeout(() => { document.querySelector('[data-load-subjects]')?.click(); }, 0);` }} />
              )}

              <button data-load-subjects className="hidden" onClick={() => {
                setSubjectsLoading(true);
                setSubjectsError(null);
                fetch('/api/subjects')
                  .then(async (res) => {
                    if (!res.ok) {
                      const text = await res.text();
                      throw new Error(`HTTP ${res.status}: ${text?.slice(0, 200)}`);
                    }
                    return res.json();
                  })
                  .then((data) => setSubjects(Array.isArray(data) ? data : []))
                  .catch((err) => setSubjectsError((err as any)?.message ?? 'Failed to load subjects'))
                  .finally(() => setSubjectsLoading(false));
              }} />

              {subjectsError && (
                <div className="mb-3 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800">
                  {subjectsError}
                </div>
              )}

              {subjectsLoading ? (
                <div className="py-8 text-center text-gray-500">Loading subjects...</div>
              ) : (
                <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                  {subjects
                    .filter((s) =>
                      subjectsQuery
                        ? (s.name || s.subject_name || '').toLowerCase().includes(subjectsQuery.toLowerCase())
                        : true
                    )
                    .map((s, idx) => (
                      <div key={idx} className="py-3 px-2 hover:bg-amber-50 dark:hover:bg-gray-700 rounded flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{s.name || s.subject_name || 'Untitled Subject'}</div>
                          {s.code && <div className="text-xs text-gray-500">Code: {s.code}</div>}
                          {s.description && <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.description}</div>}
                        </div>
                        {s.status && (
                          <span className={`text-xs px-2 py-1 rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{s.status}</span>
                        )}
                      </div>
                    ))}
                  {subjects.length === 0 && (
                    <div className="py-8 text-center text-gray-500">No subjects found.</div>
                  )}
                </div>
              )}

              <div className="mt-4 text-right">
                <button onClick={() => setCoursesOpen(false)} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">Close</button>
              </div>
            </Dialog.Panel>
          </Dialog>

      {menuOpen && (
        <div className="bg-white dark:bg-gray-800 text-black px-4 py-3 md:hidden shadow-lg">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <a href="https://www.facebook.com/ttnmmv" className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
              <Facebook size={20} />
              <span className="text-xs mt-1">Facebook</span>
            </a>
            <a href="mailto:ttnmahadivulwewamv@gmail.com" className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
              <Mail size={20} />
              <span className="text-xs mt-1">Email</span>
            </a>
            <a href="https://maps.google.com?q=Mahadivulwewa School" className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
              <MapPin size={20} />
              <span className="text-xs mt-1">Location</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <div className="w-full lg:w-64 p-4 bg-white dark:bg-gray-800 shadow-lg lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <h2 className="text-lg font-bold text-amber-700 mb-4 flex items-center">
            <User className="mr-2" size={20} /> Student Menu
          </h2>
          <div className="space-y-1">
            {[
              { name: 'Dashboard', icon: <Home size={18} />, link: '/student/dashboard' },
              { name: 'Courses', icon: <Book size={18} />, onClick: () => setCoursesOpen(true)},
              // { name: 'Assignments', icon: <ClipboardList size={18} />, link: '/assignments' },
              // { name: 'Grades', icon: <BarChart2 size={18} />, link: '/grades' },
              // { name: 'Attendance', icon: <CalendarCheck size={18} />, link: '/attendance' },
              { name: 'Study Materials', icon: <Book size={18} />, link: '/student/studyMaterial' },
              // { name: 'Messages', icon: <MessageSquare size={18} />, link: '/messages' },
              // { name: 'Notifications', icon: <Bell size={18} />, link: '/notifications' },
              { name: 'Settings', icon: <Settings size={18} />, link: '/settings' },
            
            ].map((item, index) => item.link ? (
              <Link
                key={index}
                href={item.link}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                  index === 0
                    ? 'bg-amber-100 text-amber-700 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-gray-700 dark:hover:text-amber-400'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ):(
              <button key={index} onClick={item.onClick}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${index === 0
                      ? 'bg-amber-100 text-amber-700 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-gray-700 dark:hover:text-amber-400'
                    }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}

                </button>
            ))}
          </div>
        </div>


        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          <StudyMaterials />
        </main>
      </div>
    </AppLayout>
  );
}
          
