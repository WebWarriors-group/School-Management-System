import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "📚 Study Materials",
        href: "/student",
    },
];

const studyMaterials = () => {
    const categories = [
        {
            title: "Past Papers",
            description: "Access previous years' exam papers to help with your studies.",
            image: "/images/pastpapers.jpg",
            link: route("studMatCat", { category: "pastpapers" }),
        },
        {
            title: "Teachers' Handbooks",
            description: "Guides and reference materials for teachers.",
            image: "/images/handbook.jpg",
            link: route("studMatCat", { category: "teachersHandbooks" }),
        },
        {
            title: "Notes",
            description: "Summarized notes and study guides for various subjects.",
            image: "/images/notebook.png",
            link: route("studMatCat", { category: "notes" }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Study Materials" />
            <div className="flex flex-col w-full gap-6 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen pb-12">

                {/* Header */}
                <header className="sticky top-15 flex w-full  border-b  p-4 shadow-sm  bg-white z-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row  md:justify-end">
          
          <p className=" text-blue-600 md:text-lg  md:text-left md:text-base md:mt-2">
            Classes,Students,Subjects Overall performance
          </p>
        </div>
      </header>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-8 max-w-6xl mx-auto mt-6">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.link}
                            className="bg-white border border-red-700 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex flex-col"
                        >
                            {/* Image */}
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-full h-52 object-contain rounded-t-2xl bg-white p-4"
                            />

                            {/* Card Body */}
                            <div className="p-6 flex-grow flex flex-col justify-between bg-gray-50 rounded-b-2xl">
                                <div>
                                    <h3 className="text-lg font-semibold text-red-800 mb-2 hover:text-red-500 transition-all">
                                        {category.title}
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">{category.description}</p>
                                </div>

                                {/* CTA Button */}
                                <div className="mt-4 flex justify-center">
                                    <button className="bg-red-800 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition">
                                        Find {category.title}
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default studyMaterials;
