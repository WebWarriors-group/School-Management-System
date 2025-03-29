<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    public function dashboard()
    {
        // return Inertia::render('Admin/AdminDashboard');

        return Inertia::render('Admin/AdminDashboard', [
            'users' => User::select( 'id','name', 'email','password','role','created_at', 'updated_at')->get(),
        ]);
    }

    public function handbook()
    {
        return Inertia::render('Admin/');
    }
}

