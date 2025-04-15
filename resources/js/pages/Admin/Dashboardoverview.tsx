import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import Timetable from '@/pages/Admin/timeTable';
import { faBullhorn, faFileLines, faUsers ,faCalendar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { type BreadcrumbItem } from '@/types';

export default function StatsOverview () {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: '📊Dashboard Overview',
            href: '/',
        },
    ];
    
    const cards = [
        {
            color: 'bg-orange-500',
            icon: <FontAwesomeIcon icon={faUsers} className="text-4xl text-white" />,
            title: 'Total People',
            value: '49',
            footer: 'Get More Space...',
            footerColor: 'text-red-500',
        },
        {
            color: 'bg-green-500',
            icon: <FontAwesomeIcon icon={faUsers} className="text-4xl text-white" />,
            title: 'Classes',
            value: '245',
            footer: 'Last 24 Hours',
            footerColor: 'text-gray-400',
        },
        {
            color: 'bg-red-500',
            icon: <FontAwesomeIcon icon={faUsers} className="text-4xl text-white" />,
            title: 'Staffs',
            value: '75',
            footer: 'Tracked from Github',
            footerColor: 'text-gray-400',
        },
        {
            color: 'bg-sky-500',
            icon: <FontAwesomeIcon icon={faUsers} className="text-4xl text-white" />,
            title: 'Students',
            value: '245',
            footer: 'Just Updated',
            footerColor: 'text-gray-400',
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const handleTime=()=>{
setIsOpen(true);
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <header className="sticky top-1 flex w-full items-center border-b bg-white px-4 py-2 shadow-sm z-50">
                {/* <h5 className="text-maroon text-xl ">Admin dashboard</h5> */}

                {/* <Button className=" shadow-md text-white text-[16px] bg-gradient-to-r from-orange-600 to-yellow-500 hover:bg-green-200 rounded-md px-3 py-1 focus:ring-2 focus:ring-green-400 w-40 h-11 border-4 border-white rounded-4xl ml-5">
                                  Quick Import
                </Button>
                <Button className=" shadow-md text-white text-[16px] bg-gradient-to-r from-green-600 to-lime-500 hover:bg-green-200 rounded-md px-3 py-1 focus:ring-2 focus:ring-green-400 w-40 h-11 border-4 border-white rounded-4xl ml-5">
                                  Generate Report
                </Button>

                <Button className=" shadow-md text-white text-[16px]  hover:bg-green-200 rounded-md px-4 py-1 focus:ring-2 focus:ring-green-400 w-49 h-12 border-4 border-white rounded-4xl ml-5">
                                  Send Announcement
                </Button> */}

                {/* Filter Select */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="ml-5 h-12 w-37 bg-white px-4 py-1 text-[16px] text-[#005555] border-1 border-[#005555]">Quick Adding</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="ml-70 h-35 w-60 justify-center text-[250px]">
                        <DropdownMenuItem onClick={() => alert('Profile clicked')} className="py-2 text-[16px] hover:cursor-pointer">
                            Adding New Staffs
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => alert('Settings clicked')} className="py-2 text-[16px] hover:cursor-pointer">
                            Adding New Class
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => alert('Logout clicked')} className="py-2 text-[16px] hover:cursor-pointer">
                            Adding New Student
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button className="ml- h-12 w-37 bg-white px-4 py-1 text-[16px] text-[#005555]  hover:cursor-pointer" onClick={handleTime}>Time Table</Button>
                {/* <Button className="ml- h-12 w-37 bg-white px-4 py-1 text-[16px] text-[blue]">Bulk Action</Button>
                <Button className="ml- h-12 w-37 bg-white px-4 py-1 text-[16px] text-[#005555]">Upload</Button>
                <Button className="ml- h-12 w-37 bg-white px-4 py-1 text-[16px] text-[#005555]">Overall performance</Button>
                <Button className="ml- h-12 w-37 bg-white px-4 py-1 text-[16px] text-[#005555]">Attendance</Button>  */}
            </header>

            {!isOpen ? (
<>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                {cards.map((card, index) => (
                    <div key={index} className="relative mt-20 ml-5 h-40 w-70 border bg-white p-4 shadow-sm transition hover:shadow-md">
                        {/* Colored square icon */}
                        <div className={`absolute -top-10 left-4 flex h-25 w-25 items-center justify-center text-white shadow-lg ${card.color}`}>
                            <span className="text-lg">{card.icon}</span>
                        </div>

                        {/* Push content down to make space for the icon box */}
                        <div className="mt-[-40px] ml-30 pt-8">
                            <p className="text-sm text-gray-500">{card.title}</p>
                            <h2 className="mt-1 text-2xl font-bold">{card.value}</h2>
                            <p className={`mt-2 text-xs ${card.footerColor}`}>{card.footer}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-16 ml-10 grid h-70 w-150 grid-cols-1 gap-6 border-2 sm:grid-cols-2 md:grid-cols-10">

            <div className=" absolute mt-[-32px]  h-10 w-90 bg-[#005555] px-4  ml-30 text-[white] justify-center items-center flex text-[18px]">
                        Forms Generation
                    </div>
                <div className="relative mt-8 ml-5 h-55 w-60 border bg-purple-100 bg-white p-4 shadow-sm transition hover:shadow-md justify-center flex">
                    {/* Colored square icon */}
                    <div className={`absolute top-[-2px] left-[0px] flex h-15 w-20 items-center justify-center bg-[#005555] text-white shadow-lg`}>
                        <span className="text-lg">
                            <FontAwesomeIcon icon={faFileLines} className="text-4xl text-white" />
                        </span>
                    </div>

                    {/* Push content down to make space for the icon box */}
                    <div className="mt-[-40px] ml-20 pt-8">
                        <p className="text-[16px] text-gray-900">Generate Report</p>
                        <DropdownMenuSeparator className="mt-15 ml-[0px] w-30" />
                        <DropdownMenuSeparator className="mt-5 ml-[-50px]" />
                        <DropdownMenuSeparator className="mt-5 ml-[-50px]" />
                        <DropdownMenuSeparator className="mt-5 ml-[-50px]" />

                        <Button className="mt-1 ml-[-3px] h-10 w-34 bg-[#005555] px-4 text-[16px] text-white shadow-md hover:cursor-pointer focus:ring-2 focus:ring-green-400">
                            +Generate
                        </Button>
                    </div>
                </div>

                <div className="relative mt-8 ml-60 h-55 w-60 border bg-white p-4 shadow-sm transition hover:shadow-md">
                    {/* Colored square icon */}
                    <div className={`absolute top-[-2px] left-[0px] flex h-15 w-20 items-center justify-center bg-[#005555] text-white shadow-lg`}>
                        <span className="text-lg">
                            <FontAwesomeIcon icon={faBullhorn} className="text-4xl text-white" />
                        </span>
                    </div>

                    {/* Push content down to make space for the icon box */}
                    <div className="mt-[-40px] ml-20 pt-8">
                        <p className="text-[17px] text-gray-900">Announcement</p>
                        <DropdownMenuSeparator className="mt-15 ml-[0px] w-30" />
                        <DropdownMenuSeparator className="mt-5 ml-[-50px]" />
                        <DropdownMenuSeparator className="mt-5 ml-[-50px]" />
                        <DropdownMenuSeparator className="mt-5 ml-[-50px]" />

                        <Button className="mt-1 ml-[-3px] h-10 w-34 bg-[#005555] px-4 text-[16px] text-white shadow-md hover:cursor-pointer focus:ring-2 focus:ring-green-400">
                            +Generate
                        </Button>
                    </div>
                </div>

                <div className="mt-[-5px] ml-130 h-100 w-100 border bg-white p-4 shadow-sm transition hover:shadow-md">
                    {/* Colored square icon */}
                    <div className="mt-[-32px]  h-13 w-90 bg-purple-900 px-4  text-[white] justify-center items-center flex text-[18px]">
                        Notifications
                    </div>

                    {/* Push content down to make space for the icon box */}
                    <div className="mt-[-40px] ml-20 pt-8"></div>
                </div>
            </div>
        

           
            </>
            ) : (
           
                <Timetable />
            )}
            
        </AppLayout>
    );
};


