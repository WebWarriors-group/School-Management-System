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


const eventColors: Record<EventType, string> = {
  'Exam': 'bg-red-100 text-red-700',
  'Fee Due': 'bg-yellow-100 text-yellow-700',
  'Assignment': 'bg-blue-100 text-blue-700',
  'Holiday': 'bg-green-100 text-green-700'
};

const eventColorsDark: Record<EventType, string> = {
  'Exam': 'bg-red-900/30 text-red-300',
  'Fee Due': 'bg-yellow-900/30 text-yellow-300',
  'Assignment': 'bg-blue-900/30 text-blue-300',
  'Holiday': 'bg-green-900/30 text-green-300'
};
export default function CalendarView({darkMode = false}) {

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

    const controller = new AbortController();
    fetch('/api/student/calendar', { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text?.slice(0, 200)}`);
        }
        return res.json();
      })
      .then((data) => {
        const exams = Array.isArray((data as any)?.exams) ? (data as any).exams : [];
        const fees = Array.isArray((data as any)?.fees) ? (data as any).fees : [];
        const assignments = Array.isArray((data as any)?.assignments) ? (data as any).assignments : [];
        const holidays = Array.isArray((data as any)?.holidays) ? (data as any).holidays : [];

        const allEvents: CalendarEvent[] = [
          ...exams.map((e: any) => ({
            date: e.date,
            type: 'Exam' as const,
            title: e.title ?? 'Exam',
            description: e.description ?? undefined,
          })),
          ...fees.map((e: any) => ({
            date: e.date,
            type: 'Fee Due' as const,
            title: e.title ?? 'Fee Due',
            description: e.amount ? `Amount: ${e.amount}` : e.description ?? undefined,
          })),
          ...assignments.map((e: any) => ({
            date: e.date,
            type: 'Assignment' as const,
            title: e.title ?? 'Assignment',
            description: e.description ?? undefined,
          })),
          ...holidays.map((e: any) => ({
            date: e.date,
            type: 'Holiday' as const,
            title: e.title ?? e.name ?? 'Holiday',
            description: e.description ?? undefined,
          })),
        ];
        setEvents(allEvents);
      })
      .catch((err) => {
        if ((err as any)?.name === 'AbortError') return;
        console.error('Calendar fetch error:', err);
      });

    return () => controller.abort();

  }, []);

  const tileContent = ({ date }: { date: Date }) => {
    const event = events.find(e => new Date(e.date).toDateString() === date.toDateString());
    return event ? (

      <span className={`block w-full text-center rounded text-xs font-semibold ${darkMode ? eventColorsDark[event.type] : eventColors[event.type]}`}>

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

    <div className={`p-4 shadow-md rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Academic Calendar</h2>
      <div className={darkMode ? "dark-calendar" : ""}>
      <Calendar
        tileContent={tileContent}
        onClickDay={handleDateClick}
       
      /></div>

      {}
      {showModal && (
 <div className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-black/70' : 'bg-black/40'}`}>
          <div className={`p-6 rounded-xl shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Events on {selectedEvents[0]?.date}</h3>
            <div className="space-y-3">
              {selectedEvents.map((event, index) => (
                <div key={index}  className={`p-3 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
<<<<<<< HEAD
                  {}
=======
                  {/* Color-coded badge */}
>>>>>>> da966e3c28a260bde879823d91e77d7cba4e1f12
                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? eventColorsDark[event.type] : eventColors[event.type]}`}>
                    {event.type}
                  </span>
                  {event.title && <p className={`mt-2 font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{event.title}</p>}
                 {event.description && <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{event.description}</p>}
  {event.description && <p className="text-gray-500 text-sm">{event.description}</p>}

                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}

                 className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'} text-white`}

              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {darkMode && (
       <style>
          {`
            .dark-calendar .react-calendar {
              background-color: #1f2937;
              border: none;
              color: white;
            }
            .dark-calendar .react-calendar__navigation {
              background-color: #1f2937;
              color: white;
            }
            .dark-calendar .react-calendar__navigation button:enabled:hover,
            .dark-calendar .react-calendar__navigation button:enabled:focus {
              background-color: #374151;
            }
            .dark-calendar .react-calendar__month-view__days__day--weekend {
              color: #f87171;
            }
            .dark-calendar .react-calendar__tile {
              background-color: #1f2937;
              color: white;
            }
       )} .dark-calendar .react-calendar__tile:enabled:hover,
            .dark-calendar .react-calendar__tile:enabled:focus {
              background-color: #374151;
            }
            .dark-calendar .react-calendar__tile--now {
              background-color: #374151;
            }
            .dark-calendar .react-calendar__tile--active {
              background-color: #f59e0b;
              color: white;
            }
            .dark-calendar .react-calendar__tile--active:enabled:hover,
            .dark-calendar .react-calendar__tile--active:enabled:focus {
              background-color: #d97706;
            }
          `}
        </style>
      )}

    </div>
  );
}
