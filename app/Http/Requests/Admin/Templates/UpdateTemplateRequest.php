<?php

namespace App\Http\Requests\Admin\Templates;

use App\Http\Requests\Request;

class UpdateTemplateRequest extends Request
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
             "html_header"   => "required|min:10|max:65000",
             "html_footer"   => "required|min:10|max:65000",
             "css"           => "required|min:10|max:65000",
             "html"          => "required|min:10|max:65000",
             "scope_values"  => "required|min:10|max:65000"             
         ];
     }

     public function messages()
     {
       return [
       ];
     }
}
