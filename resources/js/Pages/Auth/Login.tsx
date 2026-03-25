import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/Catalyst/button';
import { Checkbox, CheckboxField } from '@/Catalyst/checkbox';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';
import { Link } from '@/Catalyst/link';
import { Text } from '@/Catalyst/text';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-6 text-center">
                <Text>Log in to your account</Text>
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
                                autoComplete="username"
                                autoFocus
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <ErrorMessage>{errors.password}</ErrorMessage>
                        </Field>

                        <CheckboxField>
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(checked) => setData('remember', checked)}
                            />
                            <Label>Remember me</Label>
                        </CheckboxField>

                        <div className="flex items-center justify-between mt-4">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <Button type="submit" color="indigo" disabled={processing}>
                                Log in
                            </Button>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </GuestLayout>
    );
}
