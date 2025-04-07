import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    
];
interface DashboardProps {
    teacherCount: number;
}

export default function AdminTeacherDashboard() {
    const [teacherCount, setTeacherCount] = useState<number | null>(null);
    const [totalTeachers, setTotalTeachers] = useState<number>(0);

    const increase = () => setTotalTeachers(totalTeachers + 1);
    const decrease = () => setTotalTeachers(totalTeachers - 1);
    useEffect(() => {
        // Fetch the teacher count from the backend
        fetch('/admin/teacher/count')  // Adjust the route accordingly
            .then(response => response.json())
            .then(data => setTeacherCount(data.teacherCount));
    }, []);

    if (teacherCount === null) {
        return <div>Loading...</div>;
    }
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-4 p-4">
                <h2 className="text-xl font-semibold">Teacher Management</h2>
                {/* <Link href="/add-teacher"> */}
                
                {/* Teacher List Overview */}
                <div className="border p-4 rounded-lg">
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                        <div className="border-red-900 rounded-2xl border-t-4 bg-white p-6 shadow">
                        <div>
                <h3 className="text-maroon-700 text-lg font-bold">Total Teachers</h3>
                <div className="mt-2 flex items-center space-x-2">
                    {/* Square border for the number */}
                    <div className="relative flex items-center justify-center border-2 border-red-900 w-20 h-20 text-3xl font-bold text-maroon-700">
                        {totalTeachers}
                    </div>

                    {/* Arrows placed outside the box */}
                    <div className="flex flex-col items-center space-y-2">
                        <button 
                            onClick={increase} 
                            className="bg-red-900 text-white p-2 rounded-full shadow hover:bg-yellow-500 cursor-pointer"
                        >
                            ↑
                        </button>
                        <button 
                            onClick={decrease} 
                            className="bg-red-900 text-white p-2 rounded-full shadow hover:bg-yellow-500 cursor-pointer"
                        >
                            ↓
                        </button>
                    </div>+
                    
                </div>
            </div>                  
                        <Link href="/add-teacher">
                                        <button className="bg-red-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-black transition-all ml-auto block">
                                            Add Teacher by the Admin
                                        </button>
                                    </Link>
                            
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="border-red-900 rounded-2xl border-t-4 bg-white p-6 shadow">
                                    <h3 className="text-maroon-700 text-lg font-bold">Leave</h3>
                                    <div className="w-16 h-16 flex items-center justify-center border-4 border-red-900 rounded-full bg-white">

                                    <p className="text-3xl font-bold">95</p>
                                    </div>
                                    <Link href="">
                                        <button className="bg-red-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-black transition-all ml-auto block">
                                            Leave Details of Teachers '
                                        </button>
                                    </Link>
                                    
                                </div>
                                
                                <div className="border-red-900 rounded-2xl border-t-4 bg-white p-6 shadow">
                                    <h3 className="text-maroon-700 text-lg font-bold">Registered Teachers</h3>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <div className="w-16 h-16 flex items-center justify-center border-4 border-red-900 rounded-full bg-white">
                                            <p className="text-3xl font-bold">{teacherCount}</p>
                                        </div>
                                    </div>

                                    <Link href="/teacher_details">
                                        <button className="bg-red-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-black transition-all ml-auto block">
                                            Search Teacher
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        
                        
                    </div>
                    {/* Render list of active teachers here */}
                </div>

                {/* Attendance and Leave Management */}
                <div className="border p-4 rounded-lg mt-4">
                    <h2 className="text-lg font-semibold">Teacher Attendance</h2>
                    {/* Render attendance table and leave requests */}
                </div>

                {/* Teacher Performance */}
                <div className="border p-4 rounded-lg mt-4">
                    <h2 className="text-lg font-semibold">Teacher Performance</h2>
                    {/* Render performance evaluation and reviews */}
                </div>

                {/* Salary and Compensation */}
                <div className="border p-4 rounded-lg mt-4">
                    <h2 className="text-lg font-semibold">Salary and Compensation</h2>
                    {/* Render salary information and bonuses */}
                </div>
            </div>
        </AppLayout>
    );
}

