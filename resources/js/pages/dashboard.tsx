import DashboardStatsComponent from '@/components/dashboard/DashboardStats';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { DashboardStats, PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface DashboardProps extends PageProps {
    stats: DashboardStats;
}

export default function Dashboard({ auth, stats }: DashboardProps) {
    const user = auth.user;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DashboardStatsComponent stats={stats} userRole={user.role} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
