<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];

    protected $casts = [
        'gross_amount' => 'decimal:2',
        'raw_gateway_response' => 'array',
        'settled_at' => 'datetime',
    ];

    public function order() { return $this->belongsTo(Order::class); }
}