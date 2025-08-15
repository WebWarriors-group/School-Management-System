<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Models\StudentAcademic;
use Illuminate\Support\Facades\Hash;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $studentParam = $this->route('student');

        return $studentParam
            ? ['reg_no' => ['required', 'string'], 'password' => ['required', 'string']]
            : ['email' => ['required', 'string', 'email'], 'password' => ['required', 'string']];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $studentParam = $this->route('student');
        
        if ($studentParam) {
            // Student login via reg_no
            $student = StudentAcademic::where('reg_no', $this->input('reg_no'))->first();

            if (! $student || ! Hash::check($this->input('password'), $student->user->password)) {
                RateLimiter::hit($this->throttleKey());
                throw ValidationException::withMessages([
                    'reg_no' => __('auth.failed'),
                ]);
            }

            // Log in the related user
            Auth::login($student->user, $this->boolean('remember'));

        } else {
            // Normal login via email
            if (! Auth::attempt(['email' => $this->input('email'), 'password' => $this->input('password')], $this->boolean('remember'))) {
                RateLimiter::hit($this->throttleKey());
                throw ValidationException::withMessages([
                    'email' => __('auth.failed'),
                ]);
            }
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        $studentParam = $this->route('student');

        throw ValidationException::withMessages([
            $studentParam ? 'reg_no' : 'email' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        $studentParam = $this->route('student');
        $key = $studentParam ? $this->string('reg_no') : $this->string('email');
        return Str::transliterate(Str::lower($key).'|'.$this->ip());
    }
}
