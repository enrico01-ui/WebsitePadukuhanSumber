    <?php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\Api\SiteController;
    use App\Http\Controllers\Api\UmkmController;
    use App\Http\Controllers\Api\ProductController;
    use App\Http\Controllers\PotensiController;
    use App\Http\Controllers\GaleriController;
    use App\Http\Controllers\LaporanController;


    Route::prefix('admin-khusus-sumber-87sdn83n4s')->group(function () {
        Route::get('/', [AdminController::class, 'index']);
        Route::resource('/umkms', UmkmController::class);
        Route::resource('/products', ProductController::class);
        Route::resource('/potensi', PotensiController::class);
        Route::resource('/galeri', GaleriController::class);
       
        Route::resource('/laporan', LaporanController::class);
        Route::get('/pdf/{filename}', function ($filename) {
            $path = storage_path("app/public/{$filename}");

            if (!file_exists($path)) {
                abort(404);
            }


            return response()->file($path);
        });
    });


    Route::prefix('umkms')->group(function () {
        Route::get('/', [UmkmController::class, 'index']);
        Route::get('/{id}', [UmkmController::class, 'show']);
        Route::post('/', [UmkmController::class, 'store']);
        Route::put('/{id}', [UmkmController::class, 'update']);
        Route::delete('/{id}', [UmkmController::class, 'destroy']);
    });

    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index']); // with('umkm')
        Route::get('/{id}', [ProductController::class, 'show']);
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });

    Route::prefix('potensi')->group(function () {
        Route::get('/', [App\Http\Controllers\PotensiController::class, 'index']);
        Route::get('/{id}', [App\Http\Controllers\PotensiController::class, 'show']);
        Route::post('/', [App\Http\Controllers\PotensiController::class, 'store']);
        Route::put('/{id}', [App\Http\Controllers\PotensiController::class, 'update']);
        Route::delete('/{id}', [App\Http\Controllers\PotensiController::class, 'destroy']);
    });

    Route::prefix('sites')->group(function () {
        Route::get('/', [SiteController::class, 'index']);
        Route::get('/{id}', [SiteController::class, 'show']);
        Route::post('/', [SiteController::class, 'store']);
        Route::put('/{id}', [SiteController::class, 'update']);
        Route::delete('/{id}', [SiteController::class, 'destroy']);
    });

    Route::prefix('galeri')->group(function () {
        Route::get('/', [GaleriController::class, 'index']);
        Route::get('/{id}', [GaleriController::class, 'show']);
        Route::post('/', [GaleriController::class, 'store']);
        Route::put('/{id}', [GaleriController::class, 'update']);
        Route::delete('/{id}', [GaleriController::class, 'destroy']);
    });

    Route::prefix('laporan')->group(function () {
        Route::get('/', [LaporanController::class, 'index']);
        Route::get('/{id}', [LaporanController::class, 'show']);
        Route::post('/', [LaporanController::class, 'store']);
        Route::put('/{id}', [LaporanController::class, 'update']);
        Route::delete('/{id}', [LaporanController::class, 'destroy']);
    });


    Route::get('/pdf/{filename}', function ($filename) {
        $path = storage_path("app/public/{$filename}");

        if (!file_exists($path)) {
            abort(404);
        }


        return response()->file($path);
    });
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');


