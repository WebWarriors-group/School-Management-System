<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ExternalController extends Controller
{
    public function getRandomQuote(Request $request)
    {
        try {
            $response = Http::get('https://api.quotable.io/random', $request->query());
            
            if (!$response->successful()) {
                return response()->json(['error' => 'Failed to fetch quote'], 500);
            }
            
            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}