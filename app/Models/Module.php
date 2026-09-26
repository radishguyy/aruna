<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Module extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $guarded = [];

    protected $casts = [
        'is_premium' => 'boolean',
        'difficulty_level' => 'integer',
        'order' => 'integer',
        'content_data' => 'array',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ModuleCategory::class, 'category_id');
    }

    public function progress(): HasMany
    {
        return $this->hasMany(Progress::class);
    }

    /**
     * Get the ID of the single module freely accessible to non-subscribed users.
     */
    public static function getFreeModuleId(): string
    {
        return static::orderBy('order')->value('id') ?? 'm-1';
    }

    /**
     * Check if this module is the free preview module.
     */
    public function isFreePreview(): bool
    {
        return $this->id === static::getFreeModuleId();
    }

    /**
     * Determine if a given user can access this module.
     */
    public function isAccessibleBy(?User $user): bool
    {
        // The designated free module is accessible to all users
        if ($this->isFreePreview()) {
            return true;
        }

        // Other modules require an authenticated user with an active subscription
        if (!$user) {
            return false;
        }

        return $user->hasActiveSubscription();
    }
}
