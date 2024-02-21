<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class StokController extends Controller
{
    public function index() {
        $stok = DB::table('barang')->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Stok Barang',
            'data'    => $stok  
        ], 200);
    }

    public function barang_masuk() {
        $stok = DB::table('stok as a')
                ->leftJoin('barang as b', 'b.id', '=', 'a.id_barang')
                ->where('masuk', '>', 0)
                ->select('a.*', 'b.name')
                ->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Stok Barang',
            'data'    => $stok  
        ], 200);
    }

    public function barang_keluar() {
        $stok = DB::table('stok as a')
                ->leftJoin('barang as b', 'b.id', '=', 'a.id_barang')
                ->where('keluar', '>', 0)
                ->select('a.*', 'b.name')
                ->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Stok Barang',
            'data'    => $stok  
        ], 200);
    }

    public function store(Request $request) {
        $result_qty = 0;

        $validator = Validator::make($request->all(), [
            'no_po'   => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $select_barang = DB::table('barang')
                            ->where('id', $request->id_barang)
                            ->first();

        if (is_null($request->id)) {

            if ($request->type == "in") {
                $barang_store = DB::table('stok')->insert([
                    'tanggal'   => date( "Y-m-d", strtotime($request->tanggal)),
                    'no_po'     => $request->no_po,
                    'id_barang' => $request->id_barang,
                    'masuk'     => $request->masuk,
                    'keluar'    => 0
                ]);

                $result_qty = $select_barang->qty + $request->masuk;

            }else if($request->type == "out") {
                $barang_store = DB::table('stok')->insert([
                    'tanggal'   => date( "Y-m-d", strtotime($request->tanggal)),
                    'no_po'     => $request->no_po,
                    'id_barang' => $request->id_barang,
                    'masuk'     => 0,
                    'keluar'    => $request->keluar
                ]);

                $result_qty = $select_barang->qty - $request->keluar;
            }

            $update_qty = DB::table('barang')
                            ->where('id', $request->id_barang)
                            ->update(['qty' => $result_qty]);
        }else {
            $select_stok = DB::table('stok')->where('id', $request->id)->first();

            if ($request->type == "in") {
                $barang_store = DB::table('stok')
                                ->where('id', $request->id)
                                ->update([
                                    'tanggal'   => date( "Y-m-d", strtotime($request->tanggal)),
                                    'no_po'     => $request->no_po,
                                    'id_barang' => $request->id_barang,
                                    'masuk'     => $request->masuk,
                                    'keluar'    => 0
                                ]);

                $result_qty = $select_barang->qty - $select_stok->masuk + $request->masuk;

            }else if($request->type == "out") {
                $barang_store = DB::table('stok')
                                ->where('id', $request->id)
                                ->update([
                                    'tanggal'   => date( "Y-m-d", strtotime($request->tanggal)),
                                    'no_po'     => $request->no_po,
                                    'id_barang' => $request->id_barang,
                                    'masuk'     => 0,
                                    'keluar'    => $request->keluar
                                ]);

                $result_qty = $select_barang->qty + $select_stok->keluar - $request->keluar;
            }

            $update_qty = DB::table('barang')
                            ->where('id', $request->id_barang)
                            ->update(['qty' => $result_qty]);
        }

        if($barang_store) {
            return response()->json([
                'success' => true,
                'message' => 'Barang Created',
                'data'    => $barang_store 
            ], 201);
        } 

        return response()->json([
            'success' => false,
            'message' => 'Barang Failed to Save',
        ], 409);
    }

    function destroy($id) {
        $result_qty = 0;

        $stok = DB::table('stok')->where('id', $id);

        $select = $stok->first();

        $select_barang = DB::table('barang')
                            ->where('id', $select->id_barang)
                            ->first();

        if($select) {

            if ($select->masuk > 0) {
                $result_qty = $select_barang->qty - $select->masuk;

                $update_qty = DB::table('barang')
                            ->where('id', $select->id_barang)
                            ->update(['qty' => $result_qty]);

            }else if($select->keluar > 0) {
                $result_qty = $select_barang->qty + $select->keluar;

                $update_qty = DB::table('barang')
                            ->where('id', $select->id_barang)
                            ->update(['qty' => $result_qty]);
            }
            $stok->delete();

            return response()->json([
                'success' => true,
                'message' => 'Paket Deleted',
            ], 200);

        }

        return response()->json([
            'success' => false,
            'message' => 'Stok Not Found',
        ], 404);
    }
}
