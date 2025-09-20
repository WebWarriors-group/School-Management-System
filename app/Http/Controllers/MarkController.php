<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Marks;
use App\Models\ClassModel;
use Illuminate\Support\Facades\Validator;

class MarkController extends Controller
{
    public function index(Request $request)
    {
        $classes = ClassModel::select('class_id', 'section', 'year', 'grade')->get();

        $selectedClassId = $request->query('class_id') ?? ($classes->first()->class_id ?? null);

        $students = [];

        if ($selectedClassId) {
            $class = ClassModel::with('studentacademics')->find($selectedClassId);

            if ($class) {
                $students = $class->studentacademics->map(function ($student) {
                    return [
                        'reg_no' => $student->reg_no,
                        'name' => $student->name ?? null,
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

    public function getMarks(Request $request)
    {
        $marks = Marks::where('subject_id', $request->subject_id)
            ->where('term', $request->term)
            ->where('year', $request->year)
            ->get();

        return response()->json($marks);
    }

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
                'class_id' => 'required|integer',
            ]);

            if ($validator->fails()) {
                $errors[$index] = $validator->errors()->all();
                continue;
            }

            $savedMarks[] = Marks::updateOrCreate(
                [
                    'reg_no' => $mark['reg_no'],
                    'subject_id' => $mark['subject_id'],
                    'term' => $mark['term'],
                    'year' => $mark['year'],
                    'class_id' => $mark['class_id'],
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

    public function updateMark(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'reg_no' => 'required|integer',
            'subject_id' => 'required|string',
            'term' => 'required|string',
            'year' => 'required|integer',
            'marks_obtained' => 'required|integer|min:0|max:100',
            'grade' => 'required|string|in:A,B,C,S,F',
            'class_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $mark = Marks::where('reg_no', $request->reg_no)
            ->where('subject_id', $request->subject_id)
            ->where('term', $request->term)
            ->where('year', $request->year)
            ->where('class', $request->class)
            ->first();

        if (!$mark) {
            return response()->json(['message' => 'Mark not found'], 404);
        }

        $mark->update([
            'marks_obtained' => $request->marks_obtained,
            'grade' => strtoupper($request->grade),
        ]);

        return response()->json(['message' => 'Mark updated successfully', 'mark' => $mark]);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'reg_no' => 'required|integer',
            'subject_id' => 'required|string',
            'term' => 'required|string',
            'year' => 'required|integer',
            'class' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $mark = Marks::where('reg_no', $request->reg_no)
            ->where('subject_id', $request->subject_id)
            ->where('term', $request->term)
            ->where('year', $request->year)
            ->where('class', $request->class)
            ->first();

        if (!$mark) {
            return response()->json(['message' => 'Mark not found'], 404);
        }

        $mark->delete();

        return response()->json(['message' => 'Mark deleted successfully']);
    }
}
