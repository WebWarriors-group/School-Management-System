<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ActiveSessionController;
use App\Http\Controllers\RegistrationFormController;
use App\Http\Controllers\GalleryImageController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\StudyMaterialController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TeacherAttendanceController;
use App\Http\Controllers\TeacherLeaveRequestController;
use App\Http\Controllers\AdminLeaveRequestController;
use App\Models\GalleryCategory;

Route::get('loginCheckout', [ActiveSessionController::class, 'loginRedirection'])->name('loginCheckout');
Route::get('registrationForms', [RegistrationFormController::class, 'registrationType'])->name('regForms');

Route::get('/', function () {
    $categories = GalleryCategory::with('images')->get();
    return Inertia::render('homepage', [  // your React page name
        'categories' => $categories,
    ]);
})->name('homepage');


Route::get('/Marks/{reg_no}', [ReportController::class, 'show']);
Route::post('/subject_grade', [GradeController::class, 'store']);
Route::delete('/grades/{grade}', [GradeController::class, 'destroy'])->name('grades.destroy');
Route::post('/classadd', [ClassController::class, 'store']);

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


Route::get('/dashboard/teacher-count', [TeacherController::class, 'getTeacherCount']);



Route::post('/teacher/request', [TeacherController::class, 'storeRequest'])->name('teacher.requests');



Route::get('/teacher-info', function () {
    return inertia::render('Admin/techerInfo');
})->name('teacher-info');


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

// This is the route that loads your React Subject Management page via Inertia.
// It's under the 'web' middleware group (implicitly or explicitly if added).
// Route::get('/Admin/SubjectIndex', [SubjectController::class, 'index'])->name('subjects.index'); // Renamed to admin/subjects for clarity

Route::post('/teacher/leave/request', [TeacherLeaveRequestController::class, 'leavereqstore'])->middleware('auth');
Route::get('/api/teacher-stats/{nic}', [AdminLeaveRequestController::class, 'getTeacherStats']);

Route::get('/api/teacher/today-leave-count', [AdminLeaveRequestController::class, 'getTodayLeaveCount']);


Route::get('/broadcast-test', function () {
    $material = \App\Models\StudyMaterial::create([
        'title' => 'Sample Test Notes',
        'grade' => '10',
        'subject' => 'Science',
        'uploaded_by' => auth()->id(),
        'category' => 'General',
        'file_url' => 'materials/sample-test-notes.pdf',  // dummy file path
    ]);

    event(new \App\Events\StudyMaterialUploaded($material));

    return response()->json([
        'message' => 'Broadcast event triggered!',
        'material' => $material
    ]);
});

Route::get('/gallery1', [GalleryImageController::class, 'index'])->name('gallery.index');
Route::get('/gallery1/create', [GalleryImageController::class, 'create'])->name('gallery.create');
Route::post('/image', [GalleryImageController::class, 'store'])->name('gallery.store');
Route::get('/gallery1/{image}', [GalleryImageController::class, 'destroy'])->name('gallery.destroy');
Route::post('/category', [GalleryImageController::class, 'storeCategory']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';