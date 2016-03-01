<?php

namespace App\Http\Controllers\Admin;

use App\Models\User\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
	public function __construct()
  {
		$this->middleware('auth_admin');
  }
	public function home()
	{
		return view('admin.dashboard');
	}	
}
