<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\UserController;



Route::get('/', function () {
    return Inertia::render('homepage');
})->name('homepage');


Route::get('/test-session', function (Request $request) {
    
    session(['current_url' => $request->fullUrl()]);
    session()->save();
    return 'Session data: ' . session('current_url');
});

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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
