<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Marks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MarkController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Marks/MarksPage');
    }
    // Fetch all marks
public function create(Request $request)
{
    $user = Auth::user();
    $query = Marks::with(['studentAcademic.class','subject']);

    if ($user->teacher()->exists()) {
        $teacher = $user->teacher()->with('class.studentacademics')->first();
        if ($teacher && $teacher->class && $teacher->class->studentacademics) {
            $studentRegNos = $teacher->class->studentacademics
                ->pluck('reg_no')
                ->unique()
                ->toArray();
            $query->whereIn('reg_no', $studentRegNos);
        }
    }

    // Apply filters
    if ($request->has('reg_no')) {
        $query->where('reg_no', 'LIKE', '%' . $request->input('reg_no') . '%');
    }

    if ($request->term) {
        $query->where('term', $request->term);
    }

    if ($request->has('year')) {
    $query->whereHas('studentAcademic.class', function ($q) use ($request) {
        $q->where('year', $request->input('year'));
    });
}

    if ($request->has('subject_id')) {
        $query->where('subject_id', 'LIKE', '%' . $request->input('subject_id') . '%');
    }

    if ($request->has('subject_name')) {
    $query->whereHas('subject', function ($q) use ($request) {
        $q->where('subject_name', 'LIKE', '%' . $request->input('subject_name') . '%');
    });
}


    if ($request->has('marks_obtained')) {
        $query->where('marks_obtained', $request->input('marks_obtained'));
    }

    if ($request->has('grade')) {
        $query->where('grade', strtoupper($request->input('grade')));
    }

    // ✅ Correct filter for current grade via relationship
   if ($request->has('current_grade')) {
    $gradeSection = explode('-', $request->input('current_grade')); // e.g. ['8', 'B']
    $grade = $gradeSection[0] ?? null;
    $section = $gradeSection[1] ?? null;

    $query->whereHas('studentAcademic.class', function ($q) use ($grade, $section) {
        if ($grade) {
            $q->where('grade', $grade);
        }
        if ($section) {
            $q->where('section', $section);
        }
    });
}




    // ✅ Paginate and transform
    $marks = $query->paginate($request->get('limit', 10));
    $marks->getCollection()->transform(function ($mark) {
        $mark->current_grade = optional($mark->studentAcademic?->class)->grade ?? null;
        $mark->section = optional($mark->studentAcademic?->class)->section ?? null;
        $mark->combined_grade = $mark->current_grade && $mark->section
    ? $mark->current_grade . '-' . $mark->section
    : null;
        $mark->year = optional($mark->studentAcademic?->class)->year ?? null;
        $mark->subject_name = optional($mark->subject)->subject_name ?? 'Unknown Subject';
        return $mark;
    });

    return response()->json($marks)->header('x-total-count', Marks::count());
}



    // Store a new mark
    public function store(Request $request)
{
    $validated = $request->validate([
        'reg_no' => 'required|integer',
        'subject_id' => 'required|integer',
        'marks_obtained' => 'required|integer',
        'grade' => 'required|string|max:1|in:A,B,C,D,E,F',
        'term' => 'required|string|max:20',
       
    ]);

    $mark = Marks::create($validated);

    return response()->json([
        'message' => 'Mark added successfully',
        'mark' => $mark
    ], 201);
}

    // Fetch a specific mark by ID
    public function show($id)
    {
        $mark = Marks::find($id);

        if (!$mark) {
            return response()->json(['message' => 'Mark not found'], 404);
        }

        return response()->json($mark);
    }

    // Update an existing mark
   public function update(Request $request, $id)
{
    $mark = Marks::find($id);
    if (!$mark) {
        return response()->json(['message' => 'Mark not found'], 404);
    }

    $validated = $request->validate([
        'reg_no' => 'required|integer',
        'subject_id' => 'required|integer',
        'marks_obtained' => 'required|integer',
        'grade' => 'required|string|max:1|in:A,B,C,D,E,F',
        'term' => 'required|string|max:20',
        
    ]);

    $mark->update($validated);

    return response()->json([
        'message' => 'Mark updated successfully',
        'mark' => $mark
    ]);
}


    // Delete a specific mark
    public function destroy($id)
    {
        // Find mark by ID
        $mark = Marks::find($id);

        if (!$mark) {
            return response()->json(['message' => 'Mark not found'], 404);
        }

        // Delete mark
        $mark->delete();

        // Return success response
        return response()->json(['message' => 'Mark deleted successfully']);
    }
}
