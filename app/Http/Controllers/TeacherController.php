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
use Illuminate\Support\Facades\Log;



class TeacherController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Teacher/dashboard');
    }

    public function personalDashboard($teacher_NIC)
{
    $teacher = Teacher::with([
        'teachersaddress', 'personal', 'qualifications', 'teacherotherService'
    ])->where('teacher_NIC', $teacher_NIC)->first();  // Change to first() from find()

    if (!$teacher) {
        return redirect()->route('dashboard')->with('error', 'Teacher not found');
    }

    return Inertia::render('Teacher/personalDash', [
        'teacher' => $teacher
    ]);
    
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

        Teacher::query()->increment('count');

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
           // Log::info($teacherWorkInfo);
            return response()->json($teacherWorkInfo);
        }
        catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching teacher data'], 500);
        }
    }
    public function storeRequest(Request $request): JsonResponse
{
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

    // Save all submitted form data as JSON
    $requestData = $request->all();

    $teacherRequest = TeacherRequest::create([
        'teacher_NIC' => $validatedData['teacher_NIC'],
        'form_data' => $requestData,
        'status' => 'pending',
    ]);

    return response()->json([
        'message' => 'Form submitted. Awaiting admin approval.',
        'request' => $teacherRequest
    ]);
}






    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $teacher_NIC): JsonResponse
{
    try {
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

        // Update teacher address if available in request
        if ($request->has('teachersaddress')) {
            // \Log::info("Updating teacher address for NIC: " . $teacherWorkInfo->teacher_NIC);
            try {
                $teacherWorkInfo->teachersaddress()->update($request->only([
                    'permanent_address', 'permanent_residential_address', 'grama_niladari_division',
                    'grama_niladari_division_number', 'election_division', 'election_division_number'
                ]));
            } catch (\Exception $e) {
                // \Log::error("Error updating teacher address: " . $e->getMessage());
            }
        }

        // Update teacher personal info if available
        if ($request->has('personal')) {
            try {
                $teacherWorkInfo->personal()->update($request->only([
                    'Full_name', 'Full_name_with_initial', 'Photo', 'Gender', 'Region', 'Ethnicity',
                    'Birthdate', 'Title', 'Marital_status', 'Details_about_family_members',
                    'Emergency_telephone_number', 'Email_address', 'Fixed_telephone_number', 
                    'Mobile_number', 'Whatsapp_number',
                ]));
            } catch (\Exception $e) {
                // \Log::error("Error updating teacher personal info: " . $e->getMessage());
            }
        }

        // Update qualifications if available
        if ($request->has('qualifications')) {
            try {
                $teacherWorkInfo->qualifications()->update($request->only([
                    'type_of_service_in_school', 'gce_al_subject_stream', 'highest_education_qualification',
                    'basic_degree_stream', 'highest_professional_qualification', 'present_class',
                    'present_grade', 'appointment_date_for_current_class', 'appointment_date_for_current_grade',
                    'current_appointment_service_medium', 'appointed_subject_section', 'subject_appointed',
                    'currentservice_appointed_date', 'subjects_taught_most_and_second_most', 'position_in_the_school',
                    'assign_date_for_the_school'
                ]));
            } catch (\Exception $e) {
                // \Log::error("Error updating teacher qualifications: " . $e->getMessage());
            }
        }

        // Update other services if available
        if ($request->has('teacherotherservice')) {
            try {
                $teacherWorkInfo->teacherotherservice()->update($request->only([
                    'other_responsibilities_in_school', 'EDCS_membership', 'WSOP_Number', 'Agrahara_insuarence_membership'
                ]));
            } catch (\Exception $e) {
                // \Log::error("Error updating teacher other services: " . $e->getMessage());
            }
        }

        return response()->json([
            'message' => 'Teacher data updated successfully!',
            'teacher' => $teacherWorkInfo
        ]);
    } catch (\Exception $e) {
        // \Log::error('Error updating teacher: ' . $e->getMessage());
        // \Log::error('Stack trace: ' . $e->getTraceAsString());
        return response()->json(['error' => 'An error occurred while updating the teacher.'], 500);
    }
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

        Teacher::query()->decrement('count');

        return response()->json([
            'message' => 'Teacher and related data deleted successfully!',
            'teacher_NIC' => $teacher_NIC
        ]);
    }
    
    public function getTeacherCount():JsonResponse
    {
        // Get the latest count from the first row
        $teacherCount = Teacher::count(); // This runs SELECT COUNT(*) FROM teacher_work_infos
        return response()->json([
            'teacherCount' => $teacherCount,
        ]);
    
    }


}