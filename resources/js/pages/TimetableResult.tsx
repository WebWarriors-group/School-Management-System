// import React from 'react';
import { Inertia } from '@inertiajs/inertia';

type Slot = {
  subject: string;
  teacher: string;
} | null;

type TimetableData = {
  [className: string]: {
    [day: string]: Slot[];
  };
};

interface Props {
  timetable: TimetableData;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function TimetableResult({ timetable }: Props) {
  const handleGenerate = () => {
    Inertia.get('/timetable/generate'); // triggers Laravel controller
  };

  if (!timetable || Object.keys(timetable).length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p className="text-lg mb-4">No timetable data available.</p>
        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        >
          Generate Timetable
        </button>
      </div>
    );
  }

  const firstClass = Object.values(timetable)[0];
  const firstDay = firstClass ? Object.values(firstClass)[0] : [];
  const periodsPerDay = firstDay?.length || 6;

  return (
    <div className="container mx-auto px-6 py-10 space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-800">All Class Timetables</h1>
        <button
          onClick={handleGenerate}
          className="px-5 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
        >
          Regenerate Timetable
        </button>
      </div>

      {Object.entries(timetable).map(([className, schedule]) => (
        <div key={className} className="bg-white shadow-md rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-4 text-sky-700">
            {className} Timetable
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-fixed text-sm">
              <thead className="bg-sky-100 text-sky-900">
                <tr>
                  <th className="border px-3 py-2 w-24 text-left">Period</th>
                  {days.map((day) => (
                    <th key={day} className="border px-3 py-2 text-center">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: periodsPerDay }).map((_, periodIdx) => (
                  <tr key={periodIdx}>
                    <td className="border px-3 py-2 font-medium bg-sky-50 text-center">
                      Period {periodIdx + 1}
                    </td>
                    {days.map((day) => {
                      const slot = schedule[day]?.[periodIdx];

                      return (
                        <td key={day} className="border px-3 py-2 align-top">
                          {slot && typeof slot === 'object' ? (
                            <>
                              <div className="text-sky-700 font-semibold">
                                {slot.subject}
                              </div>
                              <div className="text-gray-600 text-xs mt-1">
                                👤 {slot.teacher}
                              </div>
                            </>
                          ) : (
                            <div className="text-gray-400 italic text-xs">Free</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
