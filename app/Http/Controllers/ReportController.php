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
        'class',
    ])->where('reg_no', $reg_no)->first();

    if (!$student) {
        return Inertia::render('Marks/ReportPage', [
            'student' => null,
        ]);
    }

    $totalMarks = $student->marks->sum('marks_obtained');
    $averageMarks = $student->marks->count() > 0 ? $student->marks->avg('marks_obtained') : 0;
    $studentsTotals = StudentAcademic::with('marks')
        ->get()
        ->map(function ($s) {
            return [
                'reg_no' => $s->reg_no,
                'total_marks' => $s->marks->sum('marks_obtained'),
            ];
        })
        ->sortByDesc('total_marks')
        ->values();

    $rank = 0;
    $prevMark = null;
    $skip = 0;

    $studentsTotals = $studentsTotals->map(function ($item) use (&$rank, &$prevMark, &$skip) {
        if ($prevMark !== $item['total_marks']) {
            $rank = $rank + 1 + $skip;
            $skip = 0;
        } else {
            $skip++;
        }
        $prevMark = $item['total_marks'];
        $item['rank'] = $rank;
        return $item;
    });

      $studentRank = $studentsTotals->firstWhere('reg_no', $reg_no)['rank'] ?? 'N/A';

    $highestMarksBySubject = Marks::select('subject_id', DB::raw('MAX(marks_obtained) as highest'))
    ->groupBy('subject_id')
    ->pluck('highest', 'subject_id');

    $marksData = $student->marks->map(function ($mark) use ($highestMarksBySubject) {
        return [
            'subject_id' => $mark->subject_id,
            'subject_name' => $mark->subject->subject_name ?? 'Unknown Subject',
            'marks_obtained' => $mark->marks_obtained,
            'highest_mark_in_subject' => $highestMarksBySubject[$mark->subject_id] ?? 'N/A',
        ];
    })->toArray();

    return Inertia::render('Marks/ReportPage', [
        'student' => [
            'full_name' => $student->studentPersonal->full_name ?? 'N/A',
            'reg_no' => $student->reg_no,
            'class_name' => $student->class_name ?? ($student->class->class_name  ?? 'N/A'),
            'grade' => $student->grade ?? ($student->class->grade ?? 'N/A'),
            'section' => $student->section ?? ($student->class->section ?? 'N/A'),
            'class_teacher_name' => optional(optional(optional($student->class)->teachers)->personal)->Full_name ?? 'N/A',
            'total_marks' => $totalMarks,
            'average_marks' => round($averageMarks, 2),
            'rank' => $studentRank,
            'marks' => $marksData,
        ],
    ]);
}

}