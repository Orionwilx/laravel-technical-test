import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import { forwardRef } from 'react';

const TriggerButton = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof SidebarMenuButton>>(({ className, ...props }, ref) => (
    <SidebarMenuButton
        ref={ref}
        size="lg"
        className={`text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent hover:bg-sidebar-accent/50 group ${className}`}
        {...props}
    />
));

TriggerButton.displayName = 'TriggerButton';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <TriggerButton>
                            <UserInfo user={auth.user} />
                            <ChevronsUpDown className="ml-auto size-4 opacity-50" />
                        </TriggerButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="end"
                        side={isMobile ? 'bottom' : state === 'collapsed' ? 'right' : 'bottom'}
                        sideOffset={4}
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
