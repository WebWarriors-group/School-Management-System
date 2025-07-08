<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController; // FIX: Correct namespace
use App\Http\Controllers\TeacherController; // FIX: Correct namespace
use App\Http\Controllers\ClassController;
use App\Http\Controllers\SubjectController; 
use App\Http\Controllers\MarkController; 
use App\Http\Controllers\StudyMaterialController;
use App\Http\Controllers\ReportController;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Api\EventController;
use App\Mail\StudentAdmissionMail;
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'id' => $request->user()->id,
        'name' => $request->user()->name,
        'role' => $request->user()->role,
    ]);
});
Route::get('/classes/count', [ClassController::class, 'count']);

Route::post('/teachers', [TeacherController::class, 'store']);
Route::get('/teachers', [TeacherController::class, 'index']);
Route::get('/teachers/{teacher_NIC}', [TeacherController::class, 'show']);
Route::delete('/teachers/{teacher_NIC}', [TeacherController::class, 'destroy']);
Route::put('/teachers/{teacher_NIC}', [TeacherController::class, 'update']);

Route::post('/student', [StudentController::class, 'store']);
Route::get('/class-ids', [StudentController::class, 'getClassIds']);

Route::get('/students', [StudentController::class, 'index']);
Route::get('/student-performance', [StudentController::class, 'yearlyPerformance']);


Route::delete('/students/{reg_no}', [StudentController::class, 'destroy']);
Route::get('/students/{reg_no}', [StudentController::class, 'show']);
Route::put('/students/{reg_no}', [StudentController::class, 'update']);

Route::put('/student-personal/{reg_no}', [StudentController::class, 'updatePersonal']);
Route::put('/student-family/{reg_no}', [StudentController::class, 'updateFamily']);
Route::put('/student-sibling/{reg_no}', [StudentController::class, 'updateSibling']);

Route::get('/classes', [ClassController::class, 'index']);
Route::post('/send-admission-form', function (Illuminate\Http\Request $request) {
    $request->validate([
        'reg_no' => 'required|string|exists:students,reg_no',
        'email' => 'required|email'
    ]);

    $student = \App\Models\StudentAcademic::where('reg_no', $request->reg_no)->first();
    $formLink = url('/admission-form?reg_no=' . $student->reg_no);

    // Send the email
    Mail::to($request->email)->send(new StudentAdmissionMail($formLink));

    return response()->json(['message' => 'Admission form email sent successfully!']);
});



Route::get('/subjects', [SubjectController::class, 'index'])->name('subjects.index');
Route::get('/subjects/{subject_id}', [SubjectController::class, 'show']);
Route::put('/subjects/{subject_id}', [SubjectController::class, 'update']);
//Route::delete('/subjects/{subject_id}', [SubjectController::class, 'destroy'])->name('subjects.destroy');

Route::post('/subjects', [SubjectController::class, 'store']);

//Route::get('/report/{reg_no}', [ReportController::class, 'show']);





Route::get('study-materials', [StudyMaterialController::class, 'index']);
Route::post('study-materials', [StudyMaterialController::class, 'store']);
Route::get('study-materials/{id}', [StudyMaterialController::class, 'show']);
Route::put('study-materials/{id}', [StudyMaterialController::class, 'update']);
Route::delete('study-materials/{id}', [StudyMaterialController::class, 'destroy']);

Route::post('/students/import', [StudentController::class, 'import']);
Route::get('/admissions-per-year', [StudentController::class, 'getAdmissionsPerYear']);
Route::get('/student-family/{reg_no}', [StudentController::class, 'showFamily']);
Route::get('/student-sibling/{reg_no}', [StudentController::class, 'showSibling']);
Route::get('/student-personal/{reg_no}', [StudentController::class, 'showPersonal']);

Route::post('/students/import', [StudentController::class, 'import']);



Route::get('/events', function () {
    return \App\Models\Event::all([
        'id',
        'title',
        'start',
        'end'
    ]);
});



Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);

