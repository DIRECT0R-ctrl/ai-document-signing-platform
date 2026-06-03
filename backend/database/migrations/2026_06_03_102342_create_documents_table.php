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
        Schema::create('documents', function (Blueprint $table) {
          $table->uuid('id')->primary();
          $table->string('title');
          $table->string('file_path');
          $table->string('original_hash');
          $table->string('signed_hash')->nullable();
          $table->enum('status', ['draft', 'processing_ai', 
            'pending_approval', 'pending_signatures', 
            'completed', 'rejected'])->default('draft');
          $table->foreignId('user_id')->constrained()->onDelete('cascade'); // the intiator
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
