<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserImportController;
use App\Http\Controllers\StudyMaterialController;
use App\Http\Controllers\MarkController;


use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    // Route::post('register', [RegisteredUserController::class, 'store'])->name('register');
    

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/google-login', [AuthenticatedSessionController::class, 'googleLoginStore']);
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

Route::middleware('auth')->group(function () {

    // Route::get('register', [RegisteredUserController::class, 'create'])
    // ->name('register');
    // Route::post('register', [RegisteredUserController::class, 'store'])->name('register');
    // Route::put('register/{id}', [RegisteredUserController::class, 'update'])->name('register');
    //!!!!!!!! dont uncomment above things !!!!!!!!!!!

    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('verification.verify');
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('verification.send');
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/student/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');
    Route::get('/study_material', [StudyMaterialController::class, 'menu'])->name('studyMaterial');
    Route::get('/study_material/{category}', [StudyMaterialController::class, 'index'])->name('studMatCat');
});


Route::middleware('auth', 'admin')->group(function () {

      Route::get('/admin/dashboardoverview', [AdminController::class, 'dashboard'])->name('admin.dashboard');
     Route::post('/admin/register', [AdminController::class, 'register'])->name('admin.register');
     Route::get('/admin/usermanage', [AdminController::class, 'user'])->name('admin.user');
     Route::post('/admin/import', [UserImportController::class, 'import'])->name('users.import');
     Route::delete('/posts/{id}', [AdminController::class, 'delete']);
     Route::get('/admin/studentdashboard', function () { return Inertia::render('Admin/StudentDashboard'); });
     Route::get('/admin/teacher', function () { return Inertia::render('Admin/teacher'); });
    
     Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
});

Route::middleware('auth', 'teacher')->group(function () {
     Route::get('/teacher/dashboard', [TeacherController::class, 'dashboard'])->name('teacher.dashboard');
    Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/teacher/dashboard', [TeacherController::class, 'dashboard'])->name('teacher.dashboard');
    Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
});


