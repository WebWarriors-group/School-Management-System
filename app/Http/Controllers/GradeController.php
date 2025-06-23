<?php
// app/Http/Controllers/Admin/GradeController.php


namespace App\Http\Controllers;
use App\Http\Controllers;
use App\Models\Grade;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/subject', [
            'grades' => Grade::with('subject')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Grades/Create', [
            'subjects' => Subject::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'grade' => 'required|numeric|max:255',
             'subject_type' => 'required|string|max:255',
            'subject_id' => 'required|exists:subjects,subject_id',
            
        ]);

        Grade::create($request->only('grade','subject_type', 'subject_id'));

         return redirect()->back();
           
        
    }

    public function edit(Grade $grade)
    {
        return Inertia::render('Admin/Grades/Edit', [
            'grade' => $grade,
            'subjects' => Subject::all()
        ]);
    }

    public function update(Request $request, Grade $grade)
    {
        $request->validate([
            'grade' => 'required|string|max:255',
            'subject_id' => 'required|exists:subjects,subject_id',
        ]);

        $grade->update($request->only('grade', 'subject_id'));

        return redirect()->route('admin.grades.index');
    }

    public function destroy(Grade $grade)
    {
        $grade->delete();

        return redirect()->back();
    }
}
