import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
  auth?: {
        user: any; 
}

}
export default ({ children, breadcrumbs, auth, ...props }: AppLayoutProps) => {
  const { auth:authFromPage } = usePage().props;

   const user = auth?.user || authFromPage?.user || {
    name: 'Guest',
    avatar: '/default-avatar.png', // path to a default image
    email: '',
  };
return(
  <>
    {/* <NotificationListener /> */}
    <Toaster position="top-right" richColors closeButton />
    <AppLayoutTemplate breadcrumbs={breadcrumbs}  {...props} >
      {children}
    </AppLayoutTemplate>
  </>
);}

