import React from 'react';

interface TimetableProps {
  timetable: {
    [className: string]: {
      [day: string]: (string | number | null)[];
    };
  };
}

export default function TimetableResult({ timetable }: TimetableProps) {
  if (!timetable || Object.keys(timetable).length === 0) {
    return <div className="p-6 text-center text-gray-500">No timetable data available.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Generated Timetable</h1>

      {Object.keys(timetable).map((className) => {
        // Get periods count from first day or default to 0
        const daysData = timetable[className];
        const firstDay = Object.keys(daysData)[0];
        const periodsCount = firstDay ? daysData[firstDay].length : 0;

        return (
          <div key={className} className="mb-10">
            <h2 className="text-xl font-semibold mb-2">{className}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">Day</th>
                    {[...Array(periodsCount)].map((_, i) => (
                      <th key={i} className="border px-4 py-2 text-center">
                        P{i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(daysData).map(([day, subjects]) => (
                    <tr key={day}>
                      <td className="border px-4 py-2 font-semibold">{day}</td>
                      {subjects.map((subject, i) => (
                        <td key={i} className="border px-4 py-2 text-center">
                          {subject ?? '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
