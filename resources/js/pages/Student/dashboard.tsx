import AppLayout from '@/layouts/app-layout';
import { Head, Link,usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import RealTimeChatBot from './RealTimeChatBot';
import {
  Facebook, Mail, MapPin, Menu, X,
  User, Book, Users, Award, CalendarCheck,
  FileText, Home, ClipboardList, BarChart2,
  Bell, MessageSquare, Settings, LogOut, Sun, Moon, Search
} from 'lucide-react';
import { NavUser } from '@/components/nav-user';
import StudentSidebar from './StudentSidebar';
import StudentOverallPerformanceChart from "./StudentOverallPerformanceChart";
import StudentPerformanceChart from './OneStudentPerformanceChart';
import SummaryCard from './SummaryCard';
import CalendarView from './CalenderView';
import { Dialog } from '@headlessui/react';
import DailyQuote from './DailyQuote';
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
  const user = usePage().props.auth.user;
const { student} = usePage().props as { student:any};
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [marksData, setMarksData] = useState<{ marks_obtained: number }[]>([]);
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
  


   const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  // Filters for performance chart
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const subjects = ['Math', 'Science', 'English', 'History'];

  const notifications = [
    { id: 1, title: 'Science Assignment', description: 'Due tomorrow at 9:00 AM', time: '2 hours ago' },
    { id: 2, title: 'Parent Meeting', description: 'Scheduled for Friday 10 AM', time: '1 day ago' },
    { id: 3, title: 'Sports Day', description: 'Annual sports event next week', time: '3 days ago' },
  ];
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student-marks/${user.id}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`❌ ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('✅ Fetched Marks Data:', data);
        setMarksData(data.marks);
      })
      .catch((err) => {
        console.error('❌ Dashboard fetch error:', err);
      });
  }, [user.id]);

 const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (!query) return setSearchResults([]);

    // Mock search (replace with API fetch)
    const data = [
      { label: "Math Class - Grade 10", link: "/classes/10" },
      { label: "English Assignment 2", link: "/assignments/2" },
      { label: "Teacher: Mr. Perera", link: "/teachers/5" },
    ];
    setSearchResults(data.filter(item => item.label.toLowerCase().includes(query.toLowerCase())));
  };
  const getAverageGrade =(marks:any[]) => {
    if(!marks?.length) return 'N/A';
    const gradeToPoints: Record<string,number> = {
      A:4,B:3,C:2,D:1,F:0,
    };
    const points = marks.map(m => gradeToPoints[m.grade] ?? null ).filter(p => p !==null);

    if(!points.length ) return 'N/A';
    const avg = points.reduce((a,b) => a+b , 0) / points.length;

    if(avg >= 3.5) return 'A';
    if(avg >= 2.5) return 'B';
    if(avg >= 1.5) return 'C';
    if(avg >= 0.5) return 'D';
    return 'F';

  }

  if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const infoCards = [
    { id: 1, label: 'Class Enrolled', value: student.class?.class_name ??'N/A', icon: <Users size={24} />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, label: 'Scholarship', value: student?.scholarship_status ?? 'N/A', icon: <Award size={24} />, color: 'bg-amber-100 text-amber-600' },
    { id: 3, label: 'Attendance', value: '96%', icon: <CalendarCheck size={24} />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 4, label: 'Avg Grade', value: getAverageGrade(student.marks), icon: <BarChart2 size={24} />, color: 'bg-purple-100 text-purple-600' },
  ];
  
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

//  useEffect(() => {
//   fetch(`/api/student/personal/${user.id}`)
//     .then(async (res) => {
//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(`❌ ${res.status}: ${text}`);
//       }
//       return res.json();
//     })
//     .then((data) => setStudentPersonal(data))
//     .catch((err) => {
//       console.error('Student Personal fetch error:', err);
//       setStudentPersonal(null);
//     });
// }, [user.id]);


  return (
    <AppLayout breadcrumbs={breadcrumbs} auth={usePage().props.auth}>
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
              { name: 'Dashboard', icon: <Home size={18} /> },
              { name: 'Courses', icon: <Book size={18} /> },
              { name: 'Assignments', icon: <ClipboardList size={18} /> },
              { name: 'Grades', icon: <BarChart2 size={18} /> },
              { name: 'Attendance', icon: <CalendarCheck size={18} /> },
              { name: 'Messages', icon: <MessageSquare size={18} /> },
              { name: 'Notifications', icon: <Bell size={18} /> },
              { name: 'Settings', icon: <Settings size={18} /> },
              { name: 'Logout', icon: <LogOut size={18} /> },
            ].map((item, index) => (
              <button
                key={index}
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
          {/* Welcome Banner */}
          <div className="
            bg-gradient-to-r from-amber-400 to-amber-500 
            dark:from-amber-700 dark:to-amber-800
            text-white p-6 rounded-xl shadow-md mb-6
            hover:shadow-lg hover:from-amber-500 hover:to-amber-600 
            dark:hover:from-amber-600 dark:hover:to-amber-700
          ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Good Morning,  {student.personal?.full_name_with_initial}
                  !</h1>
                <p className="opacity-90 max-w-2xl">
                  You have 3 assignments to complete this week. Your next class is Mathematics at 10:30 AM.
                </p>
              </div>
              <div className="bg-white/20 dark:bg-gray-800 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center">
                <CalendarCheck className="mr-2" size={18} />
                <span>{ currentDateTime}</span>
              </div>
            </div>
          </div>
<DailyQuote/>
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
  {[
    { name: 'View Timetable', icon: <CalendarCheck size={20} />, link: '/timetable' },
    { name: 'Submit Assignment', icon: <ClipboardList size={20} />, link: '/assignments' },
    { name: 'View Grades', icon: <BarChart2 size={20} />, link: '/grades' },
    { name: 'Ask a Teacher', icon: <MessageSquare size={20} />, link: '/messages' },
  ].map((action, idx) => (
    <Link key={idx} href={action.link} 
      className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow hover:bg-amber-50 dark:hover:bg-gray-600 flex flex-col items-center text-center transition">
      {action.icon}
      <span className="mt-2 text-sm font-medium">{action.name}</span>
    </Link>
  ))}
</div>   {/* Quick Access Search */}
          <div className="mb-6 mt-8">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
                    <Search className="mr-2 text-amber-600" size={20} />
                   Quick Search
                  </h2>
            <input
              type="text"
              placeholder="Search classes, grades, assignments, teachers, or events..."
              className="mb-3 mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((item, idx) => (
                  <Link key={idx} href={item.link} className="block px-4 py-2 hover:bg-amber-50 dark:hover:bg-gray-600">{item.label}</Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4 border-b border-gray-200 mb-6 pb-2">
            {['Profile', 'Attendance', 'Marks', 'Fees'].map((tab, idx) => (
              <button
                key={idx}
                className={`pb-2 px-4 font-medium ${idx === 0 ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-amber-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>

        

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {infoCards.map((card) => (
              <div
                key={card.id}
                className={`p-5 rounded-xl shadow-sm transition-all hover:shadow-md cursor-pointer ${card.color}`}
                onClick={() => setActiveCard(card.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">{card.label}</p>
                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.color.replace('text', 'bg').split(' ')[0]} bg-opacity-30`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

{/* Modals */}
<Dialog open={attendanceModalOpen} onClose={() => setAttendanceModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div> {/* Overlay */}
  <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full z-50">
    <Dialog.Title className="text-xl font-bold mb-4">Attendance History</Dialog.Title>
              <div className="overflow-y-auto max-h-64">
                <table className="w-full text-left border">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['2025-07-01', '2025-07-02', '2025-07-03'].map((d, i) => (
                      <tr key={i} className="hover:bg-amber-50">
                        <td className="p-2 border">{d}</td>
                        <td className="p-2 border">Present</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             <button onClick={() => setAttendanceModalOpen(false)} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg">Close</button>
  </Dialog.Panel>
</Dialog>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-6">
              {/* Academic Updates */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
                    <ClipboardList className="mr-2 text-amber-600" size={20} />
                    Academic Updates
                  </h2>
                  <Link href="#" className="text-sm text-amber-600 font-medium hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {notifications.map((item) => (
                    <div key={item.id} className="border-l-4 border-amber-500 pl-4 py-2 
                      hover:bg-amber-50 dark:hover:bg-amber-700 rounded-r transition-colors">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-300">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
 <div className="flex items-center space-x-4 mb-4">
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
              <option value="">All Subjects</option>
              {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg" value={selectedExamType} onChange={(e) => setSelectedExamType(e.target.value)}>
              <option value="">All Exams</option>
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
            </select>
            <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>


              {/* Performance Charts */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <BarChart2 className="mr-2 text-amber-600" size={20} />
                  Academic Performance
                </h2>
                <StudentOverallPerformanceChart regNo="2400" />
              </div>

              {/* Today's Schedule */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <CalendarCheck className="mr-2 text-amber-600" size={20} />
                  Today's Schedule
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-amber-50 dark:bg-gray-800 text-left">
                        <th className="p-3 text-sm font-medium">Time</th>
                        <th className="p-3 text-sm font-medium">Subject</th>
                        <th className="p-3 text-sm font-medium">Teacher</th>
                        <th className="p-3 text-sm font-medium">Room</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { time: '8:30 - 9:30', subject: 'Mathematics', teacher: 'Mr. Perera', room: 'B12' },
                        { time: '9:30 - 10:30', subject: 'Science', teacher: 'Ms. Silva', room: 'Lab 2' },
                        { time: '11:00 - 12:00', subject: 'History', teacher: 'Mr. Fernando', room: 'A07' },
                        { time: '1:30 - 2:30', subject: 'English', teacher: 'Ms. Herath', room: 'C03' },
                      ].map((cls, index) => (
                        <tr key={index} className="border-b hover:bg-amber-50 dark:hover:bg-amber-700 transition-colors">
                          <td className="p-3 font-medium text-sm text-gray-800 dark:text-gray-100">{cls.time}</td>
                          <td className="p-3 text-sm text-gray-800 dark:text-gray-100">{cls.subject}</td>
                          <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{cls.teacher}</td>
                          <td className="p-3 text-sm text-gray-800 dark:text-gray-100">{cls.room}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>




            <div className="space-y-6">
              {/* Attendance Overview */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <CalendarCheck className="mr-2 text-amber-600" size={20} />
                  Academic Calendar
                </h2>
                <CalendarView />
              </div>


              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <CalendarCheck className="mr-2 text-amber-600" size={20} />
                  Attendance Overview
                </h2>
                <div className="mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Current Attendance: 96%</span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-in-out" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <button 
  onClick={() => setAttendanceModalOpen(true)}
  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
>
  View Attendance History
</button>
              </div>

              {/* Summary Cards */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <FileText className="mr-2 text-amber-600" size={20} />
                  Quick Summary
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SummaryCard title="Classes Enrolled" value={data.classes.length} />
                  <SummaryCard title="Upcoming Exams" value={data.upcomingExams.length} />
                  <SummaryCard title="Latest Grades" value={data.latestGrades[0]?.marks_obtained || 'N/A'} />
                  <SummaryCard title="Fee Due Status" value={data.feeStatus?.status || 'Paid'} />
                </div>
              </div>

              {/* Monthly Performance */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <BarChart2 className="mr-2 text-amber-600" size={20} />
                  Monthly Performance
                </h2>
                <StudentPerformanceChart marksData={data.monthlyMarks ?? []} />
              </div>
              <RealTimeChatBot />
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
