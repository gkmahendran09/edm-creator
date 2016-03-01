<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

function getScreenShot($url) {
  $path = storage_path() . '/google-browsershot.jpg';
  $browsershot = new Spatie\Browsershot\Browsershot();
  $browsershot
      ->setURL($url)
      ->setWidth(1366)
      ->setHeight(768)
      ->setTimeout(5000)
      ->save($path);
    return $path;
}


Route::get('/test', function() {
  $url = Request::get('url') ? Request::get('url') : 'http://google.com';
  $path = getScreenShot($url);

  // return response()->download($path);

});

Route::get('/app/captcha', 'System\CaptchaController@getCaptcha');

//-------------------------------------------------------------------------

/* Static Pages */
Route::get('/', ['uses' => "StaticController@getHome", 'as' => "static_home"]);

//-------------------------------------------------------------------------

/* User Login */
//Social
Route::get('/user/social-login/{provider?}',
          [
            'uses' => 'User\SocialLoginController@getSocialAuth',
            'as' => 'social_login'
          ]);
Route::get('/user/social-login/callback/{provider?}',
          [
            'uses' => 'User\SocialLoginController@getSocialAuthCallback',
            'as' => 'social_login_callback'
          ]);

//Web
Route::controller('/user/password' , 'User\PasswordController');

//EDM Management
Route::get('/user/edm/front-end-template', ['uses' => 'User\EDMController@frontEndTemplate', 'as' => 'user.edm.front_end_template']);
Route::get('/user/edm/{id}/preview', ['uses' => 'User\EDMController@preview', 'as' => 'user.edm.preview']);
Route::post('/user/edm/{id}/download', ['uses' => 'User\EDMController@download', 'as' => 'user.edm.download']);
Route::post('/user/edm/{id}/image-upload', ['uses' => 'User\EDMController@imageUpload', 'as' => 'user.edm.image_upload']);
Route::resource('/user/edm' , 'User\EDMController');

Route::controller('/user' , 'User\UserController', [
    'getLogin' => 'user_login',
    'getLogout' => 'user_logout',
]);


/* User Registration */
Route::get('/user/register',
          [
            'uses' => "User\UserController@getRegister",
            'as' => "user_register"
          ]);
Route::post('/user/register', "User\UserController@postRegister");


/* Admin Routes */
Route::group(['prefix' => Config('app_data.admin_path')], function()
{
	Route::get('/', function() {
    return redirect()->route("admin_login");
  });

	Route::get('/login', [
    'uses' => 'Admin\System\AdminUserController@showLoginForm',
    'as' => 'admin_login'
  ]);

	Route::post('/login', 'Admin\System\AdminUserController@validateUser');
	Route::get('/logout', [
    'uses' => 'Admin\System\AdminUserController@logout',
    'as' => 'admin_logout'
  ]);

	Route::get('/dashboard', [
    'uses' => 'Admin\DashboardController@home',
    'as' => 'admin_dashboard'
  ]);

  //User Management
	Route::resource('/users', 'Admin\UserController');

  //Template Management
  Route::resource('/templates', 'Admin\TemplateController');


});

//-------------------------------------------------------------------------
