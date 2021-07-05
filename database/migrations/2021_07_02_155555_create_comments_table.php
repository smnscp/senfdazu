<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')
                ->constrained('posts')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('comments')
                ->onUpdate('cascade')
                ->onDelete('set null');
            $table->unsignedInteger('lid');
            $table->longText('message');
            $table->string('name');
            $table->string('email');
            $table->ipAddress('ip');
            $table->string('token', 64);
            $table->boolean('approved')->default(false);
            $table->timestamps();

            $table->unique(['post_id', 'lid']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
