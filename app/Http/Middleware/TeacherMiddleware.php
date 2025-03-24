<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class TeacherMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check() || Auth::user()->role !== 'teacher') {
            abort(403, 'Unauthorized access'); // Restrict access
            return redirect('/home')->with('error', 'You do not have permission to access this page');
        }

        return $next($request);
    }
}
