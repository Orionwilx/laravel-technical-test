import ShipmentsList from '@/components/shipments/ShipmentsList';
import SimpleLayout from '@/layouts/SimpleLayout';
import { PageProps, Shipment } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Download, Plus } from 'lucide-react';

interface PaginatedShipments {
    data: Shipment[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
}

interface ShipmentsIndexProps extends PageProps {
    shipments: PaginatedShipments;
    canViewAll: boolean;
}

export default function ShipmentsIndex({ auth, shipments, canViewAll }: ShipmentsIndexProps) {
    const user = auth.user;
    const isAdmin = user.role === 'admin';

    return (
        <SimpleLayout>
            <Head title="Shipments" />

            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
                        <div className="flex items-center gap-3">
                            {isAdmin && (
                                <a
                                    href="/shipments/export/excel"
                                    className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Export CSV
                                </a>
                            )}
                            <Link
                                href="/shipments/create"
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Shipment
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Shipments List */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <ShipmentsList
                        shipments={shipments?.data || []}
                        canCreate={true}
                        canEdit={isAdmin || user.role === 'external'}
                        canDelete={isAdmin}
                        showUserInfo={isAdmin}
                    />
                </div>

                {/* Pagination */}
                {shipments && shipments.last_page > 1 && (
                    <div className="rounded-lg bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing {shipments?.from || 0} to {shipments?.to || 0} of {shipments?.total || 0} shipments
                            </div>
                            <div className="text-sm text-gray-700">
                                Page {shipments?.current_page || 1} of {shipments?.last_page || 1}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SimpleLayout>
    );
}
