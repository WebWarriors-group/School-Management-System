

import React from "react";
import { Student } from "@/types";

interface ViewStudentProps {
    student: Student | null;
    isOpen: boolean;
    onClose: () => void;
}

const ViewStudent: React.FC<ViewStudentProps> = ({ student, isOpen, onClose }) => {
    if (!isOpen || !student) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] p-8 relative overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
                    👩‍🎓 Student Information
                </h2>

                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-center text-gray-800">
                        <tbody>
                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold w-1/2">🎓 Reg No</th>
                                <td className="px-4 py-3">{student.reg_no}</td>
                            </tr>
                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🏫 Class ID</th>
                                <td className="px-4 py-3">{student.class_id}</td>
                            </tr>
                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">📍 Distance to School</th>
                                <td className="px-4 py-3">{student.distance_to_school ?? "N/A"} km</td>
                            </tr>
                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🚲 Method of Coming</th>
                                <td className="px-4 py-3">{student.method_of_coming_to_school ?? "N/A"}</td>
                            </tr>
                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🏅 Grade 5 Scholarship</th>
                                <td className="px-4 py-3">
                                    {student.receiving_any_grade_5_scholarship ? (
                                        <span className="text-green-600 font-medium">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-medium">No</span>
                                    )}
                                </td>
                            </tr>
                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🟢 Samurdhi Beneficiary</th>
                                <td className="px-4 py-3">
                                    {student.receiving_any_samurdhi_aswesuma ? (
                                        <span className="text-green-600 font-medium">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-medium">No</span>
                                    )}
                                </td>
                            </tr>
                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🎁 Other Scholarship</th>
                                <td className="px-4 py-3">
                                    {student.receiving_any_scholarship ? (
                                        <span className="text-green-600 font-medium">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-medium">No</span>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewStudent;
