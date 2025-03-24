import { Link } from "@inertiajs/react";
import "../../../css/studyMaterials.css";

const studyMaterials = () => {
    const categories = [
        {
            title: "Past Papers",
            description: "Access previous years' exam papers to help with your studies.",
            image: "/images/past_papers.jpg",
            link: "/study_material/pastPapers",
        },
        {
            title: "Teachers' Handbooks",
            description: "Guides and reference materials for teachers.",
            image: "/images/teachers_handbooks.jpg",
            link: "/study_material/teachersHandbooks",
        },
        {
            title: "Notes",
            description: "Summarized notes and study guides for various subjects.",
            image: "/images/notes.jpg",
            link: "/study_material/notes",
        },
    ];

    return (
        <div className="study-container">
            <h1 className="study-title">Study Materials</h1>

            <div className="study-grid">
                {categories.map((category, index) => (
                    <Link key={index} href={category.link} className="study-card">
                        <img src={category.image} alt={category.title} className="study-image" />
                        <div className="study-content">
                            <h2 className="study-heading">{category.title}</h2>
                            <p className="study-text">{category.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default studyMaterials;
