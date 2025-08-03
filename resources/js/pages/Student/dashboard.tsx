import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Facebook, Mail, MapPin, Menu, X } from 'lucide-react';
import { NavUser } from '@/components/nav-user';
import StudentSidebar from './StudentSidebar';
import { User, Book, Users, Award, CalendarCheck, FileText } from 'lucide-react';
const breadcrumbs = [
  {
    title: 'Student Dashboard',
    href: '/dashboard',
  },
];

export default function StudentDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Student Dashboard" />

      {/* Top Header */}
      <div className="bg-yellow-500 text-brown-900 py-4 px-6 flex justify-between items-center">
        <div>Welcome to Mahadivulwewa National School</div>
        <div className="space-x-4 hidden md:flex">
          <a href="https://www.facebook.com/ttnmmv" target="_blank" rel="noopener noreferrer"><Facebook size={18} /></a>
          <a href="mailto:ttnmahadivulwewamv@gmail.com"><Mail size={18} /></a>
          <a href="https://maps.google.com?q=Mahadivulwewa School" target="_blank" rel="noopener noreferrer"><MapPin size={18} /></a>
        </div>
      </div>


      {/* Navbar */}

     


      

        <nav className="bg-[#650000] text-white py-3 px-6 shadow-md relative z-10">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center">
              <img src="/images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
              <span className="ml-3 font-orbitron text-xl font-bold">
                T / Tn/ Mahadivulwewa Maha Vidyalaya(National School)
              </span>
               <div className="flex items-center space-x-4">
            
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-4 text-yellow-300">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
            <Link href={route('login')} className="block mt-3 bg-brown-800 text-white px-4 py-2 rounded text-center">
              Login
            </Link>
          </div>
        )}
      </nav>

     {/* Navbar */}



      {/* Student Dashboard Layout */}
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
 <aside className="bg-white rounded-lg shadow p-4 w-full lg:w-64">
  <h2 className="text-lg font-bold text-yellow-700 mb-4">🎓 Student Menu</h2>
  <StudentSidebar />
</aside>



        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow">
            <h1 className="text-3xl font-bold">Welcome, Student!</h1>
            <p className="text-sm">Explore your student dashboard for academic and personal updates</p>
          </div>

          {/* Quick Info Cards */}
        {/* Quick Info Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {[
    { label: 'Class Enrolled', value: '10A', icon: '🏫' },
    { label: 'Scholarship', value: 'Yes', icon: '🎓' },
    { label: 'Attendance', value: '96%', icon: '📅' },
    { label: 'Avg Marks', value: '82%', icon: '📈' },
  ].map((card, i) => (
    <div key={i} className="bg-white p-4 rounded shadow flex items-center">
      <div className="text-3xl mr-4">{card.icon}</div>
      <div>
        <p className="text-gray-700 font-semibold">{card.label}</p>
        <p className="text-sm text-gray-500">{card.value}</p>
      </div>
      
    </div>
  
  ))}
</div>


          {/* Future: Add charts, tables, etc. */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-brown-700 mb-2">📚 Academic Updates</h2>
            <p className="text-gray-600">You have upcoming exams and assignments. Stay tuned!</p>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}