<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('teachers_address', function (Blueprint $table) {
            $table->id(); 

            // Store Teacher NIC (should match the format of teacher NIC in `teachers_personal_info`)
            $table->string('teacher_NIC',20);
            $table->foreign('teacher_NIC')->references('teacher_NIC')->on('teacher_work_infos')->onDelete('cascade');


            // Address fields with length limits
            $table->string('permanent_address');
            $table->string('permanent_residential_address', 255)->nullable();
            $table->string('grama_niladari_division', 100);
            $table->integer('grama_niladari_division_number')->unsigned()->nullable()->length(10);
            $table->string('election_division', 100);
            $table->integer('election_division_number')->unsigned()->nullable()->length(10);
           

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers_address');
    }
};
