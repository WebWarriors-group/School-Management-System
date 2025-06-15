<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;

class ActiveSessionController extends Controller
{
    public function loginRedirection()
    {
        if (!Auth::check()) {
            return Inertia::location(route('login'));
        }

        $user = Auth::user();
        $route = match($user->role) {
            'admin' => route('admin.dashboard'),
            'teacher' => route('teacher.dashboard'),
            'student' => route('student.dashboard'),
            default => route('homepage'),
        };

        return Inertia::location($route);
    }
}
