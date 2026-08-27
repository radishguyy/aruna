<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];

    protected $casts = [
        'due_date' => 'datetime',
    ];

    public function order() { return $this->belongsTo(Order::class); }
}