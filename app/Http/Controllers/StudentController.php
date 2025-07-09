<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreStudentRequest;
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
use App\Models\Marks;
use App\Models\Subject;
class StudentController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Student/dashboard');
    }
    public function sendAdmissionForm(Request $request)
    {
        $request->validate(['email'=>'required|email']);

        $formLink = url('/admission-form?reg_no=' . $request->reg_no);
        $email = $request->input('email');

        Mail::to($email)->send(new StudentAdmissionMail($formLink));

        return response()->json(['message' => 'Admission form sent successfully!']);
    }
    public function academicPage()
    {
        $academicData = StudentAcademic::paginate(10);

        return Inertia::render('Student/AcademicTable', [
            'academicData' => $academicData,
            'filters' => ['search' => '']
        ]);
    }

  public function index(): JsonResponse
{
    $students = StudentAcademic::paginate(10);

    // This will trigger Laravel to auto-load the related models
    $students->getCollection()->each(function ($student) {
        $student->family;
        $student->personal;
        $student->siblings;
    });

    return response()->json($students);
}


    public function getClassIds()
    {
        $classIds = Cache::remember('class_ids', 60 * 60, function () {
            return ClassModel::pluck('class_id');

        });

        return response()->json($classIds);


    }
    public function store(StoreStudentRequest $request)
    {


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
        return response()->json($student);
    }

    public function update(Request $request, $reg_no)
    {
        $student = StudentAcademic::where('reg_no', $reg_no)->firstOrFail();

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

    public function update(Request $request, $reg_no)
    {   
        $student = StudentAcademic::where('reg_no', $reg_no)->first();

        if (!$student) {
        return response()->json(['message' => 'Student not found'], 404);
        }

   

        $student->update($request->all());

        return response()->json($student);
    }



    public function destroy($reg_no): JsonResponse
    {
        $student = StudentAcademic::where('reg_no', $reg_no)->firstOrFail();

        if (!$student) {
            return response()->json(['message' => 'Student record not found'], 404);
        }
        if ($student->personal && $student->personal->photo) {
            $photoPath = str_replace('/storage/', '', $student->personal->photo);
            Storage::disk('public')->delete($photoPath);
        }
        DB::transaction(function () use ($student) {
            $student->personal()->delete();
            $student->family()->delete();
            $student->siblings()->delete();
            $student->delete();
        });



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
            \Log::error('Student import failed', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Import failed.Please check the file format or content.',
            ], 500);
        }

    }

    public function getAdmissionsPerYear()
    {
        $data = Cache::remember('admissions_per_year',3600,function(){
            return DB::table('student_academic_info')
                ->selectRaw('YEAR(admission_date) as year, COUNT(*) as total')
                ->groupBy('year')
                ->orderBy('year')
                ->get();
        });
       

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
            $photoUrl = Storage::url($path);
            $student->photo=$photoUrl;
        }
        $student->update($request->except('photo'));

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
                'max:15'
            ],
            'mother_email' => 'nullable|email|max:100',
            'mother_whatsapp' => [
                'nullable',
                'string',
                'regex:/^(?:\+94|0)?\d{9}$/',
                'max:15'
            ],
            'father_name' => 'required|string|max:100',
            'father_occupation' => 'nullable|string|max:100',
            'father_income' => 'nullable|numeric|min:0|max:100000000',
            'father_working_place' => 'nullable|string|max:100',
            'father_contact' => [
                'nullable',
                'string',
                'regex:/^(?:\+94|0)?\d{9}$/',
                'max:15'
            ],
            'father_email' => 'nullable|email|max:100',
            'father_whatsapp' => [
                'nullable',
                'string',
                'regex:/^(?:\+94|0)?\d{9}$/',
                'max:15'
            ],
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
            if (empty($siblingsData)) {
                return response()->json(['message' => 'No siblings data received'], 422);
            }
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
    $performance = Cache::remember('yearly_performance', 3600, function () {
        return DB::table('student_performances')  // plural table name
            ->selectRaw('
            year,
            ROUND(AVG(ol_passed)) as ol_passed,
            ROUND(AVG(ol_expected)) as ol_expected,
            ROUND(AVG(al_passed)) as al_passed,
            ROUND(AVG(al_expected)) as al_expected
        ')->groupBy('year')
            ->orderBy('year')
            ->get();
    });

    return response()->json($performance);
}
    $family->update($request->all()); // or $request->all() if you trust frontend
    return response()->json($family);
    }

    public function updateSibling(Request $request, $reg_no)
    {   
    try {
        $siblingsData = $request->all();

        // Remove created_at and updated_at fields from each item
        $siblingsData = array_map(function ($sibling) use ($reg_no) {
            $sibling['reg_no'] = $reg_no;
            unset($sibling['created_at'], $sibling['updated_at']); // REMOVE timestamps
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


    public function apiStudentPerformance(string $reg_no): JsonResponse
    {
    $student = StudentAcademic::with(['personal', 'class.teacher', 'marks.subject'])
        ->where('reg_no', $reg_no)
        ->first();

    if (!$student) {
        return response()->json(['message' => 'Student not found'], 404);
    }

    
        // Calculate rank with tie handling
       $totalMarks = $student->marks->sum('marks_obtained');
    $averageMarks = $student->marks->count() > 0 ? $student->marks->avg('marks_obtained') : 0;
    $studentsTotals = StudentAcademic::with('marks')
        ->get()
        ->map(function ($s) {
            return [
                'reg_no' => $s->reg_no,
                'total_marks' => $s->marks->sum('marks_obtained'),
            ];
        })
        ->sortByDesc('total_marks')
        ->values();

    $rank = 0;
    $prevMark = null;
    $skip = 0;

    $studentsTotals = $studentsTotals->map(function ($item) use (&$rank, &$prevMark, &$skip) {
        if ($prevMark !== $item['total_marks']) {
            $rank = $rank + 1 + $skip;
            $skip = 0;
        } else {
            $skip++;
        }
        $prevMark = $item['total_marks'];
        $item['rank'] = $rank;
        return $item;
    });

      $studentRank = $studentsTotals->firstWhere('reg_no', $reg_no)['rank'] ?? 'N/A';

    $highestMarksBySubject = Marks::select('subject_id', DB::raw('MAX(marks_obtained) as highest'))
    ->groupBy('subject_id')
    ->pluck('highest', 'subject_id');

    $marksData = $student->marks->map(function ($mark) use ($highestMarksBySubject) {
        return [
            'subject_id' => $mark->subject_id,
            'subject_name' => $mark->subject->subject_name ?? 'Unknown Subject',
            'marks_obtained' => $mark->marks_obtained,
            'highest_mark_in_subject' => $highestMarksBySubject[$mark->subject_id] ?? 'N/A',
        ];
    })->toArray();

    $report = [
        'full_name' => $student->personal->full_name,
        'reg_no' => $student->reg_no,
        'class_name' => $student->class->class_name,
        'grade' => $student->class->grade,
        'section' => $student->class->section,
        'class_teacher_name' => optional($student->class->teacher->personal)->Full_name ?? 'N/A',
        'total_marks' => $student->marks->sum('marks_obtained'),
        'average_marks' => round($student->marks->avg('marks_obtained'), 2),
        'rank' => $studentRank, // You can add rank logic if needed
        'marks' =>$marksData, // important to reset index
    ];

    return response()->json($report);
}

public function showReport($reg_no)
{
    $student = StudentAcademic::with([
        'marks.subject',
        'personal',
        'class',
    ])->where('reg_no', $reg_no)->first();

    if (!$student) {
        return Inertia::render('Marks/ReportPage', [
            'student' => null,
        ]);
    }

    $totalMarks = $student->marks->sum('marks_obtained');
    $averageMarks = $student->marks->count() > 0 ? $student->marks->avg('marks_obtained') : 0;
    $studentsTotals = StudentAcademic::with('marks')
        ->get()
        ->map(function ($s) {
            return [
                'reg_no' => $s->reg_no,
                'total_marks' => $s->marks->sum('marks_obtained'),
            ];
        })
        ->sortByDesc('total_marks')
        ->values();

    $rank = 0;
    $prevMark = null;
    $skip = 0;

    $studentsTotals = $studentsTotals->map(function ($item) use (&$rank, &$prevMark, &$skip) {
        if ($prevMark !== $item['total_marks']) {
            $rank = $rank + 1 + $skip;
            $skip = 0;
        } else {
            $skip++;
        }
        $prevMark = $item['total_marks'];
        $item['rank'] = $rank;
        return $item;
    });

      $studentRank = $studentsTotals->firstWhere('reg_no', $reg_no)['rank'] ?? 'N/A';

    $highestMarksBySubject = Marks::select('subject_id', DB::raw('MAX(marks_obtained) as highest'))
    ->groupBy('subject_id')
    ->pluck('highest', 'subject_id');

    $marksData = $student->marks->map(function ($mark) use ($highestMarksBySubject) {
        return [
            'subject_id' => $mark->subject_id,
            'subject_name' => $mark->subject->subject_name ?? 'Unknown Subject',
            'marks_obtained' => $mark->marks_obtained,
            'highest_mark_in_subject' => $highestMarksBySubject[$mark->subject_id] ?? 'N/A',
        ];
    })->toArray();

    return Inertia::render('Marks/ReportPage', [
        'student' => [
            'full_name' => $student->personal->full_name ?? 'N/A',
            'reg_no' => $student->reg_no,
            'class_name' => $student->class_name ?? ($student->class->class_name  ?? 'N/A'),
            'grade' => $student->grade ?? ($student->class->grade ?? 'N/A'),
            'section' => $student->section ?? ($student->class->section ?? 'N/A'),
            'class_teacher_name' => optional(optional(optional($student->class)->teacher)->personal)->Full_name ?? 'N/A',
            'total_marks' => $totalMarks,
            'average_marks' => round($averageMarks, 2),
            'rank' => $studentRank,
            'marks' => $marksData,
        ],
    ]);
}

   
}





