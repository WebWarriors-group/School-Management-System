<?php

use Illuminate\Support\Facades\Auth;
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
use App\Http\Controllers\TeacherAttendanceController;
use App\Http\Controllers\TeacherRequestController;
use App\Http\Controllers\TeacherAssignedController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\AdminLeaveRequestController;
use App\Http\Controllers\SubjectController;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;

use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    // Route::post('register', [RegisteredUserController::class, 'store'])->name('register');

    Route::get('login/{student?}', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login/{student?}', [AuthenticatedSessionController::class, 'store'])->name('login');
    Route::post('/google-login', [AuthenticatedSessionController::class, 'googleLoginStore']);
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');

    Route::get('/add-teacher', function () {
        $user_id = Auth::id();
        return inertia::render('Teacher/teacherForm', [
            'user' => $user_id
        ]); // This should return the Inertia page
    })->name('add-teacher');
});

//######################################################################################################################
//######################################################################################################################

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('verification.verify');
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('verification.send');
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Route::get('/marks', [MarkController::class, 'index'])->name('marks.index');
    // Route::get('/student/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');

    Route::get('/teacher/dashboard', [TeacherController::class, 'dashboard'])->name('teacher.dashboard');
    // Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
    Route::get('/mark/ReportPage/{reg_no}', [ReportController::class, 'show'])->name('report.show');
    // Route::post('/marks', [MarkController::class, 'store']);
    // Route::get('/marks', [MarkController::class, 'create']);
    // Route::get('/marks/{id}', [MarkController::class, 'show']);
    // Route::put('/marks/{id}', [MarkController::class, 'update']);
    // Route::delete('/marks/{id}', [MarkController::class, 'destroy']);
    Route::get('/student/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');

    Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
    // Route::get('/mark/ReportPage/{reg_no}', [ReportController::class, 'show'])->name('report.show');
    Route::get('/subjects/{subject}', [SubjectController::class, 'show'])->name('subjects.show');

    Route::get('/student/studyMaterial', function () {
        return Inertia::render('Student/studyMaterial'); });
    Route::get('/study_material', [StudyMaterialController::class, 'menu'])->name('studyMaterial');
    Route::get('/study_material/{category}', [StudyMaterialController::class, 'index'])->name('studMatCat');
});

