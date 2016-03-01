<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // $this->call(admin_user_seeder::class);

        // $this->call(AdminTableSeeder::class);
        // $this->call(UserTableSeeder::class);
        // $this->call(TemplateTableSeeder::class);

        Model::reguard();
    }
}
