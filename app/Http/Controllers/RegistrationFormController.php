<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;

class RegistrationFormController extends Controller
{
    public function registrationType()
    {
        return Inertia::render('registrationForms');
    }
}
