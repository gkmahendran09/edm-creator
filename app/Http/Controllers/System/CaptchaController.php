<?php
namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use Securimage, Input;

class CaptchaController extends Controller
{    
	
	public function getCaptcha()
	{		
		$img	=	new Securimage();
		
		$img->text_color			=	"#4F0F0F";		
		$img->line_color			=	"#CCCFFF";
		$img->line_distance			=	9;
		
		// set namespace if supplied to script via HTTP GET
		if (!empty(Input::get('namespace'))) $img->setNamespace(Input::get('namespace'));

		$img->show(); // outputs the image and content headers to the browser
		
	}
	/* verify captcha code via ajax */
	public function verifyCaptcha(Request $request)
	{
		$img	=	new Securimage();
		
		return ($img->check($request->input('captcha_code')) !== true)?'true':'false';
	}
}
