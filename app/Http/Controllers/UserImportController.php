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
           'file' => 'required|mimes:csv,xlsx,xls|max:10240', 
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        
        try {
            Excel::import(new UsersImport, $request->file('file'));

            
            return redirect()->route('user.import')->with('success', 'Users imported successfully!');
        } catch (\Exception $e) {
            
            return redirect()->back()->with('error', 'There was an error importing the file. Please try again.');
        }
    }
}
