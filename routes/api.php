<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController; // FIX: Correct namespace
use App\Http\Controllers\TeacherController; // FIX: Correct namespace
use App\Http\Controllers\ClassController;

use App\Http\Controllers\SubjectController; 
use App\Http\Controllers\MarkController; 
use App\Http\Controllers\StudyMaterialController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'id' => $request->user()->id,
        'name' => $request->user()->name,
        'role' => $request->user()->role,
    ]);
});

Route::post('/teachers', [TeacherController::class, 'store']);
Route::get('/teachers', [TeacherController::class, 'index']);
Route::get('/teachers/{teacher_NIC}', [TeacherController::class, 'show']);
Route::delete('/teachers/{teacher_NIC}', [TeacherController::class, 'destroy']);
Route::put('/teachers/{teacher_NIC}', [TeacherController::class, 'update']);

Route::post('/students', [StudentController::class, 'store']);

Route::get('/students', [StudentController::class, 'index']);

Route::delete('/students/{reg_no}', [StudentController::class, 'destroy']);
Route::get('/students/{reg_no}', [StudentController::class, 'show']);
Route::put('/students/{reg_no}', [StudentController::class, 'update']);

Route::get('/classes', [ClassController::class, 'index']);


Route::post('/subjects', [SubjectController::class, 'store']);
Route::get('/subjects', [SubjectController::class, 'index']);
Route::get('/subjects/{subject_id}', [SubjectController::class, 'show']);
Route::put('/subjects/{subject_id}', [SubjectController::class, 'update']);
Route::delete('/subjects/{subject_id}', [SubjectController::class, 'destroy']);


Route::post('/marks', [MarkController::class, 'store']);
Route::get('/marks', [MarkController::class, 'create']);
Route::get('/marks/{id}', [MarkController::class, 'show']);
Route::put('/marks/{id}', [MarkController::class, 'update']);
Route::delete('/marks/{id}', [MarkController::class, 'destroy']);




Route::get('study-materials', [StudyMaterialController::class, 'index']);
Route::post('study-materials', [StudyMaterialController::class, 'store']);
Route::get('study-materials/{id}', [StudyMaterialController::class, 'show']);
Route::put('study-materials/{id}', [StudyMaterialController::class, 'update']);
Route::delete('study-materials/{id}', [StudyMaterialController::class, 'destroy']);

