import AppLayout from "@/layouts/app-layout";
import { toast, Toaster } from 'sonner';
import { Head, usePage, router,Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import Register from '@/pages/auth/register';

interface User {
    id: number;
    name: string;
    
    email: string;
    role: string;
    // password:string
    
}

export default function Mangement() {
    const { users} = usePage<{
        users: { data:{id: number; name: string; email: string; role: string; password: string; created_at: string; updated_at: string ;}[];
    current_page:number;last_page:number;
    };
        
        
       
    }>().props;

const[showRegister,setShowRegister]=useState(false);
const[editingUser,setEditingUser]=useState<User | null>(null);

const handleAddUser = () => {
    setEditingUser(null); // Reset the editing user to null for creating a new user
    setShowRegister(true);
};


const handleEditUser = (user: User) => {
    setEditingUser(user); // Set the user data to be edited
    setShowRegister(true);
};
    const handleDelete = (id: number) => {
            router.delete(`/posts/${id}`, {

                preserveScroll: true, // Prevents page from scrolling to the top
                preserveState: true,
                onSuccess: () => {
                      toast.success('User has been deleted successfully!'); 
                   
               },
               onError: () => {
                  toast.error('User record failed to delete!');
                   console.error('Failed to delete post.');
               },
        });
     };

     const goToPage=(page:number)=>{

        const currentScrollPosition = window.scrollY;
        
            router.get(`/admin/usermanage`, { page }, {
                preserveState: true,
                preserveScroll: true, // This ensures the scroll position is maintained
                onSuccess: () => {
                    window.scrollTo(0, currentScrollPosition); // Restore the scroll position after loading
                }
            });
     }


    

    return (
        <div >
            <Head title="Admin" />
             <Toaster position="top-right" richColors closeButton /> 
           
       
        

            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                


               
                <div className="mt-3 flex flex-col gap-6 rounded-xl bg-white p-6 text-black shadow-lg">
                    <h3 className="text-lg font-bold text-[#004953]">Users</h3>
                    <Link 
                href="#" 
                className="absolute ml-240 bg-[blue] text-[white] py-2 px-7 rounded-lg"
                onClick={(e) => {
                    e.preventDefault();
                    handleAddUser();
                }}
            >
                + Add New User
            </Link>
            {showRegister && (
                <div className="absolute mt-[-200px] ml-[300px] ">
                    <Register user={editingUser} setShowRegister={setShowRegister} />
                </div>
            )}
                    <table className="w-full border-collapse rounded-lg bg-white text-black shadow-sm">
                        <thead>
                            <tr className="border-b bg-gray-100 text-gray-800">
                                {[ 'Email', 'Name', 'Role', 'Create_at', 'Updated_at','Delete','Edit'].map((header) => (
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
                                        {/* <td className="border px-4 py-2">
                                       {post.picture ? <img src={post.picture} alt="Post" className="h-16 w-16 rounded object-cover" /> : 'No Image'}
                                   </td> */}
                                        
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.role}</td>

                                        <td className="border px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                                        <td className="border px-4 py-2">{new Date(user.updated_at).toLocaleString()}</td>

                                         <td className="border px-4 py-2 text-center">
                                           
                                         
                                         <button className="hover:cursor-pointer" onClick={() => handleDelete(user.id)}>🗑</button> 
                                        </td> 

                                        <td className="border px-4 py-2 text-center">
                                        
                                         <button className="hover:cursor-pointer" onClick={() => handleEditUser(user)}><FontAwesomeIcon icon={faPenToSquare} /></button> 
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


                    {/* Pagination Controls */}
                    {users && users.current_page && users.last_page ? (
  <div className='flex justify-between'>
    <button
      disabled={users.current_page === 1}
      onClick={() => goToPage(users.current_page - 1)}
      className="bg-[maroon] px-3 py-2 rounded-xl text-[white] hover:cursor-pointer "
    >
      Previous
    </button>
    <span>{users.current_page} of {users.last_page}</span>
    <button
      disabled={users.current_page === users.last_page}
      onClick={() => goToPage(users.current_page + 1)}
      className="bg-[maroon] px-3 py-2 rounded-xl text-[white] hover:cursor-pointer "
    >
      Next
    </button>
  </div>
) : (
  <p>Loading users...</p>
)}
           
        </div>
                

              
            </main>
        </div>
    );
}
