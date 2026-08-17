<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleListResource;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Landing/Home', [
            // Strip full content body for the teaser cards on the home page.
            'articles' => ArticleListResource::collection(
                Article::select(['id', 'slug', 'title', 'description', 'category', 'category_color', 'date', 'author', 'image_url'])
                    ->limit(3)
                    ->get()
            ),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('Landing/About');
    }

    public function blog(): Response
    {
        return Inertia::render('Landing/Blog', [
            // Article listing — no content body; avoids sending large HTML
            // strings for every article when only summaries are displayed.
            'articles' => ArticleListResource::collection(
                Article::select(['id', 'slug', 'title', 'description', 'category', 'category_color', 'date', 'author', 'image_url'])
                    ->latest()
                    ->get()
            ),
        ]);
    }

    public function blogPost(string $slug): Response
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        return Inertia::render('Landing/BlogPost', [
            // Full resource for the detail page — includes content body.
            'article' => ArticleResource::make($article),
        ]);
    }

    public function pricing(): Response
    {
        return Inertia::render('Landing/Pricing');
    }

    public function contact(): Response
    {
        return Inertia::render('Landing/Contact');
    }

    public function submitContact(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        return back()->with('status', 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
    }
}
