<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassModel;


use App\Models\SubjectTeacher;
use App\Models\Teacher;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class ClassController extends Controller
{
    /**
     * Display a listing of classes.
     */
    public function index()
    {
       
    $teachers = Teacher::with('qualifications', 'personal')->get();

    $classes = ClassModel::select('class_id', 'grade', 'section', 'teacher_NIC', 'class_name', 'year')
        ->get()
        ->groupBy('class_name')
        ->map(function ($gradeGroups) {
            return $gradeGroups->groupBy('grade');
        });

    return Inertia::render('Admin/Classpage', [
        'classes' => $classes,
        'teachers' => $teachers,
    ]);

    }

    public function classpage()
{
    $classes = ClassModel::select('class_id', 'grade', 'section', 'teacher_NIC')
        ->get()
        ->groupBy('grade');

    $teachers = Teacher::select('teacher_NIC')->get();

    return inertia('Admin/Classpage', [
        'classes' => $classes,
        'teachers' => $teachers
    ]);
}

public function assignTeachers(Request $request)
{
    $request->validate([
        'grade' => 'required|integer',
        'sections' => 'required|array',
        'sections.*' => 'nullable|string' 
    ]);

    $grade = $request->input('grade');
    $sections = $request->input('sections'); 

    foreach ($sections as $section => $teacherNIC) {
       
        DB::table('classes')
            ->where('grade', $grade)
            ->where('section', $section)
            ->update(['teacher_NIC' => $teacherNIC]);
    }

    return ;
}

    /**
     * Store a new class.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'class_id' => 'required|integer',
            'class_name' => 'nullable|string|max:10',
            'grade' => 'required|integer',
            'section' => 'required|string|max:5',
           
        ]);

        $class = ClassModel::create($validatedData);
        return redirect()->back();
    }
    public function count()
    {
        $count = ClassModel::count(); // Adjust model name if it's not SchoolClass
        return response()->json(['count' => $count]);
    }
    
    /**
     * Display a specific class.
     */
    public function show($id)
    {
        $class = ClassModel::find($id);
        return $class ? response()->json($class, 200)
                      : response()->json(['message' => 'Class not found'], 404);
    }

    /**
     * Update a class.
     */
    public function update(Request $request, $id)
    {
        $class = ClassModel::find($id);

        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        $validatedData = $request->validate([
            'class_teacher' => 'sometimes|nullable|required|exists:teachers,id',
            'class_name' => 'sometimes|nullable|string|max:10',
            'grade' => 'sometimes|required|integer',
            'year' => 'sometimes|required|integer',
            'section' => 'sometimes|required|string|max:5',
            'number_of_students' => 'sometimes|required|integer|min:0|max:100',
        ]);

        $class->update($validatedData);
        return response()->json($class, 200);
    }

    /**
     * Delete a class.
     */
    public function destroy($id)
    {
        $class = ClassModel::find($id);

        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        $class->delete();
        return response()->json(['message' => 'Class deleted successfully'], 200);
    }


    public function index1(Request $request)
{
    $filters = $request->only(['grade', 'section', 'class_name']);

    $classes = ClassModel::withCount('studentacademics')
        ->with('studentacademics')
        ->when($filters['grade'], fn($q) => $q->where('grade', $filters['grade']))
        ->when($filters['section'], fn($q) => $q->where('section', $filters['section']))
        ->when($filters['class_name'], fn($q) => $q->where('class_name', $filters['class_name']))
        ->get();

    return Inertia::render('Admin/Dashboardoverview', [
        'classes' => $classes,
        'filters' => $filters,
    ]);
}




public function reset(Request $request)
{
    $request->validate([
        'class_name' => 'required|string',
        'grade' => 'required|integer',
    ]);

    $className = $request->input('class_name');
    $grade = $request->input('grade');

    // Assuming you have a Class model with class_name and grade columns
    // and SubjectTeacher model with teacher_NIC that you want to nullify

    // Get the relevant classes/sections matching class_name and grade
    $classIds = ClassModel::where('class_name', $className)
        ->where('grade', $grade)
        ->pluck('class_id');

    // Update all assignments for those classes to set teacher_NIC to null
    // SubjectTeacher::query()->update(['teacher_NIC' => null]);
    ClassModel::query()->update(['teacher_NIC' => null]);

    return redirect()->back();
}

}
