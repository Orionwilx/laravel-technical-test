import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps, User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2, Users } from 'lucide-react';

interface ExternalUsersIndexProps extends PageProps {
    users: User[];
}

export default function ExternalUsersIndex({ users }: ExternalUsersIndexProps) {
    const handleDelete = (user: User) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(`/admin/external-users/${user.id}`);
        }
    };

    return (
        <AuthenticatedLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'External Users' }]}>
            <Head title="External Users" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">External Users</h1>
                    <Link
                        href="/admin/external-users/create"
                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create User
                    </Link>
                </div>

                <div className="rounded-lg border bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Created</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            <Users className="mx-auto h-12 w-12 text-gray-300" />
                                            <h3 className="mt-2 text-sm font-medium">No external users</h3>
                                            <p className="mt-1 text-sm text-gray-400">Get started by creating a new external user.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/external-users/${user.id}/edit`}
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(user)}
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
