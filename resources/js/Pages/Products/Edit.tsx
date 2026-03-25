import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Heading } from '@/Catalyst/heading';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';

interface Product {
    id: string;
    name: string;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: product.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('products.update', { product: product.id }));
    };

    return (
        <AuthenticatedLayout
            header={
                <Heading>Edit Product: {product.name}</Heading>
            }
        >
            <Head title={`Edit Product: ${product.name}`} />

            <form onSubmit={submit} className="max-w-xl">
                <Fieldset>
                    <FieldGroup>
                        <Field>
                            <Label>Name</Label>
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

                        <div className="mt-8">
                            <Button type="submit" color="indigo" disabled={processing}>
                                Update Product
                            </Button>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </AuthenticatedLayout>
    );
}
