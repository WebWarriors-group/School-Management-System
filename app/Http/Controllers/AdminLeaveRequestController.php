<?php

// app/Http/Controllers/AdminLeaveRequestController.php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\TeacherLeaveRequest;
use App\Models\TeacherAttendance;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminLeaveRequestController extends Controller
{
    public function index()
    {
        $leaveRequests = TeacherLeaveRequest::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/LeaveRequests', [
            'leaveRequests' => $leaveRequests,
        ]);
    }

    public function approve($id)
    {
        $request = TeacherLeaveRequest::findOrFail($id);
        $request->update(['status' => 'Approved']);

        return redirect()->back()->with('success', 'Leave approved.');
    }

    public function reject($id)
    {
        $request = TeacherLeaveRequest::findOrFail($id);
        $request->update(['status' => 'Rejected']);

        return redirect()->back()->with('success', 'Leave rejected.');
    }
    // In TeacherAttendanceController.php

public function getTeacherStats($nic)
{
    // Count present days
    $present = TeacherAttendance::where('teacher_NIC', $nic)
        ->where('status', 'Present')
        ->count();

    // Count absent days
    $absent = TeacherAttendance::where('teacher_NIC', $nic)
        ->where('status', 'Absent')
        ->count();

    // Get all approved leave requests for this teacher
    $leaves =TeacherLeaveRequest::where('teacher_NIC', $nic)
        ->where('status', 'Approved')
        ->get();

    // Number of leave requests taken
    $leaveRequestsCount = $leaves->count();

    // Calculate total leave days across all leave requests
    $totalLeaveDays = $leaves->reduce(function ($carry, $leave) {
        $start = \Carbon\Carbon::parse($leave->leave_start_date);
        $end = \Carbon\Carbon::parse($leave->leave_end_date);

        // inclusive days count
        $days = $start->diffInDays($end) + 1;

        return $carry + $days;
    }, 0);

    return response()->json([
        'teacher_NIC' => $nic,
        'present' => $present,
        'absents' => $absent,
        'leave_requests' => $leaveRequestsCount,
        'total_leave_days' => $totalLeaveDays,
    ]);
}
public function getTodayLeaveCount()
{
    $today = Carbon::today()->toDateString();

    $count = TeacherLeaveRequest::where('status', 'Approved')
        ->whereDate('leave_start_date', '<=', $today)
        ->whereDate('leave_end_date', '>=', $today)
        ->count();

    return response()->json(['count' => $count]);
}
}

