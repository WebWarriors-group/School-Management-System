import React from "react";
import { Head } from "@inertiajs/react";

interface Teacher {
    profile_picture?: string;
    full_name?: string;
    teacher_nic?: string;
    email?: string;
    phone?: string;
    address?: string;
    designation?: string;
    department?: string;
    qualification?: string;
}

interface TeacherProfileProps {
    teacher: Teacher | null;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher }) => {
    if (!teacher) {
        return <p className="text-center text-red-500">Teacher profile not found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Head title="Teacher Profile" />
            <h2 className="text-2xl font-bold text-center mb-4">Teacher Profile</h2>

            <div className="flex flex-col items-center">
                <img
                    src={teacher.profile_picture || "/default-avatar.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-2 border-gray-300"
                />
                <h3 className="text-lg font-semibold mt-2">{teacher.full_name || "N/A"}</h3>
                <p className="text-gray-500">NIC: {teacher.teacher_nic || "N/A"}</p>
            </div>

            <div className="mt-6 border-t pt-4">
                <h4 className="text-xl font-semibold">Personal Details</h4>
                <p><strong>Email:</strong> {teacher.email || "N/A"}</p>
                <p><strong>Phone:</strong> {teacher.phone || "N/A"}</p>
                <p><strong>Address:</strong> {teacher.address || "N/A"}</p>
            </div>

            <div className="mt-6 border-t pt-4">
                <h4 className="text-xl font-semibold">Work Information</h4>
                <p><strong>Designation:</strong> {teacher.designation || "N/A"}</p>
                <p><strong>Department:</strong> {teacher.department || "N/A"}</p>
            </div>

            <div className="mt-6 border-t pt-4">
                <h4 className="text-xl font-semibold">Qualifications</h4>
                <p><strong>Degree:</strong> {teacher.qualification || "N/A"}</p>
            </div>
        </div>
    );
};

export default TeacherProfile;
