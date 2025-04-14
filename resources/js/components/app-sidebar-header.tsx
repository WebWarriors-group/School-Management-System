import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { NavUser } from '@/components/nav-user';
import {  Bell ,FileText,Printer} from 'lucide-react';


export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className=" bg-white sticky z-50 top-0 border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
  <div className="flex items-center gap-2 text-[blue] ">
    <SidebarTrigger className="-ml-1" />
   <Breadcrumbs breadcrumbs={breadcrumbs} />  
    
  </div>

  {/* <div className=" ml-130 right-4 flex items-center gap-2">
  <Bell className="w-5 h-5 text-red-500" />Notifications
  </div>

   <div className= " ml-[16px] right-4 flex items-center gap-2">
   
  <FileText className="w-5 h-5 text-blue-500" /> Import

  </div>
  <div className=" ml-[20px] right-4 flex items-center gap-2">
  <Printer className="w-5 h-5 text-green-500" /> Print
  </div>
   */}

  <div className="fixed ml-250 right-4 flex items-center gap-2">
    <NavUser />
  </div>
</header>

    );
}
