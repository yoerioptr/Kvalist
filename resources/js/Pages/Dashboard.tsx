import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Heading } from '@/Catalyst/heading';
import { Text } from '@/Catalyst/text';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <Heading>Dashboard</Heading>
            }
        >
            <Head title="Dashboard" />

            <div className="bg-white p-6 shadow-xs ring-1 ring-zinc-950/5 sm:rounded-2xl dark:bg-zinc-900 dark:ring-white/10">
                <Text>You're logged in!</Text>
            </div>
        </AuthenticatedLayout>
    );
}
