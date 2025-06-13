<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Img;
use App\Models\Teacher;
use App\Models\Subject;
use App\Models\ClassModel;
use App\Models\StudentAcademic;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Models\ActiveSession;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function dashboard()
    {
   $teacher = Teacher::count();
   $subject = Subject::count();
   $student = StudentAcademic::count();
   $student1 = StudentAcademic::select('class_id','reg_no')->get();
   $class = ClassModel::count();
    $classData = ClassModel::withCount('studentacademics')->with('studentacademics')->get();
   
$images=Img::all();


   $teacherupdate=Teacher::latest('updated_at')->value('updated_at');
   $studentupdate=StudentAcademic::latest('updated_at')->value('updated_at');
    
   $classupdate=ClassModel::latest('updated_at')->value('updated_at');
    $classes = ClassModel::select('class_id', 'grade', 'section', 'teacher_NIC','class_name')
        ->get()
        ->groupBy('class_name') 
        ->map->groupBy('grade');  

    $teachers = Teacher::select('teacher_NIC')->get();

   $studentDeleted = StudentAcademic::onlyTrashed()
        ->latest('deleted_at')
        ->value('deleted_at');
$teacherDeleted = Teacher::onlyTrashed()
        ->latest('deleted_at')
        ->value('deleted_at');
$classDeleted = ClassModel::onlyTrashed()
        ->latest('deleted_at')
        ->value('deleted_at');


   $classFooter = 'Last updated ' . Carbon::parse(max($classupdate,$classDeleted))->diffForHumans();
   $teacherFooter = 'Last updated ' . Carbon::parse(max($teacherupdate,$teacherDeleted))->diffForHumans();
  $studentActivity ='Last updated '. Carbon::parse(max($studentupdate, $studentDeleted))->diffForHumans();

        return Inertia::render('Admin/Dashboardoverview',['teachers' => $teacher,
    'students'=> $student,
'class1'=>$class,
'classfooter'=>$classFooter,
'teacherfooter'=>$teacherFooter,
'studentfooter'=>$studentActivity,

'subject'=>$subject,
 'classData' => [
            'data' => $classData,
        ],
        'classes' => $classes,
        'teacher12' => $teachers,
        'student1'=>[
            'data1'=>$student1],
            'img'=>[
                'data'=>$images,
            ]
]);
    }


    public function user()
    {
        $adminCount = User::where('role', 'admin')->count();
        $teacherCount = User::where('role', 'teacher')->count();
        $studentCount = User::where('role', 'student')->count();
        $users = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->paginate(8);
        $totalUserCount = User::count();
        $teacherCount1 = Teacher::count();
        $studentCount1 = StudentAcademic::count();
        // Fetch only currently active sessions (active within the last 5 minutes)
        $activeSessions = ActiveSession::with('user')
            ->where('last_activity', '>=', Carbon::now('Asia/Colombo')->subMinutes(5)->timestamp) // Filter active sessions only
            ->whereNotNull('user_id')
            ->get();

        return Inertia::render('Admin/userManagement1', [
            'users' => $users,
            'totalUserCount' => $totalUserCount,
            'teacherCount' => $teacherCount1,
            'studentCount' => $studentCount1,
            'activeSessions' => $activeSessions,
            'roleCounts' => [
                'admin' => $adminCount,
                'teacher' => $teacherCount,
                'student' => $studentCount,
            ],
        ]);
    }

     public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
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

public function store3(Request $request){
    $request->validate([
    'title' => 'required|string|max:255',
    'image' => 'required|image|max:2048',
]);

if ($request->hasFile('image')) {
    $file = $request->file('image');
    $fileName = time() . '.' . $file->getClientOriginalExtension();

    // Move file to public/image
    $file->move(public_path('image'), $fileName);

    // Store data in Img model (assuming you have 'title' and 'filename' columns)
    Img::create([
        'title' => $request->input('title'),
        'filename' => $fileName,
    ]);
}
}

}
