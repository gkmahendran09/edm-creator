<?php

if (getenv('APP_ENV') == 'local')
{
	$default['GP_APP_ID']		=	' 989148606113-qg0ihbd16r64pbqt0i5r1ddkr0c9nt92.apps.googleusercontent.com';
	$default['GP_APP_SECRET']	=	'6MaG8OmRun6Vdo5ekhwHspIi';
	$default['GP_CALLBACK']		=	'http://edmcreator.ragedevdev/user/social-login/callback/google';
}
else
{
	$default['GP_APP_ID']		=	' 989148606113-qg0ihbd16r64pbqt0i5r1ddkr0c9nt92.apps.googleusercontent.com';
	$default['GP_APP_SECRET']	=	'6MaG8OmRun6Vdo5ekhwHspIi';
	$default['GP_CALLBACK']		=	'http://edmcreator.ragedevdev/user/social-login/callback/google';
}

return $default;