//######################################################################################################################
//######################################################################################################################

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboardoverview', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/register', [AdminController::class, 'register'])->name('admin.register');
    Route::get('/admin/usermanage', [AdminController::class, 'user'])->name('admin.user');
    Route::post('/admin/import', [UserImportController::class, 'import'])->name('users.import');
    Route::delete('/posts/{id}', [AdminController::class, 'delete']);
    Route::get('/admin/studentdashboard', function () {
        return Inertia::render('Admin/StudentDashboard');
    });
    Route::get('/admin/teacher', function () {
        return Inertia::render('Admin/teacher');
    });
    Route::get('/class1', [ClassController::class, 'classpage'])->name('classpage');

    Route::get('/api/teacher-attendance', [TeacherAttendanceController::class, 'fetchAttendance']);
    Route::get('/admin/teacher-attendance', [TeacherAttendanceController::class, 'index'])->name('teacher.attendance.index');
    Route::post('/admin/teacher-attendance', [TeacherAttendanceController::class, 'store']);
    Route::put('/admin/teacher-attendance/update', [TeacherAttendanceController::class, 'update']);

    //  Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
    // Route::get('/Marks/{reg_no}', [ReportController::class, 'show']);

    Route::get('/students/past', [StudentController::class, 'pastPupils'])->name('oldStudents');

    Route::get('/Admin/techerInfo', function () {
        return Inertia::render('Admin/teacher');
    });

    Route::get('admin/calendar', function () {
        return Inertia::render('Admin/CalendarPage');
    })->name('calendar');

    Route::get('/admin/dashboardoverview/teacher', [TeacherAssignedController::class, 'index'])->name('teacher.index');
    Route::post('/assignments', [TeacherAssignedController::class, 'store'])->name('teacher.store');

    // web.php
    Route::post('/reset-class-teachers', [ClassController::class, 'reset']);
    Route::get('/admin/dashboardoverview/classpage', [ClassController::class, 'index']);



    Route::get('/admin/OverallPerformance', [ReportController::class, 'overallPerformance'])
        ->name('admin.overallPerformance');

    Route::get('/generate-timetable', [TimetableController::class, 'generate']);
    Route::get('/admin/teacher-leave-requests', [AdminLeaveRequestController::class, 'index']);
    Route::post('/admin/teacher-leave-requests/{id}/approve', [AdminLeaveRequestController::class, 'approve']);
    Route::post('/admin/teacher-leave-requests/{id}/reject', [AdminLeaveRequestController::class, 'reject']);

    Route::post('/image', [AdminController::class, 'store3'])->name('images.store');
    Route::get('/admin/dashboardoverview', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/register', [AdminController::class, 'register'])->name('admin.register');
    Route::get('/admin/usermanage', [AdminController::class, 'user'])->name('admin.user');
    Route::post('/admin/import', [UserImportController::class, 'import'])->name('users.import');
    Route::delete('/posts/{id}', [AdminController::class, 'delete']);
    Route::get('/admin/studentdashboard', function () {
        return Inertia::render('Admin/StudentDashboard');
    });
    Route::get('/admin/teacher', function () {
        return Inertia::render('Admin/teacher');
    });
    Route::get('/class1', [ClassController::class, 'classpage'])->name('classpage');

    Route::get('/class4', [ClassController::class, 'classpage'])->name('class3');
    Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');

    Route::post('/assign-class-teachers', [ClassController::class, 'assignTeachers'])->name('assign.class.teachers');

    Route::post('/teacher/store', [TeacherController::class, 'store'])->name('teacher.store');
    Route::get('/admin/teacher-requests', [TeacherRequestController::class, 'index'])->name('admin.teacherRequests');
    Route::get('/admin/reset', [TeacherRequestController::class, 'resetCount'])->name('reset');
    Route::post('/admin/teacher-requests/{id}/approve', [TeacherRequestController::class, 'approveRequest']);
    Route::post('/admin/teacher-requests/{id}/reject', [TeacherRequestController::class, 'rejectRequest']);
    Route::get('/admin/teacher/count', [TeacherController::class, 'getTeacherCount']);

    Route::post('/study_material', [StudyMaterialController::class, 'store']);
});

//######################################################################################################################
//######################################################################################################################

Route::middleware(['auth', 'teacher'])->group(function () {
    // Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
    Route::get('/Marks/{reg_no}', [ReportController::class, 'show']);

    Route::get('/leave', function () {
        $user_id = Auth::id();
        return inertia::render('Teacher/LeaveRequest', [
            'user_id' => $user_id,
        ]); // This should return the Inertia page
    })->name('leave');

    //  Route::get('/classes/{classId}/students', [MarkController::class, 'index']);

    // Route::post('/marks/bulk', [MarkController::class, 'storeBulkMarks']);
    Route::get('/mark/MarksPage', [MarkController::class, 'index'])->name('mark.index');
    Route::get('/marks', [MarkController::class, 'getMarks']);
    Route::post('/marks/update', [MarkController::class, 'updateMark']);
    Route::post('/marks/delete', [MarkController::class, 'delete']);
    Route::post('/marks/storeBulkMarks', [MarkController::class, 'storeBulkMarks'])->name('marks.storeBulkMarks');
});

//######################################################################################################################
//######################################################################################################################

Route::middleware(['auth', 'admin', 'teacher'])->group(function () {
    Route::get('/students/all', function () {
        return Inertia::render('Student/ViewAllStudents', [
            // You can pass props here
        ]);
    })->name('students.all');
});
