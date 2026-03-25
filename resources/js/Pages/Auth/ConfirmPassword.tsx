import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';
import { Text } from '@/Catalyst/text';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4">
                <Text>
                    This is a secure area of the application. Please confirm your password before continuing.
                </Text>
            </div>

            <form onSubmit={submit}>
                <Fieldset>
                    <FieldGroup>
                        <Field>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2"
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <ErrorMessage>{errors.password}</ErrorMessage>
                        </Field>

                        <div className="mt-4 flex items-center justify-end">
                            <Button type="submit" color="indigo" disabled={processing}>
                                Confirm
                            </Button>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </GuestLayout>
    );
}
