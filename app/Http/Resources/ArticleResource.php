<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Full Article resource for the blog post detail page.
 * Includes the full `content` body.
 */
class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'slug'           => $this->slug,
            'title'          => $this->title,
            'description'    => $this->description,
            'content'        => $this->content,
            'category'       => $this->category,
            'category_color' => $this->category_color,
            'date'           => $this->date,
            'author'         => $this->author,
            'image_url'      => $this->image_url,
        ];
    }
}
