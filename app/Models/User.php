<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function institution(): BelongsTo
    {
        return $this->belongsTo(Institution::class);
    }

    // If role == 'teacher'
    public function classrooms(): HasMany
    {
        return $this->hasMany(Classroom::class, 'teacher_id');
    }

    // If role == 'parent' (Child profiles in parent/child app)
    public function children(): HasMany
    {
        return $this->hasMany(Child::class, 'user_id');
    }

    // Students linked to parent (for classroom/school integrations)
    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'parent_id');
    }

    /**
     * Get the orders for the user.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the subscriptions for the user.
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * Get the current active subscription for the user.
     */
    public function activeSubscription()
    {
        return $this->hasOne(Subscription::class)
            ->where(function ($query) {
                $query->where('status', 'active')
                    ->where(function ($q) {
                        $q->whereNull('current_period_end')
                            ->orWhere('current_period_end', '>=', now());
                    });
            })
            ->latest('current_period_end');
    }

    /**
     * Determine if the user has an active subscription.
     */
    public function hasActiveSubscription(): bool
    {
        if (in_array($this->role, ['admin', 'teacher'])) {
            return true;
        }

        $activeSub = $this->activeSubscription()->first();
        if ($activeSub && $activeSub->is_active) {
            return true;
        }

        // Institution license check
        if ($this->subscription_status === 'licensed' && $this->institution_id) {
            $inst = $this->institution;
            if ($inst && (!$inst->license_expires_at || $inst->license_expires_at->isFuture())) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get effective subscription status ('free', 'standard', 'premium', 'licensed').
     */
    public function getEffectiveSubscriptionStatusAttribute(): string
    {
        if ($this->hasActiveSubscription()) {
            if ($this->subscription_status && $this->subscription_status !== 'free') {
                return $this->subscription_status;
            }
            $activeSub = $this->activeSubscription()->with('plan')->first();
            if ($activeSub && $activeSub->plan_id) {
                if (str_contains($activeSub->plan_id, 'institution')) return 'licensed';
                if (str_contains($activeSub->plan_id, 'premium')) return 'premium';
                return 'standard';
            }
            return 'premium';
        }

        return 'free';
    }

    /**
     * Get maximum allowed children count based on subscription.
     */
    public function maxAllowedChildren(): int
    {
        if (!$this->hasActiveSubscription()) {
            return 1; // Non-subscribed users: maximum 1 child profile
        }

        $activeSub = $this->activeSubscription()->with('plan')->first();
        if ($activeSub && $activeSub->plan) {
            return (int) ($activeSub->plan->max_children ?? 5);
        }

        if ($this->subscription_status === 'licensed') {
            return 50;
        }

        if ($this->subscription_status === 'premium') {
            return 5;
        }

        return 2;
    }

    /**
     * Get the most recent subscription for the user.
     */
    public function latestSubscription()
    {
        return $this->hasOne(Subscription::class)->latest('current_period_end');
    }

    public function conversations(): HasMany
    {
        return $this->hasMany(AiConversation::class);
    }
}
