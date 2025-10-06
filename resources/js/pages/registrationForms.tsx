import { Head, Link } from '@inertiajs/react';
import { Facebook, GraduationCap, Home, Mail, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head title="Login - Mahadivulwewa National School" />

            <div className="flex min-h-screen flex-col bg-white text-gray-900">
                {/* ===== Top Bar ===== */}
                <div className="sticky top-0 left-0 z-50 flex items-center justify-between bg-yellow-500 px-4 py-4 text-[16px] text-[#650000] shadow">
                    <span>Welcome to Mahadivulwewa National School</span>
                    <div className="hidden space-x-3 md:flex">
                        <a href="https://www.facebook.com/ttnmmv" className="hover:text-blue-800">
                            <Facebook size={18} />
                        </a>
                        <a href="mailto:ttnmahadivulwewamv@gmail.com" className="hover:text-blue-800">
                            <Mail size={18} />
                        </a>
                        <a href="https://maps.google.com?q=Mahadivulwewa School" className="hover:text-blue-800">
                            <MapPin size={18} />
                        </a>
                    </div>
                </div>

                {/* ===== Navbar ===== */}
                <nav className="relative sticky top-12 z-50 bg-[#650000] px-6 py-3 text-white shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img src="/images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
                            <h1 className="font-orbitron text-lg leading-tight font-bold max-[639px]:hidden md:text-xl">
                                T / Tn / Mahadivulwewa Maha Vidyalaya (National School)
                            </h1>
                        </div>
                        <Link href="/">
                            {' '}
                            <Home />
                        </Link>
                    </div>
                </nav>

                {/* ===== Login Tiles Section ===== */}
                <main className="flex flex-grow items-center justify-center bg-gradient-to-br from-[#800000] to-[#FFD700] p-3">
                    <div className="w-full max-w-2xl rounded-3xl bg-white/90 p-6 text-center shadow-2xl backdrop-blur-lg">
                        <div className="mb-10">
                            <p className="mt-3 text-lg text-gray-600">Select your registration type below</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <Link
                                href={route('formlayout')}
                                className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-b from-yellow-500 to-yellow-600 py-8 font-bold text-gray-900 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <GraduationCap className="h-12 w-12" />
                                <span className="text-xl">Student Registration</span>
                            </Link>

                            <Link
                                href={route('formlayout')}
                                className="flex flex-col items-center justify-center gap-4 rounded-2xl py-8 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{ background: 'linear-gradient(to bottom, #800000, #4B0000)' }}
                            >
                                <Users className="h-12 w-12" />
                                <span className="text-xl">Teacher Registration</span>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* ===== Footer ===== */}
                <footer className="bg-[#650000] py-7 text-white">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 md:flex-row">
                        <div className="mb-4 text-center md:mb-0 md:text-left">
                            <h2 className="text-lg font-semibold">Mahadivulwewa National School</h2>
                            <p className="text-sm text-gray-300">© 2025 All rights reserved.</p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="/" className="text-gray-300 hover:text-white">
                                Home
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                About
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                Contact
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                Privacy
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
