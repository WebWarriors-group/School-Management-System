import UserRolesPieChart from '@/components/PieChart';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
 import { Toaster, toast } from 'sonner';
 import 'font-awesome/css/font-awesome.min.css';
 import { useState } from "react";


export default function Posts() {
    const { users, activeSessions, roleCounts} = usePage<{
        users: { id: number; name: string; email: string; role: string; password: string; created_at: string; updated_at: string }[];
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
    }>().props;

    const handleDelete = (id: number) => {
            router.delete(`/posts/${id}`, {

                preserveScroll: true, // Prevents page from scrolling to the top
                preserveState: true,
                onSuccess: () => {
                      toast.success('User has been deleted successfully!'); 
                    //router.reload();
                    //setPosts((prevPosts) => prevPosts.filter(user => user.id !== id));
               },
               onError: () => {
                  toast.error('User record failed to delete!');
                   console.error('Failed to delete post.');
               },
        });
     };

    return (
        <AppLayout>
            <Head title="Admin" />
             <Toaster position="top-right" richColors closeButton /> 
           
            <header className=" bg-white sticky top-1   w-full flex items-center justify-between border-b bg-white p-4 shadow-sm ">
 
                <h1 className=" text-maroon text-xl font-semibold">Admin Dashboard</h1>

                <Link href="/admin/userManagement" className="absolute right-[20px] text-[30px] text-[#000080] hover:cursor-pointer">
                    <button className="cursor-pointer">
                        + <i className="fa fa-user"></i>
                    </button>
                </Link>
      
            </header>
        

            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border-t-4 border-[#800000] bg-white p-6 shadow">
                        <h3 className="text-lg font-bold text-[#800000]">Registerd Users</h3>
                        <p className="mt-2 text-3xl font-bold text-[#800000]">{users?.length}</p>
                    </div>
                    <div className="rounded-2xl border-t-4 border-[green] bg-white p-6 shadow">
                        <h3 className="text-lg font-bold text-[green]">Total Members in School</h3>
                        <p className="mt-2 text-xl font-bold text-[green]">not defined</p>
                    </div>
                    <div className="rounded-2xl border-t-4 border-[purple] bg-white p-6 shadow">
                        <h3 className="text-lg font-bold text-[purple]">Active Sessions</h3>
                        <p className="mt-2 text-3xl font-bold text-[purple]">{activeSessions?.length || 0}</p>
                    </div>
                </div>

                <div className="mt-10 grid h-[400px] grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow md:grid-cols-1">
                 <UserRolesPieChart roleCounts={roleCounts} /> 
                 
                </div>
                <div className="mt-10 flex flex-col gap-6 rounded-xl bg-white p-6 text-black shadow-lg">
                    <h3 className="text-lg font-bold text-[#004953]">All Users Records </h3>
                    
                    <table className="w-full border-collapse rounded-lg bg-white text-black shadow-sm">
                        <thead>
                            <tr className="border-b bg-gray-100 text-gray-800">
                                {['Id', 'Email', 'Name', 'Role', 'Create_at', 'Updated_at', 'Action'].map((header) => (
                                    <th key={header} className="border p-3 text-left">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length > 0 ? ( // Optional chaining prevents the error when posts is undefined or null
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        {/* <td className="border px-4 py-2">
                                       {post.picture ? <img src={post.picture} alt="Post" className="h-16 w-16 rounded object-cover" /> : 'No Image'}
                                   </td> */}
                                        <td className="border px-4 py-2">{user.id}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.role}</td>

                                        <td className="border px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                                        <td className="border px-4 py-2">{new Date(user.updated_at).toLocaleString()}</td>

                                        <td className="border px-4 py-2 text-center">
                                           
                                        {/* <button
                                            onClick={() => handleDelete(post.id)}
                                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                        > */}
                                            <button  onClick={() => handleDelete(user.id)}>🗑</button>
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
                                        {/* <td className="border px-4 py-2">{session.user.name}</td>  */}

                                        {/* <td className="border px-4 py-2">{user.role}</td> */}
                                        {/* <td className="border px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                                        <td className="border px-4 py-2">{new Date(user.updated_at).toLocaleString()}</td> */}

                                        <td className="border px-4 py-2 text-center">
                                            <button
                                                className="h-[30px] w-[100px] rounded-2xl bg-green-100 text-[green]"
                                                // onClick={() => handleDelete(post.id)}
                                            >
                                                active
                                            </button>
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
        </AppLayout>
    );
}
