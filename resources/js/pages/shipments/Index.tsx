import ShipmentsList from '@/components/shipments/ShipmentsList';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps, Shipment } from '@/types';
import { Head } from '@inertiajs/react';

interface ShipmentsIndexProps extends PageProps {
    shipments: Shipment[];
}

export default function ShipmentsIndex({ auth, shipments }: ShipmentsIndexProps) {
    const user = auth.user;
    const isAdmin = user.role === 'admin';

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Envíos</h2>}>
            <Head title="Envíos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ShipmentsList
                                shipments={shipments}
                                canCreate={true}
                                canEdit={isAdmin || user.role === 'external'}
                                canDelete={isAdmin}
                                showUserInfo={isAdmin}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
