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
	      'name' => 'User 1'
	  	);

	     DB::table('resources')->insert($resource);
 	    $resource = array(
	      'name' => 'User 2'
	  	);

	     DB::table('resources')->insert($resource);
 	    $resource = array(
	      'name' => 'User 3'
	  	);

	     DB::table('resources')->insert($resource);
 	    $resource = array(
	      'name' => 'User 4'
	  	);

	     DB::table('resources')->insert($resource);

    }
}
