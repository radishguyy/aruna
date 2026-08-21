<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'order_id', 'invoice_number', 'pdf_url', 'status', 'due_date'
    ];

    protected $casts = [
        'due_date' => 'datetime',
    ];

    public function order() { return $this->belongsTo(Order::class); }
}