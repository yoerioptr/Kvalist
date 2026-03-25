import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { Button } from '@/Catalyst/button';
import { Field, FieldGroup, Fieldset, Label, ErrorMessage } from '@/Catalyst/fieldset';
import { Input } from '@/Catalyst/input';
import { Subheading } from '@/Catalyst/heading';
import { Text } from '@/Catalyst/text';
import { Alert, AlertActions, AlertDescription, AlertTitle } from '@/Catalyst/alert';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            <header>
                <Subheading>Delete Account</Subheading>
                <Text className="mt-1">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                </Text>
            </header>

            <div className="mt-6">
                <Button color="red" onClick={confirmUserDeletion}>
                    Delete Account
                </Button>
            </div>

            <Alert open={confirmingUserDeletion} onClose={setConfirmingUserDeletion}>
                <AlertTitle>Are you sure you want to delete your account?</AlertTitle>
                <AlertDescription>
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                </AlertDescription>
                <form onSubmit={deleteUser}>
                    <Fieldset className="mt-6">
                        <FieldGroup>
                            <Field>
                                <Label className="sr-only">Password</Label>
                                <Input
                                    ref={passwordInput}
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    autoFocus
                                />
                                <ErrorMessage>{errors.password}</ErrorMessage>
                            </Field>
                        </FieldGroup>
                    </Fieldset>
                    <AlertActions>
                        <Button plain onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="submit" color="red" disabled={processing}>
                            Delete Account
                        </Button>
                    </AlertActions>
                </form>
            </Alert>
        </section>
    );
}
