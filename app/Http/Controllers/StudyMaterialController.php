<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\StudyMaterial;
use App\Events\StudyMaterialUploaded;
use Illuminate\Validation\ValidationException;
use Exception;

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
        $materials = StudyMaterial::with('uploaded_by:id,name,role')
            ->where('category', $category)
            ->get();

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
        try {
            $validated = $request->validate([
               'title' => 'required|string|max:255',
               'grade' => 'required|integer|min:6|max:13',
               'subject' => 'required|string',
               'year' => 'required|integer',
               'file' => 'required|file|mimes:pdf,doc,docx,ppt,pptx,txt|max:51200', // 50MB max
               'category' => 'required|string',
            ]);

            if (!$request->hasFile('file') || !$request->file('file')->isValid()) {
                return response()->json(['message' => 'No valid file uploaded'], 400);
            }

            $file = $request->file('file');
            $path = $file->storeAs('materials', time() . '_' . Str::slug($file->getClientOriginalName()), 'public');

            $material = StudyMaterial::create([
                'title' => $validated['title'],
                'uploaded_by' => auth()->id(),
                'grade' => $validated['grade'],
                'subject' => $validated['subject'],
                'year' => $validated['year'],
                'file_url' => $path,
                'category' => $validated['category'],
            ]);

            event(new StudyMaterialUploaded($material, auth()->id()));

            return "";

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            \Log::error('File upload failed: ' . $e->getMessage() . "\n" . $e->getTraceAsString());

            return response()->json([
                'message' => 'File upload failed',
                'error' => $e->getMessage()
            ], 500);
        }
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

        return response()->json($material, 200);
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
