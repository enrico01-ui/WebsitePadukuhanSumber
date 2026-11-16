<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/pdf/{filename}', function ($filename) {
    $path = storage_path("app/public/{$filename}");

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path, [
        'Access-Control-Allow-Origin' => 'http://localhost:5173',
    ]);
});
Route::get('/gambar/{filename}', function ($filename) {
    $path = storage_path("app/public/product_image/{$filename}");

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path, [
        'Access-Control-Allow-Origin' => 'http://localhost:5173',
    ]); 
});

Route::get('/pdf-download/{filename}', function ($filename) {
    $path = storage_path("app/public/{$filename}");

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->download($path, $filename);
});