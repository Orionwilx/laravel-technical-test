import { SimpleNavbar } from '@/components/SimpleNavbar';
import { type ReactNode } from 'react';

interface SimpleLayoutProps {
    children: ReactNode;
}

export default function SimpleLayout({ children }: SimpleLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <SimpleNavbar />
            <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
        </div>
    );
}
