<?php

namespace App\Providers;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\TeacherMiddleware;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::middlewareGroup('admin', [
            AdminMiddleware::class,
        ]);
        Route::middlewareGroup('teacher', [
            TeacherMiddleware::class,
        ]);

        App::setLocale(Session::get('locale', config('app.locale')));
    }
}
