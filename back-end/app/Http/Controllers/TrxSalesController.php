<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;


class TrxSalesController extends Controller
{
    public function index() {
        $customer = DB::table('customer as a')
                    ->leftJoin('paket as b', 'a.id_paket', '=', 'b.id')
                    ->select('a.*', 'b.name as nama_paket', 'b.price')
                    ->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Customer',
            'data'    => $customer
        ], 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'id_paket'   => 'required',
            'name' => 'required',
            'no_telp' => 'required',
            'address' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if (is_null($request->id)) {
            $customer_store = DB::table('customer')->insert([
                'tanggal'   => date("Y-m-d H:i:s"),
                'no_telp'   => $request->no_telp,
                'id_paket' => $request->id_paket,
                'name'     => $request->name,
                'no_telp'   => $request->no_telp,
                'address'   => $request->address,
                'flag'   => 0,
            ]);
        }else {
            $customer_store = DB::table('customer')->where('id', $request->id)->update([
                'no_telp'   => $request->no_telp,
                'id_paket' => $request->id_paket,
                'name'     => $request->name,
                'no_telp'   => $request->no_telp,
                'address'   => $request->address,
            ]);
        }

        if($customer_store) {

            return response()->json([
                'success' => true,
                'message' => 'customer Created',
                'data'    => $customer_store 
            ], 201);

        } 

        return response()->json([
            'success' => false,
            'message' => 'customer Failed to Save',
        ], 409);
    }

    public function acc(Request $request) {

        $customer_store = DB::table('customer')->where('id', $request->id)->update([
            'flag'   => $request->is_checked,
        ]);

        if($customer_store) {

            return response()->json([
                'success' => true,
                'message' => 'Customer Updated',
                'data'    => $customer_store 
            ], 201);

        } 

        return response()->json([
            'success' => false,
            'message' => 'Customer Failed to Update',
        ], 409);
    }

    function destroy($id) {
        $customer = DB::table('customer')->where('id', $id);

        if($customer) {

            $customer->delete();

            return response()->json([
                'success' => true,
                'message' => 'customer Deleted',
            ], 200);

        }

        return response()->json([
            'success' => false,
            'message' => 'customer Not Found',
        ], 404);
    }
}
