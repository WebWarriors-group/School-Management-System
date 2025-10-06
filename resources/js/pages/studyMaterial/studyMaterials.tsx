import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '📚 Study Materials',
        href: '/student',
    },
];

const studyMaterials = () => {
    const user = usePage().props.auth.user;

    const baseCategories = [
        {
            title: 'Past Papers',
            description: "Access previous years' exam papers to help with your studies.",
            image: '/images/pastpapers.jpg',
            link: route('studMatCat', { category: 'pastpapers' }),
            visibleTo: ['student', 'teacher', 'admin'],
        },
        {
            title: "Teachers' Handbooks",
            description: 'Guides and reference materials for teachers.',
            image: '/images/handbook.jpg',
            link: route('studMatCat', { category: 'teachersHandbooks' }),
            visibleTo: ['teacher', 'admin'],
        },
        {
            title: 'Notes',
            description: 'Summarized notes and study guides for various subjects.',
            image: '/images/notebook.png',
            link: route('studMatCat', { category: 'notes' }),
            visibleTo: ['student', 'teacher', 'admin'],
        },
    ];

    const categories = baseCategories.filter((category) => category.visibleTo.includes(user.role));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Study Materials" />
            <div className="flex min-h-screen w-full flex-col gap-6 bg-gradient-to-b from-gray-100 to-gray-200 pb-12">
                {/* Header */}
                <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b bg-white px-6 py-4 shadow-md">
                    {/* <h2 className="text-xl md:text-2xl font-bold text-red-800 tracking-tight">📚 Study Materials</h2> */}
                </header>

                {/* Categories Grid */}
                <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-8 md:grid-cols-3">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.link}
                            className="flex transform flex-col rounded-2xl border border-red-700 bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            {/* Image */}
                            <img src={category.image} alt={category.title} className="h-52 w-full rounded-t-2xl bg-white object-contain p-4" />

                            {/* Card Body */}
                            <div className="flex flex-grow flex-col justify-between rounded-b-2xl bg-gray-50 p-6">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-red-800 transition-all hover:text-red-500">{category.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-700">{category.description}</p>
                                </div>

                                {/* CTA Button */}
                                <div className="mt-4 flex justify-center">
                                    <button className="rounded-md bg-red-800 px-4 py-2 text-sm text-white shadow-md transition hover:bg-red-600">
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
