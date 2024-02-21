<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class LoginController extends Controller
{
    function login(Request $request) {
        $account = $request->username;
        $password = $request->password;

        $field = filter_var($account, FILTER_VALIDATE_EMAIL) ? 'a.email' : 'a.username';

        $users = DB::table('users as a')
                    ->where($field, $account)
                    ->where('a.pwd', $password)
                    ->leftJoin('users_level as b', 'b.id', '=', 'a.id_level')
                    ->select('a.id', 'a.id_level', 'a.username', 'a.email', 'a.fullname', 'a.pwd', 'a.flag_active',
                                'b.nama as user_level')
                    ->first();

        return response()->json([
            'success' => (!is_null($users)) ? true : false,
            'message' => 'Login',
            'data'    => $users
        ], 200);
    }
}
