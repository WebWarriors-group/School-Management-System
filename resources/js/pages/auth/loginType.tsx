import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Facebook, Mail, MapPin, Menu, X, GraduationCap, Users } from "lucide-react";

export default function LoginPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head title="Login - Mahadivulwewa National School" />

      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        {/* ===== Top Bar ===== */}
        <div className="sticky top-0 left-0 bg-yellow-500 text-[#650000] py-4 px-4 text-[16px] flex justify-between items-center shadow z-50">
          <span>Welcome to Mahadivulwewa National School</span>
          <div className="space-x-3 hidden md:flex">
            <a href="https://www.facebook.com/ttnmmv" className="hover:text-blue-800"><Facebook size={18} /></a>
            <a href="mailto:ttnmahadivulwewamv@gmail.com" className="hover:text-blue-800"><Mail size={18} /></a>
            <a href="https://maps.google.com?q=Mahadivulwewa School" className="hover:text-blue-800"><MapPin size={18} /></a>
          </div>
        </div>

        {/* ===== Navbar ===== */}
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

        {/* ===== Login Tiles Section ===== */}
        <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-[#800000] to-[#FFD700] p-3">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 max-w-2xl w-full text-center">
            <div className="mb-10">
              <p className="text-lg text-gray-600 mt-3">Select your login type below</p>
            </div>

            <div className="flex flex-col gap-6">
              <Link
                href="/login/student"
                className="flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-yellow-500 to-yellow-600 text-gray-900 font-bold py-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                <GraduationCap className="w-12 h-12" />
                <span className="text-xl">Student Login</span>
              </Link>

              <Link
                href="/login"
                className="flex flex-col items-center justify-center gap-4 text-white font-bold py-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                style={{ background: "linear-gradient(to bottom, #800000, #4B0000)" }}
              >
                <Users className="w-12 h-12" />
                <span className="text-xl">Staff Login</span>
              </Link>
            </div>
          </div>
        </main>

        {/* ===== Footer ===== */}
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
