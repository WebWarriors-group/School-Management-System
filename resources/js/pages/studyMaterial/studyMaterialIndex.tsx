import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import NotificationListener from '@/pages/Admin/notify';
import UploadForm from "./uploadForm";
import { Inertia } from '@inertiajs/inertia';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "📚 Study Materials",
        href: "/student",
    },
];

type Uploader = {
    id: number;
    name: string;
    role: string;
}

interface StudyMaterial {
    id: number;
    title: string;
    grade: number;
    subject: string;
    year: number;
    file_url: string;
    uploaded_by: Uploader;
}

interface Props {
    category: string;
    materials: StudyMaterial[];
}

const StudyMaterialIndex: React.FC<Props> = ({ category, materials }) => {
    
    const user = usePage().props.auth.user;

    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const grades = Array.from(new Set(materials.map((m) => m.grade))).sort();
    const subjects = Array.from(new Set(materials.map((m) => m.subject)));

    const filteredMaterials0 = selectedGrade ? materials.filter((m) => m.grade == Number(selectedGrade)) : materials;
    const filteredMaterials = (selectedSubject ? filteredMaterials0.filter((m) => m.subject == String(selectedSubject)) : filteredMaterials0).sort((a, b) => b.year - a.year);

    const [showForm, setShowForm] = useState(false);
    const handleUploadSuccess = () => {
        setShowForm(false);
        Inertia.reload({ preserveScroll: true, preserveState: true });
    };

    const [notification, setNotification] = useState<string | null>(null);

    

    return (
        <AppLayout breadcrumbs={breadcrumbs} user={user}>
            <Head title="Study Materials" />
            <div className="flex flex-col w-full gap-6 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen pb-10">

                <header className="sticky top-15 flex w-full  border-b  p-4 shadow-sm  bg-white z-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row  md:justify-end">
          
          <p className=" text-blue-600 md:text-lg  md:text-left md:text-base md:mt-2">
            Classes,Students,Subjects Overall performance
          </p>
        </div>
      </header>
              {}


 

                {}
                <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        {}
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            <span className="text-red-700 font-bold">{
                                category == "pastpapers" && "Past Papers" || 
                                category == "notes" && "Notes" ||
                                category == "teachersHandbooks" && "Teachers' Handbooks" ||
                                category
                            }</span>
                        </h2>
                        {user?.role === "admin" && (
                            <button onClick={() => setShowForm(!showForm)} className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                                Upload materials
                            </button>
                        )}
                    </div>

                    {showForm && (
                        <UploadForm
                            category={category}
                            onClose={() => {
                                handleUploadSuccess();
                                
                            }}
                        />
                    )}

                    {}
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
                    {}
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

                    {}
                    {filteredMaterials.length ? (
                        <ul className="space-y-5">
                            {filteredMaterials.map((material) => (
                                <div key={material.id} className="group relative">
                                    {}
                                    {}
                                            
                                            {}
                                            {}

                                    <a 
                                        href={`/storage/${encodeURIComponent(material.file_url)}`}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <li className="p-6 border-l-4 border-red-700 bg-gray-50 rounded-xl shadow-sm hover:scale-102 duration-300 cursor-pointer hover:shadow-md">
                                            {}
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="inline-block text-white bg-red-800 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
                                                    {material.year}
                                                </span>
                                                <span className="inline-block text-white bg-blue-600 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
                                                    Grade {material.grade}
                                                </span>
                                                <span className="inline-block text-white bg-green-600 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
                                                    {material.subject}
                                                </span>
                                            </div>

                                            {}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{material.title}</h3>
                                                <p className="text-gray-600 text-sm">Uploaded by: {material.uploaded_by.name} ({material.uploaded_by.role})</p>
                                            </div>
                                        </li>
                                    </a>
                                </div>
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