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
        Schema::create('audit_logs', function (Blueprint $table) {
          $table->id();
          $table->foreignUuid('document_id')->nullable()
                                          ->constrained()
                                          ->onDelete('set null');

          $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->onDelete('set null');

          $table->string('action');
          $table->ipAddress('ip_address');
          $table->text('user_agent');
          $table->jsonb('playload')->nullable();
          //$table->timestamp('created_at')
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
