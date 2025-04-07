import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import 'font-awesome/css/font-awesome.min.css';
import { Users } from 'lucide-react';
import Mangement from '@/pages/Admin/userManagement';
import React, { useState } from "react";
import UserRolesPieChart from '@/components/PieChart';


const stats = [
    { icon: <Users className="h-6 w-6 text-blue-500" /> },
    { icon: <Users className="h-6 w-6 text-green-500" /> },
    { icon: <Users className="h-6 w-6 text-red-500" /> },
    { icon: <Users className="h-6 w-6 text-yellow-500" /> },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/',
    },
];

export default function Posts() {
    const { users, activeSessions, roleCounts, totalUserCount, teacherCount, studentCount } = usePage<{
        users: {
            data: { id: number; name: string; email: string; role: string; password: string; created_at: string; updated_at: string }[];
            current_page: number;
            last_page: number;
        };
        activeSessions: {
            id: number;
            user_id: number;
            ip_address: string;
            user_agent: string;
            payload: string;
            last_activity: number;
            user: { name: String; email: string };
        }[];

        roleCounts: {
            admin: number;
            teacher: number;
            student: number;
        };
        totalUserCount: number;
        teacherCount: number;
        studentCount: number;
    }>().props;

    const secondRoleCountsData = {
        teacher: teacherCount,
        student: studentCount,
    };

    const goToPage = (page: number) => {
        const currentScrollPosition = window.scrollY;

        router.get(
            `/admin/usermanage`,
            { page },
            {
                preserveState: true,
                preserveScroll: true, // This ensures the scroll position is maintained
                onSuccess: () => {
                    window.scrollTo(0, currentScrollPosition); // Restore the scroll position after loading
                },
            },
        );
    };
const[isVisible,setIsVisible]=useState(false);
const handleClick =()=>{
   setIsVisible(true);
}


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin" />

            <header className="sticky top-1 flex w-full items-center  border-b bg-white p-4 shadow-sm">
                {/* <h5 className="text-maroon text-xl ">Admin dashboard</h5> */}
                

               
                    <button className="cursor-pointer text-[18px] "  onClick={handleClick}>
                     <p>    <i className="fa fa-user"></i> User</p>
                    </button>
                   
                
            </header>
            {!isVisible ? (
            <>
            <main className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="mt-9 mr-5 mb-9 ml-5 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-2xl border-t-4 border-green-500 bg-white p-6 shadow">
                        <h3 className="text-muted-foreground text-lg">Registerd Users</h3>

                        <p className="mt-2 text-2xl font-bold text-black">{totalUserCount}</p>
                    </div>
                    <div className="rounded-2xl border-t-4 border-red-500 bg-white p-6 shadow">
                        <h3 className="text-muted-foreground text-lg">Total Members</h3>

                        <p className="mt-2 text-2xl font-bold text-black">{teacherCount + studentCount}</p>
                    </div>
                    <div className="rounded-2xl border-t-4 border-blue-500 bg-white p-6 shadow">
                        <h3 className="text-muted-foreground text-lg">Active Sessions</h3>

                        <p className="mt-2 text-2xl text-black">{activeSessions?.length || 0}</p>
                    </div>
                    <div className="rounded-2xl border-t-4 border-yellow-500 bg-white p-6 shadow">
                        <h3 className="text-muted-foreground text-lg">Dissabled Accounts</h3>

                        <p className="mt-2 text-2xl text-black">{activeSessions?.length || 0}</p>
                    </div>

                    <div className="rounded-2xl border-t-4 border-yellow-500 bg-white p-6 shadow">
                        <h3 className="text-muted-foreground text-lg">UnRegistered Users</h3>

                        <p className="mt-2 text-2xl text-black">{teacherCount + studentCount-totalUserCount}</p>
                    </div>
                    <div className="rounded-2xl border-t-4 border-purple-500 bg-white p-6 shadow">
                        <h3 className="text-muted-foreground text-lg">Today Logged In Users</h3>

                        <p className="mt-2 text-2xl text-black">{activeSessions?.length || 0}</p>
                    </div>
                    <div className="rounded-2xl border-t-4 border-yellow-500 bg-white p-6 shadow">
                        <h3 className="text-muted-foreground text-lg">Deleted Accounts</h3>

                        <p className="mt-2 text-2xl text-black">{activeSessions?.length || 0}</p>
                    </div>
                    
                </div>

                <div className="grid grid-cols-1 gap-7 md:grid-cols- mt-[-15px] shadow-lg w-0 ">
                    
                        <UserRolesPieChart roleCounts={roleCounts} secondRoleCounts={secondRoleCountsData} />
                   
                </div>

                 {/* <UserRolesPieChart roleCounts={roleCounts}  secondRoleCounts={secondRoleCountsData}/>   */}

                <div className="mt-10 flex flex-col gap-6 rounded-xl bg-white p-6 text-black shadow-lg">
                    <h3 className="text-lg font-bold text-[#004953]">All Users Records </h3>

                    <table className="w-full border-collapse rounded-lg bg-white text-black shadow-sm">
                        <thead>
                            <tr className="border-b bg-gray-100 text-gray-800">
                                {['Email', 'Name', 'Role', 'Create_at', 'Updated_at'].map((header) => (
                                    <th key={header} className="border p-3 text-left">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users?.data?.length > 0 ? ( // Optional chaining prevents the error when posts is undefined or null
                                users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.role}</td>

                                        <td className="border px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                                        <td className="border px-4 py-2">{new Date(user.updated_at).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-4 text-center text-gray-500">
                                        No posts available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between">
                        <button
                            disabled={users.current_page === 1}
                            onClick={() => goToPage(users.current_page - 1)}
                            className="rounded-xl bg-[maroon] px-3 py-2 text-[white] hover:cursor-pointer"
                        >
                            Previous
                        </button>
                        <span>
                            {users.current_page} of {users.last_page}
                        </span>
                        <button
                            disabled={users.current_page === users.last_page}
                            onClick={() => goToPage(users.current_page + 1)}
                            className="rounded-xl bg-[maroon] px-3 py-2 text-[white] hover:cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-6 rounded-xl bg-white p-6 text-black shadow-lg">
                    <h3 className="text-lg font-bold text-[#800000]">Active users Records</h3>
                    <table className="w-full border-collapse rounded-lg bg-white text-black shadow-sm">
                        <thead>
                            <tr className="border-b bg-gray-100 text-gray-800">
                                {['Username', 'Email', 'IPAddress', 'UserAgent', 'Last Activity', 'Status'].map((header) => (
                                    <th key={header} className="border p-3 text-left">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {activeSessions?.length > 0 ? ( // Optional chaining prevents the error when posts is undefined or null
                                activeSessions.map((session) => (
                                    <tr key={session.id} className="hover:bg-gray-50">
                                        {/* <td className="border px-4 py-2">
                                       {post.picture ? <img src={post.picture} alt="Post" className="h-16 w-16 rounded object-cover" /> : 'No Image'}
                                   </td> */}
                                        {/* <td className="border px-4 py-2">{session.id}</td> */}
                                        <td className="border px-4 py-2">{session.user.name}</td>
                                        <td className="border px-4 py-2">{session.user.email}</td>
                                        <td className="border px-4 py-2">{session.ip_address}</td>
                                        <td className="border px-4 py-2">{session.user_agent}</td>
                                        <td className="border px-4 py-2">{new Date(session.last_activity * 1000).toLocaleString()}</td>

                                        <td className="border px-4 py-2 text-center">
                                            <button className="h-[30px] w-[100px] rounded-2xl bg-green-100 text-[green]">active</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-4 text-center text-gray-500">
                                        No posts available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            </>
      ) : (
        <Mangement />
      )}


        </AppLayout>
    );
}
