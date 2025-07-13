<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Services\TypesenseService;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use App\Http\Controllers\ActiveSessionController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\TimetableController;

use App\Http\Controllers\StudentController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\TeacherRequestController;
use App\Models\Img;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SubjectController;
use App\Mail\StudentAdmissionMail;

use App\Http\Controllers\TeacherAssignedController;

use App\Http\Controllers\TeacherAttendanceController;
use App\Http\Controllers\TeacherLeaveRequestController;
use App\Http\Controllers\AdminLeaveRequestController;
use App\Http\Controllers\MarkController;



Route::get('loginCheckout', [ActiveSessionController::class, 'loginRedirection'])->name('loginCheckout');

Route::get('/', function () {
    $images = Img::all(); 

    return Inertia::render('homepage', [
        'img' =>[
            'data'=> $images], 
    ]);
})->name('homepage');




Route::middleware('auth', 'admin')->group(function () {
Route::post('/image', [AdminController::class, 'store3'])->name('images.store');
      Route::get('/admin/dashboardoverview', [AdminController::class, 'dashboard'])->name('admin.dashboard');
     Route::post('/admin/register', [AdminController::class, 'register'])->name('admin.register');
     Route::get('/admin/usermanage', [AdminController::class, 'user'])->name('admin.user');
     Route::post('/admin/import', [UserImportController::class, 'import'])->name('users.import');
     Route::delete('/posts/{id}', [AdminController::class, 'delete']);
     Route::get('/admin/studentdashboard', function () { return Inertia::render('Admin/StudentDashboard'); });
     Route::get('/admin/teacher', function () { return Inertia::render('Admin/teacher'); });
    Route::get('/class1', [ClassController::class, 'classpage'])->name('classpage');
Route::get('/class4', [ClassController::class, 'classpage'])->name('class3');
     Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
     Route::post('/assign-class-teachers', [ClassController::class, 'assignTeachers'])->name('assign.class.teachers');
     Route::get('/test-session', function (Request $request) {
  

    session(['current_url' => $request->fullUrl()]);
    session()->save();
    return 'Session data: ' . session('current_url');



    });
});


Route::get('/admin/teacher/count', [TeacherController::class, 'getTeacherCount']);

Route::get('/Marks/{reg_no}', [ReportController::class, 'show']);
Route::post('/subject_grade',[GradeController::class,'store']);
Route::delete('/grades/{grade}', [GradeController::class, 'destroy'])->name('grades.destroy');
Route::post('/classadd', [ClassController::class, 'store']);


 Route::get('/add-teacher', function () {
    
    $user_id=Auth::id();
    return inertia::render('Teacher/teacherForm',[
        'user'=>$user_id
    ]); // This should return the Inertia page

})->name('add-teacher');

Route::get('/student/academic', [StudentController::class, 'academicPage']);







Route::get('/teacher-info', function () {
    return inertia::render('Admin/techerInfo'); 
})->name('teacher-info');
Route::get('/Admin/techerInfo', function () {
    return Inertia::render('Admin/teacher');
});


Route::get('/teacher_requests', function () {
    return inertia::render('Admin/TeacherRequests'); // This should return the Inertia page
})->name('teacher_requests');
Route::get('/Admin/TeacherRequests', function () {
    return Inertia::render('Admin/teacher');
});




Route::post('/teacher/store', [TeacherController::class, 'store'])->name('teacher.store');
Route::get('/admin/teacher-requests', [TeacherRequestController::class, 'index'])->name('admin.teacherRequests');
    Route::get('/admin/reset', [TeacherRequestController::class, 'resetCount'])->name('reset');
    Route::post('/admin/teacher-requests/{id}/approve', [TeacherRequestController::class, 'approveRequest']);
    Route::post('/admin/teacher-requests/{id}/reject', [TeacherRequestController::class, 'rejectRequest']);





Route::get('/dashboard/teacher-count', [TeacherController::class, 'getTeacherCount']);



Route::post('/teacher/request', [TeacherController::class, 'storeRequest'])->name('teacher.requests');






Route::get('/teacher-info', function () {
    return inertia::render('Admin/techerInfo'); 
})->name('teacher-info');
Route::get('/Admin/techerInfo', function () {
    return Inertia::render('Admin/teacher');
});

