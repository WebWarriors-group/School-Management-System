// import { NavFooter } from '@/components/nav-footer';
// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
// import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// import { type NavItem } from '@/types';
// import { Link } from '@inertiajs/react';
// import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
// import AppLogo from './app-logo';

// const mainNavItems: NavItem[] = [

//  {
//     title: 'Admin Dashboard',
//     url: '/dash2',
//     icon: LayoutGrid,
// },

// {
//     title: 'Post',
//     url: '/dash1',
//     icon: LayoutGrid,
// },

// ];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         url: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         url: 'https://laravel.com/docs/starter-kits',
//         icon: BookOpen,
//     },
// ];

// export function AppSidebar() {
//     return (
//         <Sidebar collapsible="icon" variant="inset" className="bg-red-900 text-white " /* it is main nav bar */ >
//             <SidebarHeader /* it is arround the react stater kit button*/>
//                 <SidebarMenu >
//                     <SidebarMenuItem  /*it is for laravel starter kit button change with logo */ >
//                         <SidebarMenuButton size="lg" asChild  className="bg-red-900 text-white hover:bg-gradient-to-r hover:from-maroon-800 hover:to-red-300 transition-all" >
//                             <Link href="/dashboard" prefetch>
//                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
//                                               <img src="images/School.jpg"/>
//                                            </div>
//                                            <div className="ml-1 grid flex-1 text-left text-sm">
//                                                <span className="mb-0.5 truncate leading-none font-semibold text-[16px]">Admin Panel Board</span>
//                                            </div>
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>

//             <SidebarContent className="bg-red-900 text-white"/* it is for menu bar item */>
//                 <NavMain items={mainNavItems} />
//             </SidebarContent>

//             <SidebarFooter className="bg-red text-[red]">
//                 <NavFooter items={footerNavItems} className="mt-auto" />
//                 <NavUser />
//             </SidebarFooter>
//         </Sidebar>
//     );
// }

// AppSidebar.tsx
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';

// ✅ Interface to receive the user role from AppSidebarLayout
interface AppSidebarProps {
    role: string; // either 'admin' or 'teacher'
}

// ✅ Define menu items based on role (admin or teacher)
export function AppSidebar({ role }: AppSidebarProps) {
    const navItemsByRole: Record<string, NavItem[]> = {
        admin: [
            { title: 'Admin Dashboard', url: '/admin/dashboard', icon: LayoutGrid },
            { title: 'Teacher', url: '/admin/teacher', icon: BookOpen },
            { title: 'Students', url: '/admin/studentdashboard', icon: BookOpen },
            { title: 'Student Marks', url: '/mark/MarksPage', icon: BookOpen },
            { title: 'Study materials', url: '/study_material', icon: BookOpen },
        ],
        teacher: [
            { title: 'Teacher Dashboard', url: '/Teacher/dashboard', icon: LayoutGrid },
            { title: 'Student Marks', url: '/mark/MarksPage', icon: BookOpen },
            { title: 'Study materials', url: '/study_material', icon: BookOpen },
            //   { title: 'Students', url: '/teacher/students', icon: Folder },
            //   { title: 'Reports', url: '/teacher/reports', icon: BookOpen },
        ],

        student: [
            { title: 'Student Dashboard', url: '/Student/dashboard', icon: LayoutGrid },
            { title: 'Study materials', url: '/study_material', icon: BookOpen },
            //   { title: 'Students', url: '/teacher/students', icon: Folder },
            //   { title: 'Reports', url: '/teacher/reports', icon: BookOpen },
        ],
    };
    // ✅ Get main nav items for the current role
    const mainNavItems = navItemsByRole[role] || [];

    const footerNavItems: NavItem[] = [
        { title: 'Repository', url: 'https://github.com/laravel/react-starter-kit', icon: Folder },
        { title: 'Documentation', url: 'https://laravel.com/docs/starter-kits', icon: BookOpen },
    ];

    const roleBackgrounds: Record<string, string> = {
        admin: 'maroon', // maroon gradient
        teacher: '#51087E', // green gradient
        student: 'green', // b#80008lue gradient
      };

      const sidebarBackground = roleBackgrounds[role] || '#800000'; 

    return (
        <Sidebar collapsible="icon" variant="inset" className="text-white" style={{ background: sidebarBackground }}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:from-maroon-800 bg-red-900 text-white transition-all hover:bg-gradient-to-r hover:to-red-300"style={{ background: sidebarBackground }}
                        >
                            <Link href="/dashboard" prefetch>
                                {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                  
                </div> */}
                                <div className="ml-2 grid flex-1 text-left text-sm">
                                    <span className="mb-0.5 truncate text-[16px] leading-none font-semibold">Admin Panel Board</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className=" text-white" style={{ background: sidebarBackground }}>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="bg-white text-white">
                <NavFooter items={footerNavItems} className="mt-auto" />
               
            </SidebarFooter>
        </Sidebar>
    );
}
