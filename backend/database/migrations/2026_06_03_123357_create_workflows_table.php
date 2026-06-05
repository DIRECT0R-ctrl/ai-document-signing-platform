<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('workflows', function (Blueprint $table) {
          $table->id();
          $table->foreignUuid('document_id')->constrained()->onDelete('cascade');
          $table->foreignId('user_id')->constrained();
          $table->integer('step_order');
          $table->enum('action_type', ['approve', 'sign']);
          $table->enum('status', ['pending', 'completed', 'rejected']);
          $table->text('rejection_reason')->nullable();
          $table->timestamp('actioned_at')->nullable();
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workflows');
    }
};
