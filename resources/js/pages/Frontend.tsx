import { Facebook, Instagram, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Main Navbar */}
            <nav className="bg-red-900 py-2 text-white shadow-md">
                <div className="container mx-auto flex flex-col px-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <h1 className="text-xl font-bold">MyWebsite</h1>

                        {/* ✅ Updated Desktop Links with Icons */}
                        <div className="hidden space-x-9 md:flex">
                            <a href="#" className="flex items-center space-x-1 hover:underline">
                                <Facebook size={20} />
                                <span>Facebook</span>
                            </a>
                            <a href="#" className="flex items-center space-x-1 hover:underline">
                                <Instagram size={20} />
                                <span>Instagram</span>
                            </a>
                            <a href="#" className="flex items-center space-x-1 hover:underline">
                                <Mail size={20} />
                                <span>Contact</span>
                            </a>
                        </div>

                        {/* Login Button */}
                        <button className="hidden rounded-lg bg-white px-3 py-1 text-sm text-blue-600 hover:bg-gray-200 md:block">Login</button>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Sub Navbar (unchanged as per your request) */}
                    <div className="mt-4 bg-[] py-4 shadow-sm">
                        <div className="flex justify-center space-x-10 overflow-x-auto px-4 text-[18px] whitespace-nowrap text-[#800000]">
                            {['Overview', 'Analytics', 'More', 'Features', 'Administration', 'About', 'Reports', 'Contact', 'Administration'].map(
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
                        <a href="#" className="block flex items-center space-x-1 text-white hover:underline">
                            <Facebook size={20} />
                            <span>Facebook</span>
                        </a>
                        <a href="#" className="block flex items-center space-x-1 text-white hover:underline">
                            <Instagram size={20} />
                            <span>Instagram</span>
                        </a>
                        <a href="#" className="block flex items-center space-x-1 text-white hover:underline">
                            <Mail size={20} />
                            <span>Contact</span>
                        </a>
                        <button className="mt-2 w-full rounded-lg bg-white px-4 py-2 text-blue-600 hover:bg-gray-200">Login</button>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="flex h-[80vh] w-full items-center justify-center bg-white text-center text-black">
                <div className="container px-4">
                    <img src="images/School.jpg" alt="Logo" className="mx-auto mt-30 h-100 w-109" />
                    <h1 className="text-4xl font-bold text-[#800000]">Mahadivulwewe Mahavidyalaya</h1>
                    <p className="mt-4 text-lg text-[20px] text-[#800000]">Your go-to platform for amazing insights.</p>
                    <p className="mt-4 text-lg">Your go-to platform for amazing insights.</p>
                </div>
            </section>

            {/* Footer Section */}
            <section className="mt-20 bg-red-900 py-10 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        {/* Footer Left - Logo & Copyright */}
                        <div className="text-center md:text-left">
                            <h2 className="text-[23px] font-bold text-white">Mahadivulwewe Mahavidyalaya</h2>
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
                            <a href="#" aria-label="Facebook" className="hover:text-gray-300 focus:ring-2 focus:ring-white focus:outline-none">
                                <Facebook size={24} />
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-gray-300 focus:ring-2 focus:ring-white focus:outline-none">
                                <Instagram size={24} />
                            </a>
                            <a href="#" aria-label="Email" className="hover:text-gray-300 focus:ring-2 focus:ring-white focus:outline-none">
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="my-6 border-gray-600" />

                    {/* Bottom Message */}
                    <p className="text-center text-xs text-gray-300">
                        Developed with ❤️ by Your Team | Powered by <span className="font-semibold">React</span> &{' '}
                        <span className="font-semibold">Tailwind CSS</span>
                    </p>
                </div>
            </section>
        </div>
    );
}
