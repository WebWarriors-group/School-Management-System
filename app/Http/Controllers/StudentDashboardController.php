<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\StudentAcademic;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class StudentDashboardController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        $student = StudentAcademic::with([
            'personal',
            'class',
            'subjects.subjects',
        ])->where('user_id', $user->id)->firstOrFail();

        $latestMarks = $student->marks()
            ->with('subject')
            ->orderByDesc('year')
            ->orderByDesc('term')
            ->limit(5)
            ->get()
            ->map(function ($m) {
                return [
                    'subject_id' => $m->subject_id,
                    'subject_name' => optional($m->subject)->subject_name,
                    'marks_obtained' => (int) ($m->marks_obtained ?? 0),
                    'grade' => (string) ($m->grade ?? ''),
                    'term' => $m->term,
                    'year' => $m->year,
                ];
            })
            ->values();

        $availableSubjects = $student->subjects()
            ->with('subjects')
            ->get()
            ->map(function ($ss) {
                return [
                    'subject_id'   => $ss->subject_id,
                    'subject_name' => optional($ss->subjects)->subject_name,
                    'status'       => 'active',
                ];
            })
            ->values();

        $notifications = Event::query()
            ->orderBy('start', 'asc')
            ->limit(10)
            ->get()
            ->map(fn ($e) => [
                'id'    => $e->id,
                'title' => $e->title,
                'start' => $e->start,
                'end'   => $e->end,
            ])
            ->values();

        $todaySchedule = [];

        $dashboard = [
            'classes'       => [$student->class],
            'upcomingExams' => [],
            'latestGrades'  => $latestMarks,
            'feeStatus'     => null,
            'scholarship'   => ['status' => $student->scholarship_status],
        ];

        return Inertia::render('Student/dashboard', [
            'student'          => $student,
            'dashboard'        => array_merge($dashboard, [
                'monthlyMarks'   => Inertia::lazy(fn () => $this->buildMonthlyMarks($student)),
                'grades'         => Inertia::lazy(fn () => $this->buildGrades($student)),
                'attendance'     => Inertia::lazy(fn () => $this->buildAttendance($student)),
                'teacherFeedback'=> Inertia::lazy(fn () => []),
            ]),
            'notifications'    => $notifications,
            'todaySchedule'    => $todaySchedule,
            'availableSubjects'=> $availableSubjects,
        ]);
    }

    private function buildGrades(StudentAcademic $student): array
    {
        return $student->marks()
            ->with('subject')
            ->get()
            ->map(function ($m) {
                return [
                    'id'               => (string) $m->id,
                    'subject'          => optional($m->subject)->subject_name ?? (string) $m->subject_id,
                    'assessment_type'  => 'exam',
                    'title'            => $m->term ? ($m->term . ' Exam') : 'Assessment',
                    'marks_obtained'   => (int) ($m->marks_obtained ?? 0),
                    'max_marks'        => 100,
                    'grade'            => (string) ($m->grade ?? ''),
                    'date'             => optional($m->created_at)->toDateString() ?? now()->toDateString(),
                    'teacher_comments' => null,
                ];
            })
            ->values()
            ->all();
    }

    private function buildMonthlyMarks(StudentAcademic $student): array
    {
        $marks = $student->marks()->select('marks.*')->get();

        $grouped = $marks
            ->filter(function ($m) {
                return $m->created_at instanceof \Illuminate\Support\Carbon
                    && $m->created_at->year === now()->year;
            })
            ->groupBy(function ($m) {
                return $m->created_at->month;
            });

        if ($grouped->isEmpty()) {
            return [];
        }

        return $grouped
            ->map(function (Collection $items, $month) {
                $avg = $items->avg(function ($m) {
                    return (float) ($m->marks_obtained ?? 0);
                });
                return [
                    'month'     => (int) $month,
                    'avg_marks' => round($avg, 2),
                ];
            })
            ->sortKeys()
            ->values()
            ->all();
    }

    private function buildAttendance(StudentAcademic $student): array
    {
        $records = $student->attendance()
            ->whereYear('date', now()->year)
            ->get();

        $normalize = function ($status) {
            $s = strtoupper((string) $status);
            return in_array($s, ['P', 'PR', 'PRESENT', '1'], true);
        };

        $total = $records->count();
        $present = $records->filter(fn ($r) => $normalize($r->status))->count();
        $overall = $total > 0 ? round($present * 100 / $total) : 0;

        $monthly = $records
            ->groupBy(function ($r) {
                return Carbon::parse($r->date)->format('F');
            })
            ->map(function (Collection $items, $label) use ($normalize) {
                $totalDays = $items->count();
                $presentDays = $items->filter(fn ($r) => $normalize($r->status))->count();
                $percentage = $totalDays > 0 ? round($presentDays * 100 / $totalDays) : 0;
                return [
                    'month'         => $label,
                    'present_days'  => $presentDays,
                    'total_days'    => $totalDays,
                    'percentage'    => $percentage,
                ];
            })
            ->sortKeys(function ($a, $b) {
                return Carbon::parse($a)->month <=> Carbon::parse($b)->month;
            })
            ->values()
            ->all();

        $recentAbsences = $records
            ->filter(function ($r) use ($normalize) {
                return ! $normalize($r->status);
            })
            ->sortByDesc('date')
            ->take(5)
            ->map(function ($r) {
                return [
                    'date'   => (string) $r->date,
                    'reason' => null,
                ];
            })
            ->values()
            ->all();

        return [
            'overall_percentage' => $overall,
            'monthly_data'       => $monthly,
            'recent_absences'    => $recentAbsences,
        ];
    }
}
