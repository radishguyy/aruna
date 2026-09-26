<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];

    protected $casts = [
        'current_period_start' => 'datetime',
        'current_period_end' => 'datetime',
        'trial_end_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'auto_renew' => 'boolean',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function plan() { return $this->belongsTo(Plan::class); }

    public function getRemainingDaysAttribute(): int
    {
        if (!$this->current_period_end || $this->current_period_end->isPast()) {
            return 0;
        }
        return (int) now()->diffInDays($this->current_period_end);
    }

    public function getIsActiveAttribute(): bool
    {
        return $this->status === 'active' &&
            ($this->current_period_end === null || $this->current_period_end->isFuture());
    }
}