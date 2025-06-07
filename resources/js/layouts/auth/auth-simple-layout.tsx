import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
    // bg-[#D4B28C]
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex justify-center  flex-wrap py-30 bg-[#fbe8d6]">
  {/* Login Component 1 */}
  <div className="justify-content-center relative  w-full max-w-[300px]  bg-[#5D4037] border-[white] p-5 text-[#5D4037] ">
    <img src="images/school.jpg" className="w-60 h-60 rounded-full justify-center mt-20 ml-3"/><br/>
    <h2 className="text-[white] text-lg text-center">Mahadivulwewa Maha Vidyalaya National School</h2>
  </div>

  {/* Login Component 2 */}
  <div className="justify-content-center relative flex w-full max-w-[500px]  bg-[white] border-[white] p-5 text-[#5D4037] ">
    <div className="flex w-[10000px] flex-col gap-9 border-4  p-8">
      <div className="relative flex flex-col items-center gap-4">
        <Link href={route('homepage')} className="flex flex-col items-center gap-2 font-medium text-[white]">
          <span className="sr-only text-[#5D4037]">{title}</span>
        </Link>

        <div className="z-5 space-y-2 text-center text-[#5D4037]">
          <h1 className="text-[23px] font-medium">{title}</h1>
          <p className="text-center text-[15px] text-[#5D4037]">{description}</p>
        </div>
      </div>
      {children}
    </div>
  </div>
</div>

    );
}
