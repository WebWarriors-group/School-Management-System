<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\TeacherAddress;
use App\Models\TeacherPersonal;
use App\Models\Qualification;
use App\Models\TeacherOtherServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;


class TeacherController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Teacher/dashboard');
    }
    /**
     * Display a listing of teachers.
     */
    public function index(): JsonResponse
    {
        $teachers = Teacher::with([
            'teachersaddress', 'personal', 'qualifications', 'teacherotherservice'
        ])->get();

        return response()->json($teachers);
    }
    public function profile()
{
    $teacher = Teacher::where('teacher_nic', Auth::user()->teacher_NIC)->first();

    if (!$teacher) {
        return redirect()->route('dashboard')->withErrors('Profile not found.');
    }

    return Inertia::render('Teacher/Profile', [
        'teacher' => $teacher
    ]);
}


    /**
     * Store a newly created teacher record.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the input data for Teacher Work Info
        $validatedData = $request->validate([
            'teacher_NIC' => 'required|string|max:12|unique:teacher_work_infos,teacher_NIC',

            'appointed_date' => 'required|date',
            'work_acceptance_date' => 'required|date',
            'appointment_type' => 'required|string',
            'salary_increment_date' => 'required|date',
            'current_grade_of_teaching_service' => 'required|in:Grade I,Grade II,Grade III',
            'work_acceptance_date_school' => 'required|date',
            'temporary_attachedschool_or_institute_name' => 'required|string|max:100',
            'appointed_subject' => 'required|string|max:20',
            'which_grades_teaching_done' => 'required|string',
            'current_teaching_subject' => 'required|string|max:20',
            'other_subjects_taught' => 'required|string',
            'assigned_class' => 'required|string',
            'other_responsibilities_assigned' => 'required|string',
            '150_hrs_tamil_course_completed' => 'boolean',
            'commuting_from_school' => 'nullable|in:Home,Boarding,Hostel,Other',
            'distance_from_school' => 'required|numeric',
            'commuting_method_to_school' => 'required|in:Bicycle,MotorBike,Car,Bus,Threewheeler,Walk,Other',
            'number_in_sign_sheet' => 'required|string|max:20',
            'number_in_salary_sheet' => 'required|string|max:20',
        ]);

        // Create the teacher in teacher_work_infos table
        $teacherWorkInfo = Teacher::create([
            'teacher_NIC' => $validatedData['teacher_NIC'],
            'appointed_date' => $validatedData['appointed_date'],
            'work_acceptance_date' => $validatedData['work_acceptance_date'],
            'appointment_type' => $validatedData['appointment_type'],
            'salary_increment_date' => $validatedData['salary_increment_date'] ?? null, // Use null if not provided
            'current_grade_of_teaching_service' => $validatedData['current_grade_of_teaching_service'] ?? null, // Use null if not provided
            'work_acceptance_date_school' => $validatedData['work_acceptance_date_school'] ?? null, // Use null if not provided
            'temporary_attachedschool_or_institute_name' => $validatedData['temporary_attachedschool_or_institute_name'] ?? null, // Use null if not provided
            'appointed_subject' => $validatedData['appointed_subject'] ?? null, // Use null if not provided
            'which_grades_teaching_done' => $validatedData['which_grades_teaching_done'] ?? null, // Use null if not provided
            'current_teaching_subject' => $validatedData['current_teaching_subject'] ?? null, // Use null if not provided
            'other_subjects_taught' => $validatedData['other_subjects_taught'] ?? null, // Use null if not provided
            'assigned_class' => $validatedData['assigned_class'] ?? null, // Use null if not provided
            'other_responsibilities_assigned' => $validatedData['other_responsibilities_assigned'] ?? null, // Use null if not provided
            '150_hrs_tamil_course_completed' => $validatedData['150_hrs_tamil_course_completed'] ?? false, // Use null if not provided
            'commuting_from_school' => $validatedData['commuting_from_school'] ?? null, // Use null if not provided
            'distance_from_school' => $validatedData['distance_from_school'] ?? null, // Use null if not provided
            'commuting_method_to_school' => $validatedData['commuting_method_to_school'] ?? null, // Use null if not provided
            'number_in_sign_sheet' => $validatedData['number_in_sign_sheet'] ?? null, // Use null if not provided
            'number_in_salary_sheet' => $validatedData['number_in_salary_sheet'] ?? null, // Use null if not provided
        ]);
        
        // Store related records in respective tables
        $teacherWorkInfo->teachersaddress()->create($request->only([
            'permanent_address', 'permanent_residential_address', 'grama_niladari_division',
            'grama_niladari_division_number', 'election_division', 'election_division_number'
        ]));

        $teacherWorkInfo->personal()->create($request->only([
            
            'Full_name', 
            'Full_name_with_initial', 
            'Photo',
            'Gender',
            'Region',
            'Ethnicity',
            'Birthdate',
            'Title',
            'Marital_status',
            'Details_about_family_members',
            'Emergency_telephone_number',
            'Email_address',
            'Fixed_telephone_number',
            'Mobile_number',
            'Whatsapp_number',
        ]));
        

        $teacherWorkInfo->qualifications()->create($request->only([
            'type_of_service_in_school', 'gce_al_subject_stream', 'highest_education_qualification',
            'basic_degree_stream', 'highest_professional_qualification', 'present_class',
            'present_grade', 'appointment_date_for_current_class', 'appointment_date_for_current_grade',
            'current_appointment_service_medium', 'appointed_subject_section', 'subject_appointed',
            'currentservice_appointed_date', 'subjects_taught_most_and_second_most', 'position_in_the_school',
            'assign_date_for_the_school'
        ]));

        $teacherWorkInfo->teacherotherservice()->create($request->only([
            'other_responsibilities_in_school', 'EDCS_membership', 'WSOP_Number', 'Agrahara_insuarence_membership'
        ]));

        return response()->json([
            'message' => 'Teacher data added successfully!',
            'teacher' => $teacherWorkInfo
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($teacher_NIC): JsonResponse
    {
        try{
                $teacherWorkInfo = Teacher::with([
                'teachersaddress', 'personal', 'qualifications', 'teacherotherService'
            ])->find($teacher_NIC);

            if (!$teacherWorkInfo) {
                return response()->json(['error' => 'Teacher not found'], 404);
            }

            return response()->json($teacherWorkInfo);
        }
        catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching teacher data'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $teacher_NIC): JsonResponse
    {
        $teacherWorkInfo = Teacher::where('teacher_NIC', $teacher_NIC)->first();

        if (!$teacherWorkInfo) {
            return response()->json(['error' => 'Teacher not found'], 404);
        }

        // Validate incoming data
        $validatedData = $request->validate([
            'teacher_NIC' => 'required|string|max:12|exists:teacher_work_infos,teacher_NIC',
            'appointed_date' => 'required|date',
            'work_acceptance_date' => 'required|date',
            'appointment_type' => 'required|string',
            'salary_increment_date' => 'nullable|date',
            'current_grade_of_teaching_service' => 'nullable|in:Grade I,Grade II,Grade III',
            'work_acceptance_date_school' => 'nullable|date',
            'temporary_attachedschool_or_institute_name' => 'nullable|string|max:100',
            'appointed_subject' => 'nullable|string|max:20',
            'which_grades_teaching_done' => 'nullable|string',
            'current_teaching_subject' => 'nullable|string|max:20',
            'other_subjects_taught' => 'nullable|string',
            'assigned_class' => 'nullable|string',
            'other_responsibilities_assigned' => 'nullable|string',
            '150_hrs_tamil_course_completed' => 'boolean',
            'commuting_from_school' => 'nullable|in:Home,Boarding,Hostel,Other',
            'distance_from_school' => 'nullable|numeric',
            'commuting_method_to_school' => 'nullable|in:Bicycle,MotorBike,Car,Bus,Threewheeler,Walk,Other',
            'number_in_sign_sheet' => 'nullable|string|max:20',
            'number_in_salary_sheet' => 'nullable|string|max:20',
        ]);
        

        // Update teacher work info
        $teacherWorkInfo->update($validatedData);

        if ($request->has('teachersaddress')) {
            $teacherWorkInfo->teachersaddress()->update($request->only([
                'permanent_address', 'permanent_residential_address', 'grama_niladari_division',
                'grama_niladari_division_number', 'election_division', 'election_division_number'
            ]));
        }

        if ($request->has('personal')) {
            $teacherWorkInfo->personal()->update($request->only([
               'Full_name', 
            'Full_name_with_initial', 
            'Photo',
            'Gender',
            'Region',
            'Ethnicity',
            'Birthdate',
            'Title',
            'Marital_status',
            'Details_about_family_members',
            'Emergency_telephone_number',
            'Email_address',
            'Fixed_telephone_number',
            'Mobile_number',
            'Whatsapp_number',
            ]));
        }

        if ($request->has('qualifications')) {
            $teacherWorkInfo->qualifications()->update($request->only([
                'type_of_service_in_school', 'gce_al_subject_stream', 'highest_education_qualification',
                'basic_degree_stream', 'highest_professional_qualification', 'present_class',
                'present_grade', 'appointment_date_for_current_class', 'appointment_date_for_current_grade',
                'current_appointment_service_medium', 'appointed_subject_section', 'subject_appointed',
                'currentservice_appointed_date', 'subjects_taught_most_and_second_most', 'position_in_the_school',
                'assign_date_for_the_school'
            ]));
        }

        if ($request->has('teacherotherservice')) {
            $teacherWorkInfo->teacherotherservice()->update($request->only([
                'other_responsibilities_in_school', 'EDCS_membership', 'WSOP_Number', 'Agrahara_insuarence_membership'
            ]));
        }

        return response()->json([
            'message' => 'Teacher data updated successfully!',
            'teacher' => $teacherWorkInfo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($teacher_NIC): JsonResponse
    {
        $teacherWorkInfo = Teacher::where('teacher_NIC', $teacher_NIC)->first();

        if (!$teacherWorkInfo) {
            return response()->json(['error' => 'Teacher not found'], 404);
        }

        // Delete related records first
        $teacherWorkInfo->teachersaddress()->delete();
        $teacherWorkInfo->personal()->delete();
        $teacherWorkInfo->qualifications()->delete();
        $teacherWorkInfo->teacherotherservice()->delete();

        // Finally, delete the teacher work info record
        $teacherWorkInfo->delete();

        return response()->json([
            'message' => 'Teacher and related data deleted successfully!',
            'teacher_NIC' => $teacher_NIC
        ]);
    }
    

public function sendVerificationCode(Request $request)
{
    $request->validate([
        'phone' => 'required|regex:/^[0-9]{10}$/',
    ]);

    // Find the teacher's personal details
    $teacherPersonal = TeacherPersonal::where('teacher_NIC', Auth::user()->teacher_NIC)->first();

    if (!$teacherPersonal) {
        return response()->json(['error' => 'Teacher personal details not found.'], 404);
    }

    // Generate a 6-digit verification code
    $verificationCode = rand(100000, 999999);
    
    // Update the verification code in the database
    $teacherPersonal->update([
        'verification_code' => $verificationCode,
        'is_verified' => false,
    ]);

    // Send SMS (replace this function with actual SMS sending logic)
    $this->sendSms($teacherPersonal->Emergency_telephone_number, "Your verification code is: " . $verificationCode);

    return response()->json(['message' => 'Verification code sent successfully!']);
}

// Dummy SMS sending function (replace with actual implementation)
private function sendSms($phoneNumber, $message)
{
    // Implement SMS sending via an API (Twilio, Nexmo, etc.)
    \Log::info("Sending SMS to $phoneNumber: $message");
}

public function verifyCode(Request $request)
{
    $request->validate([
        'verification_code' => 'required|digits:6',
    ]);

    $teacherPersonal = TeacherPersonal::where('teacher_NIC', Auth::user()->teacher_NIC)->first();

    if (!$teacherPersonal || $teacherPersonal->verification_code != $request->verification_code) {
        return response()->json(['error' => 'Invalid verification code.'], 400);
    }

    // Mark as verified
    $teacherPersonal->update(['is_verified' => true]);

    return response()->json(['message' => 'Phone number verified successfully!']);
}

}
