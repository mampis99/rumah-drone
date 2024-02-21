<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class BarangController extends Controller
{
    public function index() {
        $paket = DB::table('barang')->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Barang',
            'data'    => $paket  
        ], 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name'   => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if (is_null($request->id)) {
            $barang_store = DB::table('barang')->insert([
                'name'     => $request->name,
                'stok_min' => $request->stok_minimum,
                'stok_max' => $request->stok_maksimum
            ]);
        }else {
            $barang_store = DB::table('barang')->where('id', $request->id)->update([
                'name'     => $request->name,
                'stok_min' => $request->stok_minimum,
                'stok_max' => $request->stok_maksimum
            ]);
        }

        if($barang_store) {
            return response()->json([
                'success' => true,
                'message' => 'Paket Created',
                'data'    => $barang_store 
            ], 201);
        } 

        return response()->json([
            'success' => false,
            'message' => 'Barang Failed to Save',
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
