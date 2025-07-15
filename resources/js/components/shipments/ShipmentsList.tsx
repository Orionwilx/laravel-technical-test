import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shipment } from '@/types';
import { Link, router } from '@inertiajs/react';
import { CheckCircle, Edit, Eye, Plus, Trash2 } from 'lucide-react';

interface ShipmentsListProps {
    shipments: Shipment[];
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canMarkDelivered?: boolean;
    showUserInfo?: boolean;
}

export default function ShipmentsList({
    shipments,
    canCreate = false,
    canEdit = false,
    canDelete = false,
    canMarkDelivered = false,
    showUserInfo = false,
}: ShipmentsListProps) {
    // Ensure shipments is an array
    const shipmentsArray = Array.isArray(shipments) ? shipments : [];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'announced':
                return <Badge variant="secondary">Anunciado</Badge>;
            case 'delivered':
                return <Badge variant="default">Entregado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = (shipmentId: number) => {
        if (confirm('¿Está seguro de eliminar este envío? Esta acción no se puede deshacer.')) {
            router.delete(`/shipments/${shipmentId}`, {
                onSuccess: () => {
                    // La página se recargará automáticamente después de la eliminación exitosa
                },
                onError: (errors) => {
                    console.error('Error al eliminar el envío:', errors);
                    alert('Error al eliminar el envío. Por favor, inténtelo de nuevo.');
                },
            });
        }
    };

    const handleMarkAsDelivered = (shipmentId: number) => {
        if (confirm('¿Está seguro de marcar este envío como entregado?')) {
            router.patch(
                `/shipments/${shipmentId}/mark-delivered`,
                {},
                {
                    onSuccess: () => {
                        // La página se recargará automáticamente después del éxito
                    },
                    onError: (errors) => {
                        console.error('Error al marcar como entregado:', errors);
                        alert('Error al marcar el envío como entregado. Por favor, inténtelo de nuevo.');
                    },
                },
            );
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Envíos</h2>
                {canCreate && (
                    <Button asChild>
                        <Link href="/shipments/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Envío
                        </Link>
                    </Button>
                )}
            </div>

            {shipmentsArray.length === 0 ? (
                <Card>
                    <CardContent className="py-8">
                        <div className="text-center">
                            <p className="text-gray-500">No hay envíos registrados</p>
                            {canCreate && (
                                <Button asChild className="mt-4">
                                    <Link href="/shipments/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Crear primer envío
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {shipmentsArray.map((shipment) => (
                        <Card key={shipment.id} className="transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{shipment.product_name}</CardTitle>
                                        <CardDescription>
                                            Placa: <span className="font-mono font-semibold">{shipment.truck_plate}</span>
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {getStatusBadge(shipment.status)}
                                        <div className="flex space-x-1">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/shipments/${shipment.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            {canEdit && (
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={`/shipments/${shipment.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            )}
                                            {canMarkDelivered && shipment.status !== 'delivered' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleMarkAsDelivered(shipment.id)}
                                                    className="text-green-600 hover:bg-green-50 hover:text-green-700"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {canDelete && (
                                                <Button variant="outline" size="sm" onClick={() => handleDelete(shipment.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Anunciado:</p>
                                        <p className="font-medium">{formatDate(shipment.announced_at)}</p>
                                    </div>
                                    {shipment.delivered_at && (
                                        <div>
                                            <p className="text-gray-600">Entregado:</p>
                                            <p className="font-medium">{formatDate(shipment.delivered_at)}</p>
                                        </div>
                                    )}
                                    {showUserInfo && shipment.user && (
                                        <div className="col-span-2">
                                            <p className="text-gray-600">Usuario:</p>
                                            <p className="font-medium">{shipment.user.name}</p>
                                        </div>
                                    )}
                                    {shipment.notes && (
                                        <div className="col-span-2">
                                            <p className="text-gray-600">Notas:</p>
                                            <p className="font-medium">{shipment.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
