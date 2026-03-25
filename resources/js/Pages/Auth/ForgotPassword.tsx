import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';
import { Text } from '@/Catalyst/text';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4">
                <Text>
                    Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                </Text>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Fieldset>
                    <FieldGroup>
                        <Field>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <ErrorMessage>{errors.email}</ErrorMessage>
                        </Field>

                        <div className="mt-4 flex items-center justify-end">
                            <Button type="submit" color="indigo" disabled={processing}>
                                Email Password Reset Link
                            </Button>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </GuestLayout>
    );
}
