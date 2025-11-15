<?php

namespace App\Providers;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\TrackActiveUser;
use App\Http\Middleware\TeacherMiddleware;

class AppServiceProvider extends ServiceProvider
{
    
    public function register(): void
    {
        //
    }

    
    public function boot(): void
    {
       
        Route::middlewareGroup('admin', [
            AdminMiddleware::class,
        ]);
        Route::middlewareGroup('teacher', [
            TeacherMiddleware::class,
        ]);

        app('router')->aliasMiddleware('track.active', TrackActiveUser::class);

       
    }
}
