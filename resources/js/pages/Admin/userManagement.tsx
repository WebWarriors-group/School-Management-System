import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Register from '@/pages/auth/register';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, router, usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface PageProps {
    auth: {
        user: User | null; 
    };
}

interface UserPageProps extends PageProps {
    users: {
        data: (User & {
            password: string;
            created_at: string;
            updated_at: string;
        })[];
        current_page: number;
        last_page: number;
    };
}

interface Post {
    file?: File;
}

interface Props {
    post?: Post | null;
}

export default function Management({ post }: Props) {
    const { users } = usePage<UserPageProps>().props;

    const [showRegister, setShowRegister] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

   
    const handleAddUser = () => {
        setEditingUser(null);
        setShowRegister(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setShowRegister(true);
    };

    const handleDelete = (id: number) => {
        router.delete(`/admin/usermanage/${id}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => toast.success('User has been deleted successfully!'),
            onError: () => {
                toast.error('User record failed to delete!');
                console.error('Failed to delete user.');
            },
        });
    };

   
    const goToPage = (page: number) => {
        const scrollPos = window.scrollY;
        router.get('/admin/usermanage', { page }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => window.scrollTo(0, scrollPos),
        });
    };

    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleImportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        router.post('/admin/import', formData, {
            onSuccess: () => {
                toast.success('Users imported successfully!');
                router.reload();
            },
            onError: (errors: any) => {
                console.error(errors);
                toast.error('Failed to import users.');
            },
        });

        setSelectedFile(null);
        (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';
        setIsImportOpen(false);
    };

    return (
        <div>
            <Head title="Admin" />
            <Toaster position="top-right" richColors closeButton />

            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                {}
                <div className="flex items-center gap-2 mt-10">
                    <Button onClick={() => setIsFilterOpen(true)} className="bg-green-800 text-white hover:bg-blue-800">
                        Filter
                    </Button>
                    <Button onClick={() => setIsImportOpen(true)} className="bg-purple-800 text-white">
                        Import Users
                    </Button>

                    {isImportOpen && (
                        <form onSubmit={handleImportSubmit} encType="multipart/form-data">
                            <Card className="absolute w-fit px-5 py-6 ml-20 shadow-md rounded-xl bg-white top-[120px] left-[80px]">
                                <Button
                                    className="absolute bg-red-200 text-red-600 px-3 py-1 hover:text-white"
                                    onClick={() => setIsImportOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="w-full text-gray-700 mb-4"
                                    accept=".xlsx,.xls"
                                />

                                <Button type="submit" className="bg-green-100 text-green-600 w-full px-3 py-2">
                                    Import
                                </Button>
                            </Card>
                        </form>
                    )}

                    {isFilterOpen && (
                        <Card className="absolute w-fit px-8 py-6 ml-20 shadow-md rounded-xl bg-white">
                            <Button
                                onClick={() => setIsFilterOpen(false)}
                                className="absolute top-1 right-2 text-red-600 bg-red-100 hover:bg-red-200 rounded-md px-3 focus:ring-2 focus:ring-red-300"
                                variant="ghost"
                            >
                                X
                            </Button>

                            <div className="flex items-center gap-4 mt-4">
                                <Select>
                                    <SelectTrigger className="rounded-md border border-gray-300 px-4 py-2 w-40">
                                        <SelectValue placeholder="Filter By" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="role">Role</SelectItem>
                                        <SelectItem value="name">Name</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="text-green-700 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-md">
                                    Search
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Users Table */}
                <div className="mt-3 flex flex-col gap-6 rounded-xl bg-white p-6 text-black shadow-lg">
                    <h3 className="text-lg font-bold text-[#004953]">Users</h3>

                    <Button
                        className="absolute ml-240 shadow-md text-white text-[16px] bg-gradient-to-r from-blue-700 to-purple-700 hover:bg-green-200 rounded-md px-3 py-1 focus:ring-2 focus:ring-green-400 w-40 h-11 border-4 border-white"
                        onClick={handleAddUser}
                    >
                        + Add New User
                    </Button>

                    {showRegister && (
                        <div className="absolute mt-[-200px] ml-[300px]">
                            <Register user={editingUser} setShowRegister={setShowRegister} />
                        </div>
                    )}

                    <table className="w-full border-collapse rounded-lg bg-white text-black shadow-sm">
                        <thead>
                            <tr className="border-b bg-gray-100 text-gray-800">
                                {['Email', 'Name', 'Role', 'Created At', 'Updated At', 'Delete', 'Edit'].map(header => (
                                    <th key={header} className="border p-3 text-left">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users?.data?.length ? (
                                users.data.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.role}</td>
                                        <td className="border px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                                        <td className="border px-4 py-2">{new Date(user.updated_at).toLocaleString()}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <button className="hover:cursor-pointer" onClick={() => handleDelete(user.id)}>🗑</button>
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
                                    <td colSpan={7} className="py-4 text-center text-gray-500">
                                        No users available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {}
                    {users.current_page && users.last_page && (
                        <div className="flex justify-between mt-4">
                            <button
                                disabled={users.current_page === 1}
                                onClick={() => goToPage(users.current_page - 1)}
                                className="rounded-xl bg-maroon px-3 py-2 text-white hover:cursor-pointer"
                            >
                                Previous
                            </button>
                            <span>{users.current_page} of {users.last_page}</span>
                            <button
                                disabled={users.current_page === users.last_page}
                                onClick={() => goToPage(users.current_page + 1)}
                                className="rounded-xl bg-maroon px-3 py-2 text-white hover:cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
