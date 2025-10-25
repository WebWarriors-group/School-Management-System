<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
    
    public function create(Request $request, ?string $student = null): Response
    {
        if (!$student){
            return Inertia::render('auth/login', [
                'canResetPassword' => Route::has('password.request'),
                'status' => $request->session()->get('status'),
            ]);
        }
        return Inertia::render('auth/login_student', [
            'status' => $request->session()->get('status'),
        ]);
    }

    
    public function store(LoginRequest $request, ?string $student = null): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();
        $user = Auth::user();

        
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        } elseif ($user->role === 'teacher') {
            return redirect()->route('teacher.dashboard');
        } elseif ($user->role === 'student') {
            return redirect()->route('student.dashboard');
        }
        return redirect()->route('homepage');
    }

    public function googleLoginStore(Request $request): RedirectResponse
    {
        $user = User::where('email', $request->email)->first();

        if($user){

            Auth::login($user);
            $request->session()->regenerate();

           
            if ($user->role === 'admin') {
                return redirect()->route('admin.dashboard');
            } elseif ($user->role === 'teacher') {
                return redirect()->route('teacher.dashboard');
            } elseif ($user->role === 'student') {
                return redirect()->route('student.dashboard');
            }
            return redirect()->route('homepage');
        }
        else {
            return redirect()->route('/');
        }
    }

   
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        cookie()->queue(cookie()->forget('laravel_session'));

        return redirect('/');
    }
}
