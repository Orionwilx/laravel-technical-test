import DashboardStatsComponent from '@/components/dashboard/DashboardStats';
import SimpleLayout from '@/layouts/SimpleLayout';
import { DashboardStats, PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface DashboardProps extends PageProps {
    stats: DashboardStats;
}

export default function Dashboard({ auth, stats }: DashboardProps) {
    const user = auth.user;

    return (
        <SimpleLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-gray-600">Welcome back, {user.name}</p>
                </div>

                {/* Dashboard Content */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <DashboardStatsComponent stats={stats} userRole={user.role} />
                </div>
            </div>
        </SimpleLayout>
    );
}
