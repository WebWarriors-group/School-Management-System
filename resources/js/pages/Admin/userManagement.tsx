import { Head, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'toggle screen',
        
        href: '/student',
    },

    
];

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};


const UserManagement = () => {
    
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    
    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        toast.loading("Registering user...");
    
        try {
            const response = await fetch(route("register"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.dismiss();
                toast.success("User registered successfully! 🎉");
                reset("password", "password_confirmation");
            } else {
                toast.dismiss();
                Object.entries(result.errors || {}).forEach(([_, message]) => {
                    toast.error(message as string);
                });
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Something went wrong. Please try again.");
        }
    };
    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add users" />

            <header className=" bg-white sticky top-1   w-full flex items-center justify-between border-b bg-white p-4 shadow-sm ">
                <h2 className="text-xl font-semibold">User Management</h2>
            </header>

            <Toaster />

            <form className="flex flex-col px-10 py-5 gap-6 ml-[400px]" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            className="w-[300px]"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="off"
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
                            className="w-[300px]"
                            required
                            tabIndex={2}
                            autoComplete="off"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            className="w-[300px]"
                            required
                            tabIndex={3}
                            autoComplete="off"
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
                            className="w-[300px]"
                            required
                            tabIndex={4}
                            autoComplete="off"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="relative mt-4 w-full bg-red-100 text-red-900 transition-transform duration-300 hover:z-50 hover:scale-105 hover:bg-red-100 w-[300px]"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Add user
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
};

export default UserManagement;