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
        $user = Auth::user();
        $teacherUser = $user->teacher();

        if (!($teacherUser->exists())) {
            return redirect()->route('add-teacher');
        }

        $teacher = $teacherUser->with([
            'teachersaddress',
            'personal',
            'qualifications',
            'teacherotherService',
            'class',
            'class.studentacademics',
            'class.studentacademics.studentpersonal'
        ])->first();

        return Inertia::render('Teacher/dashboard', [
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
            'is_150_hrs_tamil_course_completed' => 'boolean',
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
            'is_150_hrs_tamil_course_completed' => $validatedData['is_150_hrs_tamil_course_completed'] ?? false, // Use null if not provided
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
    try {
        $teacherWorkInfo = Teacher::with([
            'teachersaddress', 'personal', 'qualifications', 'teacherotherservice'
        ])->where('teacher_NIC', $teacher_NIC)->first(); // ✅ use where() and first()

        if (!$teacherWorkInfo) {
            return response()->json(['error' => 'Teacher not found'], 404);
        }

        return response()->json($teacherWorkInfo);
    } catch (\Exception $e) {
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
        'is_150_hrs_tamil_course_completed' => 'boolean',
        'commuting_from_school' => 'nullable|in:Home,Boarding,Hostel,Other',
        'distance_from_school' => 'required|numeric',
        'commuting_method_to_school' => 'required|in:Bicycle,MotorBike,Car,Bus,Threewheeler,Walk,Other',
        'number_in_sign_sheet' => 'required|string|max:20',
        'number_in_salary_sheet' => 'required|string|max:20',
    ]);

    // Handle Photo if uploaded
    $photoPath = null;
    if ($request->hasFile('Photo')) {
        $photoPath = $request->file('Photo')->store('photos', 'public');
    }

    // Structure form data with nested fields properly
    $requestData = [
    ...$validatedData, // spread the validated main work info fields only ONCE

    'personal' => [
        'Full_name' => $request->input('Full_name'),
        'Full_name_with_initial' => $request->input('Full_name_with_initial'),
        'Photo' => $photoPath ?? null,
        'Gender' => $request->input('Gender'),
        'Region' => $request->input('Region'),
        'Ethnicity' => $request->input('Ethnicity'),
        'Birthdate' => $request->input('Birthdate'),
        'Title' => $request->input('Title'),
        'Marital_status' => $request->input('Marital_status'),
        'Details_about_family_members' => $request->input('Details_about_family_members'),
        'Emergency_telephone_number' => $request->input('Emergency_telephone_number'),
        'Email_address' => $request->input('Email_address'),
        'Fixed_telephone_number' => $request->input('Fixed_telephone_number'),
        'Mobile_number' => $request->input('Mobile_number'),
        'Whatsapp_number' => $request->input('Whatsapp_number'),
    ],

    'teachersaddress' => [
        'permanent_address' => $request->input('permanent_address'),
        'permanent_residential_address' => $request->input('permanent_residential_address'),
        'grama_niladari_division' => $request->input('grama_niladari_division'),
        'grama_niladari_division_number' => $request->input('grama_niladari_division_number'),
        'election_division' => $request->input('election_division'),
        'election_division_number' => $request->input('election_division_number'),
    ],

    'qualifications' => [
        'type_of_service_in_school' => $request->input('type_of_service_in_school'),
        'gce_al_subject_stream' => $request->input('gce_al_subject_stream'),
        'highest_education_qualification' => $request->input('highest_education_qualification'),
        'basic_degree_stream' => $request->input('basic_degree_stream'),
        'highest_professional_qualification' => $request->input('highest_professional_qualification'),
        'present_class' => $request->input('present_class'),
        'present_grade' => $request->input('present_grade'),
        'appointment_date_for_current_class' => $request->input('appointment_date_for_current_class'),
        'appointment_date_for_current_grade' => $request->input('appointment_date_for_current_grade'),
        'current_appointment_service_medium' => $request->input('current_appointment_service_medium'),
        'appointed_subject_section' => $request->input('appointed_subject_section'),
        'subject_appointed' => $request->input('subject_appointed'),
        'currentservice_appointed_date' => $request->input('currentservice_appointed_date'),
        'subjects_taught_most_and_second_most' => $request->input('subjects_taught_most_and_second_most'),
        'position_in_the_school' => $request->input('position_in_the_school'),
        'assign_date_for_the_school' => $request->input('assign_date_for_the_school'),
    ],

    'teacherotherservice' => [
        'other_responsibilities_in_school' => $request->input('other_responsibilities_in_school'),
        'EDCS_membership' => $request->input('EDCS_membership'),
        'WSOP_Number' => $request->input('WSOP_Number'),
        'Agrahara_insuarence_membership' => $request->input('Agrahara_insuarence_membership'),
    ],
];

    $teacherRequest = TeacherRequest::create([
        'teacher_NIC' => $validatedData['teacher_NIC'],
        'form_data' => $requestData,
        'status' => 'pending',
    ]);

    return response()->json([
        'message' => 'Form submitted. Awaiting admin approval.',
        'request' => $teacherRequest,
    ]);
}



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $teacher_NIC): JsonResponse
{
    try {
        $teacherWorkInfo = Teacher::with(['teachersaddress', 'personal', 'qualifications', 'teacherotherservice'])
            ->where('teacher_NIC', $teacher_NIC)
            ->first();

        if (!$teacherWorkInfo) {
            return response()->json(['error' => 'Teacher not found'], 404);
        }

        // Update main table (teacher_work_infos)
        $teacherWorkInfo->update([
            'appointed_date' => $request->input('appointed_date') ?? $teacherWorkInfo->appointed_date,
            'work_acceptance_date' => $request->input('work_acceptance_date') ?? $teacherWorkInfo->work_acceptance_date,
            'appointment_type' => $request->input('appointment_type') ?? $teacherWorkInfo->appointment_type,
            'salary_increment_date' => $request->input('salary_increment_date') ?? $teacherWorkInfo->salary_increment_date,
            'current_grade_of_teaching_service' => $request->input('current_grade_of_teaching_service') ?? $teacherWorkInfo->current_grade_of_teaching_service,
            'work_acceptance_date_school' => $request->input('work_acceptance_date_school') ?? $teacherWorkInfo->work_acceptance_date_school,
            'temporary_attachedschool_or_institute_name' => $request->input('temporary_attachedschool_or_institute_name') ?? $teacherWorkInfo->temporary_attachedschool_or_institute_name,
            'appointed_subject' => $request->input('appointed_subject') ?? $teacherWorkInfo->appointed_subject,
            'which_grades_teaching_done' => $request->input('which_grades_teaching_done') ?? $teacherWorkInfo->which_grades_teaching_done,
            'current_teaching_subject' => $request->input('current_teaching_subject') ?? $teacherWorkInfo->current_teaching_subject,
            'other_subjects_taught' => $request->input('other_subjects_taught') ?? $teacherWorkInfo->other_subjects_taught,
            'assigned_class' => $request->input('assigned_class') ?? $teacherWorkInfo->assigned_class,
            'other_responsibilities_assigned' => $request->input('other_responsibilities_assigned') ?? $teacherWorkInfo->other_responsibilities_assigned,
            'is_150_hrs_tamil_course_completed' => $request->input('is_150_hrs_tamil_course_completed') ?? $teacherWorkInfo->is_150_hrs_tamil_course_completed,
            'commuting_from_school' => $request->input('commuting_from_school') ?? $teacherWorkInfo->commuting_from_school,
            'distance_from_school' => $request->input('distance_from_school') ?? $teacherWorkInfo->distance_from_school,
            'commuting_method_to_school' => $request->input('commuting_method_to_school') ?? $teacherWorkInfo->commuting_method_to_school,
            'number_in_sign_sheet' => $request->input('number_in_sign_sheet') ?? $teacherWorkInfo->number_in_sign_sheet,
            'number_in_salary_sheet' => $request->input('number_in_salary_sheet') ?? $teacherWorkInfo->number_in_salary_sheet,
        ]);

        // Update personal
        if ($request->has('personal') && $teacherWorkInfo->personal) {
            $personal = $request->input('personal');
            $teacherWorkInfo->personal()->update([
                'Full_name' => $personal['Full_name'] ?? $teacherWorkInfo->personal->Full_name,
                'Full_name_with_initial' => $personal['Full_name_with_initial'] ?? $teacherWorkInfo->personal->Full_name_with_initial,
                'Photo' => $personal['Photo'] ?? $teacherWorkInfo->personal->Photo,
                'Gender' => $personal['Gender'] ?? $teacherWorkInfo->personal->Gender,
                'Region' => $personal['Region'] ?? $teacherWorkInfo->personal->Region,
                'Ethnicity' => $personal['Ethnicity'] ?? $teacherWorkInfo->personal->Ethnicity,
                'Birthdate' => $personal['Birthdate'] ?? $teacherWorkInfo->personal->Birthdate,
                'Title' => $personal['Title'] ?? $teacherWorkInfo->personal->Title,
                'Marital_status' => $personal['Marital_status'] ?? $teacherWorkInfo->personal->Marital_status,
                'Details_about_family_members' => $personal['Details_about_family_members'] ?? $teacherWorkInfo->personal->Details_about_family_members,
                'Emergency_telephone_number' => $personal['Emergency_telephone_number'] ?? $teacherWorkInfo->personal->Emergency_telephone_number,
                'Email_address' => $personal['Email_address'] ?? $teacherWorkInfo->personal->Email_address,
                'Fixed_telephone_number' => $personal['Fixed_telephone_number'] ?? $teacherWorkInfo->personal->Fixed_telephone_number,
                'Mobile_number' => $personal['Mobile_number'] ?? $teacherWorkInfo->personal->Mobile_number,
                'Whatsapp_number' => $personal['Whatsapp_number'] ?? $teacherWorkInfo->personal->Whatsapp_number,
            ]);
        }

        // Update address
        if ($request->has('teachersaddress') && $teacherWorkInfo->teachersaddress) {
            $address = $request->input('teachersaddress');
            $teacherWorkInfo->teachersaddress()->update([
                'permanent_address' => $address['permanent_address'] ?? $teacherWorkInfo->teachersaddress->permanent_address,
                'permanent_residential_address' => $address['permanent_residential_address'] ?? $teacherWorkInfo->teachersaddress->permanent_residential_address,
                'grama_niladari_division' => $address['grama_niladari_division'] ?? $teacherWorkInfo->teachersaddress->grama_niladari_division,
                'grama_niladari_division_number' => $address['grama_niladari_division_number'] ?? $teacherWorkInfo->teachersaddress->grama_niladari_division_number,
                'election_division' => $address['election_division'] ?? $teacherWorkInfo->teachersaddress->election_division,
                'election_division_number' => $address['election_division_number'] ?? $teacherWorkInfo->teachersaddress->election_division_number,
            ]);
        }

        // Update qualifications
        if ($request->has('qualifications') && $teacherWorkInfo->qualifications) {
            $qual = $request->input('qualifications');
            $teacherWorkInfo->qualifications()->update([
                'type_of_service_in_school' => $qual['type_of_service_in_school'] ?? $teacherWorkInfo->qualifications->type_of_service_in_school,
                'gce_al_subject_stream' => $qual['gce_al_subject_stream'] ?? $teacherWorkInfo->qualifications->gce_al_subject_stream,
                'highest_education_qualification' => $qual['highest_education_qualification'] ?? $teacherWorkInfo->qualifications->highest_education_qualification,
                'basic_degree_stream' => $qual['basic_degree_stream'] ?? $teacherWorkInfo->qualifications->basic_degree_stream,
                'highest_professional_qualification' => $qual['highest_professional_qualification'] ?? $teacherWorkInfo->qualifications->highest_professional_qualification,
                'present_class' => $qual['present_class'] ?? $teacherWorkInfo->qualifications->present_class,
                'present_grade' => $qual['present_grade'] ?? $teacherWorkInfo->qualifications->present_grade,
                'appointment_date_for_current_class' => $qual['appointment_date_for_current_class'] ?? $teacherWorkInfo->qualifications->appointment_date_for_current_class,
                'appointment_date_for_current_grade' => $qual['appointment_date_for_current_grade'] ?? $teacherWorkInfo->qualifications->appointment_date_for_current_grade,
                'current_appointment_service_medium' => $qual['current_appointment_service_medium'] ?? $teacherWorkInfo->qualifications->current_appointment_service_medium,
                'appointed_subject_section' => $qual['appointed_subject_section'] ?? $teacherWorkInfo->qualifications->appointed_subject_section,
                'subject_appointed' => $qual['subject_appointed'] ?? $teacherWorkInfo->qualifications->subject_appointed,
                'currentservice_appointed_date' => $qual['currentservice_appointed_date'] ?? $teacherWorkInfo->qualifications->currentservice_appointed_date,
                'subjects_taught_most_and_second_most' => $qual['subjects_taught_most_and_second_most'] ?? $teacherWorkInfo->qualifications->subjects_taught_most_and_second_most,
                'position_in_the_school' => $qual['position_in_the_school'] ?? $teacherWorkInfo->qualifications->position_in_the_school,
                'assign_date_for_the_school' => $qual['assign_date_for_the_school'] ?? $teacherWorkInfo->qualifications->assign_date_for_the_school,
            ]);
        }

        // Update other services
        if ($request->has('teacherotherservice') && $teacherWorkInfo->teacherotherservice) {
            $service = $request->input('teacherotherservice');
            $teacherWorkInfo->teacherotherservice()->update([
                'other_responsibilities_in_school' => $service['other_responsibilities_in_school'] ?? $teacherWorkInfo->teacherotherservice->other_responsibilities_in_school,
                'EDCS_membership' => $service['EDCS_membership'] ?? $teacherWorkInfo->teacherotherservice->EDCS_membership,
                'WSOP_Number' => $service['WSOP_Number'] ?? $teacherWorkInfo->teacherotherservice->WSOP_Number,
                'Agrahara_insuarence_membership' => $service['Agrahara_insuarence_membership'] ?? $teacherWorkInfo->teacherotherservice->Agrahara_insuarence_membership,
            ]);
        }

        return response()->json([
            'message' => 'Teacher data updated successfully!',
            'teacher' => $teacherWorkInfo
        ]);
    } catch (\Exception $e) {
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
