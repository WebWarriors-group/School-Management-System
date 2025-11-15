import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Facebook, Mail, MapPin } from "lucide-react";

export default function LoginPage() {
  const [menuOpen, setMenuOpen] = useState(false);
<<<<<<< HEAD
  const [countdown, setCountdown] = useState(10); 
=======
  const [countdown, setCountdown] = useState(10); // seconds before redirect
>>>>>>> da966e3c28a260bde879823d91e77d7cba4e1f12

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      window.location.href = "/registrationForms";
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <>
      <Head title="Login - Mahadivulwewa National School" />

      <div className="min-h-screen flex flex-col bg-white text-gray-900">
<<<<<<< HEAD
        {}
=======
        {/* ===== Top Bar ===== */}
>>>>>>> da966e3c28a260bde879823d91e77d7cba4e1f12
        <div className="sticky top-0 left-0 bg-yellow-500 text-[#650000] py-4 px-4 text-[16px] flex justify-between items-center shadow z-50">
          <span>Welcome to Mahadivulwewa National School</span>
          <div className="space-x-3 hidden md:flex">
            <a href="https://www.facebook.com/ttnmmv" className="hover:text-blue-800"><Facebook size={18} /></a>
            <a href="mailto:ttnmahadivulwewamv@gmail.com" className="hover:text-blue-800"><Mail size={18} /></a>
            <a href="https://maps.google.com?q=Mahadivulwewa School" className="hover:text-blue-800"><MapPin size={18} /></a>
          </div>
        </div>

<<<<<<< HEAD
        {}
=======
        {/* ===== Navbar ===== */}
>>>>>>> da966e3c28a260bde879823d91e77d7cba4e1f12
        <nav className="sticky top-12 bg-[#650000] text-white py-3 px-6 shadow-md relative z-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="/images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
              <h1 className="font-orbitron text-lg md:text-xl font-bold leading-tight max-[639px]:hidden">
                T / Tn / Mahadivulwewa Maha Vidyalaya (National School)
              </h1>
            </div>
          </div>
        </nav>

<<<<<<< HEAD
        {}
=======
        {/* ===== Warning Message ===== */}
>>>>>>> da966e3c28a260bde879823d91e77d7cba4e1f12
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">You have not been registered to the system.</h2>
            <p className="text-sm mt-2">
              Redirecting you for registration in <span className="font-bold">{countdown}</span> seconds...
            </p>
          </div>
        </div>

<<<<<<< HEAD
        {}
=======
        {/* ===== Footer ===== */}
>>>>>>> da966e3c28a260bde879823d91e77d7cba4e1f12
        <footer className="bg-[#650000] text-white py-7">
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
