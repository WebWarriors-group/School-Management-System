import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';

type EventType = 'Exam' | 'Fee Due' | 'Assignment' | 'Holiday';

interface CalendarEvent {
  date: string;
  type: EventType;
}

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetch('/api/student/calendar')
      .then((res) => res.json())
      .then((data) => {
        const allEvents: CalendarEvent[] = [
          ...data.exams.map((e: any) => ({ date: e.date, type: 'Exam' })),
          ...data.fees.map((e: any) => ({ date: e.date, type: 'Fee Due' })),
          ...data.assignments.map((e: any) => ({ date: e.date, type: 'Assignment' })),
          ...data.holidays.map((e: any) => ({ date: e.date, type: 'Holiday' })),
        ];
        setEvents(allEvents);
      });
  }, []);

  const tileContent = ({ date }: { date: Date }) => {
    const event = events.find(e => new Date(e.date).toDateString() === date.toDateString());
    return event ? <span className="text-xs text-red-500">{event.type}</span> : null;
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">Academic Calendar</h2>
      <Calendar tileContent={tileContent} />
    </div>
  );
}
