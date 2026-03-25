import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';
import { Link } from '@/Catalyst/link';
import { Text } from '@/Catalyst/text';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-6 text-center">
                <Text>Create your account</Text>
            </div>

            <form onSubmit={submit}>
                <Fieldset>
                    <FieldGroup>
                        <Field>
                            <Label>Name</Label>
                            <Input
                                name="name"
                                value={data.name}
                                className="mt-2"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <ErrorMessage>{errors.name}</ErrorMessage>
                        </Field>

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

                        <div className="flex items-center justify-between mt-4">
                            <Link
                                href={route('login')}
                                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                            >
                                Already registered?
                            </Link>

                            <Button type="submit" color="indigo" disabled={processing}>
                                Register
                            </Button>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </GuestLayout>
    );
}
