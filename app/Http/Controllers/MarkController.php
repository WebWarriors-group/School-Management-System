<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Marks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MarkController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Marks/MarksPage');
    }
    // Fetch all marks
    public function create(Request $request)
{
    $user = Auth::user();
    $query = Marks::query();

    if ($user->teacher()->exists()) {
        $teacher = $user->teacher()->with('class.studentacademics')->first();
        if($teacher && $teacher->class && $teacher->class->studentacademics){
            $studentRegNos = $teacher->class->studentacademics
                ->pluck('reg_no')
                ->unique()
                ->toArray();
            $query->whereIn('reg_no', $studentRegNos);
        }
    }

    if ($request->has('reg_no')) {
        $query->where('reg_no', 'LIKE', '%' . $request->input('reg_no') . '%');
    }


    if ($request->has('subject_id')) {
        $query->where('subject_id', 'like', '%' . $request->input('subject_id') . '%');
    }

    if ($request->has('marks_obtained')) {
        $query->where('marks_obtained', $request->input('marks_obtained'));
    }

    if ($request->has('grade')) {
        $query->where('grade', strtoupper($request->input('grade')));
    }

    $marks = $query->get();


    $marks = $query->paginate($request->get('limit', 10)); // You can customize the limit default (10)

    // Get the total number of marks (before pagination)
    $totalMarksCount = Marks::count();

    // Set the total count header
    return response()->json($marks)->header('x-total-count', $totalMarksCount);
}


    // Store a new mark
    public function store(Request $request)
{
    
    $mark = Marks::create([
        'reg_no' => $request->reg_no,
        'subject_id' => $request->subject_id,
        'marks_obtained' => $request->marks_obtained,
        'grade' => $request->grade,
    ]);

    // Return success response
    return response()->json([
        'message' => 'Mark added successfully',
        'mark' => $mark
    ], 201); // 201 status code for created resource
}

    // Fetch a specific mark by ID
    public function show($id)
    {
        $mark = Marks::find($id);

        if (!$mark) {
            return response()->json(['message' => 'Mark not found'], 404);
        }

        return response()->json($mark);
    }

    // Update an existing mark
    public function update(Request $request, $id)
    {
        // Find mark by ID
        $mark = Marks::find($id);

        if (!$mark) {
            return response()->json(['message' => 'Mark not found'], 404);
        }

        // Validate incoming request
        $validated = $request->validate([
            'reg_no' => 'required|integer',
            'subject_id' => 'required|integer',
            'marks_obtained' => 'required|integer',
            'grade' => 'required|string|max:1|in:A,B,C,D,E,F'
        ]);

        // Update mark details
        $mark->update($validated);

        // Return success response
        return response()->json([
            'message' => 'Mark updated successfully',
            'mark' => $mark
        ]);
    }

    // Delete a specific mark
    public function destroy($id)
    {
        // Find mark by ID
        $mark = Marks::find($id);

        if (!$mark) {
            return response()->json(['message' => 'Mark not found'], 404);
        }

        // Delete mark
        $mark->delete();

        // Return success response
        return response()->json(['message' => 'Mark deleted successfully']);
    }
}
