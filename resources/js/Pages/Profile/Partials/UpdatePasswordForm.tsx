import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';
import { Subheading } from '@/Catalyst/heading';
import { Text } from '@/Catalyst/text';

export default function UpdatePasswordForm({
    className = '',
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <Subheading>Update Password</Subheading>
                <Text className="mt-1">
                    Ensure your account is using a long, random password to stay secure.
                </Text>
            </header>

            <form onSubmit={updatePassword} className="mt-6">
                <Fieldset>
                    <FieldGroup>
                        <Field>
                            <Label>Current Password</Label>
                            <Input
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-2"
                                autoComplete="current-password"
                            />
                            <ErrorMessage>{errors.current_password}</ErrorMessage>
                        </Field>

                        <Field>
                            <Label>New Password</Label>
                            <Input
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-2"
                                autoComplete="new-password"
                            />
                            <ErrorMessage>{errors.password}</ErrorMessage>
                        </Field>

                        <Field>
                            <Label>Confirm Password</Label>
                            <Input
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-2"
                                autoComplete="new-password"
                            />
                            <ErrorMessage>{errors.password_confirmation}</ErrorMessage>
                        </Field>

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
