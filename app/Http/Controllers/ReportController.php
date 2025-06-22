<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentAcademic;
use Inertia\Inertia;
use App\Models\Marks; // Make sure this is imported
use App\Models\StudentPersonal; // NEW: Ensure this is imported if you're not using it directly but want to be explicit

class ReportController extends Controller
{
    /**
     * Display the student report page by fetching data from both academic and personal tables
     * and passing it directly to the Inertia frontend component.
     *
     * @param string $reg_no The registration number from the URL.
     * @return \Inertia\Response
     */
    public function show($reg_no)
    {
       
       $student = StudentAcademic::with(['marks.subject', 'studentPersonal'])
    ->where('reg_no', $reg_no)
    ->first();

        if (!$student) {
            
            return Inertia::render('Marks/ReportPage', [
                'student' => null,
            ]);
        }

        
        return Inertia::render('Marks/ReportPage', [
            'student' => $student->toArray(),
        ]);
    }
}
