<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class UserController extends Controller
{
    public function index() {
        $users = DB::table('users')->where('id_level', 2)->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Users',
            'data'    => $users
        ], 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'username'   => 'required',
            'password' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if (is_null($request->id)) {
            $user_store = DB::table('users')->insert([
                'id_level' => 2,
                'username' => $request->username,
                'pwd' => $request->password
            ]);
        }else {
            $user_store = DB::table('users')->where('id', $request->id)->update([
                'username'     => $request->username,
                'pwd'   => $request->password
            ]);
        }

        if($user_store) {

            return response()->json([
                'success' => true,
                'message' => 'User Created',
                'data'    => $user_store 
            ], 201);

        } 

        return response()->json([
            'success' => false,
            'message' => 'User Failed to Save',
        ], 409);
    }

    function destroy($id) {
        $user = DB::table('users')->where('id', $id);

        if($user) {

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User Deleted',
            ], 200);

        }

        return response()->json([
            'success' => false,
            'message' => 'User Not Found',
        ], 404);
    }

}
