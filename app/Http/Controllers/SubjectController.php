<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject; // Ensure this is correct
use Illuminate\Validation\Rule; // Import for unique validation rules
use Inertia\Inertia; // Import Inertia

class SubjectController extends Controller
{
    /**
     * Display a listing of subjects and render the Inertia page.
     * This method handles initial page load, search, and pagination.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
public function index()
{
    $subjects = Subject::all(); // No pagination

    return Inertia::render('Admin/SubjectIndex', [
        'subjects' => $subjects
    ]);
}


    // The `create` method is now removed.
    // Subject creation will happen in a modal on the `index` page,
    // using the `store` API endpoint.
    // public function create()
    // {
    //     return Inertia::render('Subjects/Create');
    // }

    /**
     * Store a newly created subject in storage.
     * This method acts as an API endpoint, returning JSON.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validation rules are updated to match React form and include 'status'.
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:subjects,name'],
            'code' => ['required', 'string', 'max:20', 'unique:subjects,code'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['active', 'inactive'])], // Added status validation
        ]);

        $subject = Subject::create($validated);

        // Return the created subject with a 201 Created status
        return response()->json($subject, 201);
    }

    /**
     * Display the specified subject.
     * This method acts as an API endpoint, returning JSON.
     * Uses Route Model Binding for cleaner subject retrieval.
     *
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Subject $subject) // Changed $subject_id to Subject $subject
    {
        // Route Model Binding automatically handles 404 if subject is not found.
        return response()->json($subject, 200);
    }

    /**
     * Update the specified subject in storage.
     * This method acts as an API endpoint, returning JSON.
     * Uses Route Model Binding for cleaner subject retrieval.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Subject $subject) // Changed $subject_id to Subject $subject
    {
        // Validation rules are updated to match React form and include 'status',
        // also handling unique rules for name/code while ignoring the current subject.
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('subjects')->ignore($subject->id)],
            'code' => ['required', 'string', 'max:20', Rule::unique('subjects')->ignore($subject->id)],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ]);

        // Update the subject with the validated data
        $subject->update($validatedData);

        // Return the updated subject data
        return response()->json($subject, 200);
    }

    /**
     * Remove the specified subject from storage.
     * This method acts as an API endpoint, returning JSON.
     * Uses Route Model Binding for cleaner subject retrieval.
     *
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\JsonResponse
     */
   public function destroy($id)
{
    $subject = Subject::findOrFail($id);
    $subject->delete();

    return redirect()->route('subjects.index')->with('success', 'Subject deleted successfully');
}

}