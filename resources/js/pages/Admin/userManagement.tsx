import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Register from '@/pages/auth/register';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link, router, usePage , useForm} from '@inertiajs/react';

import { toast, Toaster } from 'sonner';

import { FormEventHandler } from 'react';


import { Input } from '@/components/ui/input';

import { useEffect, useRef, useState } from 'react';

// import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
    id: number;
    name: string;

    email: string;
    role: string;
    // password:string
}

interface Post {
    // Optional post ID (only exists when editing).
    
    file?: File; // Optional picture URL.
}
interface Props {
    // isOpen: boolean; // Controls if the modal is open or closed.
    // closeModal: () => void; // Function to close the modal.
    post?: Post | null; // Optional post data (used for editing).
}


// type RegisterForm = {
//     profile_picture?: File | null;
// }

export default function Mangement({  post }: Props) {

    
      
    const { users } = usePage<{
        users: {
            data: { id: number; name: string; email: string; role: string; password: string; created_at: string; updated_at: string }[];
            current_page: number;
            last_page: number;
        };
    }>().props;

    const [showRegister, setShowRegister] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const[isOpen,setIsOpen]= useState(false);
    const[isImport,setIsImport]= useState(false);
   


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

    const openbox=()=>{
setIsOpen(true)
    }

    const close=()=>{
        setIsOpen(false);
    }
   
    const closed=()=>{
        setIsImport(false);
    }
   

    
   
    
    const Import=()=>{
          setIsImport(true);
    }
        
    const [formData, setFormData] = useState<Post>({});
      
      
       const [selectedFile, setSelectedFile] = useState<File | null>(null);
   
      
       const [preview, setPreview] = useState<string>('');
   
       
    
   
       
       const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file); // Set the selected file
            setPreview(URL.createObjectURL(file)); // Generate preview URL
        }
       };
   
      
       const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        if (selectedFile) {
            data.append('file', selectedFile); // <-- match this with Laravel field name
        }
    
        router.post('/admin/import', data, {
            onSuccess: () => {
                toast.success('Post created successfully!');
                router.reload();
            },
            onError: (errors: any) => {
                console.error(errors);
                toast.error('Failed to submit post.');
            },
        });

        setSelectedFile(null);  // Clear selected file state
    (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';
       };
   

    return (
        <div>
            <Head title="Admin" />
            <Toaster position="top-right" richColors closeButton />

            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <div className="flex items-center gap-2 mt-10"  >
                    <Button  onClick={openbox} className="bg-green-800 text-white hover:bg-blue-800">Filter</Button>
                    <Button  onClick={Import} className="bg-purple-800 text-white ">Import Users</Button>

                   {isImport &&(
                    
                     <form  onSubmit={handleSubmit}  encType="multipart/form-data">
                     <Card className=" absolute  w-fit px-5 py-6 ml-20 shadow-md rounded-xl bg-white top-[120px] left-[80px]">
                     <Button  className=" absolute bg-red-200 text-[red-600] w-14 left-35 top-21 px-10 hover:text-[white]" onClick={closed} >cancel</Button>
                     
                     <input type="file" name="file" onChange={handleFileChange} className="w-full text-gray-700" accept=".xlsx,.xls" />

                             
                         
                         <Button  className="bg-green-100 text-[green] w-14 px-13" type='submit'>Import</Button>
                         </Card>
                         
                    
                 </form>
                   )
                   
                   }
{isOpen && (
                    <Card className=" absolute  w-fit px-8 py-6 ml-20 shadow-md rounded-xl bg-white">
                    {/* Close Button */}
                    <Button onClick={close}
                      className="absolute top-1 right-2 text-red-600 bg-red-100 hover:bg-red-200 rounded-md px-3  focus:ring-2 focus:ring-red-300"
                      variant="ghost"
                    >
                      X
                    </Button>
                  
                    {/* Content Section */}
                    <div className="flex items-center gap-4 mt-4">
                      {/* Filter Select */}
                      <Select>
                        <SelectTrigger className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 w-40">
                          <SelectValue placeholder="Filter By" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reg001">Admin</SelectItem>
                          <SelectItem value="reg002">Email</SelectItem>
                          <SelectItem value="reg005">Role</SelectItem>
                          <SelectItem value="reg003">Name</SelectItem>
                          {/* Add more items here */}
                        </SelectContent>
                      </Select>
                  
                      {/* Search Button */}
                      <Button className="text-green-700 bg-green-100 hover:bg-green-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-400">
                        Search
                      </Button>
                    </div>
                  </Card>
                  
                  
)}
                </div>

                <div className="mt-3 flex flex-col gap-6 rounded-xl bg-white p-6 text-black shadow-lg">
                    <h3 className="text-lg font-bold text-[#004953]">Users</h3>
                    <Link
                        href="#"
                        className="absolute ml-240 rounded-lg bg-[blue] px-7 py-2 text-[white]"
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddUser();
                        }}
                    >
                        + Add New User
                    </Link>
                    {showRegister && (
                        <div className="absolute mt-[-200px] ml-[300px]">
                            <Register user={editingUser} setShowRegister={setShowRegister} />
                        </div>
                    )}
                    <table className="w-full border-collapse rounded-lg bg-white text-black shadow-sm">
                        <thead>
                            <tr className="border-b bg-gray-100 text-gray-800">
                                {['Email', 'Name', 'Role', 'Create_at', 'Updated_at', 'Delete', 'Edit'].map((header) => (
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
                                            <button className="hover:cursor-pointer" onClick={() => handleDelete(user.id)}>
                                                🗑
                                            </button>
                                        </td>

                                        <td className="border px-4 py-2 text-center">
                                            <button className="hover:cursor-pointer" onClick={() => handleEditUser(user)}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
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

                    {/* Pagination Controls */}
                    {users && users.current_page && users.last_page ? (
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
                    ) : (
                        <p>Loading users...</p>
                    )}
                </div>
            </main>
        </div>
    );
}
