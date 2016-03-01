<?php

namespace App\Http\Controllers\User;

use App\Models\User\User;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Laravel\Socialite\Contracts\Factory as Socialite;

use URL, Session, Input, Validator, DB, Hash, Redirect, Auth;
 
class SocialLoginController extends Controller
{
	public function __construct(Socialite $socialite)
	{        
		$this->middleware('guest');
		$this->socialite	=	$socialite;
	}
	
	public function getSocialAuth($provider=null)
	{
	   if (!config("services.$provider")) abort('404'); //just to handle providers that doesn't exist

	   return $this->socialite->with($provider)->redirect();
	}

	public function getSocialAuthCallback($provider=null, Request $request)
	{
		if (!empty($request->error_code))
		{
			$msg	=	$request->error_message;
			Session::flash('flash_error', $msg);
			
			return redirect(cu('ul'));
		}
		$pro 		=	$provider;
		$arr_data 	=	$this->socialite->with($pro)->user();
		
		if ($arr_data)
		{	
			$email_id	=	($arr_data->getEmail()) ? $arr_data->getEmail() : '';
			$sid 		= 	($arr_data->getId()) ? $arr_data->getId() : 0;
			$fname 		= 	($arr_data->getName()) ? $arr_data->getName() : '';
			
			$rows	=	DB::select('SELECT id FROM users WHERE provider_id = ?', [$sid]);
			
			if (empty($rows))
			{
				$objUser 				= 	new User();
				$objUser->email			=	$arr_data->getEmail();
				$objUser->password		=	Hash::make($arr_data->getId());
				$objUser->fname			=	$arr_data->getName();
				$objUser->lname			=	'';
				$objUser->providers		=	$pro;
				$objUser->provider_id	=	$arr_data->getId();
				$objUser->save();
				
				$last_id				=	$objUser->id;
			}
			else
			{
				$last_id				=   $rows[0]->id;
				$objUser				=	User::findOrFail($last_id);
				
				$objUser->email			=	$arr_data->getEmail();				
				$objUser->fname			=	$arr_data->getName();
				$objUser->lname			=	'';
				$objUser->providers		=	$pro;
				$objUser->provider_id	=	$arr_data->getId();
				$objUser->save();
			}
			
			if (Auth::loginUsingId($last_id)) 
			{   
				$arr_user			=	Auth::user();
				
				$user_info			=	array();
				$user_info['id']	=	$arr_user->id;
				$user_info['name'] 	=	ucfirst($arr_user->fname);
				$user_info['email'] =	$arr_user->email;
				
				Session::put('USER', $user_info);
				
				return redirect()->intended(cu('ud'));
			}
			else
			{
				Session::flash('flash_error', 'Invalid Login Details!');
				
				return redirect(cu('ul'));
			}
		}
		else
		{		
			Session::flash('flash_error', 'something went wrong');
			
			return redirect(cu('ul'));
		}
	}
}
