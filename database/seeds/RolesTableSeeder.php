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
	  	);

	     DB::table('roles')->insert($role);

 	    $role = array(
	      'name' => 'Worker'
	  	);

	     DB::table('roles')->insert($role);
 	    $role = array(
	      'name' => 'Stakeholder'
	  	);

	     DB::table('roles')->insert($role);
 	    $role = array(
	      'name' => 'Customer'
	  	);

	     DB::table('roles')->insert($role);
    }
}
