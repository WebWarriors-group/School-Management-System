<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentAcademic;
use App\Models\Marks;
use App\Models\StudentPersonal;
use App\Models\Subject;
use App\Models\ClassModel;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function show($reg_no)
{
    $student = StudentAcademic::with([
        'marks.subject',
        'studentPersonal',
        'academicClass',
    ])->where('reg_no', $reg_no)->first();

    if (!$student) {
        return Inertia::render('Marks/ReportPage', [
            'student' => null,
        ]);
    }

    $totalMarks = $student->marks->sum('marks_obtained');
    $averageMarks = $student->marks->count() > 0 ? $student->marks->avg('marks_obtained') : 0;
    $studentRank = 1; // Replace with your real ranking logic if any

    $marksData = $student->marks->map(function ($mark) {
        return [
            'subject_id' => $mark->subject_id,
            'subject_name' => $mark->subject->name ?? 'Unknown Subject',
            'marks_obtained' => $mark->marks_obtained,
            'highest_mark_in_subject' => $mark->subject->highest_mark ?? 'N/A',
        ];
    })->toArray();

    return Inertia::render('Marks/ReportPage', [
        'student' => [
            'full_name' => $student->studentPersonal->full_name ?? 'N/A',
            'reg_no' => $student->reg_no,
            'class_name' => $student->class_name ?? ($student->academicClass->name ?? 'N/A'),
            'grade' => $student->grade ?? ($student->academicClass->grade ?? 'N/A'),
            'section' => $student->section ?? ($student->academicClass->section ?? 'N/A'),
            'class_teacher_name' => $student->class_teacher_name ?? 'N/A',
            'total_marks' => $totalMarks,
            'average_marks' => round($averageMarks, 2),
            'rank' => $studentRank,
            'marks' => $marksData,
        ],
    ]);
}

}