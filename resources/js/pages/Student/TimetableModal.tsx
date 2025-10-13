import { Dialog } from "@headlessui/react";
import { CalendarCheck } from "lucide-react";
import { useState, useEffect } from "react";

interface TimetableItem {
    day: string;
    time_slot: string;
    subject: string;
    teacher: string;
    room: string;
}

interface TimetableModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: any;
}

export default function TimetableModal({ isOpen, onClose, student }: TimetableModalProps) {
    const [timetableData, setTimetableData] = useState<TimetableItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = [
        "07:50 - 08:30",
        "08:30 - 09:10",
        "09:10 - 09:50",
        "09:50 - 10:30",
        "10:30 - 10:50",
        "10:50 - 11:30",
        "11:30 - 12:10",
        "12:10 - 12:50",
        "12:50 - 13:30",
    ];

    const fetchTimetable = async () => {
        if(!student?.reg_no) {
            setError("Student registration number is missing.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/student/${student.reg_no}/timetable`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if(!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setTimetableData(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

        useEffect(() => {
            if (isOpen && timetableData.length === 0) {
                fetchTimetable();
            }
        } , [isOpen]);

        const groupedTimetable = timetableData.reduce((acc, item) => {
            if (!acc[item.day]) {
                acc[item.day] = {};
            }
            acc[item.day][item.time_slot] = item;
            return acc;
        }, {} as Record<string, Record<string, TimetableItem>>);

        return ( 
            <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                {/* <div   className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative" aria-hidden="true"/> */}
                <Dialog.Panel className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">
                <Dialog.Title className="text-2xl font-semibold mb-4 flex items-center">
                    <CalendarCheck className="mr-2" /> Student Timetable
                </Dialog.Title>

                { error && (<div className="text-red-500 mb-4">{error}</div>) }

                { loading ? (
                    <div className="text-center">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status"></div>
                            <p>Loading...</p></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">Time Slot</th>
                                    {daysOfWeek.map((day) => (
                                        <th key={day} className="border border-gray-300 px-4 py-2">{day}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                    {timeSlots.map((slot) => (
                                        <tr key={slot} className="hover:bg-gray-100">
                                            <td className="border border-gray-300 px-4 py-2 font-medium">{slot}</td>
                                            {daysOfWeek.map((day) => {
                                                const item = groupedTimetable[day]?.[slot];
                                                return (
                                                    <td key={`${day}-${slot}`} className="border border-gray-300 px-4 py-2 align-top">
                                                        {item ? (
                                                            <div className="space-y-1">
                                                                <div className="font-semibold">{item.subject}</div>
                                                                <div className="text-sm text-gray-600">Teacher: {item.teacher}</div>
                                                                <div className="text-sm text-gray-600">Room: {item.room}</div>
                                                            </div>
                                                        ) : (
                                                            <span className="">-</span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    </tbody>
                        </table>
                    </div>
                )}

                                    { !loading && !error && timetableData.length === 0 && (
                                        <div className="text-center text-gray-500 py-4">No timetable data available.</div>
                                    )}
<div className="text-right mt-4">
    <div className="text-sm text-gray-600">Class : {student.class?.class_name || 'N/A'}.</div>
    <div className="flex space-x-3">
        <button
            onClick={fetchTimetable}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Refresh
        </button>
        <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
            Close
            </button>
    </div>
</div>
</Dialog.Panel>
            </Dialog>
        );
    }
        