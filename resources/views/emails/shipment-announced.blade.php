<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carga anunciada</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .content {
            background-color: #f8fafc;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-top: none;
        }

        .footer {
            background-color: #374151;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 12px;
        }

        .license-plate {
            background-color: #fef3c7;
            border: 2px solid #f59e0b;
            padding: 10px;
            margin: 15px 0;
            border-radius: 4px;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            color: #92400e;
        }

        .details {
            background-color: white;
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
            border-left: 4px solid #2563eb;
        }

        .detail-item {
            margin: 8px 0;
        }

        .detail-label {
            font-weight: bold;
            color: #374151;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>🚛 Carga Anunciada</h1>
        <p>Puerto Brisa - Sistema de Gestión de Envíos</p>
    </div>

    <div class="content">
        <h2>Nueva carga anunciada</h2>

        <p>Se ha anunciado una nueva carga en el sistema. A continuación se muestran los detalles:</p>

        <div class="license-plate">
            Placa del camión: {{ $shipment->truck_plate }}
        </div>

        <div class="details">
            <div class="detail-item">
                <span class="detail-label">Producto:</span> {{ $shipment->product_name }}
            </div>
            <div class="detail-item">
                <span class="detail-label">Usuario:</span> {{ $shipment->user->name }}
            </div>
            <div class="detail-item">
                <span class="detail-label">Email:</span> {{ $shipment->user->email }}
            </div>
            <div class="detail-item">
                <span class="detail-label">Fecha de anuncio:</span> {{ $shipment->created_at->format('d/m/Y H:i:s') }}
            </div>
        </div>

        <p>Este correo se ha enviado automáticamente desde el sistema de gestión de envíos de Puerto Brisa.</p>
    </div>

    <div class="footer">
        <p>© {{ date('Y') }} Puerto Brisa. Todos los derechos reservados.</p>
        <p>Este es un correo automático, por favor no responder.</p>
    </div>
</body>

</html>