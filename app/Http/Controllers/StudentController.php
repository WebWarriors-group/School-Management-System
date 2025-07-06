<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Imports\StudentsImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use App\Models\StudentAcademic;
use App\Models\StudentPersonal;
use App\Models\StudentFamilyInfo;
use App\Models\StudentSibling;
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
    public function sendAdmissionForm(Request $request)
    {
        $request->validate([
            'reg_no' => 'required|string'
        ]);

        $formLink = url('/admission-form?reg_no=' . $request->reg_no);
        $email = $request->input('email');

        Mail::to($email)->send(new StudentAdmissionMail($formLink));

        return response()->json(['message' => 'Admission form sent successfully!']);
    }
    public function academicPage()
    {
        $academicData = StudentAcademic::all();

        return Inertia::render('Student/AcademicTable', [
            'academicData' => $academicData,
            'filters' => ['search' => '']
        ]);
    }

    public function index(): JsonResponse
    {
        $students = StudentAcademic::all();

        return response()->json($students);
    }

    public function getClassIds()
    {
        $classIds = Cache::remember('class_ids', 60 * 60, function () {
            return ClassModel::pluck('class_id');

        });

        return response()->json($classIds);


    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reg_no' => 'required|unique:student_academic_info,reg_no',
            'class_id' => 'required|string',
            'personal.full_name' => 'required|string',
            'personal.full_name_with_initial' => 'required|string|max:50',
            'family.mother_name' => 'nullable|string',
            'siblings.*.sibling_name' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {

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
                'admission_date' => $request->admission_date,
            ]);

            $student->personal()->create([
                'reg_no' => $request->reg_no,
                'full_name' => $request->personal['full_name'],
                'full_name_with_initial' => $request->personal['full_name_with_initial'],
                'birthday' => $request->personal['birthday'],
                'ethnicity' => $request->personal['ethnicity'],
                'religion' => $request->personal['religion'],
                'gender' => $request->personal['gender'],
                'birth_certificate_number' => $request->personal['birth_certificate_number'] ?? null,
                'address' => $request->personal['address'],
                'nic_number' => $request->personal['nic_number'] ?? null,
                'postal_ic_number' => $request->personal['postal_ic_number'] ?? null,
                'age' => $request->personal['age'],
                'special_needs' => $request->personal['special_needs'] ?? null,
                'height' => $request->personal['height'] ?? null,
                'weight' => $request->personal['weight'] ?? null,
            ]);

            $student->family()->create([
                'reg_no' => $request->reg_no,
                'mother_name' => $request->family['mother_name'],
                'mother_occupation' => $request->family['mother_occupation'] ?? null,
                'mother_income' => $request->family['mother_income'] ?? null,
                'mother_working_place' => $request->family['mother_working_place'] ?? null,
                'mother_contact' => $request->family['mother_contact'] ?? null,
                'mother_email' => $request->family['mother_email'] ?? null,
                'mother_whatsapp' => $request->family['mother_whatsapp'] ?? null,
                'father_name' => $request->family['father_name'],
                'father_occupation' => $request->family['father_occupation'] ?? null,
                'father_income' => $request->family['father_income'] ?? null,
                'father_working_place' => $request->family['father_working_place'] ?? null,
                'father_contact' => $request->family['father_contact'] ?? null,
                'father_email' => $request->family['father_email'] ?? null,
                'father_whatsapp' => $request->family['father_whatsapp'] ?? null,
            ]);

            if (is_array($request->siblings)) {
                $siblingsData = collect($request->siblings)->map(function ($sibling) use ($request) {
                    return [
                        'reg_no' => $request->reg_no,
                        'sibling_name' => $sibling['sibling_name'] ?? null,
                        'relationship' => $sibling['relationship'] ?? null,
                        'sibling_age' => $sibling['sibling_age'] ?? null,
                        'occupation' => $sibling['occupation'] ?? null,
                        'contact' => $sibling['contact'] ?? null,
                    ];
                })->toArray();

                $student->siblings()->createMany($siblingsData);
            }

            DB::commit();

            return response()->json(['message' => 'Student data stored successfully.'], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            \Log::error('Student form submission failed', [
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ]);

            return response()->json([
                'error' => 'Failed to store student data.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function show($reg_no)
    {
        $student = StudentAcademic::where('reg_no', $reg_no)->firstOrFail();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json($student);
    }

    public function update(Request $request, $reg_no)
    {
        $student = StudentAcademic::where('reg_no', $reg_no)->firstOrFail();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->update($request->only([
            'class_id',
            'distance_to_school',
            'method_of_coming_to_school',
            'grade_6_9_asthectic_subjects',
            'grade_10_11_basket1_subjects',
            'grade_10_11_basket2_subjects',
            'grade_10_11_basket3_subjects',
            'receiving_any_grade_5_scholarship',
            'receiving_any_samurdhi_aswesuma',
            'receiving_any_scholarship',
            'admission_date',
        ]));

        return response()->json($student);
    }

    public function destroy($reg_no): JsonResponse
    {
        $student = StudentAcademic::where('reg_no', $reg_no)->firstOrFail();

        if (!$student) {
            return response()->json(['message' => 'Student record not found'], 404);
        }

        $student->delete();
        $student->personal()->delete();
        $student->family()->delete();
        $student->siblings()->delete();


        return response()->json(['message' => 'Student academic record deleted successfully!'], 200);
    }

    public function import(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|file|mimes:xlsx,xls,csv',
            ]);

            Excel::import(new StudentsImport, $request->file('file'));

            return response()->json(['message' => 'Students imported successfully!']);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Import failed',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }
    }

    public function getAdmissionsPerYear()
    {
        $data = DB::table('student_academic_info')
            ->selectRaw('YEAR(admission_date) as year, COUNT(*) as total')
            ->groupBy('year')
            ->orderBy('year')
            ->get();

        return response()->json($data);
    }
    public function showPersonal($reg_no)
    {
        $personal = StudentPersonal::where('reg_no', $reg_no)->firstOrFail();

        if (!$personal) {
            return response()->json(['message' => 'Personal info not found'], 404);
        }

        return response()->json($personal);
    }
    public function showFamily($reg_no)
    {
        $family = StudentFamilyInfo::where('reg_no', $reg_no)->firstOrFail();

        if (!$family) {
            return response()->json(['message' => 'Family info not found'], 404);
        }

        return response()->json($family);
    }

    public function showSibling($reg_no)
    {
        $siblings = StudentSibling::where('reg_no', $reg_no)->get();

        return response()->json($siblings);
    }
    public function updatePersonal(Request $request, $reg_no)
    {
        $student = StudentPersonal::where('reg_no', $reg_no)->firstOrFail();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $request->validate([
            'full_name' => 'required|string|max:255',
            'full_name_with_initial' => 'required|string|max:100',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'birthday' => 'required|date|before:today',
            'gender' => 'required|in:male,female,other',
            'ethnicity' => 'nullable|string|max:100',
            'religion' => 'nullable|string|max:100',
            'birth_certificate_number' => 'nullable|string|max:50',
            'address' => 'required|string|max:255',
            'nic_number' => 'nullable|string|max:20|regex:/^[0-9]{9}[vVxX]$/',
            'postal_ic_number' => 'nullable|string|max:20',
            'age' => 'required|integer|min:3|max:25',
            'special_needs' => 'nullable|string|max:255',
            'height' => 'nullable|numeric|min:30|max:250',
            'weight' => 'nullable|numeric|min:10|max:200'
        ]);
        $student->update($request->only([
            'full_name',
            'full_name_with_initial',
            'photo',
            'birthday',
            'gender',
            'ethnicity',
            'religion',
            'birth_certificate_number',
            'address',
            'nic_number',
            'postal_ic_number',
            'age',
            'special_needs',
            'height',
            'weight'
        ]));
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('student_photos', 'public');
            $student->update(['photo' => Storage::url($path)]);
        }
        return response()->json($student);
    }

    public function updateFamily(Request $request, $reg_no)
    {
        $family = StudentFamilyInfo::where('reg_no', $reg_no)->firstOrFail();

        if (!$family) {
            return response()->json(['message' => 'Family info not found'], 404);
        }
        $request->validate([
            'mother_name' => 'required|string|max:100',
            'mother_occupation' => 'nullable|string|max:100',
            'mother_income' => 'nullable|numeric|min:0|max:100000000',
            'mother_working_place' => 'nullable|string|max:100',
            'mother_contact' => [
                'nullable',
                'string',
                'regex:/^(?:\+94|0)?\d{9}$/',
                'max:15'],
            'mother_email' => 'nullable|email|max:100',
            'mother_whatsapp' => [
                'nullable',
                'string',
                'regex:/^(?:\+94|0)?\d{9}$/',
                'max:15'],
            'father_name' => 'required|string|max:100',
            'father_occupation' => 'nullable|string|max:100',
            'father_income' => 'nullable|numeric|min:0|max:100000000',
            'father_working_place' => 'nullable|string|max:100',
            'father_contact'  => [
                'nullable',
                'string',
                'regex:/^(?:\+94|0)?\d{9}$/',
                'max:15'],
            'father_email' => 'nullable|email|max:100',
            'father_whatsapp'  => [
                'nullable',
                'string',
                'regex:/^(?:\+94|0)?\d{9}$/',
                'max:15'],
        ]);
        $family->update($request->only(
            [
                'mother_name',
                'mother_occupation',
                'mother_income',
                'mother_working_place',
                'mother_contact',
                'mother_email',
                'mother_whatsapp',
                'father_name',
                'father_occupation',
                'father_income',
                'father_working_place',
                'father_contact',
                'father_email',
                'father_whatsapp',
            ]
        ));
        return response()->json($family);
    }

    public function updateSibling(Request $request, $reg_no)
    {
        try {
            $siblingsData = $request->all();
            $siblingsData = array_map(function ($sibling) use ($reg_no) {
                $sibling['reg_no'] = $reg_no;
                unset($sibling['created_at'], $sibling['updated_at']);
                return $sibling;
            }, $siblingsData);

            StudentSibling::upsert(
                $siblingsData,
                ['id'],
                ['sibling_name', 'relationship', 'sibling_age', 'occupation', 'contact', 'reg_no']
            );

            $siblings = StudentSibling::where('reg_no', $reg_no)->get();

            return response()->json($siblings);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update sibling info.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function yearlyPerformance()
    {
        $performance = DB::table('student_reports')
            ->selectRaw('YEAR(exam_year) as year')
            ->selectRaw('SUM(CASE WHEN exam_type = "OL" AND result = "passed" THEN 1 ELSE 0 END) as ol_passed')
            ->selectRaw('SUM(CASE WHEN exam_type = "AL" AND result = "passed" THEN 1 ELSE 0 END) as al_passed')
            ->groupBy(DB::raw('YEAR(exam_year)'))
            ->orderBy('year')
            ->get();

        return response()->json($performance);
    }
}
