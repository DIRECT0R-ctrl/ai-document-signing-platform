<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DocumentController;

/*
|--------------------------------------------------------------------------
| Protected Vault Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/documents/upload', [DocumentController::class, 'store']);
    Route::get('/documents/latest', [DocumentController::class, 'latest']);
    Route::get('/documents/{document}', [DocumentController::class, 'show']);
    Route::post('/documents/{document}/sign', [DocumentController::class, 'sign']);
    Route::get('/inbox', [DocumentController::class, 'inbox']);
});
