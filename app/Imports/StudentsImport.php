<?php
namespace App\Imports;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Illuminate\Validation\Rule;
use App\Models\StudentAcademic;

class StudentsImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure
{
    use SkipsFailures;

    public function model(array $row)
    {
        return StudentAcademic::updateOrCreate(
            ['reg_no' => $row['reg_no']],
            [
                'class_id' => $row['class_id'],
                'distance_to_school' => $row['distance_to_school'],
                'method_of_coming_to_school' => $row['method_of_coming_to_school'],
                'receiving_any_grade_5_scholarship' => $row['receiving_any_grade_5_scholarship'],
                'receiving_any_samurdhi_aswesuma' => $row['receiving_any_samurdhi_aswesuma'],
                'receiving_any_scholarship' => $row['receiving_any_scholarship'],
            ]
        );
    }

    public function rules(): array
    {
        return [
            'reg_no' => 'required|integer',
            'class_id' => 'required|integer',
           
        ];
    }
}
