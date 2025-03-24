<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassModel;

class ClassController extends Controller
{
    /**
     * Display a listing of classes.
     */
    public function index()
    {
        return response()->json(ClassModel::all(), 200);
    }

    /**
     * Store a new class.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'class_teacher' => 'required|exists:teachers,id',
            'class_name' => 'nullable|string|max:10',
            'grade' => 'required|integer',
            'section' => 'required|string|max:5',
            'number_of_students' => 'required|integer|min:0|max:100',
        ]);

        $class = ClassModel::create($validatedData);
        return response()->json($class, 201);
    }

    /**
     * Display a specific class.
     */
    public function show($id)
    {
        $class = ClassModel::find($id);
        return $class ? response()->json($class, 200)
                      : response()->json(['message' => 'Class not found'], 404);
    }

    /**
     * Update a class.
     */
    public function update(Request $request, $id)
    {
        $class = ClassModel::find($id);

        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        $validatedData = $request->validate([
            'class_teacher' => 'sometimes|required|exists:teachers,id',
            'class_name' => 'sometimes|nullable|string|max:10',
            'grade' => 'sometimes|required|integer',
            'section' => 'sometimes|required|string|max:5',
            'number_of_students' => 'sometimes|required|integer|min:0|max:100',
        ]);

        $class->update($validatedData);
        return response()->json($class, 200);
    }

    /**
     * Delete a class.
     */
    public function destroy($id)
    {
        $class = ClassModel::find($id);

        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        $class->delete();
        return response()->json(['message' => 'Class deleted successfully'], 200);
    }
}
