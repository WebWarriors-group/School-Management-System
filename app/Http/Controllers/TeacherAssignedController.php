<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassModel; // your class model, rename as needed
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\SubjectTeacher; // model for subjects_teacher pivot
use DB;

class TeacherAssignedController extends Controller
{
    
 public function index()
{
    // 1. Get all grades (distinct)
    $grades = ClassModel::select('grade')->distinct()->orderBy('grade')->pluck('grade')->toArray();

    // 2. Get all classes (all grades)
    $classes = ClassModel::all();

    // 3. Get all subjects (without grade info)
    $subjects = Subject::all();

    // 4. Get all teachers
     $teachers = Teacher::with('qualifications', 'personal')->get();

    // 5. Get all assignments (all classes)
    $assignments = SubjectTeacher::all();

    // 6. Get grade-subject mappings from pivot table
    $gradeSubjects = DB::table('grade_subjects')->get();

    return Inertia::render('Admin/AssignTeachersPage', [
        'grades' => $grades,
        'classes' => $classes,
        'subjects' => $subjects,
        'teachers' => $teachers,
        'assignments' => $assignments,
        'gradeSubjects' => $gradeSubjects,
    ]);
}


   

    public function store(Request $request)
{
    $validated = $request->validate([
        'assignments' => 'required|array|min:1',
        'assignments.*.subject_id' => 'required|integer|exists:subjects,subject_id',
        'assignments.*.teacher_NIC' => 'required|string|exists:teacher_work_infos,teacher_NIC',
        'assignments.*.class_id' => 'required|integer|exists:classes,class_id',
    ]);

    $assignments = $validated['assignments'];
    $classId = $assignments[0]['class_id'];

    
    SubjectTeacher::where('class_id', $classId)->delete();

    
    SubjectTeacher::insert($assignments);


    return redirect()->back()->with('success', 'Assignments saved successfully!');
}

    
}
