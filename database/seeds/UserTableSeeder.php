<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $users = array(
        array('id' => '1','first_name' => 'Mahendran','last_name' => 'Kannan','email' => 'mahendran.g@whatarage.com','password' => '$2y$10$sCn4qohZsfQDt7IarDgQK.g0qWmjG6OMiaVRQ2aazulet7TiJo6/u','providers' => 'web','provider_id' => '','status' => 'Active','remember_token' => '1qM6fGFczGrCyMXaLZeSgypip2wVnJoEM7xCLVorbBvyvr4oA1GIHtNseE3k','created_at' => '2016-02-16 12:24:21','updated_at' => '2016-02-17 11:23:07')
      );

      DB::table('users')->insert($users);
    }
}
