import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, LogOut, Package, Settings, Users } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export function SimpleNavbar() {
    const { auth } = usePage().props as { auth: { user: User } };
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const user = auth.user;
    const isAdmin = user?.role === 'admin';

    const navItems: NavItem[] = [
        { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
        { title: 'Shipments', href: '/shipments', icon: Package },
        ...(isAdmin ? [{ title: 'Users', href: '/admin/external-users', icon: Users }] : []),
    ];

    const handleLogout = () => {
        // Simple form submission for logout
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/logout';

        // Add CSRF token
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);
        }

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <nav className="border-b border-gray-200 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-8">
                    <Link href="/dashboard" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
                            <span className="text-sm font-bold text-white">PB</span>
                        </div>
                        <span className="font-semibold text-gray-900">Puerto Brisa</span>
                    </Link>

                    {/* Navigation Items */}
                    <div className="flex space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="flex items-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            >
                                <item.icon className="h-4 w-4" />
                                <span className="text-sm font-medium">{item.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                            <span className="text-sm font-medium text-white">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-medium">{user?.name}</div>
                            <div className="text-xs text-gray-500">{user?.email}</div>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                            <div className="py-1">
                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                                    onClick={() => setIsUserMenuOpen(false)}
                                >
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center space-x-2 px-4 py-2 text-left text-red-600 transition-colors hover:bg-red-50"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
