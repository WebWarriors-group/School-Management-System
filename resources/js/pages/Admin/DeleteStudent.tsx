// src/components/DeleteStudent.tsx

import React from "react";

interface DeleteStudentProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteStudent: React.FC<DeleteStudentProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">⚠️ Confirm Deletion</h3>
                <p className="text-gray-700 mb-6">
                    Are you sure you want to delete this student? This action cannot be undone.
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteStudent;
