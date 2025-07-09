<?php

// app/Http/Controllers/TeacherLeaveRequestController.php

namespace App\Http\Controllers;

use App\Models\TeacherLeaveRequest;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherLeaveRequestController extends Controller
{
       public function leavereqstore(Request $request)
       
{
     \Log::info('form submitted 1');

    // ✅ Coerce checkbox string to real boolean (Laravel expects true/false not 'false')
    $request->merge([
        'requires_substitute' => filter_var($request->input('requires_substitute'), FILTER_VALIDATE_BOOLEAN),
    ]);

    // ✅ Validate inputs
    $validated = $request->validate([
        'leave_type' => 'required|string',
        'leave_start_date' => 'required|date',
        'leave_end_date' => 'required|date|after_or_equal:leave_start_date',
        'reason' => 'required|string',
        'requires_substitute' => 'boolean',
        'substitute_teacher_name' => 'nullable|string|required_if:requires_substitute,true',
        'substitute_teacher_contact' => 'nullable|string|required_if:requires_substitute,true',
        'comments' => 'nullable|string',
        'supporting_document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
    ]);

    \Log::info('form submitted 2');

    // Get the authenticated user
    $user = auth()->user();
    \Log::info('Teacher Leave Request - Authenticated User ID: ' . $user->id);


    // 🔽 PLACE THIS HERE: Find the teacher by user_id
    $teacher = Teacher::where('user_id', $user->id)->first();

    // Handle case where teacher record doesn't exist
    if (!$teacher) {
        return back()->withErrors(['message' => 'Teacher not found.']);
    }

    // Handle file upload
    if ($request->hasFile('supporting_document')) {
        $file = $request->file('supporting_document');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('leave_documents', $filename, 'public');
        $validated['supporting_document'] = $path;
    }

    // Attach teacher NIC and default status
    $validated['teacher_NIC'] = $teacher->teacher_NIC;
    $validated['status'] = 'Pending';

    // Save leave request
    TeacherLeaveRequest::create($validated);
    // Teacher::create($validated);

    return redirect()->back()->with('success', 'Leave request submitted.');
}
public function dashboard()
{
    $user = auth()->user();
    $teacher = Teacher::where('user_id', $user->id)->first();

    $latestLeave = null;

    if ($teacher) {
        $latestLeave = TeacherLeaveRequest::where('teacher_NIC', $teacher->teacher_NIC)
            ->orderByDesc('created_at')
            ->first();
    }

    return Inertia::render('Teacher/dashboard', [
        'latestLeaveRequest' => $latestLeave,
    ]);
}


}
