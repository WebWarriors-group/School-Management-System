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
              {/* <NotificationListener notification={notification} setNotification={setNotification} /> */}


 

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
                                <div key={material.id} className="group relative">
                                    {/* Three-dot menu */}
                                    {/*<div className="absolute top-3 right-3">
                                        <div className="relative inline-block">
                                            <button 
                                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full focus:outline-none"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-5 w-5" 
                                                viewBox="0 0 20 20" 
                                                fill="currentColor"
                                            >
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                            </button>*/}
                                            
                                            {/* Dropdown menu (hidden by default) */}
                                            {/*<div className="hidden absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                                            <button 
                                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-4 w-4 mr-2" 
                                                viewBox="0 0 20 20" 
                                                fill="currentColor"
                                                >
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Delete
                                            </button>
                                            </div>
                                        </div>
                                    </div>*/}

                                    <a 
                                        href={`/storage/${encodeURIComponent(material.file_url)}`}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <li className="p-6 border-l-4 border-red-700 bg-gray-50 rounded-xl shadow-sm hover:scale-102 duration-300 cursor-pointer hover:shadow-md">
                                            {/* Year Badge */}
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

                                            {/* Content */}
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