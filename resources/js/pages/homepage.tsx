import { Head, Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head title="Mahadiwulwewa National School" />
            <div className="w-full">
                {/* Main Navbar */}
                <nav className="bg-red-900 py-2 text-white shadow-md">
                    <div className="container mx-auto flex flex-col px-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <h1 className="text-xl font-bold">MyWebsite</h1>

                            {/* ✅ Updated Desktop Links with Icons */}
                            <div className="hidden space-x-9 md:flex lex items-center justify-between">
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
                                className="hidden rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 md:inline-block"
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
            </div>
        </>
    );
}
