<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Teacher;
use App\Models\StudentAcademic;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;




use App\Models\ActiveSession;
use Carbon\Carbon;

class AdminController extends Controller
{
public function dashboard(){

    return Inertia::render('Admin/dashboard');
}


    public function dashboard1()
    {
        $adminCount = User::where('role', 'admin')->count();
        $teacherCount = User::where('role', 'teacher')->count();
        $studentCount = User::where('role', 'student')->count();
        $users = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->paginate(5);
        $totalUserCount = User::count();
        $teacherCount1 = Teacher::count();
        $studentCount1 = StudentAcademic::count();
        // Fetch only currently active sessions (active within the last 5 minutes)
        $activeSessions = ActiveSession::with('user')
            ->where('last_activity', '>=', Carbon::now('Asia/Colombo')->subMinutes(5)->timestamp) // Filter active sessions only
            ->whereNotNull('user_id')
            ->get();

        return Inertia::render('Admin/AdminDashboard', [
             'users' => $users,
            'totalUserCount' => $totalUserCount,
            'teacherCount' => $teacherCount1,
            'studentCount' =>$studentCount1 ,
            'activeSessions' => $activeSessions,
            'roleCounts' => [
                'admin' => $adminCount,
                'teacher' => $teacherCount,
                'student' => $studentCount,
            ],
        ]);
    }

    public function show(){
        $users = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->paginate(8);

       return Inertia::render('Admin/userManagement', [
            'users' => $users,
            
        ],
       );
}

public function register(Request $request){
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        'role' => 'required|string|max:255',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'role' => $request->role,
        'password' => Hash::make($request->password),
    ]);

    // event(new Registered($user));

    
     

}

    public function delete(int $id)
    {
        $user = User::findOrFail($id); // Assuming your 'id' column is an integer in the 'users' table
        $user->delete();
    }

}
