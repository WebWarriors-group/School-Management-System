<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\StudyMaterial;

class StudyMaterialController extends Controller
{
    public function menu()
    {
        return Inertia::render('studyMaterial/studyMaterials');
    }
    /**
     * Display a listing of the materials.
     */
    public function index($category)
    {
        $materials = StudyMaterial::where('category', $category)->get();

        return Inertia::render('studyMaterial/studyMaterialIndex', [
            'category' => $category,
            'materials' => $materials,
        ]);
        
    }

    /**
     * Store a newly created material in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'subject_id' => 'required|integer|exists:subjects,subject_id', // subject_id must exist in subjects table
            'title' => 'required|string|max:255',
            'file_path' => 'required|string',
        ]);

        // Create a new material
        $material = StudyMaterial::create([
            'subject_id' => $validated['subject_id'],
            'title' => $validated['title'],
            'file_path' => $validated['file_path'],

        ]);

        return response()->json([
            'message' => 'StudyMaterial created successfully',
            'material' => $material
        ], 201);
    }

    /**
     * Display the specified material.
     */
    public function show($id)
    {
        $material = StudyMaterial::find($id);

        if (!$material) {
            return response()->json(['message' => 'Material not found'], 404);
        }

        return response()->json($material,200);
    }

    /**
     * Update the specified material in storage.
     */
    public function update(Request $request, $id)
    {
        $material = StudyMaterial::find($id);

        if (!$material) {
            return response()->json(['message' => 'Material not found'], 404);
        }

        // Validate the incoming request
        $validated = $request->validate([
            'subject_id' => 'required|integer|exists:subjects,subject_id',
            'title' => 'required|string|max:255',
            'file_path' => 'required|string',
        ]);

        // Update the material
        $material->update($validated);

        return response()->json([
            'message' => 'Material updated successfully',
            'material' => $material
        ]);
    }

    /**
     * Remove the specified material from storage.
     */
    public function destroy($id)
    {
        $material = StudyMaterial::find($id);

        if (!$material) {
            return response()->json(['message' => 'Material not found'], 404);
        }

        // Delete the material
        $material->delete();

        return response()->json(['message' => 'Material deleted successfully']);
    }
}
