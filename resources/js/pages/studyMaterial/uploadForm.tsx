import React, { useState, useEffect } from "react";
import axios from "axios";

interface UploadFormProps {
    category: string;
    onClose?: () => void;
}

interface FormData {
    title: string;
    grade: number;
    subject: string;
    year: number;
    file: File | null;
    category: string;
}

const currentYear = new Date().getFullYear();

const UploadForm: React.FC<UploadFormProps> = ({ category, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        grade: 0,
        subject: "",
        file: null,
        category: category,
        year: currentYear,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [csrfToken, setCsrfToken] = useState<string>("");

    // Get CSRF token when component mounts
    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
            setCsrfToken(token);
        } else {
            console.error('CSRF token not found');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file_got = e.target.files[0];
            
            // Validate file size (10MB)
            if (file_got.size > 50 * 1024 * 1024) {
                setError("File size must be less than 50MB");
                return;
            }
            
            setError(null);
            setFormData(prev => ({ ...prev, file: file_got }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!csrfToken) {
            setError("CSRF token missing. Please refresh the page.");
            return;
        }

        setIsLoading(true);
        setError(null);

        if (!formData.file) {
            setError("Please select a file to upload");
            setIsLoading(false);
            return;
        }

        const payload = new FormData();
        payload.append('title', formData.title);
        payload.append('grade', String(formData.grade));
        payload.append('file', formData.file);
        payload.append('year', String(formData.year));
        payload.append('subject', formData.subject);
        payload.append('category', formData.category);
        payload.append('_token', csrfToken);

        try {
            const response = await axios.post("/study_material", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-TOKEN": csrfToken
                }
            });

            // Reset form on success
            setFormData({
                title: "",
                grade: 0,
                subject: "",
                file: null,
                category: category,
                year: currentYear,
            });
            
           
            if (onClose) onClose();
            console.log(response.data);
            
        } catch (error: any) {
            console.error("Upload failed", error);
            
            let errorMessage = "Upload failed. Please try again.";
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.errors) {
                    // Handle Laravel validation errors
                    errorMessage = Object.values(error.response.data.errors).flat().join('\n');
                } else if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response?.status === 419) {
                    errorMessage = "Session expired. Please refresh the page and try again.";
                }
            }
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const subjects = ["English", "Mathematics"];

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 border border-red-300 mb-8">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Upload Study Material</h3>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Title Field */}
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

                {/* Grade Field */}
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
                        {[6, 7, 8, 9, 10, 11, 12, 13].map((g) => (
                            <option key={g} value={g}>Grade {g}</option>
                        ))}
                    </select>
                </div>

                {/* Subject Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-red-800 focus:border-red-800"
                    >
                        <option value="">Select subject</option>
                        {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Relevant Year */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Relevant Year</label>
                    <div className="mt-1 relative">
                        <select
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 rounded-md"
                        >
                            <option value="">Select year</option>
                            {Array.from({ length: 5 }, (_, i) => {
                                const year = currentYear - i;
                                return (
                                    <option key={year} value={`${year}`}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Select the year this material is most relevant for
                    </p>
                </div>

                {/* File Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                    <div className="relative">
                        <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            required
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-red-50 file:text-red-700
                                hover:file:bg-red-100
                                cursor-pointer
                                border border-gray-300 rounded-md shadow-sm
                                focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                        Supports: PDF, DOC, PPT, TXT (Max 50MB)
                        {formData.file && (
                            <span className="block text-green-600">
                                Selected: {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)}MB)
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-4 px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isLoading || !csrfToken}
                    className={`mt-4 px-6 py-2 text-white rounded-md transition ${
                        isLoading ? 'bg-gray-400' : 'bg-red-800 hover:bg-red-600'
                    }`}
                >
                    {isLoading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </form>
    );
};

export default UploadForm;