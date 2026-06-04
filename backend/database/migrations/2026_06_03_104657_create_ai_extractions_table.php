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
        Schema::create('ai_extractions', function (Blueprint $table) {
          $table->id();
          $table->foreignUuid('document_id')->constrained()->onDelete('cascade');
          $table->string('document_type');
          $table->jsonb('extracted_metadata');
          $table->decimal('confidence_score', 5,2);
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_extractions');
    }
};
