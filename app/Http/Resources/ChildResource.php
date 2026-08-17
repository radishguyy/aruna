<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Child resource for parent/teacher/child-mode views.
 * Eagerly load 'badges' and 'progress' before passing if those relationships
 * are needed — use whenLoaded() so this resource is safe in all contexts.
 */
class ChildResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'nickname'     => $this->nickname,
            'gender'       => $this->gender,
            'birth_date'   => $this->birth_date?->toDateString(),
            'avatar_url'   => $this->avatar_url,
            'total_points' => $this->total_points,
            'badges'       => BadgeResource::collection($this->whenLoaded('badges')),
            'progress'     => ProgressResource::collection($this->whenLoaded('progress')),
        ];
    }
}
