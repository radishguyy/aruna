<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Module list resource — used in category/CMS listing views.
 * Does NOT include content_data (large JSON blob).
 * Use ModuleResource for the detail/play view.
 */
class ModuleListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'title'            => $this->title,
            'slug'             => $this->slug,
            'type'             => $this->type,
            'difficulty_level' => $this->difficulty_level,
            'is_premium'       => $this->is_premium,
            'order'            => $this->order,
            'category_id'      => $this->category_id,
            'category'         => $this->whenLoaded('category', fn() => [
                'id'   => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
                'icon' => $this->category->icon,
            ]),
            // user_status and user_score are set dynamically in ChildController
            // before serialization — forward them when present.
            'user_status'      => $this->when(isset($this->resource->user_status), $this->resource->user_status ?? null),
            'user_score'       => $this->when(isset($this->resource->user_score), $this->resource->user_score ?? null),
        ];
    }
}
