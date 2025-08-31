import { Head, Link } from '@inertiajs/react';
import { Facebook, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState,  useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css';



interface Image {
  id: number;
  title: string;
  image_path: string;
}

interface GalleryCategory {
  id: number;
  name: string;
  images: Image[];
}

interface Props {
  categories: GalleryCategory[];
}


export default function Navbar({ categories }: Props) {
  const [openCategory, setOpenCategory] = useState<GalleryCategory | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (category: GalleryCategory) => {
    setOpenCategory((prev) => (prev?.id === category.id ? null : category));
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount = carouselRef.current.clientWidth / 2;

    if (direction === 'left') {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  

    
   const [title, setTitle] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [categoryId, setCategoryId] = useState<number | ''>('');
    const [newCategoryName, setNewCategoryName] = useState('');
    
    
   const closeLightbox = () => setLightboxIndex(null);
    
  
    
     
      
  
   
      

  return (
    <>
      

  
    
      <Head title="Mahadivulwewa National School" />

      <div className="min-h-screen bg-white text-gray-900">

        {/* Top Bar */}
        <div className=" sticky top-0 left-0 bg-yellow-500 text-brown-900 py-4 px-4 text-[16px] flex justify-between items-center shadow z-50  max-[639px]:py-4 max-[639px]:px-3 max-[639px]:text-[16px]">
          <span>Welcome to Mahadivulwewa National School</span>
          <div className="space-x-3 hidden md:flex">
            <a href="https://www.facebook.com/ttnmmv" className="hover:text-blue-800"><Facebook size={18} /></a>
            <a href="mailto:ttnmahadivulwewamv@gmail.com" className="hover:text-blue-800"><Mail size={18} /></a>
            <a href="https://maps.google.com?q=Mahadivulwewa School" className="hover:text-blue-800"><MapPin size={18} /></a>
          </div>
        </div>

        {/* Navbar */}
       <nav className="sticky top-12 bg-[#650000] text-white py-3 px-6 shadow-md relative z-50  max-[639px]:py-2 max-[639px]:px-3">

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="/images/School.jpg" alt="Logo" className="h-14 w-14 rounded-full" />
              <h1 className="font-orbitron text-lg md:text-xl font-bold leading-tight max-[639px]:hidden ">
                T / Tn / Mahadivulwewa Maha Vidyalaya ( National School )<br className="hidden md:block" />
                
              </h1>
            </div>

           
            <div className="flex items-center space-x-4">
              <Link href={route('loginCheckout')} className="hidden md:inline-block bg-white rounded-full text-red-900 px-4 py-2  hover:bg-yellow-500 transition">Login</Link>
              <Link href={route('login')} className="hidden md:inline-block rounded-full bg-white text-red-900 px-4 py-2  hover:bg-yellow-500 transition">Forms</Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-4 text-yellow-300">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="bg-white text-black px-4 py-3 md:hidden">
              <a href="https://www.facebook.com/ttnmmv" className="flex items-center gap-2 py-2 hover:text-blue-600"><Facebook size={20} /> Facebook</a>
              <a href="mailto:ttnmahadivulwewamv@gmail.com" className="flex items-center gap-2 py-2 hover:text-blue-600"><Mail size={20} /> Email</a>
              <a href="https://maps.google.com?q=Mahadivulwewa School" className="flex items-center gap-2 py-2 hover:text-blue-600"><MapPin size={20} /> Location</a>
              <Link href={route('login')} className="block mt-3 bg-[#650000] text-white rounded px-4 py-2 text-center">Login</Link>
            </div>
          )}
        </nav>

      
        <section 
  className="relative bg-cover bg-center bg-no-repeat py-45 px-6 md:px-20 max-[639px]:py-9"
 style={{ backgroundImage: 'url(images/tag1.jpg)' }}



>
  {/* Optional overlay */}
  <div className="absolute inset-0 bg-black/40 z-0"></div>

  <div className="relative z-10 max-w-5xl mx-auto text-center text-white space-y-8 ">
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-[639px]:text-2xl ">
      අපි <span className="text-yellow-400">දක්ෂතා</span> සහ යහපත් <span className="text-yellow-400">ගුණාංග</span> වර්ධනය කරමු.
    </h1>

    <p className="text-xl max-[639px]:text-[19px]">
      සියලු අභියෝග ජයගෙන යා හැකි විශ්වාස සහ කුසලතා පිරුණු ශිෂ්‍ය පරපුරක් ගොඩනඟා ගැනීම.
    </p>

    <div className="flex justify-center gap-4 flex-wrap">
      <Link
        href={route('login')}
        className="bg-yellow-500 text-black px-6 py-3 rounded-full hover:bg-purple-700 transition max-[639px]:px-4 max-[639px]:py-2"
      >
         ▶ Watch Video
      </Link>
      
    </div>
  </div>
</section>



       
        <section className="py-16 px-6 md:px-20 bg-gray-200">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 mt-15 max-[639px]:text-3xl max-[639px]:mt-1">Mission</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-center bg-gray-200 ">
              <img src="/images/tag4" alt="Mission" className="bg-gray-200  w-[460px] h-[350px] object-cover max-[639px]:w-[300px] max-[639px]:h-[200px]" />
            </div>
            <div className="w-full md:w-250 bg-white p-13  shadow-md ml-[-84px] max-[639px]:w- ">
              <h3 className="text-2xl font-semibold text-red-800 mb-4">Mission / භාරකාරකම</h3>
              <p className="text-gray-800 mb-4">
                "Our mission is to contribute to the nation a wise, virtuous, and courageous generation of students by building a noble life philosophy drawn from all religious perspectives, fostering unity among all ethnic groups, and promoting mental and educational development."
              </p>
              <p className="text-yellow-800 mb-4">
                "අපගේ මෙහෙවර වනුයේ සියලු ආගමික දර්ශන වලින් ලබා ගත් උතුම් ජීවන දර්ශනයකින්, සියලු ජාතික කණ්ඩායම් අතර එකතාවය ප්‍රවර්ධනය කරමින්, මනෝබල සහ අධ්‍යාපනික සංවර්ධනය උස්සමින්, ශ්‍රී ලංකාවට බුද්ධිමත්, සුගතික සහ සාරධර්මී ශිෂ්‍ය පරපුරක් පිහිටුවීමයි."
              </p>
              <p className="text-sky-800">---- Mahadivulwewa Maha Vidyalaya -----</p>
              <p className="text-sky-900"></p>
            </div>
          </div>
        </section>



       
     




    <section className="py-16  md:px-20 bg-gray-200 w-full">
<h2 className="text-4xl font-bold text-center text-gray-800 mb-12 mt-15 max-[639px]:text-3xl max-[639px]:mt-1">Image Gallery</h2>
      <div className=" bg-white grid flex-wrap grid-cols-4 space-x-2 space-y-6  pb-4 py-9 px-4 item-center justify-center " >
        {categories.map((category) => (
          <div
  key={category.id}
  className={`relative w-[280px] h-[180px]  overflow-hidden shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer
    ${
      openCategory?.id === category.id
        ? "ring-2 ring-blue-500"
        : "border border-gray-200"
    }`}
  onClick={() => toggleCategory(category)}
>
  {/* Background image if exists */}
  {category.images.length > 0 && (
    <img
      src={category.images[0].image_path}
      alt={category.name}
      className="absolute inset-0 w-full h-full object-cover"
    />
  )}

  {/* Overlay */}
  <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>

  {/* Text content */}
  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
    <h1 className="text-lg font-bold">{category.name.toUpperCase()}</h1>
    <p className="text-sm mt-1">{category.images.length} images</p>
  </div>
</div>

        ))}
      </div>

      {/* Show Carousel */}
      {openCategory && (
        <div className="relative mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {openCategory.name} Images
          </h3>

          {/* Carousel Buttons */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 z-10"
            aria-label="Scroll Left"
          >
            ‹
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 z-10"
            aria-label="Scroll Right"
          >
            ›
          </button>

          {/* Carousel */}
          {openCategory.images.length === 0 ? (
            <p className="text-gray-500 italic">
              No images uploaded in this category yet.
            </p>
          ) : (
            <div
              ref={carouselRef}
              className="flex space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
            >
              {openCategory.images.map((img, index) => (
                <div
                  key={img.id}
                  className="snap-start border rounded shadow-sm flex-shrink-0 w-64 cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={`/${img.image_path}`}
                    alt={img.title || "Untitled"}
                    className="w-full h-40 object-cover rounded-t"
                  />
                  <div className="p-2 text-center text-sm text-gray-700">
                    {img.title || "Untitled"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      {openCategory && lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ✕
          </button>
          <img
            src={`/${openCategory.images[lightboxIndex].image_path}`}
            alt={openCategory.images[lightboxIndex].title || "Untitled"}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </section>

        <footer className="bg-[#650000] text-white py-7 ">
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

   

