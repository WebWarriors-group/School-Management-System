<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Img;

class ImageController extends Controller
{
    public function index()
    {
        $img = Img::all();
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|max:2048',
        ]);

        $imageName = time() . '.' . $request->image->extension();

        $request->image->move(public_path('images'), $imageName);

        $image = Image::create([
            'title' => $request->title,
            'path' => 'images/' . $imageName,
        ]);

        return redirect()->back()->with('success', 'Image uploaded successfully!');
    }
}
