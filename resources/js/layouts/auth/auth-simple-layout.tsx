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
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white p-7 md:p-10" 
       
           >
            <div className="justify-content-center relative flex w-full max-w-[500px] rounded-md border-red-700 bg-white p-5 text-[white] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="flex w-[10000px] flex-col gap-9 border-4 border-red-700 p-8">
                    <img src="/images/School.jpg" className="pointer-events-none absolute top-12 left-20  w-[350px] opacity-12" alt="School" />
                    <div className="relative flex flex-col items-center gap-4">
                        <Link href={route('homepage')} className="flex flex-col items-center gap-2 font-medium text-[white]">
                            <span className="sr-only bg-red-900">{title}</span>
                        </Link>

                        <div className="z-5 space-y-2 text-center text-[#800000]">
                            <h1 className="text-[23px] font-medium">{title}</h1>

                            <p className="text-center text-[15px] text-red-900">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
