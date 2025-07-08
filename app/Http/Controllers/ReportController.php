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
                'subject_name' => $mark->subject->subject_name ?? 'Unknown Subject',
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

    // Inside ReportController.php

// Inside ReportController.php

public function overallPerformance()
{
    $totalStudents = StudentAcademic::count();

    $genderCounts = StudentAcademic::select('students_personal_info.gender', DB::raw('COUNT(*) as count'))
        ->join('students_personal_info', 'student_academic_info.reg_no', '=', 'students_personal_info.reg_no')
        ->groupBy('students_personal_info.gender')
        ->pluck('count', 'gender');

    $studentsPerClass = ClassModel::select(
        'class_id',
        'class_name',
        'grade',
        DB::raw('(SELECT COUNT(*) FROM student_academic_info WHERE student_academic_info.class_id = classes.class_id) as total')
    )
    ->orderBy('grade')
    ->orderBy('class_name')
    ->get()
    ->map(function ($row) {
        return [
            'class_id' => $row->class_id,
            'total' => $row->total,
            'class' => [
                'name' => $row->grade . '-' . $row->class_name,
            ],
        ];
    });

    // ✅ Convert avg_marks to float for safety
    $avgByClass = Marks::select('student_academic_info.class_id', DB::raw('AVG(marks.marks_obtained) as avg_marks'))
        ->join('student_academic_info', 'marks.reg_no', '=', 'student_academic_info.reg_no')
        ->groupBy('student_academic_info.class_id')
        ->get()
        ->map(function ($item) {
            return [
                'class_id' => $item->class_id,
                'avg_marks' => (float) $item->avg_marks,
            ];
        });

    return Inertia::render('Admin/OverallPerformance', [
        'totalStudents' => $totalStudents,
        'maleStudents' => $genderCounts['Male'] ?? 0,
        'femaleStudents' => $genderCounts['Female'] ?? 0,
        'studentsPerClass' => $studentsPerClass,
        'avgByClass' => $avgByClass,
    ]);
}


}
