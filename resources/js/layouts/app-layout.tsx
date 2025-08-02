import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import NotificationListener from '@/pages/Admin/notify'; // adjust path accordingly

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    // user: User; 
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <>
    {/* <NotificationListener /> */}
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      {children}
    </AppLayoutTemplate>
  </>
);
