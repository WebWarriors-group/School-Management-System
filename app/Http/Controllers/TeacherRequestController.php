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
    
    $count = session('count', 0); 

    return Inertia::render('Admin/TeacherRequests', [
        'requests' => $requests,
        
        'count' => $count,

    ]);
}



public function approveRequest($id)
{
    $teacherRequest = TeacherRequest::findOrFail($id);

    if ($teacherRequest->status !== 'pending') {
        return response()->json(['message' => 'Request already processed.'], 400);
    }

    $formData = is_string($teacherRequest->form_data)
        ? json_decode($teacherRequest->form_data, true)
        : $teacherRequest->form_data;

    
    $flattened = array_merge(
        $formData,
        $formData['personal'] ?? [],
        $formData['teachersaddress'] ?? [],
        $formData['qualifications'] ?? [],
        $formData['teacherotherservice'] ?? []
    );

    
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





public function rejectRequest($id)
{
    
    $teacherRequest = TeacherRequest::findOrFail($id);

   
    if ($teacherRequest->status !== 'pending') {
        return response()->json(['message' => 'Request has already been processed.'], 400);
    }

    
    $teacherRequest->status = 'rejected';
    $teacherRequest->save();

   
    return response()->json(['message' => 'Request rejected successfully.'], 200);
}



}
