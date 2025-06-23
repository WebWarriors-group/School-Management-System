import React ,{useState,useEffect} from "react";
import { Student } from "@/types";

import { Edit } from "lucide-react";
import StudentPersonalView from "@/pages/Student/StudentPersonalView";
import StudentFamilyView from "@/pages/Student/StudentFamilyView";
import StudentSiblingView from "@/pages/Student/StudentSiblingView";
interface ViewStudentProps {
    student: Student | null;
    isOpen: boolean;
    onClose: () => void;
    onStudentUpdated: (updated: Student) => void;
}


const ViewStudent: React.FC<ViewStudentProps> = ({ student, isOpen, onClose, onStudentUpdated }) => {


    if (!isOpen || !student) return null;


    const [isPersonalModalOpen, setPersonalIsModalOpen] = useState(false);
    const [isFamilyModalOpen, setFamilyIsModalOpen] = useState(false);
    const [isSiblingModalOpen, setSiblingIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Student | null>(null);

    const handleEditClick = (student: Student) => {
        setEditData({ ...student });
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData(null);
    };
const handleSaveEdit = async () => {
    if (!editData) return;

    console.log("Sending update:", editData); // ✅ Check what data is sent

    try {
        const response = await fetch(`/api/students/${editData.reg_no}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editData),
        });

        const result = await response.json(); // move this out of if block to access for both

if (response.ok) {
    alert("Updated successfully!");
    setEditData(null);
    setIsEditing(false);
    onStudentUpdated(result);
    onClose(); // ✅ close modal
}

 else {
            console.log("Validation error response:", result); // ✅ See exact error
            alert(`Failed to update: ${result.message || "Validation failed"}`);
        }
    } catch (err) {
        console.error("Update error:", err);
        alert("An error occurred while updating.");
    }
};

const displayStudent = editData ?? student;

    const handleChange = (field: keyof Student, value: any) => {
        if (editData) {
            setEditData({ ...editData, [field]: value });
        }
    };
useEffect(() => {
  if (isOpen && student) {
    setEditData(null);  // clear old edit state
    setIsEditing(false);
  }
}, [isOpen, student]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] p-8 relative overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
                    👩‍🎓 Student Information
                </h2>

                {/* === Inline Edit Form Start === */}
                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-center text-gray-800">
                        <tbody>
                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold w-1/2">🎓 Reg No</th>
                                <td className="px-4 py-3">{student.reg_no}</td>
                            </tr>

                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🏫 Class ID</th>
                                <td className="px-4 py-3">
                                    {isEditing ? (
                                        <input
                                            value={editData?.class_id || ""}
                                            onChange={(e) => handleChange("class_id", e.target.value)}
                                            className="border px-2 py-1 rounded w-full"
                                        />
                                    ) : (
                                        displayStudent.class_id
                                    )}
                                </td>
                            </tr>

                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">📍 Distance to School</th>
                                <td className="px-4 py-3">
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={editData?.distance_to_school || ""}
                                            onChange={(e) => handleChange("distance_to_school", e.target.value)}
                                            className="border px-2 py-1 rounded w-full"
                                        />
                                    ) : (
                                        `${displayStudent.distance_to_school ?? "N/A"} km`
                                    )}
                                </td>
                            </tr>

                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🚲 Method of Coming</th>
                                <td className="px-4 py-3">
                                    {isEditing ? (
                                        <input
                                            value={editData?.method_of_coming_to_school || ""}
                                            onChange={(e) => handleChange("method_of_coming_to_school", e.target.value)}
                                            className="border px-2 py-1 rounded w-full"
                                        />
                                    ) : (
                                        displayStudent.method_of_coming_to_school ?? "N/A"
                                    )}
                                </td>
                            </tr>

                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🏅 Grade 5 Scholarship</th>
                                <td className="px-4 py-3">
                                    {isEditing ? (
                                        <input
                                            type="checkbox"
                                            checked={editData?.receiving_any_grade_5_scholarship || false}
                                            onChange={(e) =>
                                                handleChange("receiving_any_grade_5_scholarship", e.target.checked)
                                            }
                                        />
                                    ) : displayStudent.receiving_any_grade_5_scholarship ? (
                                        <span className="text-green-600 font-medium">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-medium">No</span>
                                    )}
                                </td>
                            </tr>

                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🟢 Samurdhi Beneficiary</th>
                                <td className="px-4 py-3">
                                    {isEditing ? (
                                        <input
                                            type="checkbox"
                                            checked={editData?.receiving_any_samurdhi_aswesuma || false}
                                            onChange={(e) =>
                                                handleChange("receiving_any_samurdhi_aswesuma", e.target.checked)
                                            }
                                        />
                                    ) : displayStudent.receiving_any_samurdhi_aswesuma ? (
                                        <span className="text-green-600 font-medium">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-medium">No</span>
                                    )}
                                </td>
                            </tr>

                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">🎁 Other Scholarship</th>
                                <td className="px-4 py-3">
                                    {isEditing ? (
                                        <input
                                            type="checkbox"
                                            checked={editData?.receiving_any_scholarship || false}
                                            onChange={(e) =>
                                                handleChange("receiving_any_scholarship", e.target.checked)
                                            }
                                        />
                                    ) : displayStudent.receiving_any_scholarship ? (
                                        <span className="text-green-600 font-medium">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-medium">No</span>
                                    )}
                                </td>
                            </tr>

                            <tr className="even:bg-gray-50">
                                <th className="px-4 py-3 bg-gray-100 font-semibold">📅 Admission Date</th>
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
                                    ) : displayStudent.admission_date ? (
new Date(displayStudent.admission_date).toLocaleDateString("en-GB")

) : (
  "N/A"
)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* === Inline Edit Form End === */}

                <div className="mt-6 flex justify-between items-center">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSaveEdit}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => handleEditClick(student)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Edit size={16} /> Edit
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>

                {/* Sub-Modals */}
                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={() => {
                            setSelectedStudent(student);
                            setPersonalIsModalOpen(true);
                        }}
                        className="bg-green-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg transition flex items-center gap-2"
                    >
                        Student Personal Details
                    </button>
                    <button
                        onClick={() => {
                            setSelectedStudent(student);
                            setFamilyIsModalOpen(true);
                        }}
                        className="bg-green-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg transition flex items-center gap-2"
                    >
                        Student Family Details
                    </button>
                    <button
                        onClick={() => {
                            setSelectedStudent(student);
                            setSiblingIsModalOpen(true);
                        }}
                        className="bg-green-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg transition flex items-center gap-2"
                    >
                        Student Sibling Details
                    </button>
                </div>

                <StudentPersonalView student={selectedStudent} isOpen={isPersonalModalOpen} onClose={() => setPersonalIsModalOpen(false)} />
                <StudentFamilyView student={selectedStudent} isOpen={isFamilyModalOpen} onClose={() => setFamilyIsModalOpen(false)} />
                <StudentSiblingView student={selectedStudent} isOpen={isSiblingModalOpen} onClose={() => setSiblingIsModalOpen(false)} />
            </div>
        </div>
    );
};

export default ViewStudent;
