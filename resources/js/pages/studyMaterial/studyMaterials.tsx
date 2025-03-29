import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/app-layout";
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'toggle screen',
        
        href: '/student',
    },

    
];

const studyMaterials = () => {
    const categories = [
        {
            title: "Past Papers",
            description: "Access previous years' exam papers to help with your studies.",
            image: "/images/past_papers.jpg",
            link: route('studMatCat', { category: 'pastpapers' }),
        },
        {
            title: "Teachers' Handbooks",
            description: "Guides and reference materials for teachers.",
            image: "/images/teachers_handbooks.jpg",
            link: route('studMatCat', { category: 'teachersHandbooks' }),
        },
        {
            title: "Notes",
            description: "Summarized notes and study guides for various subjects.",
            image: "/images/notes.jpg",
            link: route('studMatCat', { category: 'notes' }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Study Materials" />
            <div className="flex flex-col gap-6 p-6 bg-gray-50">
                {/* Page Title */}
                <h1 className="text-3xl font-semibold text-gray-800">Study Materials</h1>

                {/* Grid for Study Materials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.link}
                            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 flex flex-col"
                        >
                            {/* Image */}
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-full h-56 object-cover rounded-t-lg"
                            />

                            {/* Content */}
                            <div className="p-6 flex-grow bg-gray-50">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4 hover:text-blue-700 transition-all">{category.title}</h2>
                                <p className="text-base text-gray-700 mb-4">{category.description}</p>

                                {/* Add extra hover effects for buttons */}
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all">
                                    View More
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default studyMaterials;
