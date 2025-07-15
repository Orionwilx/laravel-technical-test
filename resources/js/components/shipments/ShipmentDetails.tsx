import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shipment } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, CheckCircle, Edit, FileText, Package, Truck, User } from 'lucide-react';

interface ShipmentDetailsProps {
    shipment: Shipment;
    canEdit?: boolean;
    canMarkAsDelivered?: boolean;
}

export default function ShipmentDetails({ shipment, canEdit = false, canMarkAsDelivered = false }: ShipmentDetailsProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'announced':
                return (
                    <Badge variant="secondary" className="bg-orange-50 text-orange-600">
                        Anunciado
                    </Badge>
                );
            case 'delivered':
                return (
                    <Badge variant="default" className="bg-green-50 text-green-600">
                        Entregado
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleMarkAsDelivered = () => {
        if (confirm('¿Está seguro de marcar este envío como entregado? Esta acción cambiará el estado del envío y registrará la fecha de entrega.')) {
            router.patch(
                `/shipments/${shipment.id}/mark-delivered`,
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
        <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/shipments">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a Envíos
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Detalles del Envío</h1>
                </div>
                <div className="flex items-center space-x-2">
                    {canEdit && (
                        <Button asChild variant="outline">
                            <Link href={`/shipments/${shipment.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                            </Link>
                        </Button>
                    )}
                    {canMarkAsDelivered && shipment.status === 'announced' && (
                        <Button onClick={handleMarkAsDelivered} className="bg-green-600 text-white hover:bg-green-700">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Marcar como Entregado
                        </Button>
                    )}
                    {canMarkAsDelivered && shipment.status === 'delivered' && (
                        <Button disabled className="cursor-not-allowed bg-gray-400">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Ya Entregado
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Information */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl">{shipment.product_name}</CardTitle>
                                    <CardDescription>ID: #{shipment.id}</CardDescription>
                                </div>
                                {getStatusBadge(shipment.status)}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Truck className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Placa del Camión</p>
                                        <p className="font-mono text-lg font-semibold">{shipment.truck_plate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Package className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Producto</p>
                                        <p className="font-semibold">{shipment.product_name}</p>
                                    </div>
                                </div>
                            </div>

                            {shipment.notes && (
                                <div className="border-t pt-4">
                                    <div className="flex items-start space-x-3">
                                        <FileText className="mt-1 h-5 w-5 text-gray-600" />
                                        <div>
                                            <p className="mb-2 text-sm text-gray-600">Notas</p>
                                            <p className="text-gray-900">{shipment.notes}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Information */}
                <div className="space-y-6">
                    {/* Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Cronología</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Calendar className="mt-1 h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Anunciado</p>
                                    <p className="font-semibold">{formatDate(shipment.announced_at)}</p>
                                </div>
                            </div>

                            {shipment.delivered_at && (
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Entregado</p>
                                        <p className="font-semibold">{formatDate(shipment.delivered_at)}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* User Information */}
                    {shipment.user && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Usuario</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-3">
                                    <User className="h-5 w-5 text-purple-600" />
                                    <div>
                                        <p className="font-semibold">{shipment.user.name}</p>
                                        <p className="text-sm text-gray-600">{shipment.user.email}</p>
                                        <Badge variant="outline" className="mt-1">
                                            {shipment.user.role === 'admin' ? 'Administrador' : 'Usuario Externo'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Sistema</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">Creado</p>
                                <p className="text-sm font-medium">{formatDate(shipment.created_at)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Actualizado</p>
                                <p className="text-sm font-medium">{formatDate(shipment.updated_at)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
