<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;

class SubjectController extends Controller
{
    /**
     * Display a listing of subjects.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get all subjects
        return response()->json(Subject::all(), 200);
    }

    /**
     * Store a newly created subject.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'subject_id' => 'required|integer|unique:subjects,subject_id', // Ensure subject_id is unique and integer
            'subject_name' => 'required|string|max:255',
        ]);
    
        // Create a new subject using the validated data
        $subject = Subject::create([
            'subject_id' => $validatedData['subject_id'],
            'subject_name' => $validatedData['subject_name'],
        ]);
    
        // Return the created subject as a response
        return response()->json([
            'message' => 'Subject created successfully',
            'subject' => $subject
        ], 201);
    }
    

    /**
     * Display the specified subject.
     *
     * @param  int  $subject_id
     * @return \Illuminate\Http\Response
     */
    public function show($subject_id)
    {
        // Find the subject by subject_id
        $subject = Subject::find($subject_id);

        // If the subject is not found, return a 404 response
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        // Return the subject data
        return response()->json($subject, 200);
    }

    /**
     * Update the specified subject.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $subject_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $subject_id)
    {
        // Find the subject by subject_id
        $subject = Subject::find($subject_id);

        // If the subject is not found, return a 404 response
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        // Validate the request data
        $validatedData = $request->validate([
            'subject_name' => 'required|string|max:255',
        ]);

        // Update the subject
        $subject->update($validatedData);

        // Return the updated subject data
        return response()->json($subject, 200);
    }

    /**
     * Remove the specified subject.
     *
     * @param  int  $subject_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($subject_id)
    {
        // Find the subject by subject_id
        $subject = Subject::find($subject_id);

        // If the subject is not found, return a 404 response
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        // Delete the subject
        $subject->delete();

        // Return a success message
        return response()->json(['message' => 'Subject deleted successfully'], 200);
    }
}
