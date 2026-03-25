import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Heading } from '@/Catalyst/heading';
import { Button } from '@/Catalyst/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Catalyst/table';
import { Link } from '@/Catalyst/link';

interface Creator {
    id: string;
    name: string;
}

interface Store {
    id: string;
    name: string;
    created_at: string;
    creator: Creator;
}

interface Props {
    stores: Store[];
}

export default function Index({ stores }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <Heading>Stores</Heading>
                    <Button href={route('stores.create')} color="indigo">
                        New Store
                    </Button>
                </div>
            }
        >
            <Head title="Stores" />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Name</TableHeader>
                        <TableHeader className="hidden sm:table-cell">Created By</TableHeader>
                        <TableHeader className="hidden md:table-cell">Created At</TableHeader>
                        <TableHeader className="text-right">Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stores.map((store) => (
                        <TableRow key={store.id}>
                            <TableCell className="font-medium text-zinc-950 dark:text-white">
                                {store.name}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{store.creator.name}</TableCell>
                            <TableCell className="hidden md:table-cell">
                                {new Date(store.created_at).toLocaleString('en-GB')}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route('stores.edit', { store: store.id })}
                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('stores.destroy', { store: store.id })}
                                        method="delete"
                                        as="button"
                                        onBefore={() => confirm('Are you sure you want to delete this store?')}
                                        className="text-red-600 hover:text-red-900 font-medium"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {stores.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-zinc-500">
                                No stores found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    );
}
