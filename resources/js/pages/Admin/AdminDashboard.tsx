import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

export default function Posts() {
    const { users } = usePage<{
        users: { id: number; name: string; email: string; role: string; password: string; created_at: string; updated_at: string }[];
    }>().props;

    return (
        <AppLayout>
            <Head title="Admin" />
            {/* <Toaster position="top-right" richColors closeButton /> */}

            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border-t-4 border-[#800000] bg-white p-6 shadow">
                        <h3 className="text-lg font-bold text-[#800000]">Total Users</h3>
                        <p className="mt-2 text-3xl font-bold text-[#800000]">{users?.length}</p>
                    </div>
                    <div className="rounded-2xl border-t-4 border-[#4B371C] bg-white p-6 shadow">
                        <h3 className="text-lg font-bold text-[#4B371C]">Reports</h3>
                        <p className="mt-2 text-3xl font-bold text-[#4B371C]">95</p>
                    </div>
                    <div className="rounded-2xl border-t-4 border-[#004953] bg-white p-6 shadow">
                        <h3 className="text-lg font-bold text-[#004953]">Active Sessions</h3>
                        <p className="mt-2 text-3xl font-bold text-[#004953]">324</p>
                    </div>
                </div>

                 

                <div className="flex flex-col gap-6 rounded-xl bg-white p-6 text-black shadow-lg mt-10">
                    <table className="w-full border-collapse rounded-lg bg-white text-black shadow-sm">
                        <thead>
                            <tr className="border-b bg-gray-100 text-gray-800">
                                {['Id', 'Email', 'Name', 'Role', 'Create_at', 'Updated_at', 'Actions'].map((header) => (
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
                                          <button
                                            // onClick={() => handleDelete(post.id)}
                                            >
                                               🗑 
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
