<?php

namespace App\Http\Controllers;

use App\Imports\UsersImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Validator;


class UserImportController extends Controller
{
    public function import(Request $request)
    {
        $validator = Validator::make($request->all(), [
           'file' => 'required|mimes:csv,xlsx,xls|max:10240', // Max size: 10MB
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Import the file using the UsersImport class
        try {
            Excel::import(new UsersImport, $request->file('file'));

            // Redirect with success message
            return redirect()->route('user.import')->with('success', 'Users imported successfully!');
        } catch (\Exception $e) {
            // Handle the exception if import fails
            return redirect()->back()->with('error', 'There was an error importing the file. Please try again.');
        }
    }
}
