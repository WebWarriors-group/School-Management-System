import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;

}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
  return (
    <main className="flex flex-col md:flex-row justify-center items-stretch bg-gray-200 min-h-screen p-8 gap-4">

      <div className="flex flex-col items-center w-full md:max-w-[300px] bg-yellow-600 text-[#5D4037] shadow-2xl p-8">
        <img
          src="/images/school.jpg"
          className="w-60 max-h-[300px] rounded-full mt-4"
          alt="School Logo"
        />
        <h2 className="text-white text-center mt-4 text-lg font-semibold">
          Mahadivulwewa Maha Vidyalaya National School
        </h2>
      </div>


      <div className="flex flex-col w-full md:max-w-[500px] bg-white p-8 text-[#5D4037] shadow-2xl">
        <div className="flex flex-col items-center gap-4 mb-6 text-center">
          {title && <h1 className="text-2xl font-semibold">{title}</h1>}
          {description && <p className="text-sm text-gray-700">{description}</p>}
        </div>

        {children}
      </div>
    </main>


  );
}

