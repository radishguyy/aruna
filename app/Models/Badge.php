<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Badge extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'requirement_value' => 'integer',
    ];

    public function children(): BelongsToMany
    {
        return $this->belongsToMany(Child::class, 'child_badges')
                    ->withPivot('earned_at')
                    ->withTimestamps();
    }
}
