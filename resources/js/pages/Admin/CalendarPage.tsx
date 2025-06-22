import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

interface CalendarEvent {
  id?: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

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
    <div className="min-h-screen bg-blue-100 flex flex-col mt-10">
      {/* Header */}
      <header className="bg-white shadow-md py-6 mb-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
            📅 School Event Calendar
          </h1>
          <p className="mt-2 md:mt-0 text-gray-600 text-sm md:text-base">
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
            eventTextColor="#ffffff"
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
      <footer className="mt-12 py-6 bg-white text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Your School Name. All rights reserved.
      </footer>
    </div>
  );
}
