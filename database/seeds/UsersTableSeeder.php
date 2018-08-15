<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
	    $user = array(
	      'name' => 'admin',
	      'email' => 'admin@example.com',
	      'password' => Hash::make('harc'),
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	      );

	     DB::table('users')->insert($user);
    }
}
