import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-svh items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-zinc-950">
            <div className="w-full max-w-md space-y-8">
                <div className="flex justify-center">
                    <span className="text-3xl font-bold text-zinc-950 dark:text-white">Kvalist</span>
                </div>
                <div className="bg-white p-8 shadow-xs ring-1 ring-zinc-950/5 sm:rounded-2xl dark:bg-zinc-900 dark:ring-white/10">
                    {children}
                </div>
            </div>
        </div>
    );
}
