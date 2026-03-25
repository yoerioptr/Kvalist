import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Heading } from '@/Catalyst/heading';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <Heading>New Product</Heading>
            }
        >
            <Head title="New Product" />

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
                                Create Product
                            </Button>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </AuthenticatedLayout>
    );
}
