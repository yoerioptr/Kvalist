import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/Catalyst/button';
import { Heading } from '@/Catalyst/heading';
import { Text } from '@/Catalyst/text';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-zinc-950">
            <Head title="Welcome" />
            <div className="w-full max-w-2xl space-y-12 text-center">
                <div className="space-y-4">
                    <Heading level={1} className="text-4xl sm:text-6xl font-bold text-zinc-950 dark:text-white">Kvalist</Heading>
                    <Text className="text-lg">Your modern shopping list application.</Text>
                </div>

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    {auth.user ? (
                        <Button href={route('dashboard')} color="indigo">
                            Go to Dashboard
                        </Button>
                    ) : (
                        <>
                            <Button href={route('login')} color="indigo">
                                Log in
                            </Button>
                            <Button href={route('register')} plain>
                                Register
                            </Button>
                        </>
                    )}
                </div>

                <footer className="pt-12">
                    <Text className="text-zinc-500 dark:text-zinc-400">
                        Laravel v{laravelVersion} (PHP v{phpVersion})
                    </Text>
                </footer>
            </div>
        </div>
    );
}
