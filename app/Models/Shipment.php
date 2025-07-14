<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeAnnounced($query)
    {
        return $query->where('status', 'announced');
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
