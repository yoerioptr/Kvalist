import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';
import { Heading, Subheading } from '@/Catalyst/heading';
import { Text } from '@/Catalyst/text';
import { Link } from '@/Catalyst/link';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <Subheading>Profile Information</Subheading>
                <Text className="mt-1">
                    Update your account's profile information and email address.
                </Text>
            </header>

            <form onSubmit={submit} className="mt-6">
                <Fieldset>
                    <FieldGroup>
                        <Field>
                            <Label>Name</Label>
                            <Input
                                name="name"
                                value={data.name}
                                className="mt-2"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoFocus
                                autoComplete="name"
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
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <ErrorMessage>{errors.email}</ErrorMessage>
                        </Field>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <Text className="mt-2">
                                    Your email address is unverified.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Click here to re-send the verification email.
                                    </Link>
                                </Text>

                                {status === 'verification-link-sent' && (
                                    <Text className="mt-2 font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </Text>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button type="submit" color="indigo" disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <Text>Saved.</Text>
                            </Transition>
                        </div>
                    </FieldGroup>
                </Fieldset>
            </form>
        </section>
    );
}
