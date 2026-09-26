<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * User representation for admin management views.
 * Requires eager-loaded 'institution' and withCount('children').
 */
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $subscriptions = $this->relationLoaded('subscriptions')
            ? $this->subscriptions
            : ($this->id ? $this->subscriptions()->with('plan')->get() : collect());

        $sortedSubs = $subscriptions->sortByDesc(fn($s) => $s->current_period_end ?? $s->created_at);
        $activeSub = $sortedSubs->first(fn($s) => $s->status === 'active' && (!$s->current_period_end || $s->current_period_end->isFuture()));
        $latestSub = $activeSub ?? $sortedSubs->first();

        if ($activeSub) {
            $remaining = $activeSub->current_period_end ? (int) now()->diffInDays($activeSub->current_period_end, false) : null;
            $subscriptionData = [
                'status' => 'active',
                'status_label' => 'Active',
                'plan_name' => $activeSub->plan?->name ?? 'Paket Premium',
                'plan_id' => $activeSub->plan_id,
                'active_from' => $activeSub->current_period_start?->translatedFormat('d M Y, H:i') ?? '-',
                'active_until' => $activeSub->current_period_end?->translatedFormat('d M Y, H:i') ?? '-',
                'remaining_days' => $remaining !== null ? max(0, $remaining) : null,
                'remaining_label' => $remaining !== null ? ($remaining > 0 ? "{$remaining} hari lagi" : 'Hari ini berakhir') : 'Aktif',
            ];
        } elseif ($latestSub) {
            $subscriptionData = [
                'status' => 'expired',
                'status_label' => 'Expired',
                'plan_name' => $latestSub->plan?->name ?? 'Paket Premium',
                'plan_id' => $latestSub->plan_id,
                'active_from' => $latestSub->current_period_start?->translatedFormat('d M Y, H:i') ?? '-',
                'active_until' => $latestSub->current_period_end?->translatedFormat('d M Y, H:i') ?? '-',
                'remaining_days' => 0,
                'remaining_label' => 'Kedaluwarsa',
            ];
        } elseif ($this->subscription_status === 'licensed' && $this->relationLoaded('institution') && $this->institution) {
            $inst = $this->institution;
            $isExpired = $inst->license_expires_at && $inst->license_expires_at->isPast();
            $remaining = $inst->license_expires_at ? (int) now()->diffInDays($inst->license_expires_at, false) : null;
            $subscriptionData = [
                'status' => $isExpired ? 'expired' : 'active',
                'status_label' => $isExpired ? 'Expired' : 'Active',
                'plan_name' => 'Lisensi ' . $inst->name,
                'plan_id' => 'institution_license',
                'active_from' => $inst->created_at?->translatedFormat('d M Y, H:i') ?? '-',
                'active_until' => $inst->license_expires_at?->translatedFormat('d M Y, H:i') ?? 'Tanpa batas',
                'remaining_days' => $remaining !== null ? max(0, $remaining) : null,
                'remaining_label' => $remaining !== null ? ($remaining > 0 ? "{$remaining} hari lagi" : 'Kedaluwarsa') : 'Aktif',
            ];
        } else {
            $subscriptionData = [
                'status' => 'never_subscribed',
                'status_label' => 'Never Subscribed',
                'plan_name' => '-',
                'plan_id' => null,
                'active_from' => '-',
                'active_until' => '-',
                'remaining_days' => null,
                'remaining_label' => '-',
            ];
        }

        $history = $sortedSubs->map(fn($s) => [
            'id' => $s->id,
            'plan_name' => $s->plan?->name ?? $s->plan_id,
            'status' => $s->status,
            'current_period_start' => $s->current_period_start?->translatedFormat('d M Y, H:i') ?? '-',
            'current_period_end' => $s->current_period_end?->translatedFormat('d M Y, H:i') ?? '-',
            'created_at' => $s->created_at?->translatedFormat('d M Y, H:i') ?? '-',
        ])->values()->all();

        return [
            'id'                   => $this->id,
            'name'                 => $this->name,
            'email'                => $this->email,
            'role'                 => $this->role,
            'subscription_status'  => $this->subscription_status,
            'institution'          => $this->whenLoaded('institution', fn() => $this->institution?->name),
            'children_count'       => $this->children_count ?? 0,
            'created_at'           => $this->created_at?->translatedFormat('d M Y'),
            'subscription'         => $subscriptionData,
            'subscription_history' => $history,
        ];
    }
}
