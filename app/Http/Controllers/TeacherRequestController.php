<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\TeacherAddress;
use App\Models\TeacherPersonal;
use App\Models\Qualification;
use App\Models\TeacherOtherServices;
use App\Models\TeacherRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;



class TeacherRequestController extends Controller
{
    public function index()
{
    $requests = TeacherRequest::all();
    
    $count = session('count', 0); // get current counter (default 0)
    //session(['count' => $count + 1]); // increment it

    return Inertia::render('Admin/TeacherRequests', [
        'requests' => $requests,
        //'redirected' => $requests->session()->get('redirected', false),
        'count' => $count,

    ]);
}

// public function approveRequest($id)
// {
//     $teacherRequest = TeacherRequest::findOrFail($id);

//     if ($teacherRequest->status !== 'pending') {
//         return response()->json(['message' => 'Request already processed.'], 400);
//     }

//     $formData = $teacherRequest->form_data;

// // Only decode if it's a string
// if (is_string($formData)) {
//     $formData = json_decode($formData, true);
// }

//     // Validate manually before proceeding (optional but good)
//     $validator = Validator::make($formData, [
//         'teacher_NIC' => 'required|string|max:12|unique:teacher_work_infos,teacher_NIC',
//         // Add other required validation rules here, or trust `store()` to handle it
//     ]);

//     if ($validator->fails()) {
//         return response()->json(['errors' => $validator->errors()], 422);
//     }

//     try {
//         // Create a new Illuminate Request object with decoded data
//         $fakeRequest = new Request($formData);

//         // Call the TeacherController's store method
//         $teacherController = new TeacherController();
//         $response = $teacherController->store($fakeRequest);

//         // Update the status of the original request
//         $teacherRequest->status = 'approved';
//         $teacherRequest->save();

//         return redirect()->back()->with('success', 'Teacher request approved and data stored successfully.');
//     } catch (\Exception $e) {
//         return response()->json(['error' => 'Approval failed: ' . $e->getMessage()], 500);
//     }
// }

public function approveRequest($id)
{
    $teacherRequest = TeacherRequest::findOrFail($id);

    if ($teacherRequest->status !== 'pending') {
        return response()->json(['message' => 'Request already processed.'], 400);
    }

    $formData = is_string($teacherRequest->form_data)
        ? json_decode($teacherRequest->form_data, true)
        : $teacherRequest->form_data;

    // ✅ Flatten nested data before creating fake request
    $flattened = array_merge(
        $formData,
        $formData['personal'] ?? [],
        $formData['teachersaddress'] ?? [],
        $formData['qualifications'] ?? [],
        $formData['teacherotherservice'] ?? []
    );

    // Remove nested objects so it doesn’t confuse validation
    unset(
        $flattened['personal'],
        $flattened['teachersaddress'],
        $flattened['qualifications'],
        $flattened['teacherotherservice']
    );

    try {
        $fakeRequest = new Request($flattened);

        $teacherController = new TeacherController();
        $response = $teacherController->store($fakeRequest);

        $teacherRequest->status = 'approved';
        $teacherRequest->save();

        return redirect()->back()->with('success', 'Teacher request approved and data stored successfully.');
    } catch (\Exception $e) {
        return response()->json(['error' => 'Approval failed: ' . $e->getMessage()], 500);
    }
}


// public function approveRequest($id)
// {
//     $teacherRequest = TeacherRequest::findOrFail($id);

//     if ($teacherRequest->status !== 'pending') {
//         return response()->json(['message' => 'Request already processed.'], 400);
//     }

//     // Decode form_data
//     $formData = is_string($teacherRequest->form_data)
//         ? json_decode($teacherRequest->form_data, true)
//         : $teacherRequest->form_data;

//     // Convert formData to Laravel Request
//     $fakeRequest = new \Illuminate\Http\Request();
//     $fakeRequest->replace($formData);

//     try {
//         $teacherController = new TeacherController();
//         $response = $teacherController->store($fakeRequest);

//         $teacherRequest->status = 'approved';
//         $teacherRequest->save();

//         return redirect()->back()->with('success', 'Teacher approved successfully.');
//     } catch (\Exception $e) {
//         return response()->json(['error' => 'Approval failed: ' . $e->getMessage()], 500);
//     }
// }


public function rejectRequest($id)
{
    //dd("HIT"); 
    // Find the teacher request by ID
    $teacherRequest = TeacherRequest::findOrFail($id);

    // Check if the request is already processed
    if ($teacherRequest->status !== 'pending') {
        return response()->json(['message' => 'Request has already been processed.'], 400);
    }

    // Reject the request by updating the status to 'rejected'
    $teacherRequest->status = 'rejected';
    $teacherRequest->save();

    // Optionally, you can delete the request from the 'teacher_requests' table if you prefer
    // $teacherRequest->delete();

    // Respond with a success message
    return response()->json(['message' => 'Request rejected successfully.'], 200);
}



}
