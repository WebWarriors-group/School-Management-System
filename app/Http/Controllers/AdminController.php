<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ActiveSession;

class AdminController extends Controller
{
    public function dashboard()
    {
        // return Inertia::render('Admin/AdminDashboard');

        // return Inertia::render('Admin/AdminDashboard', [
        //     'users' => User::select( 'id','name', 'email','password','role','created_at', 'updated_at')->get(),
        // ]);

        $users = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->get();

    // Fetch all active sessions along with the user data
    $activeSessions = ActiveSession::with('user')->whereNotNull('user_id')->get();

    return Inertia::render('Admin/AdminDashboard', [
        'users' => $users,
        'activeSessions' => $activeSessions,
    ]);
    }

    public function show()
    {
    //     $activeSessions = ActiveSession::with('user')->whereNotNull('user_id')->get();

    // return Inertia::render('Admin/AdminDashboard', [
    //     'activeSessions' => $activeSessions
   
    }
}

