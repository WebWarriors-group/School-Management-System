<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Teacher;

class TeacherController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Teacher/dashboard');
    }
    /**
     * Display a listing of teachers.
     */
    public function index()
    {
        return response()->json(Teacher::all(), 200);
    }

    /**
     * Store a newly created teacher record.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'teacher_NIC' => 'required|string|max:20|unique:teacher_work_infos,teacher_NIC',
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
            'commuting_from_school' => 'required|in:Home,Boarding,Hostel,Other',
            'distance_from_school' => 'required|numeric',
            'commuting_method_to_school' => 'required|in:Bicycle,MotorBike,Car,Bus,Threewheeler,Walk,Other',
            'number_in_sign_sheet' => 'required|string|max:20',
            'number_in_salary_sheet' => 'required|string|max:20',
        ]);

        $teacher = Teacher::create($validatedData);

        return response()->json($teacher, 201);
    }

    /**
     * Display a specific teacher record.
     */
    public function show($teacher_NIC)
    {
        $teacher = Teacher::find($teacher_NIC);

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        return response()->json($teacher, 200);
    }

    /**
     * Update a teacher record.
     */
    public function update(Request $request, $teacher_NIC)
    {
        $teacher = Teacher::find($teacher_NIC);

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        $validatedData = $request->validate([
            'appointed_date' => 'sometimes|required|date',
            'work_acceptance_date' => 'sometimes|required|date',
            'appointment_type' => 'sometimes|required|string',
            'salary_increment_date' => 'sometimes|required|date',
            'current_grade_of_teaching_service' => 'sometimes|required|in:Grade I,Grade II,Grade III',
            'work_acceptance_date_school' => 'sometimes|required|date',
            'temporary_attachedschool_or_institute_name' => 'sometimes|required|string|max:100',
            'appointed_subject' => 'sometimes|required|string|max:20',
            'which_grades_teaching_done' => 'sometimes|required|string',
            'current_teaching_subject' => 'sometimes|required|string|max:20',
            'other_subjects_taught' => 'sometimes|required|string',
            'assigned_class' => 'sometimes|required|string',
            'other_responsibilities_assigned' => 'sometimes|required|string',
            '150_hrs_tamil_course_completed' => 'sometimes|boolean',
            'commuting_from_school' => 'sometimes|required|in:Home,Boarding,Hostel,Other',
            'distance_from_school' => 'sometimes|required|numeric',
            'commuting_method_to_school' => 'sometimes|required|in:Bicycle,MotorBike,Car,Bus,Threewheeler,Walk,Other',
            'number_in_sign_sheet' => 'sometimes|required|string|max:20',
            'number_in_salary_sheet' => 'sometimes|required|string|max:20',
        ]);

        $teacher->update($validatedData);

        return response()->json($teacher, 200);
    }

    /**
     * Delete a teacher record.
     */
    public function destroy($teacher_NIC)
    {
        $teacher = Teacher::find($teacher_NIC);

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        $teacher->delete();

        return response()->json(['message' => 'Teacher record deleted successfully'], 200);
    }
}
