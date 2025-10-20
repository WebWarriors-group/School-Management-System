<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentAttendanceController extends Controller
{
    
    public function index(Request $request)
    {
        return Inertia::render('Attendance/AttendancePage');
    }

    
    public function create(Request $request)
    {
        $user = Auth::user();
        $query = Attendance::query();

        
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

        
        if ($request->has('reg_no')) {
            $query->where('reg_no', 'LIKE', '%' . $request->input('reg_no') . '%');
        }

        if ($request->has('date')) {
            $query->where('date', $request->input('date'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        
        $attendances = $query->paginate($request->get('limit', 10));

        
        $totalAttendanceCount = Attendance::count();

        
        return response()->json($attendances)->header('x-total-count', $totalAttendanceCount);
    }

    
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

    
    public function show($id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        return response()->json($attendance);
    }

    
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

    
    public function destroy($id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $attendance->delete();

        return response()->json(['message' => 'Attendance deleted successfully']);
    }

    
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
