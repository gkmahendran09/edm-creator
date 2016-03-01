<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;

use Securimage;

use App\Http\Requests\Request;


class UserRegistrationRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "email" => "required|email|unique:users,email",
            "password" => "required|min:3|same:password_confirmation",
            "password_confirmation" => "required|min:3|same:password",
            "first_name" => "required|min:3",
            "last_name" => "required|min:3",
            "captcha_code" => "check_captcha"
        ];
    }

    public function messages()
    {
      return [
        "captcha_code.check_captcha" => "Invalid captcha code"
      ];
    }

}
