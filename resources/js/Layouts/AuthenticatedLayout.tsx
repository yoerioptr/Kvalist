import { PropsWithChildren, ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import { SidebarLayout } from '@/Catalyst/sidebar-layout';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/Catalyst/navbar';
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer } from '@/Catalyst/sidebar';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/Catalyst/dropdown';
import { Avatar } from '@/Catalyst/avatar';
import { ChevronUpIcon, HomeIcon, ShoppingBagIcon, StoreIcon, UserIcon, LogOutIcon, PackageIcon } from 'lucide-react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    if (!user) {
        return <div className="min-h-screen bg-gray-100">{children}</div>;
    }

    const navItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: HomeIcon, current: route().current('dashboard') },
        { name: 'Stores', href: route('stores.index'), icon: StoreIcon, current: route().current('stores.*') },
        { name: 'Products', href: route('products.index'), icon: PackageIcon, current: route().current('products.*') },
        { name: 'Baskets', href: route('baskets.index'), icon: ShoppingBagIcon, current: route().current('baskets.*') },
    ];

    return (
        <SidebarLayout
            navbar={
                <Navbar>
                    <NavbarSpacer />
                    <NavbarSection>
                        <Dropdown>
                            <DropdownButton as={NavbarItem}>
                                <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&color=7F9CF5&background=EBF4FF&display_name=0`} square />
                            </DropdownButton>
                            <DropdownMenu anchor="bottom end">
                                <DropdownItem href={route('profile.edit')}>
                                    <UserIcon />
                                    Profile
                                </DropdownItem>
                                <DropdownItem href={route('logout')} method="post">
                                    <LogOutIcon />
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarSection>
                </Navbar>
            }
            sidebar={
                <Sidebar>
                    <SidebarHeader>
                        <div className="flex items-center gap-3 px-2">
                            <span className="text-lg font-semibold text-zinc-950 dark:text-white">Kvalist</span>
                        </div>
                    </SidebarHeader>
                    <SidebarBody>
                        <SidebarSection>
                            {navItems.map((item) => (
                                <SidebarItem key={item.name} href={item.href} current={item.current}>
                                    <item.icon />
                                    <SidebarLabel>{item.name}</SidebarLabel>
                                </SidebarItem>
                            ))}
                        </SidebarSection>
                    </SidebarBody>
                    <SidebarSpacer />
                    <SidebarFooter>
                        <Dropdown>
                            <DropdownButton as={SidebarItem}>
                                <span className="flex min-w-0 items-center gap-3">
                                    {/*<Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&color=7F9CF5&background=EBF4FF&display_name=0`} square />*/}
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{user.name}</span>
                                        <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">{user.email}</span>
                                    </span>
                                </span>
                                <ChevronUpIcon />
                            </DropdownButton>
                            <DropdownMenu anchor="top start">
                                <DropdownItem href={route('profile.edit')}>
                                    <UserIcon />
                                    Profile
                                </DropdownItem>
                                <DropdownItem href={route('logout')} method="post">
                                    <LogOutIcon />
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </SidebarFooter>
                </Sidebar>
            }
        >
            {header && (
                <div className="mb-8">
                    {header}
                </div>
            )}
            {children}
        </SidebarLayout>
    );
}
