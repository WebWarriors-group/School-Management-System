<?php

namespace App\Http\Controllers;

use App\Models\Marks;
use Illuminate\Http\Request;

class MarkController extends Controller
{
    // Fetch all marks
    public function index()
    {
        $marks = Marks::all(); // Get all marks from the database
        return response()->json($marks);
    }

    // Store a new mark
    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'reg_no' => 'required|exists:student_academics_infos,class_id',
            'subject_id' => 'required|exists:subjects,subject_id',
            'marks_obtained' => 'required|integer',
            'grade' => 'required|string|max:2',
        ]);

        // Create a new mark
        $mark = Marks::create($validated);

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
            'grade' => 'required|string|max:2',
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
