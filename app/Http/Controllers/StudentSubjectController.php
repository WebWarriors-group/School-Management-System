<?php

namespace App\Http\Controllers;
use App\Models\StudentSubject;
use App\Models\StudentAcademic;

use Illuminate\Http\Request;

class StudentSubjectController extends Controller
{
    
    public function index($reg_no)
{
    $student = StudentAcademic::with('subjects')->findOrFail($reg_no);

    $subjects = $student->subjects->map(function ($s) {
        return [
            'subject_id' => $s->subject_id,
            'name' => $s->subjects->name ?? 'Unknown',
        ];
    });

    return response()->json($subjects);
}

    
    public function create()
    {
        //
    }

   
    public function store(Request $request)
    {
        //
    }

  
    public function show(string $id)
    {
        //
    }

  
    public function edit(string $id)
    {
        //
    }

  
    public function update(Request $request, string $id)
    {
        //
    }

   
    public function destroy(string $id)
    {
        //
    }
}
