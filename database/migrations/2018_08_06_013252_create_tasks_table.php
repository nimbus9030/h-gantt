<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->integer('project_id')->unsigned();
            $table->foreign('project_id')->references('id')->on('projects');
            $table->increments('id');

            $table->string('name')->nullable(false);//can't be null
            $table->string('code')->nullable(null);
            $table->integer('level')->default(0);
            $table->string('status')->default("STATUS_SUSPENDED");
            $table->dateTime('start')->default(DB::raw('NOW()'));
            $table->integer('duration')->default(0);
            $table->dateTime('end')->default(DB::raw('NOW()'));
            $table->boolean('start_is_milestone')->default(false);
            $table->boolean('end_is_milestone')->default(false);

            $table->boolean('progress_by_worklog')->default(false); // 'progressByWorklog'
            $table->integer('relevance')->default(0);
            $table->string('type')->default("");
            $table->integer('type_id')->default(0);// 'typeId'
            $table->boolean('can_write')->default(true);// 'canWrite'
            $table->boolean('collapsed')->default(false);
            $table->boolean('has_child')->default(false);// 'hasChild' 
            // $table->assigs -- this array will be created by the database
            $table->string('depends')->nullable(true);
            $table->string('description')->nullable(true);
            $table->integer('progress')->default(0);
            $table->boolean('delete_flag')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
