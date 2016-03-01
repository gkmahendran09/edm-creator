<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('templates', function (Blueprint $table) {
          $table->increments('id');
          $table->string('template_name')->unique();
          $table->text('html_header');
          $table->text('html_footer');
          $table->text('css');
          $table->text('html');
          $table->text('scope_values');
          $table->string('created_by', 510);
          $table->string('updated_by', 510);          
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
        Schema::drop('templates');
    }
}
