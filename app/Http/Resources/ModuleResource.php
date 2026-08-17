<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Full Module resource — includes content_data for the module detail/play view.
 */
class ModuleResource extends JsonResource
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
            'content_data'     => $this->content_data,
            'category'         => $this->whenLoaded('category', fn() => [
                'id'   => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
                'icon' => $this->category->icon,
            ]),
        ];
    }
}
