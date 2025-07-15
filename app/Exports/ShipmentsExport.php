<?php

namespace App\Exports;

use App\Models\Shipment;

class ShipmentsExport
{
    /**
     * Generar array de datos para exportar
     * @return array
     */
    public function getData()
    {
        $shipments = Shipment::with('user')->get();

        $data = [];

        // Agregar encabezados
        $data[] = [
            'ID',
            'Placa del Camión',
            'Producto',
            'Usuario',
            'Email del Usuario',
            'Fecha de Creación',
            'Fecha de Actualización',
        ];

        // Agregar datos
        foreach ($shipments as $shipment) {
            $data[] = [
                $shipment->id,
                $shipment->truck_plate,
                $shipment->product_name,
                $shipment->user->name,
                $shipment->user->email,
                $shipment->created_at->format('Y-m-d H:i:s'),
                $shipment->updated_at->format('Y-m-d H:i:s'),
            ];
        }

        return $data;
    }
}
