// Tipos para la aplicación Puerto Brisa
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: 'admin' | 'external';
    avatar?: string;
    company_name?: string;
    phone?: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

export interface Shipment {
    id: number;
    user_id: number;
    truck_plate: string;
    product_name: string;
    status: 'announced' | 'delivered';
    announced_at: string;
    delivered_at?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
    user?: User;
}

export interface PaginatedData<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev?: string;
        next?: string;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface SharedData {
    auth: {
        user: User;
    };
    flash: {
        success?: string;
        error?: string;
    };
    errors: Record<string, string[]>;
    sidebarOpen?: boolean;
    name?: string;
    quote?: {
        message: string;
        author: string;
    };
    [key: string]: unknown; // Index signature for PageProps constraint
}

export type PageProps<T = Record<string, unknown>> = SharedData & T;

export interface NavItem {
    title: string;
    href: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Tipo para iconos Lucide
    label?: string;
    url?: string;
    active?: boolean;
    external?: boolean;
}

export interface BreadcrumbItem {
    title: string;
    href?: string;
    label?: string;
    url?: string;
    active?: boolean;
}

export interface DashboardStats {
    totalExternalUsers: number;
    totalShipments: number;
    announcedShipments: number;
    deliveredShipments: number;
    recentShipments: Shipment[];
}

// Tipos para formularios
export interface ShipmentFormData {
    truck_plate: string;
    product_name: string;
    notes?: string;
    [key: string]: string | undefined; // Index signature más específica
}

export interface ExternalUserFormData {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    company_name?: string;
    phone?: string;
    status: 'active' | 'inactive';
}
