<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * route resource post
 */
Route::resource('/post', PostController::class);

// Route::resource('/index', PaketController::class);

Route::post('login', 'LoginController@login');

Route::get('info', 'DashboardController@index');


// Paket
Route::prefix('paket')->group(function () {
    Route::get('data', 'PaketController@index');
    Route::post('store', 'PaketController@store');
    Route::get('destroy/{id}', 'PaketController@destroy');
});

//Sales
Route::prefix('sales')->group(function () {
    Route::get('data', 'UserController@index');
    Route::post('store', 'UserController@store');
    Route::get('destroy/{id}', 'UserController@destroy');
});

//Customer
Route::prefix('customer')->group(function () {
    Route::get('data', 'TrxSalesController@index');
    Route::post('store', 'TrxSalesController@store');
    Route::post('acc', 'TrxSalesController@acc');
    Route::get('destroy/{id}', 'TrxSalesController@destroy');
});

//Barang
Route::prefix('barang')->group(function () {
    Route::get('data', 'BarangController@index');
    Route::post('store', 'BarangController@store');
    Route::get('destroy/{id}', 'BarangController@destroy');
});

//stok
Route::prefix('stok')->group(function () {
    Route::get('data', 'StokController@index');
    Route::get('masuk', 'StokController@barang_masuk');
    Route::get('keluar', 'StokController@barang_keluar');
    Route::post('store', 'StokController@store');
    Route::get('destroy/{id}', 'StokController@destroy');
});