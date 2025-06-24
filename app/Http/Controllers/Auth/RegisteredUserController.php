<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Mail\WelcomeMail; // ✅ make sure you have this

class RegisteredUserController extends Controller
{
    /**
     * Show user creation form
     */
    public function create(): Response
    {
        return Inertia::render('Admin/userManagement');
    }

    /**
     * Store a new user by admin
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'role' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

       
        $password = $request->password;

       

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($password),
        ]);
\Log::info('Before mail send');
Mail::to($user->email)->send(new WelcomeMail($user));
\Log::info('After mail send');
        return route();
    }
}
