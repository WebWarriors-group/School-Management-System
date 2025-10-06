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
            <div className="py-12 text-center text-gray-500">
                <p className="mb-4 text-lg">No timetable data available.</p>
                <button onClick={handleGenerate} className="rounded bg-sky-600 px-6 py-2 text-white hover:bg-sky-700">
                    Generate Timetable
                </button>
            </div>
        );
    }

    const firstClass = Object.values(timetable)[0];
    const firstDay = firstClass ? Object.values(firstClass)[0] : [];
    const periodsPerDay = firstDay?.length || 6;

    return (
        <div className="container mx-auto space-y-12 px-6 py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-sky-800">All Class Timetables</h1>
                <button onClick={handleGenerate} className="rounded bg-sky-600 px-5 py-2 text-white transition hover:bg-sky-700">
                    Regenerate Timetable
                </button>
            </div>

            {Object.entries(timetable).map(([className, schedule]) => (
                <div key={className} className="rounded-xl border bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-sky-700">{className} Timetable</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed border-collapse text-sm">
                            <thead className="bg-sky-100 text-sky-900">
                                <tr>
                                    <th className="w-24 border px-3 py-2 text-left">Period</th>
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
                                        <td className="border bg-sky-50 px-3 py-2 text-center font-medium">Period {periodIdx + 1}</td>
                                        {days.map((day) => {
                                            const slot = schedule[day]?.[periodIdx];

                                            return (
                                                <td key={day} className="border px-3 py-2 align-top">
                                                    {slot && typeof slot === 'object' ? (
                                                        <>
                                                            <div className="font-semibold text-sky-700">{slot.subject}</div>
                                                            <div className="mt-1 text-xs text-gray-600">👤 {slot.teacher}</div>
                                                        </>
                                                    ) : (
                                                        <div className="text-xs text-gray-400 italic">Free</div>
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
