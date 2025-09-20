<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('other_services', function (Blueprint $table) {
            $table->id();
            $table->string('teacher_NIC', 20);
            $table->foreign('teacher_NIC')->references('teacher_NIC')->on('teacher_work_infos')->onDelete('cascade');

            $table->string('other_responsibilities_in_school', 255)->nullable();

            $table->enum('EDCS_membership', ['Yes', 'No']);

            $table->bigInteger('WSOP_Number')->unsigned()->nullable();

            $table->enum('Agrahara_insuarence_membership', ['Yes', 'No'])->nullable();


            $table->timestamps();



        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('other_services');
    }
};
