
import React, { useState, useEffect } from "react";

// import StudentAdmissionForm from "../Student/StudentAdmissionForm";

import { Student } from "@/types";

interface Props {
    student: Student;
    isEditing: boolean;
    editData: Student | null;
    setEditData: (data: Student) => void;
}

const EditStudent: React.FC<Props> = ({ student, isEditing, editData, setEditData }) => {
    const handleChange = (field: keyof Student, value: any) => {
        if (editData) {
            setEditData({ ...editData, [field]: value });
        }
    };

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm text-center text-gray-800">
                <tbody>

                    <tr className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold w-1/2"> Reg No</th>
                        <td className="px-4 py-3">{student.reg_no}</td>
                    </tr>


                    <tr className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold"> Class ID</th>
                        <td className="px-4 py-3">
                            {isEditing ? (
                                <input
                                    value={editData?.class_id || ""}
                                    onChange={(e) => handleChange("class_id", e.target.value)}
                                    className="border px-2 py-1 rounded w-full"
                                />
                            ) : (
                                student.class_id
                            )}
                        </td>
                    </tr>

                    <tr className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold"> Distance to School</th>
                        <td className="px-4 py-3">
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData?.distance_to_school || ""}
                                    onChange={(e) => handleChange("distance_to_school", e.target.value)}
                                    className="border px-2 py-1 rounded w-full"
                                />
                            ) : (
                                `${student.distance_to_school ?? "N/A"} km`
                            )}
                        </td>
                    </tr>

                    <tr className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold"> Method of Coming</th>
                        <td className="px-4 py-3">
                            {isEditing ? (
                                <input
                                    value={editData?.method_of_coming_to_school || ""}
                                    onChange={(e) => handleChange("method_of_coming_to_school", e.target.value)}
                                    className="border px-2 py-1 rounded w-full"
                                />
                            ) : (
                                student.method_of_coming_to_school ?? "N/A"
                            )}
                        </td>
                    </tr>

                    <tr className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold"> Grade 5 Scholarship</th>
                        <td className="px-4 py-3">
                            {isEditing ? (
                                <input
                                    type="checkbox"
                                    checked={editData?.receiving_any_grade_5_scholarship || false}
                                    onChange={(e) =>
                                        handleChange("receiving_any_grade_5_scholarship", e.target.checked)
                                    }
                                />
                            ) : student.receiving_any_grade_5_scholarship ? (
                                <span className="text-green-600 font-medium">Yes</span>
                            ) : (
                                <span className="text-red-500 font-medium">No</span>
                            )}
                        </td>
                    </tr>

                    <tr className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold"> Samurdhi Beneficiary</th>
                        <td className="px-4 py-3">
                            {isEditing ? (
                                <input
                                    type="checkbox"
                                    checked={editData?.receiving_any_samurdhi_aswesuma || false}
                                    onChange={(e) =>
                                        handleChange("receiving_any_samurdhi_aswesuma", e.target.checked)
                                    }
                                />
                            ) : student.receiving_any_samurdhi_aswesuma ? (
                                <span className="text-green-600 font-medium">Yes</span>
                            ) : (
                                <span className="text-red-500 font-medium">No</span>
                            )}
                        </td>
                    </tr>

                    <tr className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold"> Other Scholarship</th>
                        <td className="px-4 py-3">
                            {isEditing ? (
                                <input
                                    type="checkbox"
                                    checked={editData?.receiving_any_scholarship || false}
                                    onChange={(e) =>
                                        handleChange("receiving_any_scholarship", e.target.checked)
                                    }
                                />
                            ) : student.receiving_any_scholarship ? (
                                <span className="text-green-600 font-medium">Yes</span>
                            ) : (
                                <span className="text-red-500 font-medium">No</span>
                            )}
                        </td>
                    </tr>

                    <tr className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold">Admission Date</th>
                        <td className="px-4 py-3">
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={
                                        editData?.admission_date
                                            ? new Date(editData.admission_date).toISOString().split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) => handleChange("admission_date", e.target.value)}
                                    className="border px-2 py-1 rounded w-full"
                                />
                            ) : student.admission_date ? (
                                new Date(student.admission_date).toLocaleDateString("en-GB")
                            ) : (
                                "N/A"
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EditStudent;
