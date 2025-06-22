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
use App\Http\Controllers\ClassController;
use App\Http\Controllers\MarkController;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;

use App\Mail\WelcomeEmail;
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




Route::middleware('auth', 'teacher')->group(function () {
     Route::get('/teacher/dashboard', [TeacherController::class, 'dashboard'])->name('teacher.dashboard');
    Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');

   
Route::get('/leave', function () {
    return inertia::render('Teacher/LeaveRequest'); // This should return the Inertia page
})->name('leave');
Route::get('/Teacher/LeaveRequest', function () {
    return Inertia::render('Teacher/personalDash');
});
});


Route::middleware('auth')->group(function () {
    Route::get('/teacher/dashboard', [TeacherController::class, 'dashboard'])->name('teacher.dashboard');
    Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
    Route::get('/mark/ReportPage', [ReportController::class, 'show'])->name('report.show');
});


