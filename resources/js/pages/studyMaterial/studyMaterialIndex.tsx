import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'toggle screen',
        
        href: '/student',
    },

    
];


interface StudyMaterial {
    id: number;
    title: string;
    description: string;
}

interface Props {
    category: string;
    materials: StudyMaterial[];
}

const StudyMaterialIndex: React.FC<Props> = ({ category, materials }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Study Materials" />
            <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
                {/* Title Section */}
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6">
                    <h1 className="text-3xl font-semibold text-gray-800 border-b-2 pb-3 mb-6">
                        Study Materials for: <span className="text-blue-600">{category}</span>
                    </h1>

                    {/* Materials List */}
                    {materials.length ? (
                        <ul className="space-y-6">
                            {materials.map((material) => (
                                <li
                                    key={material.id}
                                    className="p-6 border-l-4 border-blue-600 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-gray-50"
                                >
                                    <strong className="text-lg font-semibold text-gray-900">{material.title}</strong>
                                    <p className="mt-2 text-gray-600">{material.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center text-lg mt-8">No materials found for this category.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default StudyMaterialIndex;
