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
	      'name' => 'User 1',
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	  	);

	     DB::table('resources')->insert($resource);
 	    $resource = array(
	      'name' => 'User 2',
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	  	);

	     DB::table('resources')->insert($resource);
 	    $resource = array(
	      'name' => 'User 3',
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	  	);

	     DB::table('resources')->insert($resource);
 	    $resource = array(
	      'name' => 'User 4',
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	  	);

	     DB::table('resources')->insert($resource);

    }
}
