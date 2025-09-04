import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Facebook, Mail, MapPin, Menu, X } from 'lucide-react';
import { NavUser } from '@/components/nav-user';
import StudentSidebar from './StudentSidebar';
import StudyMaterials from '../studyMaterial/studyMaterials';
import { types } from 'util';

const breadcrumbs = [
  {
    title: 'Student Dashboard',
    href: '/dashboard',
  },
];

export default function StudentDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = usePage().props.auth.user;

  return (
    <AppLayout breadcrumbs={breadcrumbs} user={user}>
      <Head title="Student Dashboard" />

      {/* Top Header */}
      <div className="bg-yellow-500 text-brown-900 py-4 px-6 flex justify-between items-center">
        <div>Welcome to Mahadivulwewa National School</div>
        <div className="space-x-4 hidden md:flex">
          <a href="https://www.facebook.com/ttnmmv" target="_blank" rel="noopener noreferrer">
            <Facebook size={18} />
          </a>
          <a href="mailto:ttnmahadivulwewamv@gmail.com">
            <Mail size={18} />
          </a>
          <a href="https://maps.google.com?q=Mahadivulwewa School" target="_blank" rel="noopener noreferrer">
            <MapPin size={18} />
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-[#5D4037] text-white py-3 px-6 shadow-md relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/School.jpg" alt="School Logo" className="h-14 w-14 rounded-full" />
            <span className="ml-3 text-xl font-bold">
              T/Tn/Mahadivulwewa Maha Vidyalaya (National School)
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
            <Link href={route('login')} className="block mt-3 bg-brown-800 text-white px-4 py-2 rounded text-center">
              Login
            </Link>
          </div>
        )}
      </nav>

      {/* Student Dashboard Layout */}
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg shadow p-4 w-full lg:w-64">
          <h2 className="text-lg font-bold text-yellow-700 mb-4">🎓 Student Menu</h2>
          <StudentSidebar />
        </aside>
            <StudyMaterials />
      </div>
    </AppLayout>
  );
}
          
