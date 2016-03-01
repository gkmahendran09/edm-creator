<?php

namespace App\Http\Requests\Admin\Templates;

use Illuminate\Contracts\Validation\Validator;

use App\Http\Requests\Request;


class CreateTemplateRequest extends Request
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
            "template_name" => "required|min:3|max:255|unique:templates,template_name",
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