Route::get('admin/calendar', function () {
    return Inertia::render('Admin/CalendarPage');
})->name('calendar');




Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/teacher-attendance', [TeacherAttendanceController::class, 'index'])->name('teacher.attendance.index');
    Route::post('/admin/teacher-attendance', [TeacherAttendanceController::class, 'store']);
    Route::put('/admin/teacher-attendance/update', [TeacherAttendanceController::class, 'update']);
});

Route::get('/marks', [MarkController::class, 'index'])->name('marks.index');


Route::middleware(['auth', 'admin'])->get('/api/teacher-attendance', [TeacherAttendanceController::class, 'fetchAttendance']);


Route::get('/api/teacher-attendance-summary', [TeacherAttendanceController::class, 'summary']);
Route::get('/teacher_attendance', function () {
    return inertia::render('Admin\teacherAttendance'); 
})->name('teacher_attendance');
Route::get('/Admin/teacherAttendance', function () {
    return Inertia::render('Admin/teacher');
});
Route::get('/teacher-leave-requests', function () {
    return inertia::render('Admin/LeaveRequests'); 
})->name('teacher-leave-requests');
Route::get('/Admin/LeaveRequests', function () {
    return Inertia::render('Admin/teacher');
});
Route::get('/teacher/profile', [TeacherController::class, 'profile'])->name('teacher.profile');
//D:\schoolProj\School-Management-System\resources\js\pages\Admin\teacherAttendance.tsx
//Route::get('/Marks/{reg_no}', [ReportController::class, 'show']);


    // Your Dashboard route
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // This is the route that loads your React Subject Management page via Inertia.
    // It's under the 'web' middleware group (implicitly or explicitly if added).
   // Route::get('/Admin/SubjectIndex', [SubjectController::class, 'index'])->name('subjects.index'); // Renamed to admin/subjects for clarity


    

    

Route::post('/teacher/leave/request', [TeacherLeaveRequestController::class, 'leavereqstore'])->middleware('auth');
Route::get('/api/teacher-stats/{nic}', [AdminLeaveRequestController::class, 'getTeacherStats']);



Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/teacher-leave-requests', [AdminLeaveRequestController::class, 'index']);
    Route::post('/admin/teacher-leave-requests/{id}/approve', [AdminLeaveRequestController::class, 'approve']);
    Route::post('/admin/teacher-leave-requests/{id}/reject', [AdminLeaveRequestController::class, 'reject']);
});
 Route::get('/api/teacher/today-leave-count', [AdminLeaveRequestController::class, 'getTodayLeaveCount']);


Route::middleware('auth')->group(function () {
     Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
    Route::get('/mark/ReportPage/{reg_no}', [ReportController::class, 'show'])->name('report.show');
    Route::get('/subjects/{subject}', [SubjectController::class, 'show'])->name('subjects.show');
});

Route::get('/students/all', function () {
    return Inertia::render('Student/ViewAllStudents', [
        // You can pass props here
    ]);
})->name('students.all');



Route::get('/admin/dashboardoverview/teacher', [TeacherAssignedController::class, 'index'])->name('teacher.index');
Route::post('/assignments', [TeacherAssignedController::class, 'store'])->name('teacher.store');

// web.php
Route::post('/reset-class-teachers', [ClassController::class, 'reset']);
Route::get('/admin/dashboardoverview/classpage', [ClassController::class, 'index']);



Route::get('/admin/OverallPerformance', [ReportController::class, 'overallPerformance'])
    ->name('admin.overallPerformance');

    Route::get('/generate-timetable', [TimetableController::class, 'generate']);



Route::get('/typesense/create', function (TypesenseService $typesense) {
    return $typesense->createCollection();
});

Route::get('/typesense/add', function (TypesenseService $typesense) {
    return $typesense->indexDocument([
        'id'     => '1',
        'title'  => 'Harry Potter',
        'author' => 'J.K. Rowling',
        'year'   => 1997
    ]);
});

Route::get('/typesense/search', function (TypesenseService $typesense) {
    return $typesense->search('Harry');
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';