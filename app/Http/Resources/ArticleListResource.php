<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Article summary for listing pages (Blog index, Landing Home).
 * Does NOT include the full `content` body to keep the list payload small.
 * Use ArticleResource for the blog post detail page.
 */
class ArticleListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'slug'           => $this->slug,
            'title'          => $this->title,
            'description'    => $this->description,
            'category'       => $this->category,
            'category_color' => $this->category_color,
            'date'           => $this->date,
            'author'         => $this->author,
            'image_url'      => $this->image_url,
        ];
    }
}
