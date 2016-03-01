<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Validator, Blade, Session;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        
        Validator::extend('check_captcha', function($attribute, $value, $parameters, $validator) {
            $image	=	new \Securimage();
            return $image->check($value) === true;
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
