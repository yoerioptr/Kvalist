import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Heading } from '@/Catalyst/heading';
import { Button } from '@/Catalyst/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Catalyst/table';
import { Link } from '@/Catalyst/link';
import { Badge } from '@/Catalyst/badge';

interface Creator {
    id: string;
    name: string;
}

interface Store {
    id: string;
    name: string;
}

interface BasketItem {
    id: string;
    amount: number;
    unit: string;
    is_in_cart: boolean;
    product: {
        id: string;
        name: string;
    };
}

interface Basket {
    id: string;
    name: string;
    created_at: string;
    creator: Creator;
    store: Store;
    items: BasketItem[];
}

interface Props {
    baskets: Basket[];
}

export default function Index({ baskets }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <Heading>Baskets</Heading>
                    <Button href={route('baskets.create')} color="indigo">
                        New Basket
                    </Button>
                </div>
            }
        >
            <Head title="Baskets" />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Store</TableHeader>
                        <TableHeader className="hidden md:table-cell">Items</TableHeader>
                        <TableHeader className="hidden lg:table-cell">Created By</TableHeader>
                        <TableHeader className="hidden lg:table-cell">Created At</TableHeader>
                        <TableHeader className="text-right">Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {baskets.map((basket) => (
                        <TableRow key={basket.id}>
                            <TableCell className="font-medium text-zinc-950 dark:text-white">
                                {basket.name}
                            </TableCell>
                            <TableCell>{basket.store.name}</TableCell>
                            <TableCell className="hidden md:table-cell">
                                {(() => {
                                    const total = basket.items.length;
                                    const inCart = basket.items.filter(i => i.is_in_cart).length;
                                    const remaining = total - inCart;

                                    if (total === 0) return <span className="text-zinc-500">Empty basket</span>;

                                    return (
                                        <div className="flex items-center gap-2">
                                            <span>{inCart} / {total} in cart</span>
                                            {remaining > 0 && (
                                                <Badge color="red">{remaining} open</Badge>
                                            )}
                                        </div>
                                    );
                                })()}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">{basket.creator.name}</TableCell>
                            <TableCell className="hidden lg:table-cell">
                                {new Date(basket.created_at).toLocaleString('en-GB')}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route('baskets.edit', { basket: basket.id })}
                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('baskets.show', { basket: basket.id })}
                                        className="text-green-600 hover:text-green-900 font-medium"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route('baskets.destroy', { basket: basket.id })}
                                        method="delete"
                                        as="button"
                                        onBefore={() => confirm('Are you sure you want to delete this basket?')}
                                        className="text-red-600 hover:text-red-900 font-medium"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {baskets.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-zinc-500">
                                No baskets found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    );
}
