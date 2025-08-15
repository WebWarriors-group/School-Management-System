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
        <div className="flex justify-center flex-wrap py-20 bg-gray-200 gap-8">

            {/* Logo / School info */}
            <div className="flex flex-col items-center w-full max-w-[300px] bg-yellow-600 p-5 text-[#5D4037] shadow-2xl rounded-xl">
                <img src="/images/school.jpg" className="w-60 h-60 rounded-full mt-4" />
                <h2 className="text-white text-center mt-4 text-lg font-semibold">
                    Mahadivulwewa Maha Vidyalaya National School
                </h2>
            </div>

            {/* Login Form */}
            <div className="flex flex-col w-full max-w-[500px] bg-white p-8 text-[#5D4037] shadow-2xl rounded-xl">
                <div className="flex flex-col items-center gap-4 mb-6 text-center">
                    {title && <h1 className="text-2xl font-semibold">{title}</h1>}
                    {description && <p className="text-sm text-gray-700">{description}</p>}
                </div>

                {children}
            </div>
        </div>
    );
}

