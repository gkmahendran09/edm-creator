<?php

namespace App\Http\Middleware;

use Closure;
use Session, Helpers;

class AuthenticateAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role = '')
    {
		if(!Session::has('ADMIN.id'))
		{
			if ($request->ajax())
			{
          return response('Unauthorized.', 401);
      }
			else
			{
    		  Session::flash('flash_error', 'Login to continuee!');
          return redirect()->route("admin_login");
      }
		}
        return $next($request);
    }
}
