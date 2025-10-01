<?php

namespace App\Http\Controllers;
use App\Models\StudentSubject;
use App\Models\StudentAcademic;

use Illuminate\Http\Request;

class StudentSubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($reg_no)
{
    $student = StudentAcademic::with('subjects')->findOrFail($reg_no);

    $subjects = $student->subjects->map(function ($s) {
        return [
            'subject_id' => $s->subject_id,
            'subject_name' => $s->subjects->subject_name ?? 'Unknown',
        ];
    });

    return response()->json($subjects);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
