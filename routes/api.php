<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController; 
use App\Http\Controllers\TeacherController; 
use App\Http\Controllers\ClassController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\SubjectController; 
use App\Http\Controllers\MarkController; 
use App\Http\Controllers\StudyMaterialController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ExternalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;
use App\Mail\StudentAdmissionMail;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'id' => $request->user()->id,
        'name' => $request->user()->name,
        'role' => $request->user()->role,
    ]);
});

Route::get('/quotable/random', [ExternalController::class, 'getRandomQuote']);

Route::prefix('student')->group(function () {
    Route::get('/calendar', [StudentController::class, 'calendarData']);
    Route::get('/dashboard', [StudentController::class, 'dashboard']);
    Route::get('/performance', [StudentController::class, 'yearlyPerformance']);

    Route::prefix('{reg_no}')->group(function () {
        Route::get('/performance', [StudentController::class, 'apiStudentPerformance']);
        Route::get('/family', [StudentController::class, 'showFamily']);
        Route::get('/sibling', [StudentController::class, 'showSibling']);
        Route::get('/personal', [StudentController::class, 'showPersonal']);
        Route::get('/marks', [StudentController::class, 'getMarksBySubject']);

        Route::put('/personal', [StudentController::class, 'updatePersonal']);
        Route::put('/family', [StudentController::class, 'updateFamily']);
        Route::put('/sibling', [StudentController::class, 'updateSibling']);
        
    });

});

Route::prefix('teachers')->group(function () {
    Route::get('/', [TeacherController::class, 'index']);
    Route::post('/', [TeacherController::class, 'store']);
    Route::get('/{teacher_NIC}', [TeacherController::class, 'show']);
    Route::put('/{teacher_NIC}', [TeacherController::class, 'update']);
    Route::delete('/{teacher_NIC}', [TeacherController::class, 'destroy']);

});

Route::prefix('classes')->group(function () {
    Route::get('//count', [ClassController::class, 'count']);
    Route::get('/', [ClassController::class, 'index']);
});

Route::prefix('subjects')->group(function () {
    Route::get('/', [SubjectController::class, 'index'])->name('subjects.index');
    Route::post('/', [SubjectController::class, 'store']);
    Route::get('/{subject_id}', [SubjectController::class, 'show']);
    Route::put('/{subject_id}', [SubjectController::class, 'update']);
    //Route::delete('/{subject_id}', [SubjectController::class, 'destroy'])->name('subjects.destroy');
});

Route::prefix('study-materials')->group(function () {
    Route::get('/', [StudyMaterialController::class, 'index']);
    Route::post('/', [StudyMaterialController::class, 'store']);
    Route::get('/{id}', [StudyMaterialController::class, 'show']);
    Route::put('/{id}', [StudyMaterialController::class, 'update']);
    Route::delete('/{id}', [StudyMaterialController::class, 'destroy']);
});


Route::prefix('events')->group(function () {
    Route::get('/', function () {
    return \App\Models\Event::all([
        'id',
        'title',
        'start',
        'end'
    ]);
});
    Route::get('/', [EventController::class, 'index']);
    Route::post('/', [EventController::class, 'store']);
    Route::put('/{id}', [EventController::class, 'update']);
    Route::delete('/{id}', [EventController::class, 'destroy']);
});

Route::post('/chat', [ChatController::class, 'sendMessage']);

Route::get('/admissions-per-year', [StudentController::class, 'getAdmissionsPerYear']);

Route::post('/send-admission-form', function (Illuminate\Http\Request $request) {
    $request->validate([
        'reg_no' => 'required|string|exists:students,reg_no',
        'email' => 'required|email'
    ]);

    $student = \App\Models\StudentAcademic::where('reg_no', $request->reg_no)->first();
    $formLink = url('/admission-form?reg_no=' . $student->reg_no);

   
    Mail::to($request->email)->send(new StudentAdmissionMail($formLink));

    return response()->json(['message' => 'Admission form email sent successfully!']);
});

Route::resources([
    'students' => StudentController::class,
]);

Route::post('import', [StudentController::class, 'import']);

Route::get('/class-ids', [StudentController::class, 'getClassIds']);

//Route::get('/report/{reg_no}', [ReportController::class, 'show']);


