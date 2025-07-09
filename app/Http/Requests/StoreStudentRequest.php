<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
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
        return [
            'reg_no' => 'required|unique:student_academic_info,reg_no',
            'class_id' => 'required|string',
            'admission_date' => 'nullable|date',

            'personal.full_name' => 'required|string',
            'personal.full_name_with_initial' => 'required|string|max:50',
            'personal.birthday' => 'required|date',
            'personal.age' => 'required|integer|min:3|max:25',
            'personal.gender' => 'required|in:male,female,other',

            'family.mother_name' => 'nullable|string|max:100',
            'family.father_name' => 'nullable|string|max:100',

            'siblings.*.sibling_name' => 'nullable|string|max:100',
            'siblings.*.relationship'=>'nullable|string|max:50',
            'siblings.*.sibling_age'=>'nullable|integer|min:0,max:40',
            'siblings.*.occupation'=>'nullable|string|max:100',
            'siblings.*.contact'=>'nullable|string|regex:/^(?:\+94|0)?\d{9}$|max:15'
        ];
    }
    public function messages():array{
        return [
         'reg_no.unique' => 'The registration number already exists!'
        ];
    }
}
