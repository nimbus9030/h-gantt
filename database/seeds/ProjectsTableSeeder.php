<?php

use Illuminate\Database\Seeder;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
	    $project = array(
	      'name' => 'my project',
	      'description' => 'test project',
	      'status' => 1,
	      'delete_flag' => false,
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	      );

	     DB::table('projects')->insert($project);
    }
}
