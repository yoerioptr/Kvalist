import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Heading } from '@/Catalyst/heading';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';

interface Store {
    id: string;
    name: string;
}

interface Props {
    store: Store;
}

export default function Edit({ store }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: store.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('stores.update', { store: store.id }));
    };

    return (
        <AuthenticatedLayout
            header={
                <Heading>Edit Store: {store.name}</Heading>
            }
        >
            <Head title={`Edit Store: ${store.name}`} />

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
                                Update Store
                            </Button>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </AuthenticatedLayout>
    );
}
