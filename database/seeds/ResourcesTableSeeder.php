<?php

use Illuminate\Database\Seeder;

class ResourcesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$resource = array(
    		'project_id' => 1,
    		'user_id' => 1,
    		'access' => 1,
    		'created_at' => DB::raw('NOW()'),
    		'updated_at' => DB::raw('NOW()'),
    	);

    	DB::table('resources')->insert($resource);

    	$resource = array(
    		'project_id' => 1,
    		'user_id' => 2,
    		'access' => 2,
    		'created_at' => DB::raw('NOW()'),
    		'updated_at' => DB::raw('NOW()'),
    	);

    	DB::table('resources')->insert($resource);
    	$resource = array(
    		'project_id' => 1,
    		'user_id' => 3,
    		'access' => 2,
    		'created_at' => DB::raw('NOW()'),
    		'updated_at' => DB::raw('NOW()'),
    	);

    	DB::table('resources')->insert($resource);
    	$resource = array(
    		'project_id' => 1,
    		'user_id' => 4,
    		'access' => 2,
    		'created_at' => DB::raw('NOW()'),
    		'updated_at' => DB::raw('NOW()'),
    	);

    	DB::table('resources')->insert($resource);

    }
}
