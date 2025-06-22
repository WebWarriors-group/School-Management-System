<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassModel;
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
        return response()->json(ClassModel::all(), 200);
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

    return redirect()->back()->with('success', 'Class teachers updated successfully.');
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
}
