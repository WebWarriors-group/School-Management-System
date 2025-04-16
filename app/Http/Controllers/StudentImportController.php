<?php

namespace App\Http\Controllers;
use Maatwebsite\Excel\Facades\Excel;

use Illuminate\Http\Request;
use App\Imports\StudentsImport;


class StudentImportController extends StudentController
{
    public function import(Request $request)
{
    try {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv',
        ]);

        Excel::import(new StudentsImport, $request->file('file'));

        return response()->json(['message' => 'Students imported successfully!']);
    } catch (\Throwable $e) {
        return response()->json([
            'message' => 'Import failed',
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(), // Optional: full trace
        ], 500);
    }
}

}