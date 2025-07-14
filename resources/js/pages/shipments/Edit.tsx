import ShipmentForm from '@/components/shipments/ShipmentForm';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps, Shipment } from '@/types';
import { Head } from '@inertiajs/react';

interface ShipmentsEditProps extends PageProps {
    shipment: Shipment;
}

export default function ShipmentsEdit({ shipment }: ShipmentsEditProps) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Editar Envío: {shipment.product_name}</h2>}>
            <Head title={`Editar: ${shipment.product_name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ShipmentForm shipment={shipment} isEdit={true} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
