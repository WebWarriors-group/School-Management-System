import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    
  
  const { props } = usePage();
  const role = props.auth?.user?.role || 'admin'; 

  return (
    <AppShell variant="sidebar">
      
      {}
      <AppSidebar role={role} />
      
      <AppContent variant="sidebar">
        
        {}
        {(role !== 'student'&& role !=='teacher') && <AppSidebarHeader breadcrumbs={breadcrumbs}  />}
        
        {children}
      </AppContent>
    </AppShell>
  );
}