// import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// import { type NavItem } from '@/types';
// import { Link, usePage } from '@inertiajs/react';

// export function NavMain({ items = [] }: { items: NavItem[] }) {
//     const url = usePage();
//     return (
//         <SidebarGroup className="px-2 py-0 p-1 ">
//             <SidebarGroupLabel className="text-white text-[18px]"></SidebarGroupLabel>
//             <SidebarMenu>
//                 {items.map((item) => (
//                     <SidebarMenuItem key={item.title} >
//                         <SidebarMenuButton asChild  
                               
//                             isActive={url?.startsWith(item.url)} >
//                             <Link href={item.url} prefetch className='p-5   '>
//                                 {item.icon && <item.icon />}
//                                 <span>{item.title}</span>
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 ))}
//             </SidebarMenu>
//         </SidebarGroup>
//     );
// }


import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from '@/components/ui/sidebar';
  import { type NavItem } from '@/types';
  import { Link, usePage } from '@inertiajs/react';
  
  export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage();  // Get the current page URL
  
    return (
      <SidebarGroup className="px-2 py-0 p-1 ">
        <SidebarGroupLabel className="text-white text-[18px]"></SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => {
            // Ensure `isActive` is always a boolean: true or false
            const isActive = url && url.startsWith(item.url) ? true : false; // Always returns true or false
  
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}  // Pass the boolean value here
                >
                  <Link href={item.url} prefetch className="p-5">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    );
  }
  