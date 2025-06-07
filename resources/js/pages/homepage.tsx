import { Head, Link } from '@inertiajs/react';
import { Facebook, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useRef } from "react";



export default function Navbar() {

  interface ModalProps {
  image: { src: string; alt: string };
  onClose: () => void;
}
  const [menuOpen, setMenuOpen] = useState(false);

  const Modal = ({ image, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);
}

  return (
    <>
      <Head title="Mahadivulwewa National School" />
      <div className="relative w-full min-h-screen overflow-hidden bg-white">
     
        <div className="bg-yellow-500 text-brown-900 text-md py-4 px-6 flex justify-between items-center ">
          <div>Welcome to Mahadivulwewa National School</div>
          <div className="space-x-4 hidden md:flex">
            <a href="https://www.facebook.com/ttnmmv"><Facebook size={18} /></a>
            <a href="mailto:ttnmahadivulwewamv@gmail.com"><Mail size={18} /></a>
            <a href="https://maps.google.com?q=Mahadivulwewa School"><MapPin size={18} /></a>
          </div>
        </div>

        
        <nav className="bg-[#5D4037] text-white py-3 px-6 shadow-md relative z-10">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center">
              <img src="/images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
              <span className="ml-3 font-orbitron text-xl font-bold">
                T / Tn/ Mahadivulwewa Maha Vidyalaya(National School)
              </span>
            </div>

           
            <div className="flex items-center space-x-4">
              <Link href={route('login')} className="hidden md:inline-block bg-[#fbe8d6] text-red-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition">Login</Link>
              <Link href={route('login')} className="hidden md:inline-block bg-[#fbe8d6] text-red-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition">Forms</Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-4 text-yellow-300">
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
              <Link href={route('login')} className="block mt-3 rounded bg-brown-800 text-white px-4 py-2 text-center">
                Login
              </Link>
            </div>
          )}
        </nav>

       
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20  h-148 bg-[#fbe8d6]">
          
          <div className="md:w-1/2 text-center md:text-left space-y-5 mt-[-118px] ">
          <img src="images/book4.png" className="ml-20 w-90 h-60 mt-30"></img>
            <h1 className="text-4xl md:text-5xl font-bold text-[#5D4037] py-10 w-200 mt-[-60px]">
              Let us develop wisdom and good qualities.<span className="text-brown-700 ml-10 text-[30px]"><sub>(motto)</sub></span>
            </h1>

            <p className="text-xl text-yellow-700 mt-[-20px]">
             To develop a confident and capable generation of students who can sucessfully overcome all challanges.
             <span className="text-brown-700 ml-15 text-[25px]"><sub>(vision)</sub></span>
            </p>
            <div className="mt-8 ">
              <Link
                href={route('login')}
                className="bg-yellow-500 text-brown-900 px-6 py-2 rounded-full font-medium hover:bg-yellow-500"
              >
                About Us
              </Link>

              <Link
                href={route('login')}
                className="bg-yellow-500 text-brown-900 px-6 py-2 rounded-full font-medium hover:bg-yellow-500 ml-5"
              >
                Join Us
              </Link>
            </div>
          </div>

        
          <div className="md:w-1/2  md:mt-0 relative mt-[-50px]">
            <img
              src="/images/image2.jpg"
              alt="School"
              className="w-[400px] h-[300px] ml-40 mt-[-100px] "
            />
           < img
              src="/images/school1.jpg"
              alt="School"
              className="w-[350px] h-[250px] ml-90 absolute mt-[-100px]"
            />
          </div>
        </section>
      </div>
      <div>
  <section className="grid grid-cols-1 md:grid-cols-1 gap-10 px-4 md:px-20  h-148 items-center justify-center mt-[-50px]">
  

  
  <div className="text-center md:mt-0  border-7 border-[#5D4037] h-80 p-4 bg-[#5D4037]">
    <h2 className="font-bold text-xl w-100 justify-center item-center bg-yellow-500 py-1 ml-120">Mission /භාරකාරකම </h2>
    <p className="text-lg py-6 text-[white]">
      "Our mission is to contribute to the nation a wise, virtuous,and courages generation of students by building a noble life philosophy
       drawn from all religious perspectives,fostering unity among all ethnic groups,and promoting mental and educational development" <br /><br/>
      "අපගේ මෙහෙවර වනුයේ සියලු ආගමික දර්ශන වලින් ලබා ගත් උතුම් ජීවන දර්ශනයකින්, සියලු ජාතික කණ්ඩායම් අතර එකතාවය ප්‍රවර්ධනය කරමින්, මනෝබල සහ අධ්‍යාපනික සංවර්ධනය උස්සමින්, ශ්‍රී ලංකාවට බුද්ධිමත්, සුගතික සහ සාරධර්මී ශිෂ්‍ය පරපුරක් පිහිටුවීමයි."
    </p>
 <h2 className="text-yellow-500 text-lg">----Mahadivulwewa Maha Vidyalaya-----</h2>
 <h2 className="text-[white]">****************************************</h2>
  </div>
</section>


  
   
   
</div>



    </>
  );
}
