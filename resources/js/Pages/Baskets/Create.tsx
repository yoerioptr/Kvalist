import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo } from 'react';
import Select, { components, GroupBase, OptionProps } from 'react-select';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Heading } from '@/Catalyst/heading';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, Legend, ErrorMessage } from '@/Catalyst/fieldset';
import { Text } from '@/Catalyst/text';
import { Input } from '@/Catalyst/input';
import { Select as CatalystSelect } from '@/Catalyst/select';
import { GripVerticalIcon, TrashIcon, PlusIcon } from 'lucide-react';

interface Store {
    id: string;
    name: string;
}

interface Product {
    id: string;
    name: string;
}

interface Unit {
    value: string;
    label: string;
}

interface Props {
    stores: Store[];
    products: Product[];
    units: Unit[];
}

interface BasketItem {
    id: string; // Add ID for DnD
    product_id: string;
    new_product_name: string;
    amount: number;
    unit: string;
    weight: number;
}

function SortableItem({
    index,
    item,
    products,
    units,
    updateItem,
    removeItem,
    isOnlyItem,
    errors,
}: {
    index: number;
    item: BasketItem;
    products: Product[];
    units: Unit[];
    updateItem: (index: number, key: keyof BasketItem, value: any) => void;
    removeItem: (index: number) => void;
    isOnlyItem: boolean;
    errors: any;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 0,
        position: 'relative' as const,
    };

    const productOptions = useMemo(() => [
        ...products.map(p => ({ value: p.id, label: p.name })),
        { value: 'new', label: '+ Create new product', isNew: true }
    ], [products]);

    const CustomOption = (props: OptionProps<any, false, GroupBase<any>>) => {
        if (props.data.isNew) {
            return (
                <>
                    <div className="border-t border-zinc-950/10 dark:border-white/10 my-1" />
                    <components.Option {...props} />
                </>
            );
        }
        return <components.Option {...props} />;
    };

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: 'transparent',
            borderColor: state.isFocused ? 'var(--color-zinc-950)' : 'var(--color-zinc-950/10)',
            borderRadius: 'var(--radius-lg)',
            padding: '2px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'var(--color-zinc-950/20)',
            }
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: (state.isSelected || state.isFocused) ? 'var(--color-zinc-950/5)' : 'transparent',
            color: 'var(--color-zinc-950)',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: 'var(--color-zinc-950/10)',
            }
        }),
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex flex-wrap items-start gap-4 rounded-xl border border-zinc-950/10 p-4 bg-white dark:bg-zinc-900 dark:border-white/10 ${isDragging ? 'shadow-lg ring-2 ring-indigo-500 ring-opacity-50' : ''}`}
        >
            <div
                {...attributes}
                {...listeners}
                className="mt-8 cursor-grab active:cursor-grabbing p-1 text-zinc-400 hover:text-zinc-600 order-first"
                style={{ touchAction: 'none' }}
                title="Drag to reorder"
            >
                <GripVerticalIcon className="size-5" />
            </div>

            <div className="flex-1 min-w-[200px]">
                <Field>
                    <Label>Product</Label>
                    <div className="mt-2">
                        {item.product_id === 'new' ? (
                            <Input
                                value={item.new_product_name}
                                placeholder="New product name"
                                onChange={(e) => updateItem(index, 'new_product_name', e.target.value)}
                                required
                            />
                        ) : (
                            <Select
                                options={productOptions}
                                value={productOptions.find(opt => opt.value === item.product_id)}
                                onChange={(newValue: any) => {
                                    updateItem(index, 'product_id', newValue?.value);
                                }}
                                components={{ Option: CustomOption }}
                                filterOption={(option: any, inputValue: string) => {
                                    if (option.data.isNew) return true;
                                    return option.label.toLowerCase().includes(inputValue.toLowerCase());
                                }}
                                placeholder="Select or search a product"
                                isSearchable
                                required
                                className="react-select-container"
                                classNamePrefix="react-select"
                                styles={customStyles}
                                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                            />
                        )}
                    </div>
                    {item.product_id === 'new' && (
                        <button
                            type="button"
                            onClick={() => updateItem(index, 'product_id', '')}
                            className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-900"
                        >
                            Select existing product
                        </button>
                    )}
                    <ErrorMessage>{errors[`items.${index}.product_id` as keyof typeof errors]}</ErrorMessage>
                    <ErrorMessage>{errors[`items.${index}.new_product_name` as keyof typeof errors]}</ErrorMessage>
                </Field>
            </div>

            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <div className="w-24 flex-1 sm:flex-none">
                    <Field>
                        <Label>Amount</Label>
                        <Input
                            type="number"
                            className="mt-2"
                            value={item.amount}
                            onChange={(e) => updateItem(index, 'amount', parseFloat(e.target.value))}
                            required
                            min="0.01"
                            step="0.01"
                        />
                        <ErrorMessage>{errors[`items.${index}.amount` as keyof typeof errors]}</ErrorMessage>
                    </Field>
                </div>

                <div className="w-32 flex-1 sm:flex-none">
                    <Field>
                        <Label>Unit</Label>
                        <CatalystSelect
                            className="mt-2"
                            value={item.unit}
                            onChange={(e) => updateItem(index, 'unit', e.target.value)}
                            required
                        >
                            {units.map((unit) => (
                                <option key={unit.value} value={unit.value}>
                                    {unit.label}
                                </option>
                            ))}
                        </CatalystSelect>
                        <ErrorMessage>{errors[`items.${index}.unit` as keyof typeof errors]}</ErrorMessage>
                    </Field>
                </div>

                {!isOnlyItem && (
                    <div className="mt-8 flex-none">
                        <Button
                            plain
                            onClick={() => removeItem(index)}
                        >
                            <TrashIcon className="size-5 text-red-600" />
                        </Button>
                    </div>
                )}
            </div>

            <input
                type="hidden"
                value={item.weight}
            />
        </div>
    );
}

export default function Create({ stores, products, units }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        store_id: '',
        new_store_name: '',
        items: [
            {
                id: crypto.randomUUID(),
                product_id: '',
                new_product_name: '',
                amount: 1,
                unit: units[0]?.value || 'pcs',
                weight: 0,
            },
        ] as BasketItem[],
    });

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const addItem = () => {
        setData('items', [
            ...data.items,
            {
                id: crypto.randomUUID(),
                product_id: '',
                new_product_name: '',
                amount: 1,
                unit: units[0]?.value || 'pcs',
                weight: data.items.length,
            },
        ]);
    };

    const removeItem = (index: number) => {
        const newItems = data.items
            .filter((_, i) => i !== index)
            .map((item, i) => ({ ...item, weight: i }));
        setData('items', newItems);
    };

    const updateItem = (index: number, key: keyof BasketItem, value: any) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [key]: value };

        // Handle special case for 'new' product selection to clear the name
        if (key === 'product_id' && value === 'new') {
            newItems[index].new_product_name = '';
        }

        setData('items', newItems);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = data.items.findIndex((item) => item.id === active.id);
            const newIndex = data.items.findIndex((item) => item.id === over.id);

            const newItems = arrayMove(data.items, oldIndex, newIndex).map((item, index) => ({
                ...item,
                weight: index,
            }));

            setData('items', newItems);
        }
    };

    const itemIds = useMemo(() => data.items.map((item) => item.id), [data.items]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('baskets.store'));
    };

    const storeOptions = useMemo(() => [
        ...stores.map(s => ({ value: s.id, label: s.name })),
        { value: 'new', label: '+ Create new store', isNew: true }
    ], [stores]);

    const CustomOption = (props: OptionProps<any, false, GroupBase<any>>) => {
        if (props.data.isNew) {
            return (
                <>
                    <div className="border-t border-zinc-950/10 dark:border-white/10 my-1" />
                    <components.Option {...props} />
                </>
            );
        }
        return <components.Option {...props} />;
    };

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: 'transparent',
            borderColor: state.isFocused ? 'var(--color-zinc-950)' : 'var(--color-zinc-950/10)',
            borderRadius: 'var(--radius-lg)',
            padding: '2px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'var(--color-zinc-950/20)',
            }
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: (state.isSelected || state.isFocused) ? 'var(--color-zinc-950/5)' : 'transparent',
            color: 'var(--color-zinc-950)',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: 'var(--color-zinc-950/10)',
            }
        }),
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    };

    return (
        <AuthenticatedLayout
            header={
                <Heading>New Basket</Heading>
            }
        >
            <Head title="New Basket" />

            <form onSubmit={submit}>
                <Fieldset>
                    <FieldGroup>
                        <div className="max-w-xl">
                            <Field>
                                <Label>Basket Name</Label>
                                <Input
                                    name="name"
                                    value={data.name}
                                    className="mt-2"
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <ErrorMessage>{errors.name}</ErrorMessage>
                            </Field>

                            <Field className="mt-6">
                                <Label>Store</Label>
                                <div className="mt-2">
                                    {data.store_id === 'new' ? (
                                        <Input
                                            name="new_store_name"
                                            value={data.new_store_name}
                                            placeholder="Enter new store name"
                                            onChange={(e) => setData('new_store_name', e.target.value)}
                                            required
                                        />
                                    ) : (
                                        <Select
                                            options={storeOptions}
                                            value={storeOptions.find(opt => opt.value === data.store_id)}
                                            onChange={(newValue: any) => {
                                                const value = newValue?.value;
                                                setData({
                                                    ...data,
                                                    store_id: value,
                                                    new_store_name: value === 'new' ? data.new_store_name : '',
                                                });
                                            }}
                                            components={{ Option: CustomOption }}
                                            filterOption={(option: any, inputValue: string) => {
                                                if (option.data.isNew) return true;
                                                return option.label.toLowerCase().includes(inputValue.toLowerCase());
                                            }}
                                            placeholder="Select or search a store"
                                            isSearchable
                                            required
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                            styles={customStyles}
                                            menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                                        />
                                    )}
                                </div>

                                {data.store_id === 'new' && (
                                    <button
                                        type="button"
                                        onClick={() => setData('store_id', '')}
                                        className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-900"
                                    >
                                        Select existing store
                                    </button>
                                )}
                                <ErrorMessage>{errors.store_id}</ErrorMessage>
                                <ErrorMessage>{errors.new_store_name}</ErrorMessage>
                            </Field>
                        </div>

                        <div className="mt-10">
                            <Legend>Products</Legend>
                            <div className="mt-4 space-y-4">
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext
                                        items={itemIds}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="space-y-4">
                                            {data.items.map((item, index) => (
                                                <SortableItem
                                                    key={item.id}
                                                    index={index}
                                                    item={item}
                                                    products={products}
                                                    units={units}
                                                    updateItem={updateItem}
                                                    removeItem={removeItem}
                                                    isOnlyItem={data.items.length === 1}
                                                    errors={errors}
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>

                                {errors.items && (
                                    <Text className="text-red-600 dark:text-red-500 text-sm/6">
                                        {errors.items}
                                    </Text>
                                )}
                            </div>

                            <div className="mt-4">
                                <Button plain onClick={addItem}>
                                    <PlusIcon className="size-4 mr-2" />
                                    Add Product
                                </Button>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-zinc-950/10 pt-8 dark:border-white/10">
                            <Button type="submit" color="indigo" disabled={processing} className="w-full sm:w-auto">
                                Create Basket
                            </Button>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </AuthenticatedLayout>
    );
}
