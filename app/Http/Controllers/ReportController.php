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
            'personal',
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
                'name' => $mark->subject->subject_name ?? 'Unknown Subject',
                'marks_obtained' => $mark->marks_obtained,
                'highest_mark_in_subject' => $highestMarksBySubject[$mark->subject_id] ?? 'N/A',
            ];
        })->toArray();

        return Inertia::render('Marks/ReportPage', [
            'student' => [
                'full_name' => $student->personal->full_name ?? 'N/A',
                'reg_no' => $student->reg_no,
                'class_name' => $student->class_name ?? ($student->class->class_name ?? 'N/A'),
                'grade' => $student->grade ?? ($student->class->grade ?? 'N/A'),
                'section' => $student->section ?? ($student->class->section ?? 'N/A'),
                'class_teacher_name' => optional(optional(optional($student->class)->teacher)->personal)->full_name ?? 'N/A',
                'total_marks' => $totalMarks,
                'average_marks' => round($averageMarks, 2),
                'rank' => $studentRank,
                'marks' => $marksData,
            ],
        ]);
    }

   public function overallPerformance()
{
    $totalStudents = StudentAcademic::count();

    $maleStudents = StudentAcademic::whereHas('personal', fn($q) => $q->where('gender','Male'))->count();
    $femaleStudents = StudentAcademic::whereHas('personal', fn($q) => $q->where('gender','Female'))->count();

$studentsPerClass = ClassModel::with('studentacademics.personal')->get()->map(function($c) {
    $maleCount = $c->studentacademics->where('personal.gender', 'Male')->count();
    $femaleCount = $c->studentacademics->where('personal.gender', 'Female')->count();
    $total = $c->studentacademics->count();

    return [
        'class_id' => $c->class_id,
        'section' => $c->section,
        'class' => ['name' => $c->class_name],
        'total' => $total,
        'male' => $maleCount,
        'female' => $femaleCount,
    ];
});



$avgByClass = ClassModel::with('studentacademics.marks')->get()->map(function($c) {
    $allMarks = $c->studentacademics->flatMap(fn($s) => $s->marks->pluck('marks_obtained'));
    $avgMarks = $allMarks->count() > 0 ? round($allMarks->avg(), 2) : 0;

    return [
        'class_id' => $c->class_id,
        'section' => $c->section,
        'class' => ['name' => $c->class_name],
        'avg_marks' => $avgMarks,
    ];
});



    $avgBySubject = Subject::with('marks')->get()->map(fn($s) => [
        'subject_id' => $s->subject_id,
        'name' => $s->subject_name ?? $s->name,
        'avg_marks' => round($s->marks->avg('marks_obtained') ?? 0, 2),
    ]);

    return Inertia::render('Admin/OverallPerformance', [
        'totalStudents' => $totalStudents,
        'maleStudents' => $maleStudents,
        'femaleStudents' => $femaleStudents,
        'studentsPerClass' => $studentsPerClass,
        'avgByClass' => $avgByClass,
        'avgBySubject' => $avgBySubject,
        'auth' => [
        'user' => auth()->user() ?? (object)[
            'name' => 'Guest',
            'avatar' => '/default-avatar.png',
            'email' => '',
        ],
    ],
    ]);
}

 };





