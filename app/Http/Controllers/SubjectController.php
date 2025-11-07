<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject; 
use Illuminate\Validation\Rule; 
use Inertia\Inertia; 

class SubjectController extends Controller
{
  
public function index()
{
    $subjects = Subject::all(); 

    return Inertia::render('Admin/SubjectIndex', [
        'subjects' => $subjects
    ]);
}


  

    
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:subjects,name'],
            'code' => ['required', 'string', 'max:20', 'unique:subjects,code'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['active', 'inactive'])], 
        ]);

        $subject = Subject::create($validated);

        
        return response()->json($subject, 201);
    }

   
    public function show(Subject $subject) 
    {
        
        return response()->json($subject, 200);
    }

    
    public function update(Request $request, Subject $subject) 
    {
        
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('subjects')->ignore($subject->id)],
            'code' => ['required', 'string', 'max:20', Rule::unique('subjects')->ignore($subject->id)],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ]);

        
        $subject->update($validatedData);

        
        return response()->json($subject, 200);
    }

    
   public function destroy($id)
{
    $subject = Subject::findOrFail($id);
    $subject->delete();

    return redirect()->route('subjects.index')->with('success', 'Subject deleted successfully');
}

}