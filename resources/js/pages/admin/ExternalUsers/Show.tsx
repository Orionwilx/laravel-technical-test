import SimpleLayout from '@/layouts/SimpleLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface ExternalUsersShowProps extends PageProps {
    user: User;
}

export default function ExternalUsersShow({ user }: ExternalUsersShowProps) {
    return (
        <SimpleLayout>
            <Head title={`User: ${user.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">User: {user.name}</h1>
                        <div className="flex space-x-2">
                            <Link
                                href="/admin/external-users"
                                className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                            >
                                Back to Users
                            </Link>
                            <Link
                                href={`/admin/external-users/${user.id}/edit`}
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Edit User
                            </Link>
                        </div>
                    </div>
                </div>

                {/* User Details */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ID</label>
                            <div className="mt-1 text-sm text-gray-900">{user.id}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <div className="mt-1 text-sm text-gray-900">{user.name}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 text-sm text-gray-900">{user.email}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <div className="mt-1">
                                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Created At</label>
                            <div className="mt-1 text-sm text-gray-900">{new Date(user.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </SimpleLayout>
    );
}
