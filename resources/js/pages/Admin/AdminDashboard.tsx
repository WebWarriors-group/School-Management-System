import { type NavItem } from '@/types';
import { BookOpen, Folder } from 'lucide-react';
import React from 'react';

import { Head, router, usePage } from '@inertiajs/react';


import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

// import { Toaster, toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'toggle screen',
        
        href: '/student',
    },

    
];

const AdminDashboard: React.FC = () => {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
         <Head title="AdminDashboard" />
        <div className="flex h-screen bg-white font-sans">
            {/* Sidebar */}

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Navbar */}
                <header className="flex items-center justify-between border-b bg-white p-4 shadow-sm">
                    <div className="text-maroon-700 text-xl font-semibold">Dashboard</div>
                    <div className="flex items-center gap-4">
                        <input type="text" placeholder="Search..." className="rounded-lg border px-3 py-1 text-sm" />
                        <div className="bg-maroon-700 cursor-pointer rounded-full px-3 py-1 text-white">Admin</div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="border-maroon-700 rounded-2xl border-t-4 bg-white p-6 shadow">
                            <h3 className="text-maroon-700 text-lg font-bold">Total Users</h3>
                            <p className="mt-2 text-3xl font-bold">1,250</p>
                        </div>
                        <div className="border-maroon-700 rounded-2xl border-t-4 bg-white p-6 shadow">
                            <h3 className="text-maroon-700 text-lg font-bold">Reports</h3>
                            <p className="mt-2 text-3xl font-bold">95</p>
                        </div>
                        <div className="border-maroon-700 rounded-2xl border-t-4 bg-white p-6 shadow">
                            <h3 className="text-maroon-700 text-lg font-bold">Active Sessions</h3>
                            <p className="mt-2 text-3xl font-bold">324</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-maroon-700 mb-4 text-2xl font-semibold">Recent Activities</h2>
                        <div className="bg-white p-4">
                            <ul className="divide-y text-sm">
                                <li className="py-2">✅ User John added a new report</li>
                                <li className="py-2">📤 Backup completed successfully</li>
                                <li className="py-2">🛠 System settings updated</li>
                                <li className="py-2">🔐 Password changed by Admin</li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>

            {/* Custom Maroon Styling */}
            <style>{`
          .bg-maroon-700 { background-color: #800000; }
          .border-maroon-700 { border-color: #800000; }
          .text-maroon-700 { color: #800000; }
          .hover\:bg-maroon-600:hover { background-color: #990000; }
          .border-maroon-600 { border-color: #990000; }
        `}</style>
        </div>

        </AppLayout>
    );
};

export default AdminDashboard;
