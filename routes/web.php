<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\TeacherRequestController;
use App\Http\Controllers\ReportController;

Route::get('/', function () {
    return Inertia::render('homepage');
})->name('homepage');

Route::get('/sample', function () {
    return Inertia::render('sample');
})->name('sample');



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
// Route::get('/dashboard', [TeacherController::class, 'dashboard'])->name('dashboard');



Route::get('/teacher/dashboard/{teacher_NIC}', [TeacherController::class, 'personalDashboard'])->name('personaldashboard');
Route::get('/dashboard/teacher-count', [TeacherController::class, 'getTeacherCount']);


// Teacher submitting a request
Route::post('/teacher/request', [TeacherController::class, 'storeRequest'])->name('teacher.requests');


Route::middleware('auth')->group(function () {
    Route::get('/admin/teacher-requests', [TeacherRequestController::class, 'index'])->name('admin.teacherRequests');
    Route::get('/admin/reset', [TeacherRequestController::class, 'resetCount'])->name('reset');
    Route::post('/admin/teacher-requests/{id}/approve', [TeacherRequestController::class, 'approveRequest']);
    Route::post('/admin/teacher-requests/{id}/reject', [TeacherRequestController::class, 'rejectRequest']);
});



Route::get('/teacher_details', function () {
    return inertia::render('Admin/techerInfo'); // This should return the Inertia page
})->name('teacher_details');
Route::get('/Admin/techerInfo', function () {
    return Inertia::render('Admin/teacher');
});

//D:\School-Management-System-1\resources\js\pages\Admin\techerReq.tsx
Route::get('/teacher_requests', function () {
    return inertia::render('Admin/TeacherRequests'); // This should return the Inertia page
})->name('teacher_requests');
Route::get('/Admin/TeacherRequests', function () {
    return Inertia::render('Admin/teacher');
});

Route::get('/admin/teacher/count', [TeacherController::class, 'getTeacherCount']);

Route::get('/Marks/{reg_no}', [ReportController::class, 'show']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
