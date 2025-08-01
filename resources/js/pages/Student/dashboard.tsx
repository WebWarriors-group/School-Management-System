import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
  Facebook, Mail, MapPin, Menu, X,
  User, Book, Users, Award, CalendarCheck,
  FileText, Home, ClipboardList, BarChart2,
  Bell, MessageSquare, Settings, LogOut
} from 'lucide-react';
import { NavUser } from '@/components/nav-user';
import StudentSidebar from './StudentSidebar';
import StudentOverallPerformanceChart from "./StudentOverallPerformanceChart";
import StudentPerformanceChart from './OneStudentPerformanceChart';
import SummaryCard from './SummaryCard';

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
  const [activeCard, setActiveCard] = useState(0);
  const [marksData, setMarksData] = useState<{ marks_obtained: number }[]>([]);

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

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/student-marks/1428')
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
  }, []);

  if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const infoCards = [
    { id: 1, label: 'Class Enrolled', value: '10A', icon: <Users size={24} />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, label: 'Scholarship', value: 'Eligible', icon: <Award size={24} />, color: 'bg-amber-100 text-amber-600' },
    { id: 3, label: 'Attendance', value: '96%', icon: <CalendarCheck size={24} />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 4, label: 'Avg Marks', value: '82%', icon: <BarChart2 size={24} />, color: 'bg-purple-100 text-purple-600' },
  ];
const [studentPersonal, setStudentPersonal] = useState<{ full_name_with_initial?: string } | null>(null);

  const notifications = [
    { id: 1, title: 'Science Assignment', description: 'Due tomorrow at 9:00 AM', time: '2 hours ago' },
    { id: 2, title: 'Parent Meeting', description: 'Scheduled for Friday 10 AM', time: '1 day ago' },
    { id: 3, title: 'Sports Day', description: 'Annual sports event next week', time: '3 days ago' },
  ];
useEffect(() => {
  fetch(`/api/student-personal/1428`)
    .then((res) => res.json())
    .then((data) => setStudentPersonal(data))
    .catch((err) => {
      console.error('Student Personal fetch error:', err);
      setStudentPersonal(null); // or display error
    });
}, []);


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Student Dashboard" />

      {/* Top Banner */}
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

      {/* Navigation Bar */}
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
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-amber-300 bg-[#7a0000] p-2 rounded-lg hover:bg-[#5a0000] transition-colors"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-white text-black px-4 py-3 md:hidden shadow-lg">
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
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-full lg:w-64 p-4 bg-white shadow-lg lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
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
                  : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white p-6 rounded-xl shadow-md mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Good Morning,  {studentPersonal?.full_name_with_initial}
 !</h1>
                <p className="opacity-90 max-w-2xl">
                  You have 3 assignments to complete this week. Your next class is Mathematics at 10:30 AM.
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center">
                <CalendarCheck className="mr-2" size={18} />
                <span>July 31, 2025</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
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

          {/* Info Cards */}
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Academic Updates */}
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center">
                    <ClipboardList className="mr-2 text-amber-600" size={20} />
                    Academic Updates
                  </h2>
                  <Link href="#" className="text-sm text-amber-600 font-medium hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {notifications.map((item) => (
                    <div key={item.id} className="border-l-4 border-amber-500 pl-4 py-2 hover:bg-amber-50 rounded-r transition-colors">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Charts */}
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <BarChart2 className="mr-2 text-amber-600" size={20} />
                  Academic Performance
                </h2>
                <StudentOverallPerformanceChart regNo="1428" />
              </div>

              {/* Today's Schedule */}
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <CalendarCheck className="mr-2 text-amber-600" size={20} />
                  Today's Schedule
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-amber-50 text-left">
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
                        <tr key={index} className="border-b hover:bg-amber-50 transition-colors">
                          <td className="p-3 font-medium text-sm">{cls.time}</td>
                          <td className="p-3 text-sm">{cls.subject}</td>
                          <td className="p-3 text-gray-600 text-sm">{cls.teacher}</td>
                          <td className="p-3 text-sm">{cls.room}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Attendance Overview */}
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <CalendarCheck className="mr-2 text-amber-600" size={20} />
                  Attendance Overview
                </h2>
                <div className="mb-2">
                  <span className="text-sm text-gray-700">Current Attendance: 96%</span>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-in-out" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
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
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <BarChart2 className="mr-2 text-amber-600" size={20} />
                  Monthly Performance
                </h2>
                <StudentPerformanceChart marksData={data.monthlyMarks ?? []} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}