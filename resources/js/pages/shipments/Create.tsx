import ShipmentForm from '@/components/shipments/ShipmentForm';
import SimpleLayout from '@/layouts/SimpleLayout';
import { Head } from '@inertiajs/react';

export default function ShipmentsCreate() {
    return (
        <SimpleLayout>
            <Head title="Create Shipment" />

            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h1 className="text-2xl font-bold text-gray-900">Create New Shipment</h1>
                </div>

                {/* Form */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <ShipmentForm />
                </div>
            </div>
        </SimpleLayout>
    );
}
