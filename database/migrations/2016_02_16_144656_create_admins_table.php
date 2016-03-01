<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('admins', function (Blueprint $table) {
          $table->increments('id');
          $table->string('user_name')->unique();
          $table->string('first_name');
          $table->string('last_name');
          $table->string('email')->unique();
          $table->string('password', 60);
          $table->string('created_by', 50);
          $table->enum('status', ['Inactive', 'Active']);
          $table->rememberToken();
          $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('admins');
    }
}
