<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Badge resource.
 */
class BadgeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'description'       => $this->description,
            'image_url'         => $this->image_url,
            'requirement_type'  => $this->requirement_type,
            'requirement_value' => $this->requirement_value,
            // Include pivot data (earned_at) when the relation is loaded via
            // BelongsToMany (child_badges pivot table).
            'earned_at'         => $this->whenPivotLoaded('child_badges', fn() => $this->pivot->earned_at),
        ];
    }
}
