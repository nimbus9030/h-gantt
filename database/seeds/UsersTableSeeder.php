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

	     $user = array(
	      'name' => 'user1',
	      'email' => 'user1@example.com',
	      'password' => Hash::make('user1'),
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	      );

	     DB::table('users')->insert($user);

	    $user = array(
	      'name' => 'user2',
	      'email' => 'user2@example.com',
	      'password' => Hash::make('user2'),
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	      );

	     DB::table('users')->insert($user);

	     $user = array(
	      'name' => 'user3',
	      'email' => 'user3@example.com',
	      'password' => Hash::make('user3'),
	      'created_at' => DB::raw('NOW()'),
	      'updated_at' => DB::raw('NOW()'),
	      );

	     DB::table('users')->insert($user);
    }
}
