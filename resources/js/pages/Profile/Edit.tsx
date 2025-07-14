import SimpleLayout from '@/layouts/SimpleLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <SimpleLayout>
            <Head title="Profile" />

            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                </div>

                {/* Profile Information */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
                </div>

                {/* Password */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                {/* Delete Account */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </SimpleLayout>
    );
}
