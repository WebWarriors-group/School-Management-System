<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentAttendanceController extends Controller
{
    // Load the Attendance Page
    public function index(Request $request)
    {
        return Inertia::render('Attendance/AttendancePage');
    }

    // Fetch all attendance records (with filters)
    public function create(Request $request)
    {
        $user = Auth::user();
        $query = Attendance::query();

        // If logged-in user is a teacher → fetch students of their class
        if ($user->teacher()->exists()) {
            $teacher = $user->teacher()->with('class.studentacademics')->first();

            if ($teacher && $teacher->class && $teacher->class->studentacademics) {
                $studentRegNos = $teacher->class->studentacademics
                    ->pluck('reg_no')
                    ->unique()
                    ->toArray();

                $query->whereIn('reg_no', $studentRegNos);
            }
        }

        // Apply filters
        if ($request->has('reg_no')) {
            $query->where('reg_no', 'LIKE', '%' . $request->input('reg_no') . '%');
        }

        if ($request->has('date')) {
            $query->where('date', $request->input('date'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        // Pagination
        $attendances = $query->paginate($request->get('limit', 10));

        // Get the total number of records (before pagination)
        $totalAttendanceCount = Attendance::count();

        // Return JSON with total count header
        return response()->json($attendances)->header('x-total-count', $totalAttendanceCount);
    }

    // Store attendance records
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reg_no' => 'required|integer',
            'date' => 'required|date',
            'status' => 'required|in:Present,Absent,Late,Excused',
        ]);

        $attendance = Attendance::updateOrCreate(
            [
                'reg_no' => $validated['reg_no'],
                'date' => $validated['date'],
            ],
            [
                'status' => $validated['status'],
            ]
        );

        return response()->json([
            'message' => 'Attendance saved successfully',
            'attendance' => $attendance
        ], 201);
    }

    // Fetch a specific attendance record
    public function show($id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        return response()->json($attendance);
    }

    // Update attendance
    public function update(Request $request, $id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $validated = $request->validate([
            'reg_no' => 'required|integer',
            'date' => 'required|date',
            'status' => 'required|in:Present,Absent,Late,Excused',
        ]);

        $attendance->update($validated);

        return response()->json([
            'message' => 'Attendance updated successfully',
            'attendance' => $attendance
        ]);
    }

    // Delete attendance
    public function destroy($id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $attendance->delete();

        return response()->json(['message' => 'Attendance deleted successfully']);
    }

    // Summary of today's attendance
    public function summary()
    {
        $today = now()->toDateString();

        $present = Attendance::where('date', $today)->where('status', 'Present')->count();
        $absent = Attendance::where('date', $today)->where('status', 'Absent')->count();
        $late = Attendance::where('date', $today)->where('status', 'Late')->count();
        $excused = Attendance::where('date', $today)->where('status', 'Excused')->count();

        return response()->json([
            'date' => $today,
            'present' => $present,
            'absent' => $absent,
            'late' => $late,
            'excused' => $excused,
        ]);
    }
}
