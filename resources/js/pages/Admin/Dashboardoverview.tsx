import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import Timetable from '@/pages/Admin/timeTable';
import { faBullhorn, faFileLines, faUsers, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { type BreadcrumbItem } from '@/types';

export default function StatsOverview() {
  const [isOpen, setIsOpen] = useState(false);
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: '📊 Dashboard Overview',
      href: '/',
    },
  ];

  const cards = [
    {
      color: 'bg-orange-500',
      icon: faUsers,
      title: 'Total People',
      value: '49',
      footer: 'Staffs and student total counts',
      footerColor: 'text-gray-400',
    },
    {
      color: 'bg-green-500',
      icon: faUsers,
      title: 'Classes',
      value: '245',
      footer: 'Last 24 Hours',
      footerColor: 'text-gray-400',
    },
    {
      color: 'bg-red-500',
      icon: faUsers,
      title: 'Staffs',
      value: '75',
      footer: 'Staffs counts are until now',
      footerColor: 'text-gray-400',
    },
    {
      color: 'bg-sky-500',
      icon: faUsers,
      title: 'Students',
      value: '245',
      footer: 'Just Updated',
      footerColor: 'text-gray-400',
    },

    {
        color: 'bg-sky-500',
        icon: faUsers,
        title: 'Labs',
        value: '245',
        footer: 'Just Updated',
        footerColor: 'text-gray-400',
      },
  ];

  const handleTime = () => setIsOpen(true);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="border border-[#005555] bg-white px-4 text-[#005555] hover:bg-gray-50">
                Quick Adding
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => alert('Add Staff')}>Add New Staff</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert('Add Class')}>Add New Class</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert('Add Student')}>Add New Student</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleTime} className="border border-[#005555] bg-white px-4 text-[#005555] hover:bg-gray-50">
            Time Table
          </Button>
        </div>
      </header>

      {!isOpen ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-8 bg-gray-100">
          {/* Left: Dashboard Stats */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 h-100 w-190">
  {cards.map((card, index) => (
    <div
      key={index}
      className="flex  shadow hover:shadow-lg overflow-hidden bg-white"
    >
      {/* Colored Icon Section */}
      <div className={`flex items-center justify-center w-1/3 ${card.color}`}>
        <FontAwesomeIcon icon={card.icon} className="text-white text-3xl" />
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-center p-4 w-2/3">
        <p className="text-sm text-gray-500">{card.title}</p>
        <h2 className="text-2xl font-semibold">{card.value}</h2>
        <p className={`text-xs mt-1 ${card.footerColor}`}>{card.footer}</p>
      </div>
    </div>
  ))}
</div>



          {/* Right: Feature Cards */}
          <div className="flex flex-col gap-6">
            {/* Timetable Card */}
            <div className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#005555]">
                  <FontAwesomeIcon icon={faCalendar} className="text-white text-xl" />
                </div>
                <p className="text-lg font-medium text-gray-800">Timetable</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">Manage weekly class schedules.</p>
              <Button className="w-full bg-[#005555] text-white hover:bg-[#004444]" onClick={handleTime}>
                View Timetable
              </Button>
            </div>

            {/* Report Generation */}
            <div className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#005555]">
                  <FontAwesomeIcon icon={faFileLines} className="text-white text-xl" />
                </div>
                <p className="text-lg font-medium text-gray-800">Report Generation</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">Create reports for classes, students, and staff.</p>
              <Button className="w-full bg-[#005555] text-white hover:bg-[#004444]">
                + Generate Report
              </Button>
            </div>

            {/* Announcements */}
            <div className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#005555]">
                  <FontAwesomeIcon icon={faBullhorn} className="text-white text-xl" />
                </div>
                <p className="text-lg font-medium text-gray-800">Announcements</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">Send school-wide messages and alerts.</p>
              <Button className="w-full bg-[#005555] text-white hover:bg-[#004444]">
                + Post Announcement
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Timetable />
      )}
    </AppLayout>
  );
}
