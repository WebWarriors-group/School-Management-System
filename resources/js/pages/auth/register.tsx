

import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast, Toaster } from 'sonner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    // password: string;
}

interface RegisterProps {
    user: User | null; // Accepts either a User object or null
    setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

type RegisterForm = {
    name: string;
    email: string;
    role: string;
    password: string;
    password_confirmation: string;
};

export default function Register({ user, setShowRegister }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: user?.name || '', // Pre-fill form if editing
        email: user?.email || '',
        role: user?.role || '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (user) {
            // Edit existing user
            post(route('admin.update', user.id), {
                onFinish: () => {
                    reset('password', 'password_confirmation');
                    setShowRegister(false); // Close the form after submission
                },
            });
        } else {
            // Create new user
            post(route('admin.register'), {
                preserveState: true,
                onFinish: () => {
                    reset('password', 'password_confirmation');
                    setShowRegister(false); // Close the form after submission
                },
                onSuccess: () => {
                                      toast.success('User has been added successfully!'); 
                                   
                               },
            });
        }
    };

    return (
       <div className="bg-blue-100">
<Button 
                            type="button" 
                            className=" absolute bg-red-700 rounded-full text-white ml-[330px] mt-3 text-lg px-6 hover:cursor-pointer hover:bg-red-100 cursor-[pointer] hover:text-red-500"
                            onClick={() => setShowRegister(false)}
                        >
                        X
                        </Button>
            <Head title={user ? 'Edit User' : 'Register'} />
            <form className="flex flex-col gap-6 bg-white z-51 w-110 px-10 mt-27 py-10 shadow-2xl" onSubmit={submit}>
                <div className="grid gap-6 bg-white">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                            id="role"
                            type="text"
                            required
                            autoFocus
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            disabled={processing}
                            placeholder="enter role"
                        />
                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required={!user} // If editing, password is not required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required={!user} // If editing, confirmation is not required
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 rounded-full w-full text-white bg-green-900 hover:cursor-[pointer] " disabled={processing}>
                        {user ? 'Update User' : 'Add User'}
                    </Button>

                   
                </div>
            </form>
            </div>
    );
}
