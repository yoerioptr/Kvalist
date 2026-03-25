import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Heading } from '@/Catalyst/heading';
import { Divider } from '@/Catalyst/divider';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <Heading>Profile</Heading>
            }
        >
            <Head title="Profile" />

            <div className="space-y-10">
                <section>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </section>

                <Divider />

                <section>
                    <UpdatePasswordForm className="max-w-xl" />
                </section>

                <Divider />

                <section>
                    <DeleteUserForm className="max-w-xl" />
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
