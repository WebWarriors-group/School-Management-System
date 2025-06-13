import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { NavUser } from '@/components/nav-user';
import {  Bell ,FileText,Printer} from 'lucide-react';


export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className=" bg-[#192841]  text-[maroon] sticky z-50 top-0 border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
  <div className="flex items-center gap-2 text-[blue] ">
   
   <Breadcrumbs breadcrumbs={breadcrumbs} />  
    
  </div>

  
  <div className="fixed ml-250 right-4 flex items-center gap-2">
 
    <NavUser />
  </div>
</header>

    );
}
