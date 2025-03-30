import { Head, Link } from '@inertiajs/react';
import { Facebook, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const menuItems = [
        "Gallery", "Academics", "More", "Features", "Administration",
        "About", "Reports", "Contact"
    ];

    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const menuItems = [
        "Gallery",
        "Academics",
        "More",
        "Features",
        "Administration",
        "About",
        "Reports",
        "Contact",
        "Administration",
    ];

    const details = {
        Gallery: "This section contains images and videos of school events.",
        Academics: "Information about courses, syllabus, and academic programs.",
        More: "Additional features and information.",
        Features: "Details about school facilities and special programs.",
        Administration: "Meet the school administration and management.",
        About: "Learn about our school's history and mission.",
        Reports: "View student progress reports and analytics.",
        Contact: "Get in touch with school administration.",
    };


    return (
        <>
            <Head title="Mahadivulwewa National School" />
            <div className="w-full">
                {/* Main Navbar */}
                <nav className="bg-[#800000] py-2 text-white shadow-md w-full">
                    <div className="w-full flex items-center justify-between px-5">
                        {/* Logo */}
                        <div className="flex items-center">
                            <img src="images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
                            <span className="font-[Orbitron] text-xl font-semibold text-[#FDDEBD] ml-2">
                                 MDWMV
                            </span>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-6">
                            <a href="https://www.facebook.com/ttnmmv" className="flex items-center space-x-1 hover:underline">
                                <Facebook size={20} /> <span>Facebook</span>
                            </a>
                            <a href="mailto:ttnmahadivulwewamv@gmail.com" className="flex items-center space-x-1 hover:underline">
                                <Mail size={20} /> <span>Contact</span>
                            </a>
                            <a href="https://maps.google.com?q=Mahadivulwewa School" className="flex items-center space-x-1 hover:underline">
                                <MapPin size={24} /> <span>Location</span>
                            </a>
                        </div>

                        {/* Login Button */}
                        <Link href={route('login')} className="hidden md:inline-block rounded-2xl bg-white px-9 py-2 text-sm font-medium text-black transition duration-300 hover:bg-blue-700 hover:text-white">
                            Login
                        </Link>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Sub Navbar */}
                    <div className="w-full bg-gray-100 py-4 shadow-sm mt-3">
                        <div className="flex justify-center space-x-9 overflow-x-auto px-4 text-[18px] whitespace-nowrap text-[#800000]">
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedItem(selectedItem === item ? null : item)}
                                    className="hover:text-blue-600 focus:outline-none"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="w-full space-y-2 bg-red-100 p-3 md:hidden text-[#800000]">
                        <a href="https://www.facebook.com/ttnmmv" className="block flex items-center space-x-1 hover:underline">
                            <Facebook size={20} /> <span>Facebook</span>
                        </a>
                        <a href="mailto:ttnmahadivulwewamv@gmail.com" className="block flex items-center space-x-1 hover:underline">
                            <Mail size={20} /> <span>Contact</span>
                        </a>
                        <a href="https://maps.google.com?q=Mahadivulwewa School" className="block flex items-center space-x-1 hover:underline">
                            <MapPin size={20} /> <span>Location</span>
                        </a>
                        <button className="mt-2 w-full rounded-lg bg-white px-4 py-2 text-blue-600 hover:bg-gray-200">Login</button>
                    </div>
                )}

                {/* Hero Section */}
                <section className="flex h-[80vh] w-full items-center justify-center bg-white text-center text-black">
                    <div className="container px-4">
                        <img src="images/School.jpg" alt="Logo" className="mx-auto mt-9 h-100 w-109" />
                        <h1 className="text-4xl font-bold text-[#800000]">මහදිවුල්වැව මහ විද්‍යාලය</h1>
                        <h1 className="text-4xl font-bold text-[#800000]">Mahadivulwewa Maha Vidyalaya</h1>
                    </div>
                </section>

                {/* Footer Section */}
                <section className="mt-20 bg-[#800000] py-10 text-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <div className="text-center md:text-left">
                                <h2 className="text-[23px] font-bold">Mahadivulwewa Mahavidyalaya</h2>
                                <p className="mt-1 text-[17px] text-gray-200">&copy; {new Date().getFullYear()} All rights reserved.</p>
                            </div>

                            <nav className="flex flex-wrap justify-center gap-6 text-center text-[17px] md:text-left ml-[-200px]">
                                <a href="#" className="hover:underline">Home</a>
                                <a href="#" className="hover:underline">About</a>
                                <a href="#" className="hover:underline">Contact</a>
                                <a href="#" className="hover:underline">Reports</a>
                            </nav>

                            <div className="flex justify-center space-x-6 md:justify-end">
                                <a href="https://www.facebook.com/ttnmmv" className="hover:text-gray-300">
                                    <Facebook size={24} />
                                </a>
                                <a href="https://maps.google.com?q=Mahadivulwewa School" className="hover:text-gray-300">
                                    <MapPin size={24} />
                                </a>
                                <a href="mailto:ttnmahadivulwewamv@gmail.com" className="hover:text-gray-300">
                                    <Mail size={24} />
                                </a>
                            </div>
                        </div>
                        <hr className="my-6 border-red-100" />
                        <p className="text-center text-[16px] text-red-200">
                            Crafted with dedication❤️ by the Web Warriors Team | Powered by React & Laravel 12
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
