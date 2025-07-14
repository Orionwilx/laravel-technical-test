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

interface ExternalUsersIndexProps extends PageProps {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function ExternalUsersIndex({ users }: ExternalUsersIndexProps) {
    return (
        <SimpleLayout>
            <Head title="External Users" />

            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">External Users</h1>
                        <Link
                            href="/admin/external-users/create"
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Add New User
                        </Link>
                    </div>
                </div>

                {/* Users Table */}
                <div className="rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Created At</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-900">{new Date(user.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link href={`/admin/external-users/${user.id}`} className="text-blue-600 hover:text-blue-900">
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/external-users/${user.id}/edit`}
                                                    className="text-yellow-600 hover:text-yellow-900"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.last_page > 1 && (
                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {users.data.length} of {users.total} users
                                </div>
                                <div className="text-sm text-gray-700">
                                    Page {users.current_page} of {users.last_page}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SimpleLayout>
    );
}
