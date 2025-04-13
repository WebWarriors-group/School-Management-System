import React, { useState } from "react";

const UploadForm: React.FC <{ category: string; subjects: string }>  = ({ category, subjects }) => {
    const [formData, setFormData] = useState({
        title: "",
        grade: "",
        file_url: "",
        category,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
/*
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, file_url: e.target.files[0] });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) payload.append(key, value);
        });

        // Submit via fetch, Inertia.post, etc.
        // Example: Inertia.post('/upload-study-material', payload)
    };*/

    return (
        <form
           // onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 border border-red-300 mb-8"
        >
            <h3 className="text-lg font-semibold text-red-800 mb-4">Upload Study Material</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-red-800 focus:border-red-800"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Grade</label>
                    <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-red-800 focus:border-red-800"
                    >
                        <option value="">Select grade</option>
                        {[6, 7, 8, 9, 10].map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <select
                        name="subject_id"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-red-800 focus:border-red-800"
                    >
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">File</label>
                    <input
                        type="file"
                        name="file"
                       // onChange={handleFileChange}
                        required
                        className="mt-1 block w-full text-sm border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="mt-4 px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-600 transition"
            >
                Upload
            </button>
        </form>
    );
};

export default UploadForm;