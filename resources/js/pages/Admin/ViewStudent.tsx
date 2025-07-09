import React, { useState, useEffect } from "react";
import { Student } from "@/types";
import { Edit, X, User, Users, GitBranch } from "lucide-react";
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
        
        try {
            const response = await fetch(`/api/students/${editData.reg_no}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData),
            });

            const result = await response.json();
            
            if (response.ok) {
                alert("Updated successfully!");
                setEditData(null);
                setIsEditing(false);
                onStudentUpdated(result);
                onClose();
            } else {
                alert(`Failed to update: ${result.message || "Validation failed"}`);
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("An error occurred while updating.");
        }
    };

    const handleChange = (field: keyof Student, value: any) => {
        if (editData) {
            setEditData({ ...editData, [field]: value });
        }
    };

    useEffect(() => {
        if (isOpen && student) {
            setEditData(null);
            setIsEditing(false);
        }
    }, [isOpen, student]);

    const displayStudent = editData ?? student;

    return (
<div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold">Student Information</h2>
                            <p className="opacity-80 mt-1">Registration No: {student.reg_no}</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-white hover:bg-white/20 p-2 rounded-full"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="overflow-y-auto flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information Card */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
                            <span className="bg-blue-100 text-blue-800 p-1 rounded-lg">
                                <User size={18} />
                            </span>
                            Basic Information
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Class ID</p>
                                {isEditing ? (
                                    <input
                                        value={editData?.class_id || ""}
                                        onChange={(e) => handleChange("class_id", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg mt-1"
                                    />
                                ) : (
                                    <p className="font-medium">{displayStudent.class_id}</p>
                                )}
                            </div>
                            
                            <div>
                                <p className="text-sm text-gray-500">Distance to School</p>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editData?.distance_to_school || ""}
                                        onChange={(e) => handleChange("distance_to_school", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg mt-1"
                                    />
                                ) : (
                                    <p className="font-medium">{displayStudent.distance_to_school ?? "N/A"} km</p>
                                )}
                            </div>
                            
                            <div>
                                <p className="text-sm text-gray-500">Method of Coming</p>
                                {isEditing ? (
                                    <input
                                        value={editData?.method_of_coming_to_school || ""}
                                        onChange={(e) => handleChange("method_of_coming_to_school", e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg mt-1"
                                    />
                                ) : (
                                    <p className="font-medium">{displayStudent.method_of_coming_to_school ?? "N/A"}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Scholarship Information Card */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
                            <span className="bg-green-100 text-green-800 p-1 rounded-lg">
                                <GitBranch size={18} />
                            </span>
                            Scholarship Information
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span>Grade 5 Scholarship</span>
                                {isEditing ? (
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editData?.receiving_any_grade_5_scholarship || false}
                                            onChange={(e) => handleChange("receiving_any_grade_5_scholarship", e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                ) : displayStudent.receiving_any_grade_5_scholarship ? (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Yes</span>
                                ) : (
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">No</span>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span>Samurdhi Beneficiary</span>
                                {isEditing ? (
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editData?.receiving_any_samurdhi_aswesuma || false}
                                            onChange={(e) => handleChange("receiving_any_samurdhi_aswesuma", e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                ) : displayStudent.receiving_any_samurdhi_aswesuma ? (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Yes</span>
                                ) : (
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">No</span>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span>Other Scholarship</span>
                                {isEditing ? (
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editData?.receiving_any_scholarship || false}
                                            onChange={(e) => handleChange("receiving_any_scholarship", e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                ) : displayStudent.receiving_any_scholarship ? (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Yes</span>
                                ) : (
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">No</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Admission Details Card */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 md:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
                            <span className="bg-purple-100 text-purple-800 p-1 rounded-lg">
                                <Users size={18} />
                            </span>
                            Admission Details
                        </h3>
                        
                        <div>
                            <p className="text-sm text-gray-500">Admission Date</p>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={
                                        editData?.admission_date
                                            ? new Date(editData.admission_date).toISOString().split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) => handleChange("admission_date", e.target.value)}
                                    className="w-full md:w-1/2 px-3 py-2 border rounded-lg mt-1"
                                />
                            ) : displayStudent.admission_date ? (
                                <p className="font-medium">
                                    {new Date(displayStudent.admission_date).toLocaleDateString("en-GB")}
                                </p>
                            ) : (
                                <p className="font-medium text-gray-500">N/A</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-50 border-t p-6 flex flex-wrap justify-between gap-3">
                    <div className="flex flex-wrap gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSaveEdit}
                                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => handleEditClick(student)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <Edit size={16} /> Edit Information
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => {
                                setSelectedStudent(student);
                                setPersonalIsModalOpen(true);
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <User size={16} /> Personal
                        </button>
                        <button
                            onClick={() => {
                                setSelectedStudent(student);
                                setFamilyIsModalOpen(true);
                            }}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Users size={16} /> Family
                        </button>
                        <button
                            onClick={() => {
                                setSelectedStudent(student);
                                setSiblingIsModalOpen(true);
                            }}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <GitBranch size={16} /> Siblings
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub-Modals */}
            <StudentPersonalView student={selectedStudent} isOpen={isPersonalModalOpen} onClose={() => setPersonalIsModalOpen(false)} />
            <StudentFamilyView student={selectedStudent} isOpen={isFamilyModalOpen} onClose={() => setFamilyIsModalOpen(false)} />
            <StudentSiblingView student={selectedStudent} isOpen={isSiblingModalOpen} onClose={() => setSiblingIsModalOpen(false)} />
        </div>
    );
};

export default ViewStudent;