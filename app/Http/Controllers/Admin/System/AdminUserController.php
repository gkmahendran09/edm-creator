<?php
namespace App\Http\Controllers\Admin\System;

use App\Models\System\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Session, Validator;
use Utils;

class AdminUserController extends Controller
{
		public function __construct()
	  {
			$this->middleware('is_admin', ['only' => ['showLoginForm']]);
			$this->middleware('auth_admin', ['except' => ['showLoginForm','validateUser','logout']]);
	  }
		public function showLoginForm()
		{
			return view	('admin.login');
		}

		public function validateUser(Request $request)
		{
			$rules = array(
				'user_name' => 'required|min:3',
				'password' 	=> 'required|min:3',
			);

			$messages = [
				'password.required'   => 'The password is required.',
			];

			$validator = Validator::make($request->all(), $rules, $messages);

			if ($validator->fails())
			{
				return redirect()->back()->withInput()->withErrors($validator->errors());
			}
			else
			{
				$objAU		=	new Admin();
				$arr_data	=	$objAU->isAuthorizedUser($request->input('user_name'), $request->input('password'));

				if (!$arr_data)
				{
					Session::flash('flash_error', 'Invalid Login Details');
					return redirect()->route('admin_login');
				}
				else
				{
					$arr_info					=	[];
					$arr_info['id']				=	$arr_data[0]->id;
					$arr_info['name'] 			=	$arr_data[0]->user_full_name;
					$arr_info['email'] 			=	$arr_data[0]->email;
					Session::put('ADMIN', $arr_info);

					return redirect()->route("admin_dashboard");
				}
			}
		}
		/**
	     * logout
	     *
	     * @return void
	     */
		public function logout()
		{
			Session::forget('ADMIN');
			Session::flash('flash_success', 'Logged out successfully');

			return redirect()->route("admin_login");
		}
  }
