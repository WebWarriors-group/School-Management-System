<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('homepage');
})->name('homepage');




Route::get('/add-teacher', function () {
    return inertia::render('Admin/AddTeacherForm'); // This should return the Inertia page
})->name('add-teacher');
Route::get('/Admin/AddTeacherForm', function () {
    return Inertia::render('Admin/teacher');
});
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


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('admin/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Route::get('/admin/teacherHandbooks', function () {
    //     return Inertia::render('Admin/teachersHandbooks');
    // });

    // Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    // Route::get('/admin/classes', [AdminController::class, 'classes'])->name('admin.dashboard');
    // Route::get('/teacher/dashboard', [TeacherController::class, 'dashboard'])->name('teacher.dashboard');
    // Route::get('/student/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');



    Route::get('/study_material', function () {
        return Inertia::render('studyMaterial/studyMaterials');
    });
    Route::get('/study_material/notes', function () {
        return Inertia::render('studyMaterial/notes');
    });
    Route::get('/study_material/teachersHandbooks', function () {
        return Inertia::render('studyMaterial/teachersHandbooks');
    });
    Route::get('/study_material/pastPapers', function () {
        return Inertia::render('studyMaterial/pastPapers');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
