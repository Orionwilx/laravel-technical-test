<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShipmentRequest;
use App\Models\Shipment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();

        if ($user->isAdmin()) {
            // Los admins pueden ver todos los envíos
            $shipments = Shipment::with('user')
                ->orderBy('created_at', 'desc')
                ->paginate(10);
        } else {
            // Los usuarios externos solo ven sus propios envíos
            $shipments = Shipment::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(10);
        }

        return Inertia::render('Shipments/Index', [
            'shipments' => $shipments,
            'canViewAll' => $user->isAdmin()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Shipments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShipmentRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        $shipment = Shipment::create($validated);

        // Aquí enviaríamos el correo electrónico (implementaremos después)

        return redirect()->route('shipments.index')
            ->with('success', 'Envío anunciado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shipment $shipment)
    {
        /** @var User $user */
        $user = Auth::user();

        // Verificar que el usuario puede ver este envío
        if (!$user->isAdmin() && $shipment->user_id !== $user->id) {
            abort(403, 'No tienes permisos para ver este envío.');
        }

        return Inertia::render('Shipments/Show', [
            'shipment' => $shipment->load('user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shipment $shipment)
    {
        /** @var User $user */
        $user = Auth::user();

        // Verificar que el usuario puede editar este envío
        if (!$user->isAdmin() && $shipment->user_id !== $user->id) {
            abort(403, 'No tienes permisos para editar este envío.');
        }

        return Inertia::render('Shipments/Edit', [
            'shipment' => $shipment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreShipmentRequest $request, Shipment $shipment)
    {
        /** @var User $user */
        $user = Auth::user();

        // Verificar que el usuario puede actualizar este envío
        if (!$user->isAdmin() && $shipment->user_id !== $user->id) {
            abort(403, 'No tienes permisos para actualizar este envío.');
        }

        $shipment->update($request->validated());

        return redirect()->route('shipments.index')
            ->with('success', 'Envío actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shipment $shipment)
    {
        /** @var User $user */
        $user = Auth::user();

        // Verificar que el usuario puede eliminar este envío
        if (!$user->isAdmin() && $shipment->user_id !== $user->id) {
            abort(403, 'No tienes permisos para eliminar este envío.');
        }

        $shipment->delete();

        return redirect()->route('shipments.index')
            ->with('success', 'Envío eliminado exitosamente.');
    }
}
