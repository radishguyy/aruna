<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Landing/Home', [
            'articles' => Article::limit(3)->get()
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('Landing/About');
    }

    public function blog(): Response
    {
        return Inertia::render('Landing/Blog', [
            'articles' => Article::all()
        ]);
    }

    public function blogPost(string $slug): Response
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        return Inertia::render('Landing/BlogPost', [
            'article' => $article
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // In a real application, you would send an email or save to DB.
        // For this demo, we'll return back with a success status.
        return back()->with('status', 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
    }
}
