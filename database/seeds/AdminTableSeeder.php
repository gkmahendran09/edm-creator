<?php

use Illuminate\Database\Seeder;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $admins = array(
        array('id' => '1','user_name' => 'admin','first_name' => 'Super','last_name' => 'Admin','email' => 'mahendran.g@whatarage.com','password' => '$2y$10$.aZRZcGFnaTzC6mA.40GXePwQNKLfnvleeyaYt50VZouHZ1e2xo1q','created_by' => 'System','status' => 'Active','remember_token' => NULL,'created_at' => '0000-00-00 00:00:00','updated_at' => '0000-00-00 00:00:00')
      );

      DB::table('admins')->insert($admins);
    }
}
