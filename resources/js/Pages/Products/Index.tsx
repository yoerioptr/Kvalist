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

interface Product {
    id: string;
    name: string;
    created_at: string;
    creator: Creator;
}

interface Props {
    products: Product[];
}

export default function Index({ products }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <Heading>Products</Heading>
                    <Button href={route('products.create')} color="indigo">
                        New Product
                    </Button>
                </div>
            }
        >
            <Head title="Products" />

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
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium text-zinc-950 dark:text-white">
                                {product.name}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{product.creator.name}</TableCell>
                            <TableCell className="hidden md:table-cell">
                                {new Date(product.created_at).toLocaleString('en-GB')}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route('products.edit', { product: product.id })}
                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('products.destroy', { product: product.id })}
                                        method="delete"
                                        as="button"
                                        onBefore={() => confirm('Are you sure you want to delete this product?')}
                                        className="text-red-600 hover:text-red-900 font-medium"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {products.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-zinc-500">
                                No products found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    );
}
