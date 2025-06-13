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
    $validated = $request->validate([
        'reg_no' => 'required|unique:student_academics,reg_no',
        'class_id' => 'required',
        // add other validation rules as needed

        // Optional nested validations
        'personal.full_name' => 'required',
        'family.mother_name' => 'nullable',
        'siblings.*.sibling_name' => 'nullable|string',
    ]);

    // ✅ Store academic info
    $student = StudentAcademic::create([
        'reg_no' => $request->reg_no,
        'class_id' => $request->class_id,
        'distance_to_school' => $request->distance_to_school,
        'method_of_coming_to_school' => $request->method_of_coming_to_school,
        'grade_6_9_asthectic_subjects' => $request->grade_6_9_asthectic_subjects,
        'grade_10_11_basket1_subjects' => $request->grade_10_11_basket1_subjects,
        'grade_10_11_basket2_subjects' => $request->grade_10_11_basket2_subjects,
        'grade_10_11_basket3_subjects' => $request->grade_10_11_basket3_subjects,
        'receiving_any_grade_5_scholarship' => $request->receiving_any_grade_5_scholarship,
        'receiving_any_samurdhi_aswesuma' => $request->receiving_any_samurdhi_aswesuma,
        'receiving_any_scholarship' => $request->receiving_any_scholarship,
    ]);

    // ✅ Store personal info
    $student->personal()->create([
        'reg_no' => $request->reg_no,
        'full_name' => $request->personal['full_name'],
        'fullname_with_initial' => $request->personal['fullname_with_initial'],
        'birthday' => $request->personal['birthday'],
        'ethnicity' => $request->personal['ethnicity'],
        'religion' => $request->personal['religion'],
        'gender' => $request->personal['gender'],
        'birth_certificate_number' => $request->personal['birth_certificate_number'],
        'address' => $request->personal['address'],
        'nic_number' => $request->personal['nic_number'],
        'postal_ic_number' => $request->personal['postal_ic_number'],
        'age' => $request->personal['age'],
        'special_needs' => $request->personal['special_needs'],
        'height' => $request->personal['height'],
        'weight' => $request->personal['weight'],
        // Handle photo upload if any
    ]);

    // ✅ Store family info
    $student->family()->create([
        'reg_no' => $request->reg_no,
        'mother_name' => $request->family['mother_name'],
        'mother_occupation' => $request->family['mother_occupation'],
        'mother_income' => $request->family['mother_income'],
        'mother_working_place' => $request->family['mother_working_place'],
        'mother_contact' => $request->family['mother_contact'],
        'mother_email' => $request->family['mother_email'],
        'mother_whatsapp' => $request->family['mother_whatsapp'],
        'father_name' => $request->family['father_name'],
        'father_occupation' => $request->family['father_occupation'],
        'father_income' => $request->family['father_income'],
        'father_working_place' => $request->family['father_working_place'],
        'father_contact' => $request->family['father_contact'],
        'father_email' => $request->family['father_email'],
        'father_whatsapp' => $request->family['father_whatsapp'],
    ]);

    // ✅ Store sibling info (array of siblings)
    foreach ($request->siblings as $sibling) {
        $student->siblings()->create([
            'reg_no' => $request->reg_no,
            'sibling_name' => $sibling['sibling_name'],
            'relationship' => $sibling['relationship'],
            'age' => $sibling['age'],
            'occupation' => $sibling['occupation'],
            'contact' => $sibling['contact'],
        ]);
    }

    return response()->json(['message' => 'Student data stored successfully.'], 201);
}
    
   
   

    /**
     * Display the specified student academic record.
     */
    public function show($reg_no): JsonResponse
    {
        $student = StudentAcademic::with(['studentpersonal','studentfamily','studentsibilings'])->find($reg_no);

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