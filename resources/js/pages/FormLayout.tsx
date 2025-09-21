import { Head, Link, usePage } from '@inertiajs/react';
import { Facebook, Home, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState, useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import StudentAdmissionForm from './Student/StudentAdmissionForm';
import TeacherForm from './Teacher/teacherForm';





export default function FormLayout() {

const { props } = usePage();
const { type } = props; 

const [showForm, setShowForm] = useState(false);
const [showTeacherForm, setShowTeacherForm] = useState(false);



  return (
    <>




      <Head title="Mahadivulwewa National School" />

      <div className="min-h-screen bg-white text-gray-900">

        {/* Top Bar */}
        <div className=" sticky top-0 left-0 bg-yellow-500 text-brown-900 py-4 px-4 text-[16px] flex justify-between items-center shadow z-50  max-[639px]:py-4 max-[639px]:px-3 max-[639px]:text-[16px]">
          <span>Welcome to Mahadivulwewa National School</span>
          <div className="space-x-3 hidden md:flex">
            <a href="https://www.facebook.com/ttnmmv" className="hover:text-blue-800"><Facebook size={18} /></a>
            <a href="mailto:ttnmahadivulwewamv@gmail.com" className="hover:text-blue-800"><Mail size={18} /></a>
            <a href="https://maps.google.com?q=Mahadivulwewa School" className="hover:text-blue-800"><MapPin size={18} /></a>
          </div>
        </div>

        {/* Navbar */}
        <nav className="sticky top-12 bg-[#650000] text-white py-3 px-6 shadow-md relative z-50  max-[639px]:py-2 max-[639px]:px-3">

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="/images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
              <h1 className="font-orbitron text-lg md:text-xl font-bold leading-tight max-[639px]:hidden ">
                T / Tn / Mahadivulwewa Maha Vidyalaya ( National School )<br className="hidden md:block" />

              </h1>
            </div>


            <div className="flex items-center space-x-4">
              <Link href="/" ><Home/></Link>
             
            </div>
          </div>

          
        </nav>

        <div className=" bg-gray-200 px-10 py-10 flex justify-center items-center">
            {type === 'student' && (
              <StudentAdmissionForm setShowForm={setShowForm} />
            )}
            {type === 'teacher' && (
              <TeacherForm setShowTeacherForm={setShowTeacherForm} />
            )}
        </div>

        <footer className="bg-[#650000] text-white py-7 ">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h2 className="text-lg font-semibold">Mahadivulwewa National School</h2>
              <p className="text-sm text-gray-300">© 2025 All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Home</a>
              <a href="#" className="text-gray-300 hover:text-white">About</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}



