<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class DashboardController extends Controller
{
    public function index() {
        $total_barang = DB::table('barang')->sum('qty');
        $masuk = DB::table('stok')->sum('masuk');
        $keluar = DB::table('stok')->sum('keluar');

        return response()->json([
            'success' => true,
            'message' => 'List Data',
            'total' => $total_barang,
            'masuk' => $masuk,
            'keluar' => $keluar 
        ], 200);
    }
}
