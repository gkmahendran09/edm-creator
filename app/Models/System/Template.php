<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'templates';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable 	=	[
                              'template_name',
                              'html_header',
                              'html_footer',
                              'css',
                              'html',
                              'scope_values',                              
                              'status',
                              'created_by'
                            ];
}
