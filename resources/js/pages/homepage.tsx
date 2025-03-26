import { Head, Link } from '@inertiajs/react';
import { Facebook, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head title="Homepage - Mahadiwulwewa National School" />
            <div className="w-full">
                {/* Main Navbar */}
                <nav className="bg-red-900 py-3 text-white shadow-md">
                    <div className="container mx-auto flex flex-col px-5">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center space-x-1">
                                <img src="images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
                                <span className="font-[Orbitron] text-xl font-semibold text-[#FDDEBD] drop-shadow-[4px_4px_2px_rgba(0,0,0,0)]">
                                    MDWMV
                                </span>
                            </div>

                            {/* ✅ Updated Desktop Links with Icons */}
                            <div className="mr-500px hidden items-center space-x-6 md:flex">
                                <a href="https://www.facebook.com/ttnmmv" className="flex items-center space-x-1 hover:underline">
                                    <Facebook size={20} />
                                    <span>Facebook</span>
                                </a>

                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ttnmahadivulwewamv@gmail.com"
                                    className="flex items-center space-x-1 hover:underline"
                                >
                                    <Mail size={20} />
                                    <span>Contact</span>
                                </a>

                                <a
                                    href="https://maps.google.com?q=YourLocation"
                                    aria-label="Location"
                                    className="flex items-center space-x-1 hover:underline"
                                >
                                    <MapPin size={24} />
                                    <span>Location</span>
                                </a>

                                <a href="{{ url('lang/en') }}" className="flex items-center space-x-1 hover:underline">
                                    <span>English</span>
                                </a>

                                <a href="{{ url('lang/si') }}" className="flex items-center space-x-1 hover:underline">
                                    <span>සිංහල</span>
                                </a>
                            </div>

                            {/* Login Button */}
                            <Link
                                href={route('login')}
                                className="hidden rounded-2xl bg-white px-9 py-2 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 md:inline-block"
                            >
                                Login
                            </Link>

                            {/* Mobile Menu Button */}
                            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                                {menuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Sub Navbar (unchanged as per your request) */}
                        <div className="mt-4 bg-gray-100 py-4 shadow-sm">
                            <div className="flex justify-center space-x-10 overflow-x-auto px-4 text-[18px] whitespace-nowrap text-[#800000]">
                                {['Gallery', 'Acadamics', 'More', 'Features', 'Administration', 'About', 'Reports', 'Contact', 'Administration'].map(
                                    (item, index) => (
                                        <a key={index} href="#" className="hover:text-blue-600">
                                            {item}
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="space-y-2 bg-blue-700 p-3 md:hidden">
                            <a href="https://www.facebook.com/ttnmmv" className="block flex items-center space-x-1 text-white hover:underline">
                                <Facebook size={20} />
                                <span>Facebook</span>
                            </a>
                            <a href="#" className="block flex items-center space-x-1 text-white hover:underline">
                                <Mail size={20} />
                                <span>Contact</span>
                            </a>

                            <a href="#" className="block flex items-center space-x-1 text-white hover:underline">
                                <MapPin size={20} />
                                <span>Location</span>
                            </a>

                            <button className="mt-2 w-full rounded-lg bg-white px-4 py-2 text-blue-600 hover:bg-gray-200">Login</button>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <section className="flex h-[80vh] w-full items-center justify-center bg-white text-center text-black">
                    <div className="container px-4">
                        <img src="images/School.jpg" alt="Logo" className="mx-auto mt-3 h-100 w-109" />
                        <h1 className="text-4xl font-bold text-[#800000]">Mahadivulwewa Maha Vidyalaya</h1>
                    </div>
                </section>

                {/* Footer Section */}
                <section className="mt-20 bg-red-900 py-10 text-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            {/* Footer Left - Logo & Copyright */}
                            <div className="text-center md:text-left">
                                <h2 className="text-[23px] font-bold text-white">Mahadivulwewa Mahavidyalaya</h2>
                                <p className="mt-1 text-[17px] text-gray-200">&copy; {new Date().getFullYear()} All rights reserved.</p>
                            </div>

                            {/* Footer Center - Navigation Links */}
                            <nav className="mr-50 flex flex-wrap justify-center gap-6 text-center text-[17px] md:text-left">
                                <a href="#" className="hover:underline focus:ring-2 focus:ring-white focus:outline-none">
                                    Home
                                </a>
                                <a href="#" className="hover:underline focus:ring-2 focus:ring-white focus:outline-none">
                                    About
                                </a>
                                <a href="#" className="hover:underline focus:ring-2 focus:ring-white focus:outline-none">
                                    Contact
                                </a>
                                <a href="#" className="hover:underline focus:ring-2 focus:ring-white focus:outline-none">
                                    Reports
                                </a>
                            </nav>

                            {/* Footer Right - Social Media Icons */}
                            <div className="flex justify-center space-x-6 md:justify-end">
                                <a
                                    href="https://www.facebook.com/ttnmmv"
                                    aria-label="Facebook"
                                    className="hover:text-gray-300 focus:ring-2 focus:ring-white focus:outline-none"
                                >
                                    <Facebook size={24} />
                                </a>
                                <a
                                    href="https://maps.google.com?q=YourLocation"
                                    aria-label="location"
                                    className="hover:text-gray-300 focus:ring-2 focus:ring-white focus:outline-none"
                                >
                                    <MapPin size={24} />
                                </a>
                                <a href="#" aria-label="Email" className="hover:text-gray-300 focus:ring-2 focus:ring-white focus:outline-none">
                                    <Mail size={24} />
                                </a>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="my-6 border-red-100" />

                        {/* Bottom Message */}
                        <p className="text-center text-[16px] text-red-200">
                            Developed with ❤️ by Web Warriors | Powered by <span className="font-semibold">React</span> &{' '}
                            <span className="font-semibold">Laravel Version 12</span>
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
