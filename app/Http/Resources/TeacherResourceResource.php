<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * TeacherResource model resource.
 * Exposes all display fields; deliberately excludes `file_path`
 * (internal storage path — not needed by the frontend listing).
 */
class TeacherResourceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'description'    => $this->description,
            'category'       => $this->category,
            'type'           => $this->type,
            'file_size'      => $this->file_size,
            'download_count' => $this->download_count,
        ];
    }
}
