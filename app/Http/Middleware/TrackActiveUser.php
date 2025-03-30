<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;
use App\Models\ActiveSession;

class TrackActiveUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if(Auth::check()){
            $user=Auth::user();

            $sessionData =Session::all();

            ActiveSession::updateOrCreate(

                ['user_id' => $user->id],
                [
                    'ip_address'=>$request->ip(),
                    'user_agent'=>$request->header('User-Agent'),
                    'payload'=>serialize($sessionData),
                    'last_activity'=> now(),


                ]
                );

        }
        return $next($request);
    }
}
