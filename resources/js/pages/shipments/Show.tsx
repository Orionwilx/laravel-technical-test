import ShipmentDetails from '@/components/shipments/ShipmentDetails';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps, Shipment } from '@/types';
import { Head } from '@inertiajs/react';

interface ShipmentsShowProps extends PageProps {
    shipment: Shipment;
}

export default function ShipmentsShow({ auth, shipment }: ShipmentsShowProps) {
    const user = auth.user;
    const isAdmin = user.role === 'admin';
    const isOwner = shipment.user_id === user.id;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Envío: {shipment.product_name}</h2>}>
            <Head title={`Envío: ${shipment.product_name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ShipmentDetails shipment={shipment} canEdit={isAdmin || isOwner} canMarkAsDelivered={isAdmin} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
