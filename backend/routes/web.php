<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/dashboard', function () {
  return view('dashboard');
} );
require __DIR__.'/auth.php';
