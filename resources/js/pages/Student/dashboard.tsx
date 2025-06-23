import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { NavUser } from '@/components/nav-user';
import { Facebook, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    
];

export default function Dashboard() {

     const [menuOpen, setMenuOpen] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
           
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
        </AppLayout>
    );
}
