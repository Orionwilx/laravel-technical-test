<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExternalUserRequest;
use App\Models\ExternalUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExternalUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = ExternalUser::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/ExternalUsers/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ExternalUsers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExternalUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = bcrypt($validated['password']);

        ExternalUser::create($validated);

        return redirect()->route('admin.external-users.index')
            ->with('success', 'Usuario externo creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ExternalUser $externalUser)
    {
        return Inertia::render('Admin/ExternalUsers/Show', [
            'user' => $externalUser->load('shipments')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExternalUser $externalUser)
    {
        return Inertia::render('Admin/ExternalUsers/Edit', [
            'user' => $externalUser
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreExternalUserRequest $request, ExternalUser $externalUser)
    {
        $validated = $request->validated();

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $externalUser->update($validated);

        return redirect()->route('admin.external-users.index')
            ->with('success', 'Usuario externo actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExternalUser $externalUser)
    {
        $externalUser->delete();

        return redirect()->route('admin.external-users.index')
            ->with('success', 'Usuario externo eliminado exitosamente.');
    }
}
