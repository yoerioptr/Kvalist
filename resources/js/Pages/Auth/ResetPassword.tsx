import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';
import { Text } from '@/Catalyst/text';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="mb-6 text-center">
                <Text>Reset your password</Text>
            </div>

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
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <ErrorMessage>{errors.email}</ErrorMessage>
                        </Field>

                        <Field>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2"
                                autoComplete="new-password"
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <ErrorMessage>{errors.password}</ErrorMessage>
                        </Field>

                        <Field>
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-2"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                required
                            />
                            <ErrorMessage>{errors.password_confirmation}</ErrorMessage>
                        </Field>

                        <div className="mt-4 flex items-center justify-end">
                            <Button type="submit" color="indigo" disabled={processing}>
                                Reset Password
                            </Button>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </GuestLayout>
    );
}
