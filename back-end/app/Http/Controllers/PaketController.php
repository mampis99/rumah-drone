<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class PaketController extends Controller
{
    public function index() {
        $paket = DB::table('paket')->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Paket',
            'data'    => $paket  
        ], 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name'   => 'required',
            'price' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if (is_null($request->id)) {
            $paket_store = DB::table('paket')->insert([
                'name'     => $request->name,
                'price'   => $request->price
            ]);
        }else {
            $paket_store = DB::table('paket')->where('id', $request->id)->update([
                'name'     => $request->name,
                'price'   => $request->price
            ]);
        }

        if($paket_store) {

            return response()->json([
                'success' => true,
                'message' => 'Paket Created',
                'data'    => $paket_store 
            ], 201);

        } 

        return response()->json([
            'success' => false,
            'message' => 'Paket Failed to Save',
        ], 409);
    }

    function destroy($id) {
        $paket = DB::table('paket')->where('id', $id);

        if($paket) {

            $paket->delete();

            return response()->json([
                'success' => true,
                'message' => 'Paket Deleted',
            ], 200);

        }

        return response()->json([
            'success' => false,
            'message' => 'Paket Not Found',
        ], 404);
    }
}
