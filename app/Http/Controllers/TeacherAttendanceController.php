<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TeacherAttendance;
use App\Models\Teacher;
use Inertia\Inertia;

class TeacherAttendanceController extends Controller
{
    // TeacherAttendanceController.php

public function index(Request $request)
{
    $date = date('Y-m-d');
    $showAll = $request->query('show_all', false);

    $allTeachers = Teacher::with('personal')->get();

    // Get all attendance for today keyed by NIC
    $attendanceToday = TeacherAttendance::where('date', $date)
        ->pluck('status', 'teacher_NIC')
        ->toArray();

    // Prepare teachers with status
    $teachersWithStatus = $allTeachers->map(function ($teacher) use ($attendanceToday) {
        return [
            'teacher_NIC' => $teacher->teacher_NIC,
            'name' => $teacher->personal->Full_name ?? '',
            'status' => $attendanceToday[$teacher->teacher_NIC] ?? 'Present',
        ];
    });

    if (!$showAll) {
        // Filter only present teachers
        $teachersWithStatus = $teachersWithStatus->filter(fn($t) => $t['status'] === 'Present')->values();
    }

    return Inertia::render('Admin/teacherAttendance', [
        'teachersFromServer' => $teachersWithStatus,
        'showAll' => $showAll,
    ]);
}



   public function store(Request $request)
{
    $validated = $request->validate([
        'date' => 'required|date',
        'attendance' => 'required|array',
        'attendance.*.teacher_NIC' => 'required|string',
        'attendance.*.status' => 'required|in:Present,Absent',
    ]);

    foreach ($validated['attendance'] as $record) {
        TeacherAttendance::updateOrCreate(
            [
                'teacher_NIC' => $record['teacher_NIC'],
                'date' => $validated['date'],
            ],
            [
                'status' => $record['status'],
            ]
        );
    }

    // Check if show_all was in the query and redirect accordingly
    $showAll = $request->query('show_all', false);

    if ($showAll) {
        return redirect()->route('teacher.attendance.index', ['show_all' => 'true'])
                         ->with('success', 'Attendance saved successfully.');
    } else {
        return redirect()->route('teacher.attendance.index')
                         ->with('success', 'Attendance saved successfully.');
    }
}
public function summary(Request $request)
{
    $today = now()->toDateString();

    $present = TeacherAttendance::where('date', $today)
        ->where('status', 'Present')
        ->count();

    $absent = TeacherAttendance::where('date', $today)
        ->where('status', 'Absent')
        ->count();

    return response()->json([
        'present' => $present,
        'absent' => $absent,
        'date' => $today,
    ]);
}

}
