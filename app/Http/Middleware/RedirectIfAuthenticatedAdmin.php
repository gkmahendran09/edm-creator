<?php

namespace App\Http\Middleware;

use Closure;
use Session;

class RedirectIfAuthenticatedAdmin
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Session::has('ADMIN.id'))
    		{
    			return redirect()->route("admin_dashboard");
    		}

        return $next($request);
    }
}
