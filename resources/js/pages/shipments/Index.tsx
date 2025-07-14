import ShipmentsList from '@/components/shipments/ShipmentsList';
import SimpleLayout from '@/layouts/SimpleLayout';
import { PageProps, Shipment } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface ShipmentsIndexProps extends PageProps {
    shipments: Shipment[];
}

export default function ShipmentsIndex({ auth, shipments }: ShipmentsIndexProps) {
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
                        <Link
                            href="/shipments/create"
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Shipment
                        </Link>
                    </div>
                </div>

                {/* Shipments List */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <ShipmentsList
                        shipments={shipments}
                        canCreate={true}
                        canEdit={isAdmin || user.role === 'external'}
                        canDelete={isAdmin}
                        showUserInfo={isAdmin}
                    />
                </div>
            </div>
        </SimpleLayout>
    );
}
