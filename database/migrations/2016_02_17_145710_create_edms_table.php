<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEdmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('edms', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('user_id')->unsigned();
          $table->string('edm_name');
          $table->text('html_header');
          $table->text('html_footer');
          $table->text('css');
          $table->text('html');
          $table->text('scope_values');
          $table->string('created_by', 510);
          $table->string('updated_by', 510);
          $table->enum('status', ['draft', 'published']);
          $table->softDeletes();
          $table->timestamps();

          $table->foreign('user_id')->references('id')
                                    ->on('users')
                                    ->onDelete('cascade')
                                    ->onUpdate('cascade');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('edms');
    }
}
