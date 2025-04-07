import { Head, Link } from '@inertiajs/react';
import { Facebook, Mail, MapPin, Menu, X,Twitter,Linkedin,Instagram } from 'lucide-react';
import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
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
                    <div className="w-full flex items-center px-5 justify-between">
                        {/* Logo and School Name */}
                        <div className="flex items-center">
                            <img src="images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full ml-[-10px]" />
                            <span className="font-[Orbitron] text-lg font-semibold text-[#FDDEBD] ml-3 whitespace-nowrap">
                                T / Tn / Mahadivulwewa National School
                            </span>
                        </div>

                        {/* Login Button */}
                        <Link
                            href={route('login')}
                            className="hidden md:inline-block rounded-2xl bg-white px-10 py-2 text-sm font-medium text-black transition duration-300 hover:bg-blue-700 hover:text-white"
                        >
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
                        <h1 className="text-4xl font-bold text-[#800000]">Mahadivulwewa National School</h1>
                    </div>
                </section>

                {/* Footer Section */}
                <section className="bg-[#800000]   text-white">
    <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">About School</a></li>
                <li><a href="#" className="hover:text-white transition">Academic Programs</a></li>
                <li><a href="#" className="hover:text-white transition">Admissions</a></li>
                <li><a href="#" className="hover:text-white transition">Research</a></li>
            </ul>
        </div>

        {/* Column 2 */}
        <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Library</a></li>
                <li><a href="#" className="hover:text-white transition">Recreation</a></li>
                <li><a href="#" className="hover:text-white transition">Student Portal</a></li>
                <li><a href="#" className="hover:text-white transition">Campus Map</a></li>
            </ul>
        </div>

        {/* Column 3 */}
        <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Staff Resources</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Give Now</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
            </ul>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col items-center md:items-start">
            
            <div className="flex space-x-4 mb-4 mt-4">
                <a href="#" className="hover:text-gray-300"><Facebook size={30} /></a>
                <a href="#" className="hover:text-gray-300"><Twitter size={30} /></a>
                <a href="#" className="hover:text-gray-300"> <MapPin size={30} /></a>
                <a href="#" className="hover:text-gray-300"><Mail size={30} /></a>
                {/* <a href="#" className="hover:text-gray-300"><YouTube size={24} /></a> */}
            </div>
           <h3>077 879 2078</h3>
        </div>
    </div>

    <div className="border-t border-gray-500 mt-8 bg-white"></div>

    {/* Footer Bottom */}
    <div className="container mx-auto px-6 py-6 text-center text-[17px] text-gray-600 bg-gray-200">
        <p>&copy; {new Date().getFullYear()} Mahadivulwewa Mahavidyalaya. All rights reserved.</p>
    </div>
</section>

            </div>
        </>
    );
}
