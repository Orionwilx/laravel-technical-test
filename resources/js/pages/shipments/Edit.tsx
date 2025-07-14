import ShipmentForm from '@/components/shipments/ShipmentForm';
import SimpleLayout from '@/layouts/SimpleLayout';
import { PageProps, Shipment } from '@/types';
import { Head } from '@inertiajs/react';

interface ShipmentsEditProps extends PageProps {
    shipment: Shipment;
}

export default function ShipmentsEdit({ shipment }: ShipmentsEditProps) {
    return (
        <SimpleLayout>
            <Head title={`Edit: ${shipment.product_name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Shipment: {shipment.product_name}</h1>
                </div>

                {/* Form */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <ShipmentForm shipment={shipment} isEdit={true} />
                </div>
            </div>
        </SimpleLayout>
    );
}
