import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
  auth?: {
        user: any; 
}
}
export default ({ children, breadcrumbs, auth, ...props }: AppLayoutProps) => {
  const { auth:authFromPage } = usePage().props;
return(
  <>
    {/* <NotificationListener /> */}
    <AppLayoutTemplate breadcrumbs={breadcrumbs}  {...props}>
      {children}
    </AppLayoutTemplate>
  </>
);}
