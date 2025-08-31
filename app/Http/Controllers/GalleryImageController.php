<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\GalleryImage;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryImageController extends Controller
{
    
    public function create()
    {
        $categories = GalleryCategory::all();
        return view('gallery.create', compact('categories'));
    }

    
  public function store(Request $request)
{
    $validated = $request->validate([
        'category_id' => 'required|exists:gallery_categories,id',
        'title' => 'nullable|string|max:255',
        'image' => 'required|image|max:2048',
    ]);

    $file = $request->file('image');

    // Create the gallery folder if it doesn't exist
    $destinationPath = public_path('gallery');
    if (!file_exists($destinationPath)) {
        mkdir($destinationPath, 0755, true);
    }

    $filename = time() . '_' . $file->getClientOriginalName();

    // Move the uploaded file to public/gallery
    $file->move($destinationPath, $filename);

    // Save the relative path in DB (relative to public folder)
    $imagePath = 'gallery/' . $filename;

    GalleryImage::create([
        'category_id' => $validated['category_id'],
        'title' => $validated['title'],
        'image_path' => $imagePath,
    ]);

    return redirect()->back()->with('success', 'Image uploaded successfully!');

    
}


    
   public function index()
{
    $categories = GalleryCategory::with('images')->get();

    return Inertia::render('Admin/Gallery', [
    'categories' => $categories,
]);
       
}

    
    public function destroy(GalleryImage $image)
    {
        if (Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

        $image->delete();
        return back()->with('success', 'Image deleted successfully.');
    }


  public function storeCategory(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255|unique:gallery_categories,name',
    ]);

    GalleryCategory::create(['name' => $request->name]);

    return back()->with('success', 'Category added!');
}
}