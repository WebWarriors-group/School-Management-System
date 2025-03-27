import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    
    //  Get user role from backend via Inertia shared props
  const { props } = usePage();
  const role = props.auth?.user?.role || 'admin'; // fallback to 'teacher' if role is not defined

  return (
    <AppShell variant="sidebar">
      
        {/* Pass the role into Sidebar to show correct nav items */}
      <AppSidebar role={role} />
      
      <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  );
}

