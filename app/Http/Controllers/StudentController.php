<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\StudentAcademic;
use App\Models\ClassModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\StudentAdmissionMail;
class StudentController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Student/dashboard');
    }
    /**
     * Display a listing of student academics.
     */
    public function sendAdmissionForm(Request $request)
{
    $request->validate([
        'reg_no' => 'required|string'
    ]);

    $formLink = url('/admission-form?reg_no=' . $request->reg_no);
    $email = 'test@example.com'; // Replace with the actual recipient email

    // Send email
    Mail::to($email)->send(new StudentAdmissionMail($formLink));

    return response()->json(['message' => 'Admission form sent successfully!']);
}
    public function index(): JsonResponse
    {
        $students = StudentAcademic::all();
        return response()->json($students, 200);
    }
    public function getClassIds()
{
    $classIds = ClassModel::pluck('class_id');  // Assuming 'id' is the column for class IDs in the ClassModel

        return response()->json($classIds);
}
    public function store(Request $request)
    {
        // Assuming you validate the data first
        $validated = $request->validate([
            'reg_no' => 'required|string|unique:student_academic_info,reg_no|max:50',
            'class_id' => 'required|exists:classes,class_id',
            'distance_to_school' => 'nullable|numeric|min:0',
            'method_of_coming_to_school' => 'nullable|string|max:50',
            'grade_6_9_asthectic_subjects' => 'nullable|in:Art,Dance,Music,Drama & Theatre',
            'grade_10_11_basket1_subjects' => 'nullable|in:Commerce,Civics,Geography,Home Science',
            'grade_10_11_basket2_subjects' => 'nullable|in:Design & Technology,Tamil Literature,English Literature,Sinhala Literature,Art,Dance,Music,Drama & Theatre',
            'grade_10_11_basket3_subjects' => 'nullable|in:ICT,Health Science,Agriculture',
            'receiving_any_grade_5_scholarship' => 'boolean',
            'receiving_any_samurdhi_aswesuma' => 'boolean',
            'receiving_any_scholarship' => 'boolean',
        ]);
    
        // Create the student
        $student = StudentAcademic::create($validated);
    
        // Return a JSON response on success
        return response()->json([
            'message' => 'Student added successfully!',
            'student' => $student,
        ], 201); // HTTP 201 indicates created successfully
    }
    
   
   

    /**
     * Display the specified student academic record.
     */
    public function show($reg_no): JsonResponse
    {
        $student = StudentAcademic::find($reg_no);

        if (!$student) {
            return response()->json(['message' => 'Student record not found'], 404);
        }

        return response()->json($student, 200);
    }

    /**
     * Update an existing student academic record.
     */
    public function update(Request $request, $reg_no): JsonResponse
    {
        $student = StudentAcademic::find($reg_no);

        if (!$student) {
            return response()->json(['message' => 'Student record not found'], 404);
        }

        $request->validate([
            'class_id' => 'sometimes|exists:classes,class_id',
            'distance_to_school' => 'nullable|numeric|min:0',
            'method_of_coming_to_school' => 'nullable|string|max:50',
            'grade_6_9_asthectic_subjects' => 'nullable|in:Art,Dance,Music,Drama & Theatre',
            'grade_10_11_basket1_subjects' => 'nullable|in:Commerce,Civics,Geography,Home Science',
            'grade_10_11_basket2_subjects' => 'nullable|in:Design & Technology,Tamil Literature,English Literature,Sinhala Literature,Art,Dance,Music,Drama & Theatre',
            'grade_10_11_basket3_subjects' => 'nullable|in:ICT,Health Science,Agriculture',
            'receiving_any_grade_5_scholarship' => 'boolean',
            'receiving_any_samurdhi_aswesuma' => 'boolean',
            'receiving_any_scholarship' => 'boolean',
        ]);

        $student->update($request->all());

        return response()->json([
            'message' => 'Student academic record updated successfully!',
            'student' => $student
        ], 200);
    }

    /**
     * Remove a student academic record.
     */
    public function destroy($reg_no): JsonResponse
    {
        $student = StudentAcademic::find($reg_no);

        if (!$student) {
            return response()->json(['message' => 'Student record not found'], 404);
        }

        $student->delete();

        return response()->json(['message' => 'Student academic record deleted successfully!'], 200);
    }
}