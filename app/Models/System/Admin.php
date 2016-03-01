<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

use DB, Hash;

class Admin extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'admins';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable 	=	['user_name', 'password', 'first_name', 'last_name', 'email', 'status', 'created_by'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public function isAuthorizedUser($user_name, $password)
  	{
      $validate_admin = DB::table('admins')
                            ->select('password')
                            ->where('user_name', $user_name)
                            ->first();

      if ($validate_admin && Hash::check($password, $validate_admin->password)) {
        $result		=	DB::select("SELECT au.*, CONCAT_WS(' ', au.first_name, au.last_name) AS user_full_name FROM admins AS au WHERE au.user_name = ? AND au.status = 'Active' LIMIT 1", [$user_name]);
        return $result;
      }

      return false;
  	}
}
