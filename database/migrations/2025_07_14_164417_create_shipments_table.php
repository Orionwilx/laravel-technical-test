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
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('external_user_id')->constrained()->onDelete('cascade');
            $table->string('truck_plate', 10); // Placa del camión (formato colombiano)
            $table->string('product_name');
            $table->enum('status', ['announced', 'in_transit', 'delivered', 'cancelled'])->default('announced');
            $table->timestamp('announced_at')->useCurrent();
            $table->timestamp('delivered_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
