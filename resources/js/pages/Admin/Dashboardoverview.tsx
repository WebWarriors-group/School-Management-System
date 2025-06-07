import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import Timetable from '@/pages/Admin/timeTable';
import { type BreadcrumbItem } from '@/types';
import {
  faBell,
  faBullhorn,
  faCalendar,
  faFileLines,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function StatsOverview() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
      color: 'bg-yellow-500',
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
    {
      color: 'bg-purple-500',
      icon: faUsers,
      title: 'Users',
      value: '245',
      footer: 'total registered',
      footerColor: 'text-gray-400',
    },
  ];

  const handleTime = () => setIsOpen(true);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="border border-[#005555] bg-white px-4 text-[#005555] hover:bg-gray-50">
                Quick Adding
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => alert('Add Staff')}>
                Add New Staff
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert('Add Class')}>
                Add New Class
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert('Add Student')}>
                Add New Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            className="sticky right-30 text-[#005555] hover:bg-gray-100"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <p className="text-[30px]">🔔</p>
            <span className="text-lg">notification</span>
          </Button>
        </div>
      </header>

      {!isOpen ? (
        <div className="grid grid-cols-1 gap-6 bg-gray-100 px-6 py-8 md:grid-cols-3">
          {/* Left: Dashboard Stats */}
          <div className="grid h-180 w-190 grid-cols-1 gap-6 sm:grid-cols-3 md:col-span-2 lg:grid-cols-2">
            {cards.map((card, index) => (
              <div key={index} className="flex overflow-hidden bg-white shadow hover:shadow-lg">
                <div className={`flex w-1/3 items-center justify-center ${card.color}`}>
                  <FontAwesomeIcon icon={card.icon} className="text-3xl text-white" />
                </div>
                <div className="flex w-2/3 flex-col justify-center p-4">
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h2 className="text-2xl font-semibold">{card.value}</h2>
                  <p className={`mt-1 text-xs ${card.footerColor}`}>{card.footer}</p>
                </div>
              </div>
            ))}

            <QuickActionCard
              initial="A"
              title="Assign Class to Teacher"
              desc="Link teachers to classes and subjects easily."
              color="purple"
            />
            <QuickActionCard
              initial="B"
              title="Subjects & Curriculum"
              desc="You can easily find the subject details in the school."
              color="red"
            />
            <QuickActionCard
              initial="C"
              title="Leave Details"
              desc="You can effectively manage teachers' leaves"
              color="red"
            />
            <QuickActionCard
              initial="D"
              title="Class/Grade setup"
              desc="You can effectively manage class and grades"
              color="green"
            />
          </div>

          {/* Right: Calendar + Feature Cards */}
          <div className="flex flex-col gap-6">
            {/* Compact Calendar */}
            <div className="rounded-lg border bg-white px-4 py-3 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-gray-700">📅 Calendar</p>
              <Calendar className="w-full [&_.react-calendar__tile]:py-1 [&_.react-calendar__tile]:text-sm" />
            </div>

            <FeatureCard
              icon={faCalendar}
              title="Timetable"
              desc="Manage weekly class schedules."
              buttonLabel="View Timetable"
              onClick={handleTime}
            />
            <FeatureCard
              icon={faFileLines}
              title="Report Generation"
              desc="Create reports for classes, students, and staff."
              buttonLabel=" Generate Report"
            />
            <FeatureCard
              icon={faBullhorn}
              title="Announcements"
              desc="Send school-wide messages and alerts."
              buttonLabel="Post Announcement"
            />
          </div>

          {/* Notification Panel */}
          {showNotifications && (
            <div className="fixed top-20 left z-50 w-80 rounded-lg bg-gray-100 px-4 py-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="rounded-lg border-l-4 border-indigo-500 bg-blue-100 p-3 shadow-md">
                  <p className="text-xs text-gray-500">New Email from Admin</p>
                  <h4 className="text-sm font-semibold text-gray-800">Subject: Meeting Reminder</h4>
                  <button className="mt-1 text-xs text-indigo-600 hover:underline">Read Now</button>
                </div>
                <div className="rounded-lg border-l-4 border-red-500 bg-red-100 p-3 shadow-sm">
                  <p className="text-xs text-gray-500">Alert: Class Timetable Updated</p>
                  <h4 className="text-sm font-semibold text-gray-800">Subject: Math - 9:00 AM Slot Changed</h4>
                  <button className="mt-1 text-xs text-red-600 hover:underline">View Changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Timetable />
      )}
    </AppLayout>
  );
}

function FeatureCard({ icon, title, desc, buttonLabel, onClick }: any) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#005555]">
          <FontAwesomeIcon icon={icon} className="text-xl text-white" />
        </div>
        <p className="text-lg font-medium text-gray-800">{title}</p>
      </div>
      <p className="mb-3 text-sm text-gray-600">{desc}</p>
      <Button className="w-full bg-[#005555] text-white hover:bg-[#004444]" onClick={onClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}

function QuickActionCard({ initial, title, desc, color }: any) {
  return (
    <div
      className={`flex items-center bg-${color}-100 border-l-4 border-${color}-500 h-31 rounded-xl shadow transition duration-300 hover:shadow-md`}
    >
      <div className={`w-1/3 bg-${color}-200 flex items-center justify-center py-8`}>
        <div
          className={`text-4xl font-bold text-${color}-600 flex h-14 w-16 items-center justify-center rounded-full bg-white shadow-inner`}
        >
          {initial}
        </div>
      </div>
      <div className="w-2/3 p-5">
        <p className="mb-1 text-sm tracking-wide text-gray-500 uppercase">Quick Action</p>
        <h2 className={`text-lg font-semibold text-${color}-700`}>{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
