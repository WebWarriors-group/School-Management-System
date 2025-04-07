<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\UserController;
<<<<<<< HEAD
=======
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
>>>>>>> 8305a8ba47b9df3ac11c6ca510bfabcabc618195
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TeacherController;


Route::get('/', function () {
    return Inertia::render('homepage');
})->name('homepage');



Route::get('/test-session', function (Request $request) {
    
    session(['current_url' => $request->fullUrl()]);
    session()->save();
    return 'Session data: ' . session('current_url');
});

Route::get('/add-teacher', function () {
    return inertia::render('Teacher/teacherForm'); // This should return the Inertia page
})->name('add-teacher');
Route::get('/Teacher/teacherForm', function () {
    return Inertia::render('Teacher/dashboard');
});

Route::get('/leave', function () {
    return inertia::render('Teacher/LeaveRequest'); // This should return the Inertia page
})->name('leave');
Route::get('/Teacher/LeaveRequest', function () {
    return Inertia::render('Teacher/personalDash');
});

Route::post('/teacher/store', [TeacherController::class, 'store'])->name('teacher.store');
//Route::get('/teacher/show', [TeacherController::class, 'show'])->name('teacher.show');
Route::get('/dashboard', [TeacherController::class, 'dashboard'])->name('dashboard');



Route::get('/teacher/dashboard/{teacher_NIC}', [TeacherController::class, 'personalDashboard'])->name('personaldashboard');
Route::get('/dashboard/teacher-count', [TeacherController::class, 'getTeacherCount']);


// Route::get('/add-teacher', function () {
//     return inertia::render('Admin/demo'); // This should return the Inertia page
// })->name('add-teacher');
// Route::get('/Admin/demo', function () {
//     return Inertia::render('Admin/teacher');
// });

Route::get('/teacher_details', function () {
    return inertia::render('Admin/techerInfo'); // This should return the Inertia page
})->name('teacher_details');
Route::get('/Admin/techerInfo', function () {
    return Inertia::render('Admin/teacher');
});

Route::get('/admin/teacher/count', [TeacherController::class, 'getTeacherCount']);



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';