import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AuthenticatedLayoutProps {
    children: ReactNode;
    header?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AuthenticatedLayout({ children, header, breadcrumbs, ...props }: AuthenticatedLayoutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} {...props}>
            {header && <div className="mb-6">{header}</div>}
            {children}
        </AppLayout>
    );
}
