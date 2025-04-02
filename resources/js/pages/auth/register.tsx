// import { Head, useForm } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
// import { FormEventHandler } from 'react';

// import InputError from '@/components/input-error';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AuthLayout from '@/layouts/auth-layout';

// interface RegisterProps {
//     user: User | null;  // Accepts either a User object or null
//     setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
// }

// type RegisterForm = {
//     name: string;
//     email: string;
//     password: string;
//     password_confirmation: string;
// };

// export default function Register({ user, setShowRegister }: RegisterProps) {
//     const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();
//         post(route('register'), {
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };

//     return (
//         <AuthLayout title="Create an account" description="Enter the details below to create new account">
//             <Head title="Register" />
//             <form className="flex flex-col gap-6" onSubmit={submit}>
//                 <div className="grid gap-6">
//                     <div className="grid gap-2">
//                         <Label htmlFor="name">Name</Label>
//                         <Input
//                             id="name"
//                             type="text"
//                             required
//                             autoFocus
//                             tabIndex={1}
//                             autoComplete="name"
//                             value={data.name}
//                             onChange={(e) => setData('name', e.target.value)}
//                             disabled={processing}
//                             placeholder="Full name"
//                         />
//                         <InputError message={errors.name} className="mt-2" />
//                     </div>

//                     <div className="grid gap-2">
//                         <Label htmlFor="email">Email address</Label>
//                         <Input
//                             id="email"
//                             type="email"
//                             required
//                             tabIndex={2}
//                             autoComplete="email"
//                             value={data.email}
//                             onChange={(e) => setData('email', e.target.value)}
//                             disabled={processing}
//                             placeholder="email@example.com"
//                         />
//                         <InputError message={errors.email} />
//                     </div>

//                     <div className="grid gap-2">
//                         <Label htmlFor="password">Password</Label>
//                         <Input
//                             id="password"
//                             type="password"
//                             required
//                             tabIndex={3}
//                             autoComplete="new-password"
//                             value={data.password}
//                             onChange={(e) => setData('password', e.target.value)}
//                             disabled={processing}
//                             placeholder="Password"
//                         />
//                         <InputError message={errors.password} />
//                     </div>

//                     <div className="grid gap-2">
//                         <Label htmlFor="password_confirmation">Confirm password</Label>
//                         <Input
//                             id="password_confirmation"
//                             type="password"
//                             required
//                             tabIndex={4}
//                             autoComplete="new-password"
//                             value={data.password_confirmation}
//                             onChange={(e) => setData('password_confirmation', e.target.value)}
//                             disabled={processing}
//                             placeholder="Confirm password"
//                         />
//                         <InputError message={errors.password_confirmation} />
//                     </div>

//                     <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
//                         {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
//                         Add user
//                     </Button>
//                 </div>

//                 {/* <div className="text-muted-foreground text-center text-sm">
//                     Already have an account?{' '}
//                     <TextLink href={route('login')} tabIndex={6}>
//                         Log in
//                     </TextLink>
//                 </div> */}
//             </form>
//         </AuthLayout>
//     );
// }

import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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
}

interface RegisterProps {
    user: User | null; // Accepts either a User object or null
    setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register({ user, setShowRegister }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: user?.name || '', // Pre-fill form if editing
        email: user?.email || '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (user) {
            // Edit existing user
            post(route('users.update', user.id), {
                onFinish: () => {
                    reset('password', 'password_confirmation');
                    setShowRegister(false); // Close the form after submission
                },
            });
        } else {
            // Create new user
            post(route('register'), {
                onFinish: () => {
                    reset('password', 'password_confirmation');
                    setShowRegister(false); // Close the form after submission
                },
            });
        }
    };

    return (
        <AuthLayout title={user ? 'Edit User' : 'Create an account'} description="Enter the details below">

<Button 
                            type="button" 
                            className=" absolute bg-red-800 text-white ml-[330px] mt-[-10px] text-lg px-6 hover:cursor-pointer hover:bg-blue-800"
                            onClick={() => setShowRegister(false)}
                        >
                          X
                        </Button>
            <Head title={user ? 'Edit User' : 'Register'} />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
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

                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {user ? 'Update User' : 'Add User'}
                    </Button>

                   
                </div>
            </form>
        </AuthLayout>
    );
}
