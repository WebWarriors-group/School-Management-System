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
        // Fetch the student academic record, eager loading both marks and personal info.
        // The relationship name 'studentPersonal' must match the method name in StudentAcademic model.
        $student = StudentAcademic::with(['marks', 'studentPersonal'])->where('reg_no', $reg_no)->first();

        if (!$student) {
            // If student is not found, render the ReportPage with null student data.
            return Inertia::render('Marks/ReportPage', [
                'student' => null,
            ]);
        }

        // If student is found, convert the student model to an array,
        // which will include the loaded 'marks' and 'student_personal' relationships.
        return Inertia::render('Marks/ReportPage', [
            'student' => $student->toArray(),
        ]);
    }
}
