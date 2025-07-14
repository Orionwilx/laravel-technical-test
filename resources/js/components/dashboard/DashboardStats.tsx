import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types';
import { Link } from '@inertiajs/react';
import { CheckCircle, Clock, Package, Plus, TrendingUp, Truck, Users } from 'lucide-react';

interface DashboardStatsProps {
    stats: DashboardStats;
    userRole: 'admin' | 'external';
}

export default function DashboardStatsComponent({ stats, userRole }: DashboardStatsProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-CO', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

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

    return (
        <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {userRole === 'admin' && (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Usuarios Externos</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalExternalUsers}</div>
                            <p className="text-muted-foreground text-xs">Total de usuarios registrados</p>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Envíos</CardTitle>
                        <Package className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalShipments}</div>
                        <p className="text-muted-foreground text-xs">{userRole === 'admin' ? 'Envíos en el sistema' : 'Sus envíos totales'}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Anunciados</CardTitle>
                        <Clock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.announcedShipments}</div>
                        <p className="text-muted-foreground text-xs">Pendientes de entrega</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Entregados</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.deliveredShipments}</div>
                        <p className="text-muted-foreground text-xs">Completados exitosamente</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Shipments */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Envíos Recientes</CardTitle>
                            <CardDescription>
                                {userRole === 'admin' ? 'Últimos envíos registrados en el sistema' : 'Sus últimos envíos'}
                            </CardDescription>
                        </div>
                        <Button asChild variant="outline">
                            <Link href="/shipments">Ver todos</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {stats.recentShipments.length === 0 ? (
                        <div className="py-8 text-center">
                            <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="mb-4 text-gray-500">No hay envíos recientes</p>
                            <Button asChild>
                                <Link href="/shipments/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Crear primer envío
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {stats.recentShipments.map((shipment) => (
                                <div
                                    key={shipment.id}
                                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Truck className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="font-medium">{shipment.product_name}</p>
                                            <p className="text-sm text-gray-600">
                                                Placa: <span className="font-mono">{shipment.truck_plate}</span>
                                                {userRole === 'admin' && shipment.user && <span className="ml-2">• {shipment.user.name}</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">{formatDate(shipment.announced_at)}</p>
                                            {getStatusBadge(shipment.status)}
                                        </div>
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/shipments/${shipment.id}`}>Ver</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button asChild className="w-full justify-start">
                            <Link href="/shipments/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Anunciar Nuevo Envío
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-start">
                            <Link href="/shipments">
                                <Package className="mr-2 h-4 w-4" />
                                Ver Todos los Envíos
                            </Link>
                        </Button>
                        {userRole === 'admin' && (
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/admin/users">
                                    <Users className="mr-2 h-4 w-4" />
                                    Gestionar Usuarios
                                </Link>
                            </Button>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Estadísticas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Tasa de entrega</span>
                                <div className="flex items-center space-x-2">
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                    <span className="font-semibold">
                                        {stats.totalShipments > 0 ? Math.round((stats.deliveredShipments / stats.totalShipments) * 100) : 0}%
                                    </span>
                                </div>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-green-500 transition-all duration-300"
                                    style={{
                                        width: `${stats.totalShipments > 0 ? (stats.deliveredShipments / stats.totalShipments) * 100 : 0}%`,
                                    }}
                                />
                            </div>
                            <p className="text-xs text-gray-600">
                                {stats.deliveredShipments} de {stats.totalShipments} envíos completados
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
