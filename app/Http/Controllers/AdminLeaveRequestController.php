<?php

// app/Http/Controllers/AdminLeaveRequestController.php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\TeacherLeaveRequest;
use App\Models\TeacherAttendance;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class AdminLeaveRequestController extends Controller
{
    public function index()
{
    // Cache the leave requests for 10 minutes (600 seconds)
    $leaveRequests = Cache::remember('teacher_leave_requests', 600, function () {
        return TeacherLeaveRequest::orderBy('created_at', 'desc')->get();
    });

    Log::info('AdminLeaveRequestController@index called', [
        'leaveRequests_count' => $leaveRequests->count()
    ]);

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
    

public function getTeacherStats($nic)
{
    
    $present = TeacherAttendance::where('teacher_NIC', $nic)
        ->where('status', 'Present')
        ->count();

    
    $absent = TeacherAttendance::where('teacher_NIC', $nic)
        ->where('status', 'Absent')
        ->count();

    
    $leaves =TeacherLeaveRequest::where('teacher_NIC', $nic)
        ->where('status', 'Approved')
        ->get();

    
    $leaveRequestsCount = $leaves->count();

    
    $totalLeaveDays = $leaves->reduce(function ($carry, $leave) {
        $start = \Carbon\Carbon::parse($leave->leave_start_date);
        $end = \Carbon\Carbon::parse($leave->leave_end_date);

        
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
public function getRequestCounts()
{
    return response()->json([
        'pending' => TeacherLeaveRequest::where('status', 'Pending')->count(),
        'approved' => TeacherLeaveRequest::where('status', 'Approved')->count(),
        'rejected' => TeacherLeaveRequest::where('status', 'Rejected')->count(),
    ]);
}

}

