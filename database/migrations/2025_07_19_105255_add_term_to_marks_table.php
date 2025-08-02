<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTermToMarksTable extends Migration
{
    public function up()
    {
        Schema::table('marks', function (Blueprint $table) {
            $table->string('term')->nullable()->after('grade');
 // or ->enum('term', ['Term 1', 'Term 2', 'Term 3'])
        });
    }

    public function down()
    {
        Schema::table('marks', function (Blueprint $table) {
            $table->dropColumn('term');
        });
    }
}
