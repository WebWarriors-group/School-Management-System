<?php

namespace App\Http\Controllers;
use Inertia\Inertia;  
use Illuminate\Http\Request;
use App\Models\Marks;
use App\Models\ClassModel;  // Your Class model
use Illuminate\Support\Facades\Validator;

class MarkController extends Controller
{
    /**
     * Fetch all students inside a given class by class ID
     */

    public function index(Request $request)
{
    // Fetch all classes
    $classes = ClassModel::select('class_id',  'section', 'year')->get();

    // Get class ID from query parameter or pick the first class as default
    $selectedClassId = $request->query('class_id') ?? ($classes->first()->class_id ?? null);

    $students = [];

    if ($selectedClassId) {
        // Load students of the selected class with studentacademics relationship
        $class = ClassModel::with('studentacademics')->find($selectedClassId);

        if ($class) {
            $students = $class->studentacademics->map(function ($student) {
                return [
                    'reg_no' => $student->reg_no,
                    
                ];
            });
        }
    }

    return Inertia::render('Marks/MarksPage', [
        'classes' => $classes,
        'selectedClassId' => $selectedClassId,
        'students' => $students,
    ]);
}

    public function getStudentsByClass(Request $request, $classId)
    {
        // Validate class ID existence
        $class = ClassModel::with('studentacademics')->find($classId);

        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        // Return students list with reg_no and name
        $students = $class->studentacademics->map(function ($student) {
            return [
                'reg_no' => $student->reg_no,
                'name' => $student->name ?? null,
            ];
        });

        return response()->json([
            'class' => [
                'id' => $class->id,
                'grade' => $class->grade,
                'section' => $class->section,
                'year' => $class->year,
            ],
            'students' => $students,
        ]);
    }


    /**
     * Store bulk marks for students
     */
    public function storeBulkMarks(Request $request)
    {
        $marksData = $request->input('marks');

        if (!is_array($marksData) || count($marksData) === 0) {
            return response()->json(['message' => 'No marks data provided'], 400);
        }

        $errors = [];
        $savedMarks = [];

        foreach ($marksData as $index => $mark) {
            $validator = Validator::make($mark, [
                'reg_no' => 'required|integer',
                'subject_id' => 'required|string|max:255',
                'term' => 'required|string|max:20',
                'year' => 'required|integer',
                'marks_obtained' => 'required|integer|min:0|max:100',
                'grade' => 'required|string|in:A,B,C,S,F',
            ]);

            if ($validator->fails()) {
                $errors[$index] = $validator->errors()->all();
                continue;
            }

            // Create or update mark record
            $savedMarks[] = Marks::updateOrCreate(
                [
                    'reg_no' => $mark['reg_no'],
                    'subject_id' => $mark['subject_id'],
                    'term' => $mark['term'],
                    'year' => $mark['year'],
                ],
                [
                    'marks_obtained' => $mark['marks_obtained'],
                    'grade' => strtoupper($mark['grade']),
                ]
            );
        }

        if (count($errors) > 0) {
            return response()->json([
                'message' => 'Some records failed validation',
                'errors' => $errors,
            ], 422);
        }

        return response()->json([
            'message' => 'Marks saved successfully',
            'marks' => $savedMarks,
        ]);
    }
}
