import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

import UploadForm from "./uploadForm";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "📚 Study Materials",
        href: "/student",
    },
];

interface StudyMaterial {
    id: number;
    title: string;
    description: string;
    grade: number;
    subject: string;
    year: number;
}

interface Props {
    category: string;
    materials: StudyMaterial[];
}

const StudyMaterialIndex: React.FC<Props> = ({ category, materials }) => {
    const auth = (usePage().props as any).auth as {
        user: {
            role: string;
        } | null;
    };

    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const grades = Array.from(new Set(materials.map((m) => m.grade))).sort();
    const subjects = Array.from(new Set(materials.map((m) => m.subject)));

    const filteredMaterials0 = selectedGrade ? materials.filter((m) => m.grade == Number(selectedGrade)) : materials;
    const filteredMaterials = (selectedSubject ? filteredMaterials0.filter((m) => m.subject == String(selectedSubject)) : filteredMaterials0).sort((a, b) => b.year - a.year);

    const [showForm, setShowForm] = useState(false);
    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Study Materials" />
            <div className="flex flex-col w-full gap-6 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen pb-10">

                {/* Header */}
                <header className="bg-white sticky top-0 z-10 w-full flex items-center justify-between border-b px-6 py-4 shadow-md">
                    {/*<h1 className="text-xl md:text-2xl font-bold text-red-800 tracking-tight">📚 Study Materials</h1>*/}
                </header>

                {/* Main Container */}
                <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        {/* Page Title */}
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            <span className="text-red-700 font-bold">{
                                category == "pastpapers" && "Past Papers" || 
                                category == "notes" && "Notes" ||
                                category == "teachersHandbooks" && "Teachers' Handbooks" ||
                                category
                            }</span>
                        </h2>
                        {auth.user?.role === "admin" && (
                            <button onClick={() => setShowForm(!showForm)} className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                                Upload materials
                            </button>
                        )}
                    </div>

                    {showForm && (
                        <UploadForm category={category} subjects={"sdf"} />
                    )}

                    {/* Grade Selector */}
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            🎓 Select Grade:
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-red-700 focus:outline-none text-sm"
                            value={selectedGrade}
                            onChange={(e) => setSelectedGrade(e.target.value)}
                        >
                            <option value="">All Grades</option>
                            {grades.map((grade) => (
                                <option key={grade} value={grade}>
                                    Grade {grade}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Subject Selector */}
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            🎓 Select Subject:
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-red-700 focus:outline-none text-sm"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="">All Subjects</option>
                            {subjects.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Materials List */}
                    {filteredMaterials.length ? (
                        <ul className="space-y-5">
                            {filteredMaterials.map((material) => (
                                <li
                                    key={material.id}
                                    className="p-6 border-l-4 border-red-700 bg-gray-50 rounded-xl shadow-sm hover:scale-102 duration-300 cursor-pointer"
                                >
                                     {/* Year Badge */}
                                    <div className="flex-shrink-0">
                                        <span className="inline-block text-white bg-red-800 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
                                            {material.year}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{material.title}</h3>
                                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{material.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center text-gray-500 text-base mt-8 italic">
                            No materials found for this grade.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default StudyMaterialIndex;
