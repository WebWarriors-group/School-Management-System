<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Http\Request;


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

Route::post('/teacher/store', [TeacherController::class, 'store'])->name('teacher.store');
Route::get('/dashboard', [TeacherController::class, 'dashboard'])->name('dashboard');

Route::get('/teacher/profile', [TeacherController::class, 'profile'])->name('teacher.profile')->middleware('auth');
Route::get('/teacher_profile', function () {
    return inertia::render('Teacher/profile'); // This should return the Inertia page
})->name('teacher.profile');
Route::get('/Teacher/profile', function () {
    return Inertia::render('Teacher/dashboard');
});

Route::post('/teacher/send-verification-code', [TeacherController::class, 'sendVerificationCode'])
    ->middleware('auth')
    ->name('teacher.sendVerificationCode');
    Route::post('/teacher/verify-code', [TeacherController::class, 'verifyCode'])
    ->middleware('auth')
    ->name('teacher.verifyCode');



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



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
