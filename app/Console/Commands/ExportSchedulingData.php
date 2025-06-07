<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use App\Models\ClassModel;
use App\Models\Teacher;
use App\Models\Subject;

class ExportSchedulingData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'export:scheduling-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export scheduling data to a JSON file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $classes = ClassModel::with('subjects.teachers')->get();
        $teachers = Teacher::with('subjects')->get();
        $subjects = Subject::all();
       

        $data = [
            'classes' => $classes,
            'teachers' => $teachers,
            'subjects' => $subjects,
           
        ];

        Storage::put('scheduling_data.json', json_encode($data));
        $this->info('Scheduling data exported successfully.');
    }
}
