<?php

namespace App\Http\Requests\User\EDM;

use App\Http\Requests\Request;

class CreateEDMRequest extends Request
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
             "edm_name" => "required|min:3|max:255|unique:edms,edm_name,NULL,id,user_id,".\Session("USER.id"),
             "template" => "required|exists:templates,id",
         ];
     }

     public function messages()
     {
       return [
       ];
     }
}
