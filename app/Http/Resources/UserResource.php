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
        return [
            'id'                  => $this->id,
            'name'                => $this->name,
            'email'               => $this->email,
            'role'                => $this->role,
            'subscription_status' => $this->subscription_status,
            'institution'         => $this->whenLoaded('institution', fn() => $this->institution?->name),
            'children_count'      => $this->children_count ?? 0,
            'created_at'          => $this->created_at?->format('Y-m-d'),
        ];
    }
}
