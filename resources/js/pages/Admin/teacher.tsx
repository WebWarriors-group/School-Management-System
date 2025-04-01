import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },

    
];

export default function AdminTeacherDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-4 p-4">
                <h2 className="text-xl font-semibold">Teacher Management</h2>
                {/* <Link href="/add-teacher"> */}
                
                {/* Teacher List Overview */}
                <div className="border p-4 rounded-lg">
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                        <div className="border-red-900 rounded-2xl border-t-4 bg-white p-6 shadow">
                            <h3 className="text-maroon-700 text-lg font-bold">Total Teachers</h3>
                            <p className="mt-2 text-3xl font-bold">1,250</p>
                            <Link href="/teacher_details">
                            <button className="bg-red-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-black transition-all ml-auto block">
                                 Search Teacher
                            </button>
                            </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="border-red-900 rounded-2xl border-t-4 bg-white p-6 shadow">
                                    <h3 className="text-maroon-700 text-lg font-bold">Leave</h3>
                                    <p className="mt-2 text-3xl font-bold">95</p>
                                    <a href="">teacher list</a>
                                </div>
                                <div className="border-red-900 rounded-2xl border-t-4 bg-white p-6 shadow">
                                    <h3 className="text-maroon-700 text-lg font-bold">Active Teachers</h3>
                                    <p className="mt-2 text-3xl font-bold">324</p>
                                    <a href="">teacher list</a>
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

