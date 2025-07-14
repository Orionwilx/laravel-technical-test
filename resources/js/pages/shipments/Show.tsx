import ShipmentDetails from '@/components/shipments/ShipmentDetails';
import SimpleLayout from '@/layouts/SimpleLayout';
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
        <SimpleLayout>
            <Head title={`Shipment: ${shipment.product_name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h1 className="text-2xl font-bold text-gray-900">Shipment: {shipment.product_name}</h1>
                </div>

                {/* Details */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <ShipmentDetails shipment={shipment} canEdit={isAdmin || isOwner} canMarkAsDelivered={isAdmin} />
                </div>
            </div>
        </SimpleLayout>
    );
}
