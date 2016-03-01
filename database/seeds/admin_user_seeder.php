<?php

use Illuminate\Database\Seeder;

class admin_user_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('admins')->insert([
           'user_name' => 'admin',
           'first_name' => 'Super',
           'last_name' => 'Admin',
           'email' => 'mahendran.g@whatarage.com',
           'password' => bcrypt('Admin2K16'),
           'created_by' => 'System',
           'status' => 'Active'
       ]);
    }
}
