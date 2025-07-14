@extends('layouts.app')

@section('content')
<div class="container">
    <h1>🚀 Guía de Pruebas - Sistema Puerto Brisa</h1>

    <div class="alert alert-info">
        <strong>Estado:</strong> Sistema base funcional - Datos de prueba cargados
    </div>

    <div class="row">
        <div class="col-md-6">
            <h2>👥 Usuarios de Prueba</h2>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($users as $user)
                        <tr>
                            <td>{{ $user->id }}</td>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
                            <td>
                                <span class="badge badge-{{ $user->role === 'admin' ? 'danger' : 'primary' }}">
                                    {{ $user->role }}
                                </span>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <h3>🔐 Credenciales de Acceso</h3>
            <div class="alert alert-warning">
                <strong>Contraseña para todos:</strong> <code>password123</code>
            </div>
        </div>

        <div class="col-md-6">
            <h2>📦 Envíos de Prueba</h2>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Placa</th>
                            <th>Producto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($shipments as $shipment)
                        <tr>
                            <td>{{ $shipment->id }}</td>
                            <td>{{ $shipment->user->name }}</td>
                            <td><code>{{ $shipment->truck_plate }}</code></td>
                            <td>{{ $shipment->product_name }}</td>
                            <td>
                                <span class="badge badge-{{ $shipment->status === 'delivered' ? 'success' : 'warning' }}">
                                    {{ $shipment->status }}
                                </span>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-12">
            <h2>🧪 Flujo de Pruebas Recomendado</h2>
            <div class="card">
                <div class="card-body">
                    <h4>1. Probar como Administrador</h4>
                    <p><strong>Email:</strong> admin@puertobrisa.com</p>
                    <ul>
                        <li>Ver dashboard con estadísticas globales</li>
                        <li>Acceder a <code>/shipments</code> y ver todos los envíos</li>
                        <li>Crear un nuevo envío</li>
                        <li>Editar envíos existentes</li>
                    </ul>

                    <h4>2. Probar como Usuario Externo</h4>
                    <p><strong>Email:</strong> juan.perez@ejemplo.com</p>
                    <ul>
                        <li>Ver dashboard con estadísticas personales</li>
                        <li>Acceder a <code>/shipments</code> y ver solo sus envíos</li>
                        <li>Crear un nuevo envío</li>
                        <li>Editar solo sus envíos</li>
                    </ul>

                    <h4>3. Validaciones a Probar</h4>
                    <ul>
                        <li><strong>Placas válidas:</strong> ABC-123, DEF-456, GHI789</li>
                        <li><strong>Placas inválidas:</strong> AB-123, ABCD-123, 123-ABC</li>
                        <li><strong>Campos requeridos:</strong> placa, nombre del producto</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-12">
            <h2>🚀 Enlaces Rápidos</h2>
            <div class="btn-group" role="group">
                <a href="/login" class="btn btn-primary">🔐 Login</a>
                <a href="/dashboard" class="btn btn-success">📊 Dashboard</a>
                <a href="/shipments" class="btn btn-info">📦 Envíos</a>
                <a href="/shipments/create" class="btn btn-warning">➕ Crear Envío</a>
            </div>
        </div>
    </div>
</div>

<style>
    .badge {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        border-radius: 0.375rem;
    }

    .badge-primary {
        background-color: #007bff;
        color: white;
    }

    .badge-danger {
        background-color: #dc3545;
        color: white;
    }

    .badge-success {
        background-color: #28a745;
        color: white;
    }

    .badge-warning {
        background-color: #ffc107;
        color: #212529;
    }

    .alert {
        padding: 0.75rem 1.25rem;
        margin-bottom: 1rem;
        border: 1px solid transparent;
        border-radius: 0.375rem;
    }

    .alert-info {
        color: #0c5460;
        background-color: #d1ecf1;
        border-color: #bee5eb;
    }

    .alert-warning {
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeaa7;
    }

    .table {
        width: 100%;
        margin-bottom: 1rem;
        color: #212529;
    }

    .table-bordered {
        border: 1px solid #dee2e6;
    }

    .table-bordered th,
    .table-bordered td {
        border: 1px solid #dee2e6;
        padding: 0.75rem;
    }

    .table th {
        background-color: #f8f9fa;
        border-bottom: 2px solid #dee2e6;
    }

    .btn-group {
        display: flex;
        gap: 0.5rem;
    }

    .btn {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border-radius: 0.375rem;
        text-decoration: none;
        display: inline-block;
        text-align: center;
        border: 1px solid transparent;
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        color: white;
    }

    .btn-success {
        background-color: #28a745;
        border-color: #28a745;
        color: white;
    }

    .btn-info {
        background-color: #17a2b8;
        border-color: #17a2b8;
        color: white;
    }

    .btn-warning {
        background-color: #ffc107;
        border-color: #ffc107;
        color: #212529;
    }
</style>
@endsection