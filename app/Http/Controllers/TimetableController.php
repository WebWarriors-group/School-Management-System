<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class TimetableController extends Controller
{
    public function generate()
    {
        $payload = [
            'classes' => ['Grade 1'],
            'assignments' => [
                [
                    'class_' => 'Grade 1',
                    'subject' => 'Math',
                    'teacher' => 'NIC001',
                    'periods_per_week' => 6,
                ],
                [
                    'class_' => 'Grade 1',
                    'subject' => 'English',
                    'teacher' => 'NIC002',
                    'periods_per_week' => 5,
                ],
                [
                    'class_' => 'Grade 1',
                    'subject' => 'Science',
                    'teacher' => 'NIC003',
                    'periods_per_week' => 4,
                ],
                [
                    'class_' => 'Grade 1',
                    'subject' => 'History',
                    'teacher' => 'NIC004',
                    'periods_per_week' => 3,
                ],
            ],
            'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'periods_per_day' => 6,
        ];

        $response = Http::post('http://127.0.0.1:8001/timetable', $payload);

        if (!$response->successful()) {
            dd('API failed', $response->status(), $response->body());
        }

        $timetable = $response->json();

        if (isset($timetable['error'])) {
            dd('Timetable error:', $timetable['error']);
        }

        return inertia('TimetableResult', ['timetable' => $timetable]);
    }
}
