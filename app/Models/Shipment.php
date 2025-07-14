<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    protected $fillable = [
        'external_user_id',
        'truck_plate',
        'product_name',
        'status',
        'announced_at',
        'delivered_at',
        'notes',
    ];

    protected $casts = [
        'announced_at' => 'datetime',
        'delivered_at' => 'datetime',
    ];

    public function externalUser()
    {
        return $this->belongsTo(ExternalUser::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', '!=', 'cancelled');
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('external_user_id', $userId);
    }
}
