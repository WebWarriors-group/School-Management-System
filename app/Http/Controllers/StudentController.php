<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Imports\StudentsImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
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
        $request->validate(['email' => 'required|email']);

        $formLink = url('/admission-form?reg_no=' . $request->reg_no);
        Mail::to($request->email)->send(new StudentAdmissionMail($formLink));

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
        $students->getCollection()->each(function ($student) {
            $student->family;
            $student->personal;
            $student->siblings;
        });
        return response()->json($students);
    }

    public function getClassIds()
    {
        $classIds = Cache::remember('class_ids', 3600, function () {
            return ClassModel::pluck('class_id');
        });
        return response()->json($classIds);
    }

    public function store(StoreStudentRequest $request)
    {
        DB::beginTransaction();
        try {
            $student = StudentAcademic::create($request->only([
                'reg_no', 'class_id', 'distance_to_school', 'method_of_coming_to_school',
                'grade_6_9_asthectic_subjects', 'grade_10_11_basket1_subjects',
                'grade_10_11_basket2_subjects', 'grade_10_11_basket3_subjects',
                'receiving_any_grade_5_scholarship', 'receiving_any_samurdhi_aswesuma',
                'receiving_any_scholarship', 'admission_date'
            ]));

            $student->personal()->create($request->personal);
            $student->family()->create($request->family);

            if (is_array($request->siblings)) {
                $siblings = collect($request->siblings)->map(function ($sibling) use ($request) {
                    return array_merge($sibling, ['reg_no' => $request->reg_no]);
                })->toArray();
                $student->siblings()->createMany($siblings);
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
            'class_id', 'distance_to_school', 'method_of_coming_to_school',
            'grade_6_9_asthectic_subjects', 'grade_10_11_basket1_subjects',
            'grade_10_11_basket2_subjects', 'grade_10_11_basket3_subjects',
            'receiving_any_grade_5_scholarship', 'receiving_any_samurdhi_aswesuma',
            'receiving_any_scholarship', 'admission_date',
        ]));
        return response()->json($student);
    }

    public function destroy($reg_no): JsonResponse
    {
        $student = StudentAcademic::where('reg_no', $reg_no)->firstOrFail();
        if ($student->personal && $student->personal->photo) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $student->personal->photo));
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
        $request->validate(['file' => 'required|file|mimes:xlsx,xls,csv']);
        try {
            Excel::import(new StudentsImport, $request->file('file'));
            return response()->json(['message' => 'Students imported successfully!']);
        } catch (\Throwable $e) {
            \Log::error('Student import failed', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Import failed.'], 500);
        }
    }

    public function getAdmissionsPerYear()
    {
        $data = Cache::remember('admissions_per_year', 3600, function () {
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
        return response()->json($personal);
    }

    public function showFamily($reg_no)
    {
        $family = StudentFamilyInfo::where('reg_no', $reg_no)->firstOrFail();
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

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('student_photos', 'public');
            $student->photo = Storage::url($path);
        }

        $student->update($request->except('photo'));
        return response()->json($student);
    }

    public function updateFamily(Request $request, $reg_no)
    {
        $family = StudentFamilyInfo::where('reg_no', $reg_no)->firstOrFail();
        $request->validate([
            'mother_name' => 'required|string|max:100',
            'father_name' => 'required|string|max:100',
            'mother_contact' => ['nullable', 'regex:/^(?:\+94|0)?\d{9}$/'],
            'father_contact' => ['nullable', 'regex:/^(?:\+94|0)?\d{9}$/'],
            'mother_email' => 'nullable|email|max:100',
            'father_email' => 'nullable|email|max:100',
        ]);
        $family->update($request->all());
        return response()->json($family);
    }

    public function updateSibling(Request $request, $reg_no)
    {
        try {
            $siblingsData = array_map(function ($sibling) use ($reg_no) {
                $sibling['reg_no'] = $reg_no;
                unset($sibling['created_at'], $sibling['updated_at']);
                return $sibling;
            }, $request->all());

            StudentSibling::upsert(
                $siblingsData,
                ['id'],
                ['sibling_name', 'relationship', 'sibling_age', 'occupation', 'contact', 'reg_no']
            );

            $siblings = StudentSibling::where('reg_no', $reg_no)->get();
            return response()->json($siblings);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Failed to update sibling info.', 'error' => $e->getMessage()], 500);
        }
    }

    public function yearlyPerformance()
    {
        $performance = Cache::remember('yearly_performance', 3600, function () {
            return DB::table('student_performances')
                ->selectRaw('year, ROUND(AVG(ol_passed)) as ol_passed, ROUND(AVG(ol_expected)) as ol_expected, ROUND(AVG(al_passed)) as al_passed, ROUND(AVG(al_expected)) as al_expected')
                ->groupBy('year')
                ->orderBy('year')
                ->get();
        });
        return response()->json($performance);
    }

    public function apiStudentPerformance(string $reg_no): JsonResponse
    {
        $student = StudentAcademic::with(['personal', 'class.teacher', 'marks.subject'])->where('reg_no', $reg_no)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $totalMarks = $student->marks->sum('marks_obtained');
        $averageMarks = $student->marks->avg('marks_obtained') ?? 0;

        $studentsTotals = StudentAcademic::with('marks')->get()->map(function ($s) {
            return ['reg_no' => $s->reg_no, 'total_marks' => $s->marks->sum('marks_obtained')];
        })->sortByDesc('total_marks')->values();

        $rank = 0;
        $prevMark = null;
        $skip = 0;
        $studentsTotals = $studentsTotals->map(function ($item) use (&$rank, &$prevMark, &$skip) {
            if ($prevMark !== $item['total_marks']) {
                $rank += 1 + $skip;
                $skip = 0;
            } else {
                $skip++;
            }
            $prevMark = $item['total_marks'];
            $item['rank'] = $rank;
            return $item;
        });

        $studentRank = $studentsTotals->firstWhere('reg_no', $reg_no)['rank'] ?? 'N/A';

        $highestMarks = Marks::select('subject_id', DB::raw('MAX(marks_obtained) as highest'))->groupBy('subject_id')->pluck('highest', 'subject_id');

        $marksData = $student->marks->map(function ($mark) use ($highestMarks) {
            return [
                'subject_id' => $mark->subject_id,
                'subject_name' => $mark->subject->subject_name ?? 'Unknown Subject',
                'marks_obtained' => $mark->marks_obtained,
                'highest_mark_in_subject' => $highestMarks[$mark->subject_id] ?? 'N/A',
            ];
        });

        return response()->json([
            'full_name' => $student->personal->full_name,
            'reg_no' => $student->reg_no,
            'class_name' => $student->class->class_name,
            'grade' => $student->class->grade,
            'section' => $student->class->section,
            'class_teacher_name' => optional(optional($student->class)->teacher)->personal->Full_name ?? 'N/A',
            'total_marks' => $totalMarks,
            'average_marks' => round($averageMarks, 2),
            'rank' => $studentRank,
            'marks' => $marksData,
        ]);
    }

    public function showReport($reg_no)
    {
        $student = StudentAcademic::with(['marks.subject', 'personal', 'class.teacher.personal'])->where('reg_no', $reg_no)->first();

        if (!$student) {
            return Inertia::render('Marks/ReportPage', ['student' => null]);
        }

        $totalMarks = $student->marks->sum('marks_obtained');
        $averageMarks = $student->marks->avg('marks_obtained') ?? 0;

        $studentsTotals = StudentAcademic::with('marks')->get()->map(function ($s) {
            return ['reg_no' => $s->reg_no, 'total_marks' => $s->marks->sum('marks_obtained')];
        })->sortByDesc('total_marks')->values();

        $rank = 0;
        $prevMark = null;
        $skip = 0;
        $studentsTotals = $studentsTotals->map(function ($item) use (&$rank, &$prevMark, &$skip) {
            if ($prevMark !== $item['total_marks']) {
                $rank += 1 + $skip;
                $skip = 0;
            } else {
                $skip++;
            }
            $prevMark = $item['total_marks'];
            $item['rank'] = $rank;
            return $item;
        });

        $studentRank = $studentsTotals->firstWhere('reg_no', $reg_no)['rank'] ?? 'N/A';

        $highestMarks = Marks::select('subject_id', DB::raw('MAX(marks_obtained) as highest'))->groupBy('subject_id')->pluck('highest', 'subject_id');

        $marksData = $student->marks->map(function ($mark) use ($highestMarks) {
            return [
                'subject_id' => $mark->subject_id,
                'subject_name' => $mark->subject->subject_name ?? 'Unknown Subject',
                'marks_obtained' => $mark->marks_obtained,
                'highest_mark_in_subject' => $highestMarks[$mark->subject_id] ?? 'N/A',
            ];
        });

        return Inertia::render('Marks/ReportPage', [
            'student' => [
                'full_name' => $student->personal->full_name ?? 'N/A',
                'reg_no' => $student->reg_no,
                'class_name' => $student->class->class_name ?? 'N/A',
                'grade' => $student->class->grade ?? 'N/A',
                'section' => $student->class->section ?? 'N/A',
                'class_teacher_name' => optional(optional($student->class)->teacher)->personal->Full_name ?? 'N/A',
                'total_marks' => $totalMarks,
                'average_marks' => round($averageMarks, 2),
                'rank' => $studentRank,
                'marks' => $marksData,
            ],
        ]);
    }

    
    public function pastPupils()
    {
        $students = StudentAcademic::with(['personal', 'family', 'siblings'])
            ->whereNotNull('leaving_date')
            ->get();

        return Inertia::render('Admin/pastPupils', [
            'students' => $students,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

}
