<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EDM extends Model
{
   use SoftDeletes;

   /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'edms';

    protected $fillable 	=	[
                              'user_id',
                              'edm_name',
                              'html_header',
                              'html_footer',
                              'css',
                              'html',
                              'scope_values'                              
                            ];

    /**
     * Get the User who owns the EDM.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User\User');
    }

}
