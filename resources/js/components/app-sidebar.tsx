import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, UsersRound } from 'lucide-react';

// ✅ Interface to receive the user role from AppSidebarLayout
interface AppSidebarProps {
    role: string; // either 'admin' or 'teacher'
}

// ✅ Define menu items based on role (admin or teacher)
export function AppSidebar({ role }: AppSidebarProps) {
    const navItemsByRole: Record<string, NavItem[]> = {
        admin: [
            { title: 'Dashboard Overview', url: '/admin/dashboardoverview', icon: LayoutGrid },
            { title: 'User Management', url: '/admin/usermanage', icon: LayoutGrid },
            { title: 'Teacher', url: '/admin/teacher', icon: Users },
            { title: 'Students', url: '/admin/studentdashboard', icon: UsersRound },
            { title: 'Student Marks', url: '/mark/MarksPage', icon: BookOpen },
            { title: 'Study materials', url: '/study_material', icon: BookOpen },
        ],
        teacher: [
            { title: 'Teacher Dashboard', url: '/teacher/dashboard/{teacher_NIC}', icon: LayoutGrid },
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
        admin: '#152238', // maroon gradient
        teacher: '#51087E', // green gradient
        student: 'green', // b#80008lue gradient
    };

    const sidebarBackground = roleBackgrounds[role] || '#800000';

    return (
        <>
         {(role !== 'student' && role !== 'teacher') && (
        <Sidebar collapsible="icon" variant="inset" className="text-white" style={{ background: sidebarBackground }}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:from-maroon-800 bg-red-900 text-white transition-all hover:bg-gradient-to-r hover:to-red-300"
                            style={{ background: sidebarBackground }}
                        >
                            <Link href="/dashboard" prefetch>
                                {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                  
                </div> */}
                                <div className="ml-2 grid flex-1 text-left text-sm">
                                    <span className="mb-0.5 truncate text-[16px] leading-none font-semibold text-[white]">Admin Panel Board</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

           
                <SidebarContent className="text-[white]" style={{ background: sidebarBackground }}>
                    <NavMain items={mainNavItems} />
                </SidebarContent>
          
            <SidebarFooter className="bg-[white] text-white">
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter>
        </Sidebar>
          )}
        </>
    );

}
