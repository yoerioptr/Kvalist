import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Store {
    id: string;
    name: string;
}

interface Props {
    stores: Store[];
}

export default function Create({ stores }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        store_id: stores[0]?.id || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('baskets.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    New Basket
                </h2>
            }
        >
            <Head title="New Basket" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="max-w-xl">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="store_id" value="Store" />

                                    <select
                                        id="store_id"
                                        name="store_id"
                                        value={data.store_id}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        onChange={(e) => setData('store_id', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select a store</option>
                                        {stores.map((store) => (
                                            <option key={store.id} value={store.id}>
                                                {store.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.store_id} className="mt-2" />
                                </div>

                                <div className="mt-6 flex items-center">
                                    <PrimaryButton disabled={processing}>
                                        Create Basket
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
