import { Head, Link} from '@inertiajs/react';
import { Facebook, Mail, MapPin, Menu, X, Twitter} from 'lucide-react';
import { Card} from '@/components/ui/card';

import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head title="Mahadivulwewa National School" />
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/background.jpg"
          alt="School Background"
          className="absolute  w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full z-10 text-white py-4">
          <div className="flex justify-between items-center px-6">
            <div className="flex items-center">
              <img src="/images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
              <span className="ml-3 font-orbitron text-xl font-semibold ">
                T / TN/ MAHADIVULWEWA NATIONAL SCHOOL
              </span>
            </div>
            <div className=" absolute flex items-center left-320">
              <Link
                href={route('login')}
                className="hidden md:inline-block rounded-2xl  bg-white px-6 py-2 text-sm font-medium text-black hover:bg-gradient-to-r from-orange-600 to-yellow-500 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href={route('login')}
                className="hidden md:inline-block rounded-2xl ml-5  bg-white px-6 py-2 text-sm font-medium text-black hover:bg-gradient-to-r from-orange-600 to-yellow-500 hover:text-white transition"
              >
                Forms
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-4">
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
              <Link href={route('login')} className="block mt-3 rounded bg-black text-white px-4 py-2 text-center">
                Login
              </Link>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className=" flex h-screen items-center justify-center text-center px-4 mt-[-70px]">
          <div className=" relative z-10 text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 ">
              Empowering Future Generations Through Education
            </h1>
            <p className="text-lg md:text-xl text-orange-200 ">
              Welcome to Mahadivulwewa National School – A place of knowledge, discipline, and excellence.
            </p>
          </div>

        </section>

        <section className=" flex mt-[70px] items-center justify-center text-center px-4">
          <div className="flex relative z-10 text-white max-w-3xl mt-[-300px] justify-between w-180">
          <Card className="relative w-52 h-52 rounded-full overflow-hidden bg-[#478AC9] text-[white]">

             <img
    src="/images/man3.jpg"
    alt="School Background"
    className="absolute inset-0 w-full h-full object-cover z-0"

  />


  
</Card>


<Card className="relative w-52 h-52 rounded-full overflow-hidden">
  <img
    src="/images/man1.jpg"
    alt="School Background"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />
</Card>


<Card className="relative w-52 h-52 rounded-full overflow-hidden">
   <img
    src="/images/man2.jpg"
    alt="School Background"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />
</Card>

            
          </div>

        </section>

        {/* Footer */}
      
      </div>
    </>
  );
}
