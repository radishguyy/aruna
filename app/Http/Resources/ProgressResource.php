<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Progress record resource.
 * Includes module summary if eager-loaded; never exposes raw child_id FK.
 */
class ProgressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'module_id'    => $this->module_id,
            'status'       => $this->status,
            'score'        => $this->score,
            'completed_at' => $this->completed_at?->toIso8601String(),
            'module'       => ModuleListResource::make($this->whenLoaded('module')),
        ];
    }
}
