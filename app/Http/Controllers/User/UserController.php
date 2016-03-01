<?php

namespace App\Http\Controllers\User;

use App\Models\User\User;

use Illuminate\Http\Request;

use App\Http\Requests\User\UserRegistrationRequest;
use App\Http\Controllers\Controller;

use Session, Validator, Hash, Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['only' => ['getLogout', 'getProfile', 'postProfile', 'getChangePassword', 'postChangePassword']]);
        $this->middleware('guest', ['except' => ['getLogout', 'getProfile', 'postProfile', 'getChangePassword', 'postChangePassword']]);
    }
    public function getLogin()
  	{
  		return view("user.login");
  	}
    public function postLogin(Request $request)
    {
  		$this->validate($request, [
  			'email' 	=> 'required',
  			'password' 	=> 'required',
  		]);

  		if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password'), 'providers' => 'web', 'status' => 'Active'], $request->input('remember')))
  		{
  			$arr_data			=	Auth::user();

  			$user_info			=	array();
  			$user_info['id']	= 	$arr_data->id;
  			$user_info['name'] 	= 	ucfirst($arr_data->first_name) . ' ' . ucfirst($arr_data->last_name);
  			$user_info['first_name'] 	= 	ucfirst($arr_data->first_name);
  			$user_info['last_name'] 	= 	ucfirst($arr_data->last_name);
  			$user_info['email']	= 	$arr_data->email;

  			Session::put('USER', $user_info);

  			return redirect()->intended(route("user.edm.index"));
  		}
  		else
  		{
  			Session::flash('flash_error', 'Invalid Login Details!');

  			return redirect()->back();
  		}
  	}

    public function getRegister()
    {
        return view("user.register");
    }

    public function postRegister(UserRegistrationRequest $request)
    {

      $user = new User($request->all());
      $user->password = \Hash::make($request->input('password'));
      $user->providers		=	'web';

      $user->save();

      return view("user.register_message")->with("status", "success");
    }

    public function getLogout()
  	{
  		Auth::logout();
  		Session::forget('USER');
  		Session::forget('LSESSION_INIT');
  		Session::flash('flash_success', 'Logout Successfully!');

  		return redirect()->route("user_login");
  	}
  }
