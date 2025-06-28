<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActiveSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TeacherController;
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
    return inertia::render('Teacher/teacherForm'); // This should return the Inertia page
})->name('add-teacher');
Route::get('/Teacher/teacherForm', function () {
    return Inertia::render('Teacher/dashboard');
});








Route::get('/teacher_details', function () {
    return inertia::render('Admin/techerInfo'); 
})->name('teacher_details');
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




Route::get('/teacher/dashboard/{teacher_NIC}', [TeacherController::class, 'personalDashboard'])->name('personaldashboard');
Route::get('/dashboard/teacher-count', [TeacherController::class, 'getTeacherCount']);



Route::post('/teacher/request', [TeacherController::class, 'storeRequest'])->name('teacher.requests');





Route::get('/teacher_details', function () {
    return inertia::render('Admin/techerInfo'); 
})->name('teacher_details');
Route::get('/Admin/techerInfo', function () {
    return Inertia::render('Admin/teacher');
});

Route::get('admin/calendar', function () {
    return Inertia::render('Admin/CalendarPage');
})->name('calendar');










//Route::get('/Marks/{reg_no}', [ReportController::class, 'show']);


    // Your Dashboard route
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // This is the route that loads your React Subject Management page via Inertia.
    // It's under the 'web' middleware group (implicitly or explicitly if added).
   // Route::get('/Admin/SubjectIndex', [SubjectController::class, 'index'])->name('subjects.index'); // Renamed to admin/subjects for clarity


    // ... any other web-based routes that render Inertia pages


 

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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
