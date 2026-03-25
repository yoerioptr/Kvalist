import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Heading } from '@/Catalyst/heading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Catalyst/table';
import { Checkbox } from '@/Catalyst/checkbox';
import clsx from 'clsx';

interface Product {
    id: string;
    name: string;
}

interface BasketItem {
    id: string;
    product_id: string;
    product: Product;
    amount: number;
    unit: string;
    unit_label: string;
    is_in_cart: boolean;
    weight: number;
}

interface Store {
    id: string;
    name: string;
}

interface Basket {
    id: string;
    name: string;
    store: Store | null;
    items: BasketItem[];
}

export default function Show({ basket }: { basket: Basket }) {
    const [localItems, setLocalItems] = useState(basket.items);

    useEffect(() => {
        setLocalItems(basket.items);
    }, [basket.items]);

    const handleInCartToggle = (itemId: string, isInCart: boolean) => {
        // Optimistic update
        const previousItems = [...localItems];
        setLocalItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, is_in_cart: isInCart } : item
        ));

        router.patch(route('basket-items.in-cart.update', itemId), {
            is_in_cart: isInCart,
        }, {
            preserveScroll: true,
            onError: () => {
                // Revert on error
                setLocalItems(previousItems);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <Heading>
                    Basket: {basket.name} {basket.store && `(${basket.store.name})`}
                </Heading>
            }
        >
            <Head title={`Basket: ${basket.name}`} />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>In Cart</TableHeader>
                        <TableHeader>Product</TableHeader>
                        <TableHeader>Amount</TableHeader>
                        <TableHeader className="hidden sm:table-cell">Unit</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {localItems.map((item) => (
                        <TableRow
                            key={item.id}
                            className={clsx(
                                'cursor-pointer',
                                item.is_in_cart && 'opacity-50 line-through'
                            )}
                            onClick={() => handleInCartToggle(item.id, !item.is_in_cart)}
                        >
                            <TableCell>
                                <Checkbox
                                    checked={item.is_in_cart}
                                    onChange={(checked) => {
                                        handleInCartToggle(item.id, checked);
                                    }}
                                    // Stop propagation to avoid double-toggling when clicking the checkbox itself
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </TableCell>
                            <TableCell className="font-medium text-zinc-950 dark:text-white">
                                {item.product.name}
                            </TableCell>
                            <TableCell>
                                {item.amount}
                                <span className="ml-1 sm:hidden text-zinc-500">
                                    {item.unit_label}
                                </span>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{item.unit_label}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    );
}
