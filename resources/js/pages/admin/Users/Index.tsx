import SimpleLayout from '@/layouts/SimpleLayout';
import { User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Props {
    users: User[];
}

export default function UsersIndex({ users }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <SimpleLayout>
            <Head title="Admin Users" />

            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
                        <Link
                            href="/admin/users/create"
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Create New Admin User
                        </Link>
                    </div>
                </div>

                {/* Users List */}
                <div className="rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Created</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link href={`/admin/users/${user.id}`} className="text-blue-600 hover:text-blue-900">
                                                    View
                                                </Link>
                                                <Link href={`/admin/users/${user.id}/edit`} className="text-yellow-600 hover:text-yellow-900">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-gray-500">No admin users found.</p>
                        </div>
                    )}
                </div>
            </div>
        </SimpleLayout>
    );
}
