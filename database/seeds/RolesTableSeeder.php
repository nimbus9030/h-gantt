<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
	    $role = array(
	      'name' => 'Project Manager',
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	  	);

	     DB::table('roles')->insert($role);

 	    $role = array(
	      'name' => 'Worker',
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	  	);

	     DB::table('roles')->insert($role);
 	    $role = array(
	      'name' => 'Stakeholder',
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	  	);

	     DB::table('roles')->insert($role);
 	    $role = array(
	      'name' => 'Customer',
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	  	);

	     DB::table('roles')->insert($role);
    }
}
