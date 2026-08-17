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
    }
}
