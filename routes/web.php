<?php

use App\Http\Controllers\Admin\ExternalUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShipmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Actualización de la ruta del dashboard
Route::get('/dashboard', function () {
    /** @var \App\Models\User $user */
    $user = \Illuminate\Support\Facades\Auth::user();

    if ($user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }

    // Estadísticas para usuario externo
    $stats = [
        'totalExternalUsers' => 0, // Solo admins ven esto
        'totalShipments' => $user->shipments()->count(),
        'recentShipments' => $user->shipments()->with('user')->latest()->limit(5)->get(),
        'announcedShipments' => $user->shipments()->where('status', 'announced')->count(),
        'deliveredShipments' => $user->shipments()->where('status', 'delivered')->count(),
    ];

    return Inertia::render('dashboard', compact('stats'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas para envíos (Shipments) - Accesibles por usuarios autenticados
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('shipments', ShipmentController::class);
});

// Rutas para administradores - Solo usuarios con rol admin
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Gestión de usuarios externos
    Route::resource('external-users', ExternalUserController::class);

    // Dashboard de administrador con estadísticas
    Route::get('/dashboard', function () {
        $stats = [
            'totalExternalUsers' => \App\Models\User::where('role', 'external')->count(),
            'totalShipments' => \App\Models\Shipment::count(),
            'recentShipments' => \App\Models\Shipment::with('user')->latest()->limit(10)->get(),
            'announcedShipments' => \App\Models\Shipment::where('status', 'announced')->count(),
            'deliveredShipments' => \App\Models\Shipment::where('status', 'delivered')->count(),
        ];

        return Inertia::render('dashboard', compact('stats'));
    })->name('dashboard');
});

// Ruta temporal para guía de pruebas (SOLO PARA DESARROLLO)
Route::get('/test-guide', function () {
    $users = \App\Models\User::all();
    $shipments = \App\Models\Shipment::with('user')->get();

    return view('test-guide', compact('users', 'shipments'));
});

require __DIR__ . '/auth.php';
