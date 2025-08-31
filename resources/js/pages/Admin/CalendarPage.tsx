import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
 

interface CalendarEvent {
  id?: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: ' 📅 School Event Calendar',
    href: '/',
  },
];

export default function CalendarPage() {
  
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    axios.get<CalendarEvent[]>('/api/events').then((res) => {
      const eventsWithStringId = res.data.map(ev => ({
        ...ev,
        id: ev.id !== undefined ? String(ev.id) : undefined,
      }));
      setEvents(eventsWithStringId);
    });
  }, []);

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Enter event title');
    if (title) {
      const newEvent: CalendarEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      setEvents(prev => [...prev, newEvent]); // optimistic

      axios.post<CalendarEvent>('/api/events', newEvent)
        .then(res => {
          const savedEvent = {
            ...res.data,
            id: res.data.id !== undefined ? String(res.data.id) : undefined,
          };
          setEvents(prev =>
            prev.map(ev => (ev === newEvent ? savedEvent : ev))
          );
        })
        .catch(() => {
          alert('Failed to save event');
          setEvents(prev => prev.filter(ev => ev !== newEvent));
        });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="min-h-screen bg-gray-200 flex flex-col mt-10">
      {/* Header */}

      
<style>
  {`

  .fc .fc-col-header thead tr {
  background-color:rgb(12, 56, 103) !important; /* Tailwind yellow-500 */}
    .fc .fc-button {
      color: #2563EB !important; /* Tailwind blue-600 */
      border-color: #2563EB !important;
      background-color: white !important;
    }
.fc .fc-col-header-cell-cushion {
      
      padding: 8px 0;
      border-radius: 0.375rem; /* rounded-md */
      font-weight: 600;
      color:rgb(228, 228, 228); /* Tailwind blue-900 for contrast */
      text-align: center;
    }
    .fc .fc-button:hover,
    .fc .fc-button.fc-button-active {
      background-color:rgb(174, 108, 22) !important;
      color: white !important;
    }

    .fc .fc-daygrid-day-number {
      color: #2563EB !important; /* Tailwind blue-600 */
      font-weight: 600;
    }
  `}
</style>


      <header className="bg-white shadow-md py-1 mb-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between">
          
           <p className=" text-blue-600 md:text-lg  md:text-left md:text-base md:mt-2">
            Stay organized with your important events and exams.
          </p>
        </div>
      </header>



      {/* Calendar container */}
      <main className="flex-grow max-w-9xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            buttonText={{
              today: 'Today',
              month: 'Month',
              week: 'Week',
              day: 'Day',
            }}
            eventColor="#2563EB" // Tailwind blue-600
            eventTextColor="blue"
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateSelect}
            // style tweaks
            dayHeaderClassNames={() => 'text-blue-700 font-semibold'}
          />
        </div>
      </main>

      {/* Footer */}
      
    </div>
    </AppLayout>
  );
}
