import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';

type EventType = 'Exam' | 'Fee Due' | 'Assignment' | 'Holiday';

interface CalendarEvent {
  date: string;
  type: EventType;
  title?: string;
  description?: string;
}

// Tailwind color mapping for each event type
const eventColors: Record<EventType, string> = {
  'Exam': 'bg-red-100 text-red-700',
  'Fee Due': 'bg-yellow-100 text-yellow-700',
  'Assignment': 'bg-blue-100 text-blue-700',
  'Holiday': 'bg-green-100 text-green-700'
};

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  const [showModal, setShowModal] = useState(false);

useEffect(() => {
  setEvents([
    { date: '2025-08-15', type: 'Exam', title: 'Math Test', description: 'Chapter 1–5' },
    { date: '2025-08-18', type: 'Holiday', title: 'Poya Day', description: 'School Closed' },
    { date: '2025-09-18', type: 'Fee Due', title: 'Poya Day', description: 'School Closed' },
    { date: '2025-10-18', type: 'Assignment', title: 'Poya Day', description: 'School Closed' }

  ]);
}, []);
  useEffect(() => {
    fetch('/api/student/calendar')
      .then((res) => res.json())
      .then((data) => {
        const allEvents: CalendarEvent[] = [
          ...data.exams.map((e: any) => ({ date: e.date, type: 'Exam', title: e.title, description: e.description })),
          ...data.fees.map((e: any) => ({ date: e.date, type: 'Fee Due', title: e.title, description: e.description })),
          ...data.assignments.map((e: any) => ({ date: e.date, type: 'Assignment', title: e.title, description: e.description })),
          ...data.holidays.map((e: any) => ({ date: e.date, type: 'Holiday', title: e.title, description: e.description })),
        ];
        setEvents(allEvents);
      });
  }, []);

  const tileContent = ({ date }: { date: Date }) => {
    const event = events.find(e => new Date(e.date).toDateString() === date.toDateString());
    return event ? (
      <span className={`block w-full text-center rounded text-xs font-semibold ${eventColors[event.type]}`}>
        {event.type}
      </span>
    ) : null;
  };

  const handleDateClick = (date: Date) => {
    const matchedEvents = events.filter(e => new Date(e.date).toDateString() === date.toDateString());
    if (matchedEvents.length > 0) {
      setSelectedEvents(matchedEvents);
      setShowModal(true);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">Academic Calendar</h2>
      <Calendar
        tileContent={tileContent}
        onClickDay={handleDateClick}
      />

      {/* Event Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Events on {selectedEvents[0]?.date}</h3>
            <div className="space-y-3">
              {selectedEvents.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  {/* Color-coded badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${eventColors[event.type]}`}>
                    {event.type}
                  </span>
                  {event.title && <p className="mt-2 font-semibold text-gray-800">{event.title}</p>}
                  {event.description && <p className="text-gray-500 text-sm">{event.description}</p>}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
