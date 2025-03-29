import React from "react";

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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">
                    Study Materials for: <span className="text-blue-600">{category}</span>
                </h1>

                {materials.length ? (
                    <ul className="space-y-4">
                        {materials.map((material) => (
                            <li key={material.id} className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100">
                                <strong className="text-lg text-gray-900">{material.title}</strong>
                                <p className="text-gray-600">{material.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center text-lg mt-4">No materials found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default StudyMaterialIndex;
