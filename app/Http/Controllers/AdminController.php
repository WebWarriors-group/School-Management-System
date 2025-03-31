<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ActiveSession;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function dashboard()
    {
        $adminCount = User::where('role', 'admin')->count();
    $teacherCount = User::where('role', 'teacher')->count();
    $studentCount = User::where('role', 'student')->count();
        
        $users = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->get();

        // Fetch only currently active sessions (active within the last 5 minutes)
        $activeSessions = ActiveSession::with('user')
            ->where('last_activity', '>=', Carbon::now('Asia/Colombo')->subMinutes(5)->timestamp) // Filter active sessions only
            ->whereNotNull('user_id')
            ->get();
    
        return Inertia::render('Admin/AdminDashboard', [
            'users' => $users,
            'activeSessions' => $activeSessions,
            'roleCounts' => [
            'admin' => $adminCount,
            'teacher' => $teacherCount,
            'student' => $studentCount,
        ],
        ]);
    }

   public function delete(int $id)
    {
        $user = User::findOrFail($id); // Assuming your 'id' column is an integer in the 'users' table
        $user->delete();
    }

    public function show()
    {
    //     $activeSessions = ActiveSession::with('user')->whereNotNull('user_id')->get();

    // return Inertia::render('Admin/AdminDashboard', [
    //     'activeSessions' => $activeSessions
    }
}

