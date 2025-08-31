<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Models\SubjectTeacher;

class TimetableController extends Controller
{
    public function generate()
    {
        // Get distinct classes as "Grade Section" strings from your class_subject_teachers relationships
        $classes = SubjectTeacher::with('class')
            ->get()
            ->pluck('class')
            ->unique('class_id')
            ->map(fn($cls) => $cls->grade . ' ' . $cls->section)
            ->values()
            ->toArray();

        // Load all assignments with related data eagerly
        $assignmentsRaw = SubjectTeacher::with(['class', 'subject', 'teacher'])->get();

        // Format assignments to send to API
        $assignments = $assignmentsRaw->map(function ($item) {
            return [
                'class_' => $item->class->grade . ' ' . $item->class->section,
                'subject' => $item->subject->subject_name,
                'teacher' => $item->teacher->teacher_NIC, // or teacher_NIC if you want IDs
                'periods_per_week' => 5, // fixed value; adjust or calculate dynamically
            ];
        })->toArray();

        // Payload to send to FastAPI
        $payload = [
            'classes' => $classes,
            'assignments' => $assignments,
            'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'periods_per_day' => 6,
        ];

        $response = Http::post('http://127.0.0.1:8001/timetable', $payload);

        if (!$response->successful()) {
            dd('API call failed', $response->status(), $response->body());
        }

        $timetable = $response->json();
       // dd($timetable);

        if (isset($timetable['error'])) {
            dd('Timetable error:', $timetable['error']);
        }

        return inertia('TimetableResult', ['timetable' => $timetable]);
    }
}
