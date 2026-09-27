<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Throw exceptions for lazy loading, accessing missing attributes,
        // and mass-assigning unfillable fields — non-production only.
        Model::shouldBeStrict(!app()->isProduction());

        Vite::prefetch(concurrency: 3);

        // Enforce HTTPS scheme in production or when behind an SSL-terminating reverse proxy
        if (app()->isProduction() || request()->header('X-Forwarded-Proto') === 'https' || str_starts_with((string) config('app.url'), 'https://')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }
    }
}
